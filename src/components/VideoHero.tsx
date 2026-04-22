import { supabaseAdmin } from '@/lib/supabase'
import VideoHeroClient from './VideoHeroClient'

const DEFAULTS = {
  hero_label: "Melbourne's Premier Property Media",
  hero_heading: "We Make Properties\nUnforgettable.",
  hero_subtext: 'Cinematic photography & video that sells properties faster.',
  hero_video_url: 'https://assets.mixkit.co/videos/48394/48394-720.mp4',
  hero_btn1_text: 'Book a Shoot',
  hero_btn1_href: '#contact',
  hero_btn2_text: 'View Our Work',
  hero_btn2_href: '#portfolio',
}

export default async function VideoHero() {
  let content: Record<string, string> = { ...DEFAULTS }

  try {
    const { data } = await supabaseAdmin
      .from('site_content')
      .select('key, value')
      .in('key', Object.keys(DEFAULTS))

    if (data) {
      data.forEach(row => {
        content[row.key] = row.value
      })
    }
  } catch {
    // fall back to defaults
  }

  return (
    <VideoHeroClient
      label={content.hero_label}
      heading={content.hero_heading}
      subtext={content.hero_subtext}
      videoUrl={content.hero_video_url}
      btn1Text={content.hero_btn1_text}
      btn1Href={content.hero_btn1_href}
      btn2Text={content.hero_btn2_text}
      btn2Href={content.hero_btn2_href}
    />
  )
}
