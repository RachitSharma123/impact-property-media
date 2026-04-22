'use client'

import { useEffect, useState } from 'react'

interface Service {
  id: string
  name: string
  description: string
  image_url: string
  link_href: string
  display_order: number
}

const BLANK: Omit<Service, 'id'> = {
  name: '',
  description: '',
  image_url: '',
  link_href: '',
  display_order: 0,
}

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

const LABEL_STYLE: React.CSSProperties = {
  display: 'block',
  fontSize: '0.7rem',
  fontWeight: 700,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.1em',
  color: '#888',
  marginBottom: '0.35rem',
}

export default function ServicesAdminPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [editId, setEditId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Omit<Service, 'id'>>(BLANK)
  const [adding, setAdding] = useState(false)
  const [newData, setNewData] = useState<Omit<Service, 'id'>>(BLANK)
  const [toast, setToast] = useState('')

  async function load() {
    const res = await fetch('/api/admin/data?table=services')
    const data = await res.json()
    setServices(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  function startEdit(s: Service) {
    setEditId(s.id)
    setEditData({ name: s.name, description: s.description, image_url: s.image_url, link_href: s.link_href, display_order: s.display_order })
  }

  async function saveEdit() {
    const res = await fetch(`/api/admin/data?table=services&id=${editId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editData),
    })
    if (res.ok) { setEditId(null); await load(); showToast('Service updated!') }
    else { const d = await res.json(); showToast(`Error: ${d.error}`) }
  }

  async function deleteService(id: string) {
    if (!confirm('Delete this service?')) return
    const res = await fetch(`/api/admin/data?table=services&id=${id}`, { method: 'DELETE' })
    if (res.ok) { await load(); showToast('Service deleted') }
    else { const d = await res.json(); showToast(`Error: ${d.error}`) }
  }

  async function addService() {
    const res = await fetch('/api/admin/data?table=services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData),
    })
    if (res.ok) { setAdding(false); setNewData(BLANK); await load(); showToast('Service added!') }
    else { const d = await res.json(); showToast(`Error: ${d.error}`) }
  }

  const cardStyle: React.CSSProperties = {
    background: '#1a1a1a',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '0.75rem',
    padding: '1.25rem',
    marginBottom: '1rem',
  }

  const btnStyle = (color: string): React.CSSProperties => ({
    padding: '0.45rem 1rem',
    background: color,
    color: '#1f1e1f',
    border: 'none',
    borderRadius: '0.4rem',
    fontWeight: 700,
    fontSize: '0.8rem',
    cursor: 'pointer',
    marginRight: '0.5rem',
  })

  const formField = (label: string, key: keyof typeof editData, data: Omit<Service,'id'>, onChange: (k: string, v: string | number) => void, multiline?: boolean) => (
    <div style={{ marginBottom: '0.75rem' }}>
      <label style={LABEL_STYLE}>{label}</label>
      {multiline ? (
        <textarea
          style={{ ...INPUT_STYLE, minHeight: '70px', resize: 'vertical' }}
          value={String(data[key] ?? '')}
          onChange={e => onChange(key, e.target.value)}
        />
      ) : (
        <input
          style={INPUT_STYLE}
          type={key === 'display_order' ? 'number' : 'text'}
          value={String(data[key] ?? '')}
          onChange={e => onChange(key, key === 'display_order' ? Number(e.target.value) : e.target.value)}
        />
      )}
    </div>
  )

  if (loading) return <div style={{ color: '#888', padding: '2rem' }}>Loading services...</div>

  return (
    <div style={{ maxWidth: '860px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ color: '#f8f8f8', fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Services</h1>
          <p style={{ color: '#888', fontSize: '0.875rem', margin: '0.35rem 0 0' }}>{services.length} services</p>
        </div>
        <button style={{ ...btnStyle('#bac6ff'), padding: '0.6rem 1.25rem', fontSize: '0.875rem' }} onClick={() => setAdding(true)}>
          + Add Service
        </button>
      </div>

      {toast && (
        <div style={{ background: '#bac6ff', color: '#1f1e1f', padding: '0.75rem 1.25rem', borderRadius: '0.5rem', marginBottom: '1.5rem', fontWeight: 600, fontSize: '0.875rem' }}>
          {toast}
        </div>
      )}

      {/* Add form */}
      {adding && (
        <div style={{ ...cardStyle, border: '1px solid #bac6ff55' }}>
          <h3 style={{ color: '#bac6ff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem' }}>New Service</h3>
          {formField('Name', 'name', newData, (k, v) => setNewData(p => ({ ...p, [k]: v })))}
          {formField('Description', 'description', newData, (k, v) => setNewData(p => ({ ...p, [k]: v })), true)}
          {formField('Image URL', 'image_url', newData, (k, v) => setNewData(p => ({ ...p, [k]: v })))}
          {formField('Link Href', 'link_href', newData, (k, v) => setNewData(p => ({ ...p, [k]: v })))}
          {formField('Display Order', 'display_order', newData, (k, v) => setNewData(p => ({ ...p, [k]: v })))}
          <div style={{ marginTop: '0.5rem' }}>
            <button style={btnStyle('#bac6ff')} onClick={addService}>Save</button>
            <button style={{ ...btnStyle('#333'), color: '#aaa' }} onClick={() => { setAdding(false); setNewData(BLANK) }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Service list */}
      {services.map(s => (
        <div key={s.id} style={cardStyle}>
          {editId === s.id ? (
            <>
              {formField('Name', 'name', editData, (k, v) => setEditData(p => ({ ...p, [k]: v })))}
              {formField('Description', 'description', editData, (k, v) => setEditData(p => ({ ...p, [k]: v })), true)}
              {formField('Image URL', 'image_url', editData, (k, v) => setEditData(p => ({ ...p, [k]: v })))}
              {formField('Link Href', 'link_href', editData, (k, v) => setEditData(p => ({ ...p, [k]: v })))}
              {formField('Display Order', 'display_order', editData, (k, v) => setEditData(p => ({ ...p, [k]: v })))}
              <div style={{ marginTop: '0.5rem' }}>
                <button style={btnStyle('#bac6ff')} onClick={saveEdit}>Save</button>
                <button style={{ ...btnStyle('#333'), color: '#aaa' }} onClick={() => setEditId(null)}>Cancel</button>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                  <span style={{ color: '#f8f8f8', fontWeight: 600 }}>{s.name}</span>
                  <span style={{ background: '#232325', color: '#666', fontSize: '0.7rem', padding: '0.2rem 0.5rem', borderRadius: '0.3rem' }}>
                    order: {s.display_order}
                  </span>
                </div>
                <p style={{ color: '#888', fontSize: '0.875rem', margin: '0 0 0.35rem' }}>{s.description}</p>
                {s.link_href && <p style={{ color: '#555', fontSize: '0.75rem', margin: 0 }}>{s.link_href}</p>}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                <button style={btnStyle('#bac6ff')} onClick={() => startEdit(s)}>Edit</button>
                <button style={{ ...btnStyle('#ff6b6b'), color: '#fff' }} onClick={() => deleteService(s.id)}>Delete</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
