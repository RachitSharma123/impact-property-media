'use client'
import { useEffect, useState } from 'react'

export default function PostsAdmin() {
  const [posts, setPosts] = useState<any[]>([])
  const [editing, setEditing] = useState<any>(null)

  useEffect(() => { load() }, [])
  async function load() {
    const r = await fetch('/api/admin/data?table=posts')
    setPosts(await r.json())
  }

  function slugify(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    const { id, ...rest } = editing
    if (!rest.slug) rest.slug = slugify(rest.title)
    if (rest.published && !rest.published_at) rest.published_at = new Date().toISOString()
    if (id) {
      await fetch(`/api/admin/data?table=posts&id=${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(rest) })
    } else {
      await fetch('/api/admin/data?table=posts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(rest) })
    }
    setEditing(null); load()
  }

  async function del(id: string) {
    if (!confirm('Delete post?')) return
    await fetch(`/api/admin/data?table=posts&id=${id}`, { method: 'DELETE' })
    load()
  }

  const inputStyle = { width: '100%', padding: '0.6rem 0.75rem', borderRadius: '0.4rem', border: '1px solid rgba(255,255,255,0.1)', background: '#222', color: '#f8f8f8', fontSize: '0.88rem', boxSizing: 'border-box' as const }

  if (editing !== null) return (
    <div>
      <button onClick={() => setEditing(null)} style={{ color: '#666', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '1.5rem', fontSize: '0.88rem' }}>← Back</button>
      <h1 style={{ color: '#f8f8f8', fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem' }}>{editing.id ? 'Edit Post' : 'New Post'}</h1>
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '720px' }}>
        {([['title', 'Title'], ['slug', 'Slug (auto-generated if empty)'], ['cover_image_url', 'Cover Image URL']] as [string, string][]).map(([k, label]) => (
          <div key={k}>
            <label style={{ color: '#888', fontSize: '0.78rem', display: 'block', marginBottom: '0.3rem' }}>{label}</label>
            <input value={editing[k] ?? ''} onChange={e => setEditing((f: any) => ({ ...f, [k]: e.target.value }))} style={inputStyle} required={k === 'title'} />
          </div>
        ))}
        <div>
          <label style={{ color: '#888', fontSize: '0.78rem', display: 'block', marginBottom: '0.3rem' }}>Content (Markdown)</label>
          <textarea value={editing.content ?? ''} onChange={e => setEditing((f: any) => ({ ...f, content: e.target.value }))} rows={12} style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace' }} />
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#aaa', fontSize: '0.88rem', cursor: 'pointer' }}>
          <input type="checkbox" checked={editing.published} onChange={e => setEditing((f: any) => ({ ...f, published: e.target.checked }))} /> Published
        </label>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button type="submit" style={{ background: '#bac6ff', color: '#111213', padding: '0.6rem 1.5rem', borderRadius: '0.5rem', border: 'none', fontWeight: 700, cursor: 'pointer' }}>Save</button>
          <button type="button" onClick={() => setEditing(null)} style={{ background: 'transparent', color: '#666', padding: '0.6rem 1rem', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}>Cancel</button>
        </div>
      </form>
    </div>
  )

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#f8f8f8', fontSize: '1.5rem', fontWeight: 700 }}>Posts</h1>
        <button onClick={() => setEditing({ title: '', slug: '', content: '', cover_image_url: '', published: false })} style={{ background: '#bac6ff', color: '#111213', padding: '0.6rem 1.25rem', borderRadius: '0.5rem', border: 'none', fontWeight: 700, cursor: 'pointer' }}>+ New Post</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {posts.map((p: any) => (
          <div key={p.id} style={{ background: '#1a1a1a', borderRadius: '0.75rem', padding: '1rem 1.25rem', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#f8f8f8', fontWeight: 600 }}>{p.title}</p>
              <p style={{ color: '#555', fontSize: '0.8rem' }}>{p.slug} · {new Date(p.created_at).toLocaleDateString('en-AU')}</p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <span style={{ color: p.published ? '#86efac' : '#555', fontSize: '0.8rem' }}>{p.published ? 'Published' : 'Draft'}</span>
              <button onClick={() => setEditing(p)} style={{ color: '#bac6ff', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem' }}>Edit</button>
              <button onClick={() => del(p.id)} style={{ color: '#f87171', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem' }}>Del</button>
            </div>
          </div>
        ))}
        {!posts.length && <p style={{ color: '#444' }}>No posts yet.</p>}
      </div>
    </div>
  )
}
