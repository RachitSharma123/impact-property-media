import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

const ALLOWED = ['leads', 'bookings', 'portfolio_items', 'testimonials', 'packages', 'posts', 'faqs', 'settings', 'site_content', 'services']

export async function GET(req: NextRequest) {
  const table = req.nextUrl.searchParams.get('table') as string
  if (!ALLOWED.includes(table)) return NextResponse.json({ error: 'forbidden' }, { status: 403 })

  let query = supabaseAdmin.from(table).select('*')
  if (table === 'leads') query = query.order('created_at', { ascending: false }) as any
  if (table === 'bookings') query = query.order('scheduled_at', { ascending: true }) as any
  if (table === 'portfolio_items') query = query.order('display_order') as any
  if (table === 'testimonials') query = query.order('created_at', { ascending: false }) as any
  if (table === 'packages') query = query.order('monthly_price') as any
  if (table === 'posts') query = query.order('created_at', { ascending: false }) as any
  if (table === 'faqs') query = query.order('display_order') as any
  if (table === 'services') query = query.order('display_order') as any
  if (table === 'site_content') query = query.order('key') as any

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const table = req.nextUrl.searchParams.get('table') as string
  if (!ALLOWED.includes(table)) return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  const body = await req.json()
  const { data, error } = await supabaseAdmin.from(table).insert(body).select()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data)
}

export async function PATCH(req: NextRequest) {
  const table = req.nextUrl.searchParams.get('table') as string
  const id = req.nextUrl.searchParams.get('id')
  if (!ALLOWED.includes(table)) return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  const body = await req.json()
  const idField = table === 'settings' ? 'id' : 'id'
  let query = supabaseAdmin.from(table).update(body)
  if (id) query = query.eq(idField, id) as any
  const { data, error } = await (query as any).select()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data)
}

export async function DELETE(req: NextRequest) {
  const table = req.nextUrl.searchParams.get('table') as string
  const id = req.nextUrl.searchParams.get('id')
  if (!ALLOWED.includes(table) || !id) return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  const { error } = await supabaseAdmin.from(table).delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ ok: true })
}
