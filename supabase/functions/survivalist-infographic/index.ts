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
  if (!apiKey) return json({ message: 'Infographic generation is not configured.' }, 500)

  try {
    const payload = await request.json()
    const userPrompt = typeof payload?.prompt === 'string' ? payload.prompt.trim() : ''
    const stream = payload?.stream !== false
    if (!userPrompt) return json({ message: 'Describe the survival infographic you need.' }, 400)

    const prompt = `Create a premium field-manual survival infographic about: "${userPrompt}". Use a highly legible hierarchy, concise steps, simple icons, strong contrast, dark charcoal and safety green with amber warning accents. Include only lawful, defensive, life-preserving preparedness information. Avoid decorative clutter. Spell all visible text correctly. Add a small AIWebTools emblem-style label in the bottom-right corner. Portrait 3:4 composition suitable for a phone.`
    const body: Record<string, unknown> = {
      model: 'openai/gpt-image-2.5-sunburst',
      prompt,
      size: '1024x1536',
      quality: 'medium',
      stream,
    }
    if (stream) body.partial_images = 1

    const upstream = await fetch('https://ai.gateway.lovable.dev/v1/images/generations', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json', 'X-Lovable-AIG-SDK': 'fetch' },
      body: JSON.stringify(body),
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
    return json({ message: 'Infographic generation could not be completed.' }, 500)
  }
})