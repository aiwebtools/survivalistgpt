import { createParser } from 'eventsource-parser';

function decodePCM(pending: Uint8Array, incoming: Uint8Array) {
  const bytes = new Uint8Array(pending.length + incoming.length);
  bytes.set(pending);
  bytes.set(incoming, pending.length);
  const usable = bytes.length - (bytes.length % 2);
  const view = new DataView(bytes.buffer);
  const samples = new Float32Array(usable / 2);
  for (let index = 0; index < samples.length; index += 1) samples[index] = view.getInt16(index * 2, true) / 32768;
  return { samples, pending: bytes.slice(usable) };
}

export async function streamSpeech(endpoint: string, text: string, headers: HeadersInit, signal?: AbortSignal) {
  signal?.throwIfAborted();
  const context = new AudioContext({ sampleRate: 24000 });
  const sources = new Set<AudioBufferSourceNode>();
  const controller = new AbortController();
  let playhead = 0;
  let pending = new Uint8Array(0);
  let completed = false;
  let samplesPlayed = 0;
  let playback: Promise<void> = Promise.resolve();

  const abort = () => {
    controller.abort(signal?.reason);
    for (const source of sources) source.stop();
  };
  signal?.addEventListener('abort', abort, { once: true });

  try {
    if (context.state === 'suspended') await context.resume();
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
      signal: controller.signal,
    });
    if (!response.ok || !response.body) {
      const body = await response.text().catch(() => '');
      throw new Error(body || `Voice playback failed (${response.status}).`);
    }

    let streamError = '';
    const parser = createParser({
      onEvent(event) {
        if (event.data === '[DONE]') return;
        let payload: { type?: string; audio?: string; error?: { message?: string } };
        try {
          payload = JSON.parse(event.data);
        } catch {
          return;
        }
        if (payload.type === 'error' || payload.error) {
          streamError = payload.error?.message ?? 'Spoken reply failed.';
          return;
        }
        if (payload.type === 'speech.audio.done') {
          completed = true;
          return;
        }
        if (payload.type !== 'speech.audio.delta' || !payload.audio) return;
        const decoded = decodePCM(pending, Uint8Array.from(atob(payload.audio), (character) => character.charCodeAt(0)));
        pending = decoded.pending;
        if (!decoded.samples.length) return;
        samplesPlayed += decoded.samples.length;
        const buffer = context.createBuffer(1, decoded.samples.length, 24000);
        buffer.copyToChannel(decoded.samples, 0);
        const source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(context.destination);
        sources.add(source);
        playback = new Promise<void>((resolve) => {
          source.onended = () => {
            sources.delete(source);
            resolve();
          };
        });
        playhead = Math.max(playhead, context.currentTime + 0.05);
        source.start(playhead);
        playhead += buffer.duration;
      },
    });

    const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
    try {
      while (true) {
        const chunk = await reader.read();
        if (chunk.done) break;
        parser.feed(chunk.value);
      }
      parser.reset({ consume: true });
    } finally {
      reader.releaseLock();
    }

    if (streamError) throw new Error(streamError);
    if (!completed || !samplesPlayed || pending.length) throw new Error('The spoken reply ended before the audio was complete.');
    await playback;
    signal?.throwIfAborted();
  } finally {
    signal?.removeEventListener('abort', abort);
    controller.abort();
    for (const source of sources) source.stop();
    await context.close();
  }
}