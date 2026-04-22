'use client'
import { useEffect, useState } from 'react'

const api = (table: string, params = '') => `/api/admin/data?table=${table}${params}`
const STATUS_COLORS: Record<string, string> = { pending: '#fbbf24', confirmed: '#bac6ff', done: '#86efac' }

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ client_name: '', phone: '', address: '', service: '', scheduled_at: '', notes: '' })

  useEffect(() => { load() }, [])

  async function load() {
    const res = await fetch(api('bookings'))
    setBookings(await res.json())
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await fetch(api('bookings'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setShowForm(false)
    setForm({ client_name: '', phone: '', address: '', service: '', scheduled_at: '', notes: '' })
    load()
  }

  async function updateStatus(id: string, status: string) {
    await fetch(api('bookings', `&id=${id}`), { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) })
    load()
  }

  const inp = { width: '100%', padding: '0.6rem 0.75rem', borderRadius: '0.4rem', border: '1px solid rgba(255,255,255,0.1)', background: '#222', color: '#f8f8f8', fontSize: '0.88rem', boxSizing: 'border-box' as const }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#f8f8f8', fontSize: '1.5rem', fontWeight: 700 }}>Bookings</h1>
        <button onClick={() => setShowForm(v => !v)} style={{ background: '#bac6ff', color: '#111213', padding: '0.6rem 1.25rem', borderRadius: '0.5rem', border: 'none', fontWeight: 700, cursor: 'pointer' }}>+ New Booking</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: '#1a1a1a', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.06)', marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {([['client_name','Client Name'],['phone','Phone'],['address','Address'],['service','Service'],['scheduled_at','Date & Time'],['notes','Notes']] as [keyof typeof form, string][]).map(([k, label]) => (
            <div key={k}>
              <label style={{ color: '#888', fontSize: '0.78rem', display: 'block', marginBottom: '0.3rem' }}>{label}</label>
              <input type={k === 'scheduled_at' ? 'datetime-local' : 'text'} value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} style={inp} required={k === 'client_name'} />
            </div>
          ))}
          <div style={{ gridColumn: '1/-1', display: 'flex', gap: '0.75rem' }}>
            <button type="submit" style={{ background: '#bac6ff', color: '#111213', padding: '0.6rem 1.5rem', borderRadius: '0.5rem', border: 'none', fontWeight: 700, cursor: 'pointer' }}>Save</button>
            <button type="button" onClick={() => setShowForm(false)} style={{ background: 'transparent', color: '#666', padding: '0.6rem 1rem', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}>Cancel</button>
          </div>
        </form>
      )}

      <div style={{ background: '#1a1a1a', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.06)', overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            {['Client','Phone','Service','Address','Scheduled','Status'].map(h => (
              <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', color: '#555', fontSize: '0.78rem', fontWeight: 600 }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {bookings.map((b: any) => (
              <tr key={b.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '0.75rem 1rem', color: '#f8f8f8', fontSize: '0.88rem' }}>{b.client_name}</td>
                <td style={{ padding: '0.75rem 1rem', color: '#aaa', fontSize: '0.88rem' }}>{b.phone}</td>
                <td style={{ padding: '0.75rem 1rem', color: '#aaa', fontSize: '0.88rem' }}>{b.service}</td>
                <td style={{ padding: '0.75rem 1rem', color: '#666', fontSize: '0.85rem' }}>{b.address}</td>
                <td style={{ padding: '0.75rem 1rem', color: '#aaa', fontSize: '0.85rem' }}>{b.scheduled_at ? new Date(b.scheduled_at).toLocaleString('en-AU') : '—'}</td>
                <td style={{ padding: '0.75rem 1rem' }}>
                  <select value={b.status} onChange={e => updateStatus(b.id, e.target.value)} style={{ background: (STATUS_COLORS[b.status]||'#888')+'22', color: STATUS_COLORS[b.status]||'#888', border: 'none', borderRadius: '100vw', padding: '0.2rem 0.6rem', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}>
                    {['pending','confirmed','done'].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
            {!bookings.length && <tr><td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: '#444' }}>No bookings yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}
