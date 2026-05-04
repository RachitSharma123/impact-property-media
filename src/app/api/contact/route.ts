import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, service, message, source } = body

    const text = `🏠 <b>New Lead — Impact Property Media</b>\n\n👤 <b>Name:</b> ${name}\n📞 <b>Phone:</b> ${phone || 'N/A'}\n📧 <b>Email:</b> ${email}\n🔧 <b>Service:</b> ${service || 'N/A'}\n💬 <b>Message:</b> ${message || 'N/A'}\n📌 <b>Source:</b> ${source || 'website'}`

    const [tgRes] = await Promise.all([
      fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: 'HTML' }),
      }),
      supabaseAdmin.from('leads').insert({ name, email, phone, service, message, source: source || 'website' }),
    ])
    const tgJson = await tgRes.json()
    console.log('Telegram response:', JSON.stringify(tgJson))

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Lead capture error:', err)
    return NextResponse.json({ ok: true })
  }
}
