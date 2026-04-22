'use client'
import { useEffect, useState } from 'react'

export default function FAQsAdmin() {
  const [faqs, setFaqs] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ question: '', answer: '', display_order: 0 })

  useEffect(() => { load() }, [])
  async function load() {
    const r = await fetch('/api/admin/data?table=faqs')
    setFaqs(await r.json())
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await fetch('/api/admin/data?table=faqs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, display_order: faqs.length }) })
    setShowForm(false)
    setForm({ question: '', answer: '', display_order: 0 })
    load()
  }

  async function del(id: string) {
    if (!confirm('Delete?')) return
    await fetch(`/api/admin/data?table=faqs&id=${id}`, { method: 'DELETE' })
    load()
  }

  const inputStyle = { width: '100%', padding: '0.6rem 0.75rem', borderRadius: '0.4rem', border: '1px solid rgba(255,255,255,0.1)', background: '#222', color: '#f8f8f8', fontSize: '0.88rem', boxSizing: 'border-box' as const }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#f8f8f8', fontSize: '1.5rem', fontWeight: 700 }}>FAQs</h1>
        <button onClick={() => setShowForm(v => !v)} style={{ background: '#bac6ff', color: '#111213', padding: '0.6rem 1.25rem', borderRadius: '0.5rem', border: 'none', fontWeight: 700, cursor: 'pointer' }}>+ Add FAQ</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: '#1a1a1a', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.06)', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ color: '#888', fontSize: '0.78rem', display: 'block', marginBottom: '0.3rem' }}>Question</label>
            <input value={form.question} onChange={e => setForm(f => ({ ...f, question: e.target.value }))} style={inputStyle} required />
          </div>
          <div>
            <label style={{ color: '#888', fontSize: '0.78rem', display: 'block', marginBottom: '0.3rem' }}>Answer</label>
            <textarea value={form.answer} onChange={e => setForm(f => ({ ...f, answer: e.target.value }))} rows={3} style={{ ...inputStyle, resize: 'vertical' }} required />
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button type="submit" style={{ background: '#bac6ff', color: '#111213', padding: '0.6rem 1.5rem', borderRadius: '0.5rem', border: 'none', fontWeight: 700, cursor: 'pointer' }}>Save</button>
            <button type="button" onClick={() => setShowForm(false)} style={{ background: 'transparent', color: '#666', padding: '0.6rem 1rem', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}>Cancel</button>
          </div>
        </form>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {faqs.map((faq: any, i: number) => (
          <div key={faq.id} style={{ background: '#1a1a1a', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <p style={{ color: '#f8f8f8', fontWeight: 600 }}>#{i + 1} {faq.question}</p>
              <button onClick={() => del(faq.id)} style={{ color: '#f87171', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', flexShrink: 0 }}>Del</button>
            </div>
            <p style={{ color: '#aaa', fontSize: '0.88rem' }}>{faq.answer}</p>
          </div>
        ))}
        {!faqs.length && <p style={{ color: '#444' }}>No FAQs yet.</p>}
      </div>
    </div>
  )
}
