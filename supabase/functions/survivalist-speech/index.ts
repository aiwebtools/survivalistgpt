const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

function json(data: unknown, status: number) {
  return new Response(JSON.stringify(data), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (request.method !== 'POST') return json({ message: 'Method not allowed.' }, 405)

  const apiKey = Deno.env.get('LOVABLE_API_KEY')
  if (!apiKey) return json({ message: 'Spoken replies are not configured.' }, 500)

  try {
    const payload = await request.json()
    const text = typeof payload?.text === 'string' ? payload.text.trim().slice(0, 12000) : ''
    if (!text) return json({ message: 'There is no answer to read aloud.' }, 400)

    const upstream = await fetch('https://ai.gateway.lovable.dev/v1/audio/speech', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'X-Lovable-AIG-SDK': 'fetch',
      },
      body: JSON.stringify({
        model: 'google/gemini-3.1-flash-tts-preview',
        contents: [{ role: 'user', parts: [{ text: `Speak in a calm, capable, natural field-instructor voice: ${text}` }] }],
        generationConfig: {
          responseModalities: ['AUDIO'],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
        },
        stream_format: 'sse',
      }),
      signal: request.signal,
    })

    return new Response(upstream.body, {
      status: upstream.status,
      headers: {
        ...corsHeaders,
        'Content-Type': upstream.headers.get('Content-Type') ?? 'text/event-stream',
        'Cache-Control': 'no-cache, no-store',
      },
    })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') return new Response(null, { status: 499, headers: corsHeaders })
    return json({ message: 'Spoken reply could not be created.' }, 500)
  }
})