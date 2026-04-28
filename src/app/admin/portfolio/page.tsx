'use client'
import { useEffect, useState, useRef } from 'react'

const CATS = ['photography','videography','aerial','virtual-tours','floor-plans']

export default function PortfolioAdmin() {
  const [items, setItems] = useState<any[]>([])
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({ title: '', category: 'photography', featured: false })
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => { load() }, [])

  async function load() {
    const res = await fetch('/api/admin/data?table=portfolio_items')
    setItems(await res.json())
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault()
    const file = fileRef.current?.files?.[0]
    if (!file) return
    setUploading(true)

    // Upload to storage via API route
    const fd = new FormData()
    fd.append('file', file)
    fd.append('title', form.title)
    fd.append('category', form.category)
    fd.append('featured', String(form.featured))
    fd.append('display_order', String(items.length))

    await fetch('/api/admin/portfolio-upload', { method: 'POST', body: fd })
    setUploading(false)
    setForm({ title: '', category: 'photography', featured: false })
    if (fileRef.current) fileRef.current.value = ''
    load()
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this image?')) return
    await fetch(`/api/admin/data?table=portfolio_items&id=${id}`, { method: 'DELETE' })
    load()
  }

  async function toggleFeatured(id: string, current: boolean) {
    await fetch(`/api/admin/data?table=portfolio_items&id=${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ featured: !current }),
    })
    setItems(prev => prev.map(i => i.id === id ? { ...i, featured: !current } : i))
  }

  const inp = { padding: '0.6rem 0.75rem', borderRadius: '0.4rem', border: '1px solid rgba(255,255,255,0.1)', background: '#222', color: '#f8f8f8', fontSize: '0.88rem' }

  return (
    <div>
      <h1 style={{ color: '#f8f8f8', fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem' }}>Portfolio</h1>

      <form onSubmit={handleUpload} style={{ background: '#1a1a1a', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.06)', marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          <label style={{ color: '#888', fontSize: '0.78rem' }}>Title</label>
          <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} style={inp} placeholder="e.g. Toorak Villa" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          <label style={{ color: '#888', fontSize: '0.78rem' }}>Category</label>
          <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={inp}>
            {CATS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          <label style={{ color: '#888', fontSize: '0.78rem' }}>Image</label>
          <input ref={fileRef} type="file" accept="image/*" required style={{ ...inp, padding: '0.5rem' }} />
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#aaa', fontSize: '0.88rem', cursor: 'pointer' }}>
          <input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} /> Featured
        </label>
        <button type="submit" disabled={uploading} style={{ background: '#bac6ff', color: '#111213', padding: '0.6rem 1.5rem', borderRadius: '0.5rem', border: 'none', fontWeight: 700, cursor: uploading ? 'not-allowed' : 'pointer', opacity: uploading ? 0.7 : 1 }}>
          {uploading ? 'Uploading…' : 'Upload'}
        </button>
      </form>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {items.map((item: any) => (
          <div key={item.id} style={{ background: '#1a1a1a', borderRadius: '0.75rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
            <img src={item.image_url} alt={item.title} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
            <div style={{ padding: '0.75rem' }}>
              <p style={{ color: '#f8f8f8', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.25rem' }}>{item.title || 'Untitled'}</p>
              <p style={{ color: '#666', fontSize: '0.78rem', marginBottom: '0.5rem' }}>{item.category}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={!!item.featured}
                    onChange={() => toggleFeatured(item.id, !!item.featured)}
                  />
                  <span style={{ color: item.featured ? '#bac6ff' : '#666', fontSize: '0.8rem', fontWeight: item.featured ? 700 : 400 }}>
                    {item.featured ? '⭐ Featured' : 'Feature'}
                  </span>
                </label>
                <button onClick={() => handleDelete(item.id)} style={{ color: '#f87171', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', padding: 0 }}>Delete</button>
              </div>
            </div>
          </div>
        ))}
        {!items.length && <p style={{ color: '#444', gridColumn: '1/-1' }}>No images yet. Upload your first portfolio image above.</p>}
      </div>
    </div>
  )
}
