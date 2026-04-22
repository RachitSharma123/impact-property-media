import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Safe to use in client components — only uses NEXT_PUBLIC_ env vars
export const supabase = createClient(url, anon)
