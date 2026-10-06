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

  const declaredLength = Number(request.headers.get('content-length') ?? '0')
  if (declaredLength > 25 * 1024 * 1024) return json({ message: 'Voice recording is too large.' }, 413)

  const apiKey = Deno.env.get('LOVABLE_API_KEY')
  if (!apiKey) return json({ message: 'Voice input is not configured.' }, 500)

  try {
    const incoming = await request.formData()
    const file = incoming.get('file')
    if (!(file instanceof File) || !file.size || !file.type.startsWith('audio/')) {
      return json({ message: 'Record a complete voice message and try again.' }, 400)
    }

    const form = new FormData()
    form.append('model', 'openai/gpt-transcribe')
    form.append('file', file, file.name || 'survivalist-voice.wav')
    form.append('response_format', 'json')
    form.append('stream', 'true')
    form.append('prompt', 'Survival and emergency preparedness terminology. Return only the spoken transcript.')

    const upstream = await fetch('https://ai.gateway.lovable.dev/v1/audio/transcriptions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'X-Lovable-AIG-SDK': 'fetch' },
      body: form,
      signal: request.signal,
    })

    return new Response(upstream.body, {
      status: upstream.status,
      headers: {
        ...corsHeaders,
        'Content-Type': upstream.headers.get('Content-Type') ?? 'application/json',
        'Cache-Control': 'no-cache, no-store',
      },
    })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') return new Response(null, { status: 499, headers: corsHeaders })
    return json({ message: 'Voice transcription could not be completed.' }, 500)
  }
})