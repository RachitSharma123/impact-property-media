'use client'
import { useEffect, useState } from 'react'

const api = (params = '') => `/api/admin/data?table=testimonials${params}`

export default function TestimonialsAdmin() {
  const [items, setItems] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ agent_name: '', agency: '', review_text: '', rating: 5 })

  useEffect(() => { load() }, [])
  async function load() { const r = await fetch(api()); setItems(await r.json()) }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await fetch(api(), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setShowForm(false); setForm({ agent_name: '', agency: '', review_text: '', rating: 5 }); load()
  }

  async function toggle(id: string, active: boolean) {
    await fetch(api(`&id=${id}`), { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ active: !active }) }); load()
  }

  async function del(id: string) {
    if (!confirm('Delete?')) return
    await fetch(api(`&id=${id}`), { method: 'DELETE' }); load()
  }

  const inp = { width: '100%', padding: '0.6rem 0.75rem', borderRadius: '0.4rem', border: '1px solid rgba(255,255,255,0.1)', background: '#222', color: '#f8f8f8', fontSize: '0.88rem', boxSizing: 'border-box' as const }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#f8f8f8', fontSize: '1.5rem', fontWeight: 700 }}>Testimonials</h1>
        <button onClick={() => setShowForm(v => !v)} style={{ background: '#bac6ff', color: '#111213', padding: '0.6rem 1.25rem', borderRadius: '0.5rem', border: 'none', fontWeight: 700, cursor: 'pointer' }}>+ Add</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: '#1a1a1a', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.06)', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {([['agent_name','Agent Name'],['agency','Agency'],['review_text','Review']] as [keyof typeof form, string][]).map(([k,label]) => (
            <div key={k}>
              <label style={{ color: '#888', fontSize: '0.78rem', display: 'block', marginBottom: '0.3rem' }}>{label}</label>
              {k === 'review_text'
                ? <textarea value={form[k] as string} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} rows={3} style={{ ...inp, resize: 'vertical' }} required />
                : <input value={form[k] as string} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} style={inp} required={k === 'agent_name'} />}
            </div>
          ))}
          <div>
            <label style={{ color: '#888', fontSize: '0.78rem', display: 'block', marginBottom: '0.3rem' }}>Rating</label>
            <input type="number" min={1} max={5} value={form.rating} onChange={e => setForm(f => ({ ...f, rating: Number(e.target.value) }))} style={{ ...inp, width: '80px' }} />
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button type="submit" style={{ background: '#bac6ff', color: '#111213', padding: '0.6rem 1.5rem', borderRadius: '0.5rem', border: 'none', fontWeight: 700, cursor: 'pointer' }}>Save</button>
            <button type="button" onClick={() => setShowForm(false)} style={{ background: 'transparent', color: '#666', padding: '0.6rem 1rem', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}>Cancel</button>
          </div>
        </form>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {items.map((t: any) => (
          <div key={t.id} style={{ background: '#1a1a1a', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <p style={{ color: '#f8f8f8', fontWeight: 600, marginBottom: '0.2rem' }}>{t.agent_name} <span style={{ color: '#666', fontWeight: 400 }}>· {t.agency}</span></p>
              <p style={{ color: '#aaa', fontSize: '0.88rem', marginBottom: '0.4rem' }}>{t.review_text}</p>
              <p style={{ color: '#fbbf24', fontSize: '0.85rem' }}>{'★'.repeat(t.rating)}</p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
              <button onClick={() => toggle(t.id, t.active)} style={{ background: t.active ? '#86efac22' : '#44444422', color: t.active ? '#86efac' : '#666', padding: '0.3rem 0.75rem', borderRadius: '100vw', border: 'none', cursor: 'pointer', fontSize: '0.8rem' }}>{t.active ? 'Active' : 'Hidden'}</button>
              <button onClick={() => del(t.id)} style={{ color: '#f87171', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem' }}>Del</button>
            </div>
          </div>
        ))}
        {!items.length && <p style={{ color: '#444' }}>No testimonials yet.</p>}
      </div>
    </div>
  )
}
