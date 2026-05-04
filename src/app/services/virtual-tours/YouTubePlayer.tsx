'use client'
import { useState } from 'react'

const VIDEO_ID = '' // paste YouTube video ID here e.g. 'dQw4w9WgXcQ'

export default function YouTubePlayer() {
  const [muted, setMuted] = useState(true)

  if (!VIDEO_ID) return null

  const src = `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=${muted ? 1 : 0}&loop=1&playlist=${VIDEO_ID}&controls=1&rel=0&modestbranding=1`

  return (
    <section style={{ background: '#111', padding: '5rem 2rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', color: '#f8f8f8', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 700, marginBottom: '0.5rem' }}>
          See It In Action
        </h2>
        <p style={{ textAlign: 'center', color: '#ffffff88', fontSize: '1rem', marginBottom: '2rem' }}>
          A walkthrough of what a virtual tour experience looks like for buyers.
        </p>
        <div style={{ position: 'relative', borderRadius: '1rem', overflow: 'hidden', aspectRatio: '16/9', background: '#000' }}>
          <iframe
            key={String(muted)}
            src={src}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <button
            onClick={() => setMuted(m => !m)}
            style={{
              background: muted ? '#2a2a2a' : '#bac6ff',
              color: muted ? '#888' : '#111',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '100vw',
              padding: '0.5rem 1.4rem',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            {muted ? '🔇 Unmute' : '🔊 Mute'}
          </button>
        </div>
      </div>
    </section>
  )
}
