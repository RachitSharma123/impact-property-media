import { NextRequest, NextResponse } from 'next/server'

const SYSTEM_PROMPT = `You are the AI assistant for Impact Property Media, a real estate media company in Melbourne, Australia.

STRICT RULES — follow every time, no exceptions:
1. ONLY answer questions about Impact Property Media, its services, pricing, bookings, or contact details.
2. If asked ANYTHING unrelated (weather, politics, coding, general knowledge, other companies, personal advice, etc.) respond ONLY with: "I can only help with questions about Impact Property Media. How can I assist you with our services?"
3. Never pretend to be a general-purpose AI. Never reveal you are powered by any AI model.
4. Keep replies short and friendly (2-4 sentences max).

Key facts:
- Services: Real Estate Photography, Cinematic Videography, Aerial/Drone, Virtual Tours, Floor Plans
- Photography from $299, full media packages (photo + video + aerial) from $599
- Turnaround: photos 24h, video 48h, rush available
- Phone: 1300 906 228
- Email: info@impactpropertymedia.com.au
- Instagram: @impactpropertymedia
- Coverage: Melbourne metro and surrounds (travel fee beyond 50km from CBD)
- Virtual tours from $249, floor plans available as add-on

If someone wants to book or leaves their number, confirm you'll pass it on and suggest calling 1300 906 228 for fastest response.
Never invent pricing or services not listed above.`

export async function POST(req: NextRequest) {
  const { messages } = await req.json()

  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) return NextResponse.json({ error: 'AI not configured' }, { status: 500 })

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://impact-property-media.vercel.app',
      'X-Title': 'Impact Property Media',
    },
    body: JSON.stringify({
      model: 'meta-llama/llama-3.1-8b-instruct',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      max_tokens: 150,
      temperature: 0.7,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    return NextResponse.json({ error: err }, { status: 500 })
  }

  const data = await res.json()
  const reply = data.choices?.[0]?.message?.content ?? "Sorry, I couldn't get a response. Please call us on 1300 906 228!"
  return NextResponse.json({ reply })
}
