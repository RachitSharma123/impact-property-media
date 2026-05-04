'use client'
import { useEffect, useState } from 'react'

export default function SettingsAdmin() {
  const [form, setForm] = useState<any>({})
  const [saved, setSaved] = useState(false)
  const [fetchingChatId, setFetchingChatId] = useState(false)
  const [chatIdMsg, setChatIdMsg] = useState('')

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

  async function autoFetchChatId() {
    const token = form.telegram_bot_token?.trim()
    if (!token) { setChatIdMsg('Enter bot token first'); return }
    setFetchingChatId(true)
    setChatIdMsg('')
    try {
      const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates`)
      const data = await res.json()
      const updates = data.result || []
      const chatId = updates[0]?.message?.chat?.id
        ?? updates[0]?.channel_post?.chat?.id
        ?? updates[0]?.my_chat_member?.chat?.id
      if (chatId) {
        setForm((f: any) => ({ ...f, telegram_chat_id: String(chatId) }))
        setChatIdMsg(`✓ Found chat ID: ${chatId}`)
      } else {
        setChatIdMsg('No messages found. Send a message to your bot first, then try again.')
      }
    } catch {
      setChatIdMsg('Failed to reach Telegram API')
    } finally {
      setFetchingChatId(false)
    }
  }

  const inputStyle = { width: '100%', padding: '0.6rem 0.75rem', borderRadius: '0.4rem', border: '1px solid rgba(255,255,255,0.1)', background: '#222', color: '#f8f8f8', fontSize: '0.88rem', boxSizing: 'border-box' as const }

  const fields = [
    ['business_name', 'Business Name', 'text'],
    ['phone', 'Phone', 'text'],
    ['email', 'Email', 'email'],
    ['address', 'Address', 'text'],
    ['instagram_url', 'Instagram URL', 'text'],
    ['facebook_url', 'Facebook URL', 'text'],
  ]

  return (
    <div>
      <h1 style={{ color: '#f8f8f8', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Settings</h1>
      <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '2rem' }}>Phone and email here update everywhere on the site.</p>
      <form onSubmit={handleSave} style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

        {fields.map(([key, label, type]) => (
          <div key={key}>
            <label style={{ color: '#888', fontSize: '0.78rem', display: 'block', marginBottom: '0.3rem' }}>{label}</label>
            <input value={form[key] ?? ''} onChange={e => setForm((f: any) => ({ ...f, [key]: e.target.value }))} style={inputStyle} type={type} />
          </div>
        ))}

        {/* Telegram section */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.25rem' }}>
          <p style={{ color: '#bac6ff', fontSize: '0.8rem', fontWeight: 700, marginBottom: '1rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Telegram Notifications</p>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#888', fontSize: '0.78rem', display: 'block', marginBottom: '0.3rem' }}>Bot Token</label>
            <input
              value={form.telegram_bot_token ?? ''}
              onChange={e => setForm((f: any) => ({ ...f, telegram_bot_token: e.target.value }))}
              style={inputStyle}
              type="text"
              placeholder="123456:ABC-DEF..."
            />
          </div>

          <div>
            <label style={{ color: '#888', fontSize: '0.78rem', display: 'block', marginBottom: '0.3rem' }}>Chat ID</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                value={form.telegram_chat_id ?? ''}
                onChange={e => setForm((f: any) => ({ ...f, telegram_chat_id: e.target.value }))}
                style={{ ...inputStyle, flex: 1 }}
                type="text"
                placeholder="Auto-detected or paste manually"
                readOnly
              />
              <button
                type="button"
                onClick={autoFetchChatId}
                disabled={fetchingChatId}
                style={{ background: '#2a2a2a', border: '1px solid rgba(255,255,255,0.12)', color: '#f8f8f8', borderRadius: '0.4rem', padding: '0 1rem', fontSize: '0.82rem', fontWeight: 600, cursor: fetchingChatId ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap', opacity: fetchingChatId ? 0.6 : 1 }}
              >
                {fetchingChatId ? 'Fetching…' : 'Auto-detect'}
              </button>
            </div>
            {chatIdMsg && (
              <p style={{ fontSize: '0.78rem', marginTop: '0.4rem', color: chatIdMsg.startsWith('✓') ? '#4ade80' : '#f87171' }}>{chatIdMsg}</p>
            )}
            <p style={{ fontSize: '0.75rem', color: '#555', marginTop: '0.4rem' }}>Send any message to your bot first, then click Auto-detect.</p>
          </div>
        </div>

        <button type="submit" style={{ background: saved ? '#86efac' : '#bac6ff', color: '#111213', padding: '0.75rem 2rem', borderRadius: '0.5rem', border: 'none', fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s', width: 'fit-content' }}>
          {saved ? '✓ Saved' : 'Save Settings'}
        </button>
      </form>
    </div>
  )
}
