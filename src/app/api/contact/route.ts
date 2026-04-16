import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    // body shape: { name, email, phone, suburb, services, message, source }
    // source is either 'contact_form' or 'chatbot'

    const webhookUrl = process.env.N8N_WEBHOOK_URL
    if (!webhookUrl) {
      console.error('N8N_WEBHOOK_URL not set')
      return NextResponse.json({ ok: true }) // fail silently to user
    }

    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...body,
        timestamp: new Date().toISOString(),
        site: 'Impact Property Media',
      }),
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Webhook error:', err)
    return NextResponse.json({ ok: true }) // always return ok to user
  }
}
