'use client'

import { useEffect, useState } from 'react'

type ContentMap = Record<string, string>

const INPUT_STYLE: React.CSSProperties = {
  width: '100%',
  background: '#232325',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '0.5rem',
  color: '#f8f8f8',
  padding: '0.6rem 0.8rem',
  fontSize: '0.875rem',
  fontFamily: 'system-ui, sans-serif',
  outline: 'none',
  boxSizing: 'border-box',
}

const TEXTAREA_STYLE: React.CSSProperties = {
  ...INPUT_STYLE,
  resize: 'vertical',
  minHeight: '80px',
}

const LABEL_STYLE: React.CSSProperties = {
  display: 'block',
  fontSize: '0.7rem',
  fontWeight: 700,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.1em',
  color: '#888',
  marginBottom: '0.35rem',
}

const SECTION_STYLE: React.CSSProperties = {
  background: '#1a1a1a',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: '0.75rem',
  padding: '1.5rem',
  marginBottom: '1.5rem',
}

const SAVE_BTN: React.CSSProperties = {
  marginTop: '1.25rem',
  padding: '0.6rem 1.5rem',
  background: '#bac6ff',
  color: '#1f1e1f',
  border: 'none',
  borderRadius: '0.5rem',
  fontWeight: 700,
  fontSize: '0.875rem',
  cursor: 'pointer',
}

const FIELD_WRAP: React.CSSProperties = { marginBottom: '1rem' }

function Field({
  label, fieldKey, content, onChange, multiline
}: { label: string; fieldKey: string; content: ContentMap; onChange: (k: string, v: string) => void; multiline?: boolean }) {
  return (
    <div style={FIELD_WRAP}>
      <label style={LABEL_STYLE}>{label}</label>
      {multiline ? (
        <textarea
          style={TEXTAREA_STYLE}
          value={content[fieldKey] ?? ''}
          onChange={e => onChange(fieldKey, e.target.value)}
        />
      ) : (
        <input
          style={INPUT_STYLE}
          type="text"
          value={content[fieldKey] ?? ''}
          onChange={e => onChange(fieldKey, e.target.value)}
        />
      )}
    </div>
  )
}

export default function ContentPage() {
  const [content, setContent] = useState<ContentMap>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [toast, setToast] = useState('')

  useEffect(() => {
    fetch('/api/admin/content')
      .then(r => r.json())
      .then((rows: { key: string; value: string }[]) => {
        const map: ContentMap = {}
        rows.forEach(r => { map[r.key] = r.value })
        setContent(map)
        setLoading(false)
      })
  }, [])

  function update(k: string, v: string) {
    setContent(prev => ({ ...prev, [k]: v }))
  }

  async function save(section: string, keys: string[]) {
    setSaving(section)
    const pairs = keys.map(k => ({ key: k, value: content[k] ?? '' }))
    const res = await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pairs),
    })
    setSaving(null)
    if (res.ok) {
      setToast(`${section} saved!`)
      setTimeout(() => setToast(''), 3000)
    } else {
      const d = await res.json()
      setToast(`Error: ${d.error}`)
      setTimeout(() => setToast(''), 5000)
    }
  }

  if (loading) return <div style={{ color: '#888', padding: '2rem' }}>Loading content...</div>

  return (
    <div style={{ maxWidth: '860px' }}>
      <h1 style={{ color: '#f8f8f8', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Content Editor</h1>
      <p style={{ color: '#888', fontSize: '0.875rem', marginBottom: '2rem' }}>Edit all frontend content. Changes go live on next page load.</p>

      {toast && (
        <div style={{ background: '#bac6ff', color: '#1f1e1f', padding: '0.75rem 1.25rem', borderRadius: '0.5rem', marginBottom: '1.5rem', fontWeight: 600, fontSize: '0.875rem' }}>
          {toast}
        </div>
      )}

      {/* Hero Section */}
      <div style={SECTION_STYLE}>
        <h2 style={{ color: '#bac6ff', fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Hero Section</h2>
        <Field label="Label (top tag)" fieldKey="hero_label" content={content} onChange={update} />
        <Field label="Heading" fieldKey="hero_heading" content={content} onChange={update} multiline />
        <Field label="Subtext" fieldKey="hero_subtext" content={content} onChange={update} />
        <Field label="Video URL" fieldKey="hero_video_url" content={content} onChange={update} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Field label="Button 1 Text" fieldKey="hero_btn1_text" content={content} onChange={update} />
          <Field label="Button 1 Link" fieldKey="hero_btn1_href" content={content} onChange={update} />
          <Field label="Button 2 Text" fieldKey="hero_btn2_text" content={content} onChange={update} />
          <Field label="Button 2 Link" fieldKey="hero_btn2_href" content={content} onChange={update} />
        </div>
        <button
          style={{ ...SAVE_BTN, opacity: saving === 'Hero' ? 0.6 : 1 }}
          onClick={() => save('Hero', ['hero_label','hero_heading','hero_subtext','hero_video_url','hero_btn1_text','hero_btn1_href','hero_btn2_text','hero_btn2_href'])}
          disabled={saving === 'Hero'}
        >
          {saving === 'Hero' ? 'Saving...' : 'Save Hero'}
        </button>
      </div>

      {/* About Section */}
      <div style={SECTION_STYLE}>
        <h2 style={{ color: '#bac6ff', fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>About Section</h2>
        <Field label="Heading" fieldKey="about_heading" content={content} onChange={update} />
        <Field label="Body Paragraph 1" fieldKey="about_body1" content={content} onChange={update} multiline />
        <Field label="Body Paragraph 2" fieldKey="about_body2" content={content} onChange={update} multiline />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem' }}>
          <Field label="Stat 1 Value" fieldKey="about_stat1_value" content={content} onChange={update} />
          <Field label="Stat 1 Label" fieldKey="about_stat1_label" content={content} onChange={update} />
          <Field label="Stat 2 Value" fieldKey="about_stat2_value" content={content} onChange={update} />
          <Field label="Stat 2 Label" fieldKey="about_stat2_label" content={content} onChange={update} />
        </div>
        <Field label="Image URL" fieldKey="about_image_url" content={content} onChange={update} />
        <Field label="Badge Text" fieldKey="about_badge" content={content} onChange={update} />
        <button
          style={{ ...SAVE_BTN, opacity: saving === 'About' ? 0.6 : 1 }}
          onClick={() => save('About', ['about_heading','about_body1','about_body2','about_stat1_value','about_stat1_label','about_stat2_value','about_stat2_label','about_image_url','about_badge'])}
          disabled={saving === 'About'}
        >
          {saving === 'About' ? 'Saving...' : 'Save About'}
        </button>
      </div>

      {/* CTA Section */}
      <div style={SECTION_STYLE}>
        <h2 style={{ color: '#bac6ff', fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>CTA Section</h2>
        <Field label="Big Stat Number" fieldKey="cta_stat" content={content} onChange={update} />
        <Field label="Stat Label" fieldKey="cta_stat_label" content={content} onChange={update} />
        <Field label="Subtext" fieldKey="cta_subtext" content={content} onChange={update} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Field label="Button Text" fieldKey="cta_btn_text" content={content} onChange={update} />
          <Field label="Button Link" fieldKey="cta_btn_href" content={content} onChange={update} />
        </div>
        <button
          style={{ ...SAVE_BTN, opacity: saving === 'CTA' ? 0.6 : 1 }}
          onClick={() => save('CTA', ['cta_stat','cta_stat_label','cta_subtext','cta_btn_text','cta_btn_href'])}
          disabled={saving === 'CTA'}
        >
          {saving === 'CTA' ? 'Saving...' : 'Save CTA'}
        </button>
      </div>

      {/* LogoBar Section */}
      <div style={SECTION_STYLE}>
        <h2 style={{ color: '#bac6ff', fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Logo Bar (Agency Names)</h2>
        <Field label="Agencies (comma-separated)" fieldKey="logobar_agencies" content={content} onChange={update} multiline />
        <button
          style={{ ...SAVE_BTN, opacity: saving === 'LogoBar' ? 0.6 : 1 }}
          onClick={() => save('LogoBar', ['logobar_agencies'])}
          disabled={saving === 'LogoBar'}
        >
          {saving === 'LogoBar' ? 'Saving...' : 'Save Logo Bar'}
        </button>
      </div>
    </div>
  )
}
