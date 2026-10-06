import { createParser } from 'eventsource-parser';
import { flushSync } from 'react-dom';

type ImagePayload = { type?: string; b64_json?: string; error?: { message?: string } };

export async function streamImage(
  endpoint: string,
  prompt: string,
  headers: HeadersInit,
  onFrame: (dataUrl: string, isFinal: boolean) => void,
  signal?: AbortSignal,
) {
  const send = (stream: boolean) => fetch(endpoint, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, stream }),
    signal: signal ?? null,
  });

  const response = await send(true);
  if (!response.ok || !response.body) {
    const body = await response.text().catch(() => '');
    throw new Error(body || `Infographic generation failed (${response.status}).`);
  }

  let sawCompleted = false;
  let sawAnyEvent = false;
  let streamError = '';
  const parser = createParser({
    onEvent(event) {
      let payload: ImagePayload | undefined;
      try {
        payload = JSON.parse(event.data) as ImagePayload;
      } catch {
        return;
      }
      if (event.event === 'error' || payload.type === 'error') {
        sawAnyEvent = true;
        streamError = payload.error?.message ?? 'Infographic generation failed.';
        return;
      }
      const type = event.event || payload.type;
      if (type !== 'image_generation.partial_image' && type !== 'image_generation.completed') return;
      sawAnyEvent = true;
      if (!payload.b64_json) {
        streamError = 'The infographic response contained no image.';
        return;
      }
      const isFinal = type === 'image_generation.completed';
      flushSync(() => onFrame(`data:image/png;base64,${payload?.b64_json}`, isFinal));
      if (isFinal) sawCompleted = true;
    },
  });

  const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
  try {
    while (true) {
      let chunk: ReadableStreamReadResult<string>;
      try {
        chunk = await reader.read();
      } catch (error) {
        if (signal?.aborted || sawAnyEvent || (error instanceof Error && error.name === 'AbortError')) throw error;
        break;
      }
      if (chunk.done) break;
      parser.feed(chunk.value);
    }
    parser.reset({ consume: true });
  } finally {
    await reader.cancel().catch(() => undefined);
  }

  signal?.throwIfAborted();
  if (streamError) throw new Error(streamError);
  if (!sawAnyEvent) {
    const replay = await send(false);
    if (!replay.ok) throw new Error(await replay.text().catch(() => 'Infographic generation failed.'));
    const json = await replay.json() as { data?: { b64_json?: string }[]; message?: string };
    const image = json.data?.[0]?.b64_json;
    if (!image) throw new Error(json.message ?? 'Infographic generation returned no image.');
    onFrame(`data:image/png;base64,${image}`, true);
    return;
  }
  if (!sawCompleted) throw new Error('Infographic generation ended before the final image arrived.');
}