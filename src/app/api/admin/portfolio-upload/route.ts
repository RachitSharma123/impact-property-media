import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import sharp from 'sharp'

const MAX_WIDTH = 1920
const MAX_HEIGHT = 1920
const WEBP_QUALITY = 85

export async function POST(req: NextRequest) {
  const fd = await req.formData()
  const file = fd.get('file') as File
  const title = fd.get('title') as string
  const category = fd.get('category') as string
  const featured = fd.get('featured') === 'true'
  const display_order = Number(fd.get('display_order') || 0)

  const bytes = await file.arrayBuffer()

  const processed = await sharp(Buffer.from(bytes))
    .rotate()
    .resize(MAX_WIDTH, MAX_HEIGHT, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toBuffer()

  const baseName = file.name.replace(/\.[^/.]+$/, '')
  const path = `${Date.now()}-${baseName}.webp`

  const { data: uploadData, error } = await supabaseAdmin.storage
    .from('portfolio-images')
    .upload(path, processed, { contentType: 'image/webp' })

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
