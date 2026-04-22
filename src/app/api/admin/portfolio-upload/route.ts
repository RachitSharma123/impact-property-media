import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const fd = await req.formData()
  const file = fd.get('file') as File
  const title = fd.get('title') as string
  const category = fd.get('category') as string
  const featured = fd.get('featured') === 'true'
  const display_order = Number(fd.get('display_order') || 0)

  const bytes = await file.arrayBuffer()
  const path = `${Date.now()}-${file.name}`

  const { data: uploadData, error } = await supabaseAdmin.storage
    .from('portfolio-images')
    .upload(path, bytes, { contentType: file.type })

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  const { data: { publicUrl } } = supabaseAdmin.storage
    .from('portfolio-images')
    .getPublicUrl(uploadData.path)

  const { error: dbError } = await supabaseAdmin
    .from('portfolio_items')
    .insert({ title, category, featured, display_order, image_url: publicUrl })

  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 400 })
  return NextResponse.json({ ok: true })
}
