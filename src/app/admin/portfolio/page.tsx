'use client'
import { useEffect, useState, useRef } from 'react'

const CATS = ['photography','videography','aerial','virtual-tours','floor-plans']
const CAT_LABELS: Record<string,string> = {
  'photography': 'Photography',
  'videography': 'Videography',
  'aerial': 'Aerial',
  'virtual-tours': 'Virtual Tours',
  'floor-plans': 'Floor Plans',
}

export default function PortfolioAdmin() {
  const [items, setItems] = useState<any[]>([])
  const [uploading, setUploading] = useState(false)
  const [bulkProgress, setBulkProgress] = useState<{ done: number; total: number } | null>(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [form, setForm] = useState({ title: '', category: 'photography', featured: false })
  const [activeTab, setActiveTab] = useState<string>('all')
  const [saving, setSaving] = useState(false)
  const [dragId, setDragId] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const bulkRef = useRef<HTMLInputElement>(null)

  useEffect(() => { load() }, [])

  async function load() {
    const res = await fetch('/api/admin/data?table=portfolio_items')
    const data = await res.json()
    if (Array.isArray(data)) setItems(data)
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault()
    const file = fileRef.current?.files?.[0]
    if (!file) return
    setError(''); setSuccess(''); setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    fd.append('title', form.title)
    fd.append('category', form.category)
    fd.append('featured', String(form.featured))
    fd.append('display_order', String(items.length))
    try {
      const res = await fetch('/api/admin/portfolio-upload', { method: 'POST', body: fd })
      const json = await res.json()
      if (!res.ok) { setError(json.error || `Upload failed (${res.status})`) }
      else {
        setSuccess('Image uploaded!')
        setForm({ title: '', category: 'photography', featured: false })
        if (fileRef.current) fileRef.current.value = ''
        load()
      }
    } catch (err: any) { setError(err.message || 'Network error') }
    finally { setUploading(false) }
  }

  async function handleBulkUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setError(''); setSuccess('')
    setBulkProgress({ done: 0, total: files.length })
    let failed = 0
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const title = file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')
      const fd = new FormData()
      fd.append('file', file)
      fd.append('title', title)
      fd.append('category', form.category)
      fd.append('featured', 'false')
      fd.append('display_order', String(items.length + i))
      try {
        const res = await fetch('/api/admin/portfolio-upload', { method: 'POST', body: fd })
        if (!res.ok) failed++
      } catch { failed++ }
      setBulkProgress({ done: i + 1, total: files.length })
    }
    if (bulkRef.current) bulkRef.current.value = ''
    setBulkProgress(null)
    if (failed) setError(`${failed} of ${files.length} files failed`)
    else setSuccess(`${files.length} images uploaded!`)
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

  async function changeCategory(id: string, category: string) {
    await fetch(`/api/admin/data?table=portfolio_items&id=${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category }),
    })
    setItems(prev => prev.map(i => i.id === id ? { ...i, category } : i))
  }

  async function saveOrder(orderedItems: any[]) {
    setSaving(true)
    await Promise.all(orderedItems.map((item, idx) =>
      fetch(`/api/admin/data?table=portfolio_items&id=${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ display_order: idx }),
      })
    ))
    setSaving(false)
    setSuccess('Order saved!')
    setTimeout(() => setSuccess(''), 2000)
  }

  function onDragStart(id: string) { setDragId(id) }
  function onDragOver(e: React.DragEvent, targetId: string) {
    e.preventDefault()
    if (!dragId || dragId === targetId) return
    setItems(prev => {
      const arr = [...prev]
      const fromIdx = arr.findIndex(i => i.id === dragId)
      const toIdx = arr.findIndex(i => i.id === targetId)
      const [moved] = arr.splice(fromIdx, 1)
      arr.splice(toIdx, 0, moved)
      return arr
    })
  }
  function onDrop() {
    if (!dragId) return
    setDragId(null)
    saveOrder(items)
  }

  const inp: React.CSSProperties = { padding: '0.6rem 0.75rem', borderRadius: '0.4rem', border: '1px solid rgba(255,255,255,0.1)', background: '#222', color: '#f8f8f8', fontSize: '0.88rem' }

  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  const newIds = new Set(items.filter(i => i.created_at > cutoff).map((i: any) => i.id))

  const tabItems = activeTab === 'all' ? items
    : activeTab === 'featured' ? items.filter(i => i.featured)
    : activeTab === 'new' ? items.filter(i => newIds.has(i.id))
    : items.filter(i => i.category === activeTab)

  const catCounts: Record<string, number> = {}
  for (const cat of CATS) catCounts[cat] = items.filter(i => i.category === cat).length

  const tabs = [
    { id: 'all', label: `All (${items.length})` },
    { id: 'new', label: `🆕 New (${newIds.size})` },
    { id: 'featured', label: `⭐ Featured (${items.filter(i=>i.featured).length})` },
    ...CATS.map(c => ({ id: c, label: `${CAT_LABELS[c]} (${catCounts[c]})` })),
  ]

  return (
    <div>
      <h1 style={{ color: '#f8f8f8', fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>Portfolio</h1>

      {/* Upload form */}
      <form onSubmit={handleUpload} style={{ background: '#1a1a1a', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.06)', marginBottom: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          <label style={{ color: '#888', fontSize: '0.78rem' }}>Title</label>
          <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} style={inp} placeholder="e.g. Toorak Villa" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          <label style={{ color: '#888', fontSize: '0.78rem' }}>Category</label>
          <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={inp}>
            {CATS.map(c => <option key={c} value={c}>{CAT_LABELS[c]}</option>)}
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

      {/* Bulk upload */}
      <div style={{ background: '#1a1a1a', borderRadius: '0.75rem', padding: '1rem 1.5rem', border: '1px solid rgba(255,255,255,0.06)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <span style={{ color: '#888', fontSize: '0.85rem' }}>Bulk upload:</span>
        <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={{ ...inp, fontSize: '0.82rem' }}>
          {CATS.map(c => <option key={c} value={c}>{CAT_LABELS[c]}</option>)}
        </select>
        <label style={{ background: '#2a2a2a', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.5rem', padding: '0.5rem 1.2rem', color: '#f8f8f8', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 600 }}>
          {bulkProgress ? `Uploading ${bulkProgress.done}/${bulkProgress.total}…` : 'Select Multiple Files'}
          <input ref={bulkRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handleBulkUpload} disabled={!!bulkProgress} />
        </label>
        {bulkProgress && (
          <div style={{ flex: 1, minWidth: 120, height: 6, background: '#333', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', background: '#bac6ff', width: `${(bulkProgress.done / bulkProgress.total) * 100}%`, transition: 'width 0.2s' }} />
          </div>
        )}
      </div>

      {error && <div style={{ background: '#2a1414', border: '1px solid #f87171', borderRadius: '0.5rem', padding: '0.75rem 1rem', marginBottom: '1rem', color: '#f87171', fontSize: '0.88rem' }}>✗ {error}</div>}
      {success && <div style={{ background: '#142a1a', border: '1px solid #4ade80', borderRadius: '0.5rem', padding: '0.75rem 1rem', marginBottom: '1rem', color: '#4ade80', fontSize: '0.88rem' }}>✓ {success}</div>}

      {/* Category tabs */}
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.75rem' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            padding: '0.4rem 0.9rem', borderRadius: '0.4rem', border: 'none', fontSize: '0.8rem', fontWeight: activeTab === t.id ? 700 : 400, cursor: 'pointer',
            background: activeTab === t.id ? '#bac6ff' : '#1a1a1a',
            color: activeTab === t.id ? '#111' : '#888',
          }}>{t.label}</button>
        ))}
        {saving && <span style={{ color: '#888', fontSize: '0.8rem', alignSelf: 'center', marginLeft: 'auto' }}>Saving order…</span>}
      </div>

      {/* Grid */}
      {tabItems.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
          {tabItems.map((item: any) => (
            <Card
              key={item.id}
              item={item}
              isNew={newIds.has(item.id)}
              isDragging={dragId === item.id}
              onDelete={handleDelete}
              onToggle={toggleFeatured}
              onCategoryChange={changeCategory}
              onDragStart={() => onDragStart(item.id)}
              onDragOver={(e: React.DragEvent) => onDragOver(e, item.id)}
              onDrop={onDrop}
            />
          ))}
        </div>
      ) : (
        <p style={{ color: '#444', marginTop: '2rem' }}>No images in this category.</p>
      )}
    </div>
  )
}

function Card({ item, isNew, isDragging, onDelete, onToggle, onCategoryChange, onDragStart, onDragOver, onDrop }: {
  item: any
  isNew: boolean
  isDragging: boolean
  onDelete: (id: string) => void
  onToggle: (id: string, current: boolean) => void
  onCategoryChange: (id: string, cat: string) => void
  onDragStart: () => void
  onDragOver: (e: React.DragEvent) => void
  onDrop: () => void
}) {
  const inp: React.CSSProperties = { padding: '0.3rem 0.5rem', borderRadius: '0.3rem', border: '1px solid rgba(255,255,255,0.1)', background: '#111', color: '#aaa', fontSize: '0.75rem', width: '100%' }
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      style={{
        background: '#1a1a1a', borderRadius: '0.75rem', overflow: 'hidden',
        border: `1px solid ${item.featured ? 'rgba(186,198,255,0.3)' : 'rgba(255,255,255,0.06)'}`,
        position: 'relative', opacity: isDragging ? 0.4 : 1,
        cursor: 'grab', transition: 'opacity 0.15s',
      }}
    >
      {/* drag handle indicator */}
      <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', color: '#555', fontSize: '0.7rem', zIndex: 1, userSelect: 'none' }}>⠿</div>
      {isNew && (
        <span style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', background: '#4ade80', color: '#111', fontSize: '0.65rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '100vw', letterSpacing: '0.05em', textTransform: 'uppercase', zIndex: 1 }}>New</span>
      )}
      <img src={item.image_url} alt={item.title} style={{ width: '100%', height: '140px', objectFit: 'cover', pointerEvents: 'none' }} />
      <div style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <p style={{ color: '#f8f8f8', fontSize: '0.85rem', fontWeight: 600, margin: 0 }}>{item.title || 'Untitled'}</p>
        <select value={item.category} onChange={e => onCategoryChange(item.id, e.target.value)} style={inp}>
          {['photography','videography','aerial','virtual-tours','floor-plans'].map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={!!item.featured} onChange={() => onToggle(item.id, !!item.featured)} />
            <span style={{ color: item.featured ? '#bac6ff' : '#666', fontSize: '0.8rem', fontWeight: item.featured ? 700 : 400 }}>
              {item.featured ? '⭐ Featured' : 'Feature'}
            </span>
          </label>
          <button onClick={() => onDelete(item.id)} style={{ color: '#f87171', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', padding: 0 }}>Delete</button>
        </div>
      </div>
    </div>
  )
}
