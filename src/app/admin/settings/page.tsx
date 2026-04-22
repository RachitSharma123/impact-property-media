'use client'
import { useEffect, useState } from 'react'

export default function SettingsAdmin() {
  const [form, setForm] = useState<any>({})
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/admin/data?table=settings').then(r => r.json()).then(data => {
      if (Array.isArray(data) && data[0]) setForm(data[0])
    })
  }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    const { id, ...rest } = form
    if (id) {
      await fetch(`/api/admin/data?table=settings&id=${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(rest) })
    } else {
      await fetch('/api/admin/data?table=settings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(rest) })
    }
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const fields = [
    ['business_name', 'Business Name'],
    ['phone', 'Phone'],
    ['email', 'Email'],
    ['address', 'Address'],
    ['telegram_bot_token', 'Telegram Bot Token'],
    ['telegram_chat_id', 'Telegram Chat ID'],
    ['instagram_url', 'Instagram URL'],
    ['facebook_url', 'Facebook URL'],
  ]

  const inputStyle = { width: '100%', padding: '0.6rem 0.75rem', borderRadius: '0.4rem', border: '1px solid rgba(255,255,255,0.1)', background: '#222', color: '#f8f8f8', fontSize: '0.88rem', boxSizing: 'border-box' as const }

  return (
    <div>
      <h1 style={{ color: '#f8f8f8', fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem' }}>Settings</h1>
      <form onSubmit={handleSave} style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {fields.map(([key, label]) => (
          <div key={key}>
            <label style={{ color: '#888', fontSize: '0.78rem', display: 'block', marginBottom: '0.3rem' }}>{label}</label>
            <input
              value={form[key] ?? ''}
              onChange={e => setForm((f: any) => ({ ...f, [key]: e.target.value }))}
              style={inputStyle}
              type={key === 'email' ? 'email' : 'text'}
            />
          </div>
        ))}
        <button type="submit" style={{ background: saved ? '#86efac' : '#bac6ff', color: '#111213', padding: '0.75rem 2rem', borderRadius: '0.5rem', border: 'none', fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s', width: 'fit-content' }}>
          {saved ? '✓ Saved' : 'Save Settings'}
        </button>
      </form>
    </div>
  )
}
