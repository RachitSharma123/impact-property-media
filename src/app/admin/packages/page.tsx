'use client'
import { useEffect, useState } from 'react'

const DEFAULT = [
  { tier: 'essential', monthly_price: 299, annual_price: 249, features: ['10 Photos','Basic Editing','24h Delivery'], highlighted: false },
  { tier: 'professional', monthly_price: 499, annual_price: 419, features: ['25 Photos','Drone Aerial','Floor Plan','Video Walkthrough','48h Delivery'], highlighted: true },
  { tier: 'premium', monthly_price: 799, annual_price: 679, features: ['Unlimited Photos','Drone Aerial','Virtual Tour','Video + Reel','Floor Plan','Priority 24h'], highlighted: false },
]

export default function PackagesAdmin() {
  const [packages, setPackages] = useState<any[]>([])
  const [editing, setEditing] = useState<any>(null)
  const [seeding, setSeeding] = useState(false)

  useEffect(() => { load() }, [])
  async function load() { const r = await fetch('/api/admin/data?table=packages'); setPackages(await r.json()) }

  async function seed() {
    setSeeding(true)
    for (const p of DEFAULT) {
      await fetch('/api/admin/data?table=packages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(p) })
    }
    setSeeding(false); load()
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    const { id, features_text, ...rest } = editing
    rest.features = features_text?.split('\n').filter(Boolean) ?? rest.features
    if (id) {
      await fetch(`/api/admin/data?table=packages&id=${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(rest) })
    } else {
      await fetch('/api/admin/data?table=packages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(rest) })
    }
    setEditing(null); load()
  }

  const inp = { width: '100%', padding: '0.6rem 0.75rem', borderRadius: '0.4rem', border: '1px solid rgba(255,255,255,0.1)', background: '#222', color: '#f8f8f8', fontSize: '0.88rem', boxSizing: 'border-box' as const }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#f8f8f8', fontSize: '1.5rem', fontWeight: 700 }}>Packages</h1>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {!packages.length && <button onClick={seed} disabled={seeding} style={{ background: '#333', color: '#aaa', padding: '0.6rem 1.25rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontSize: '0.88rem' }}>{seeding ? 'Seeding…' : 'Seed Defaults'}</button>}
          <button onClick={() => setEditing({ tier: '', monthly_price: 0, annual_price: 0, features_text: '', highlighted: false })} style={{ background: '#bac6ff', color: '#111213', padding: '0.6rem 1.25rem', borderRadius: '0.5rem', border: 'none', fontWeight: 700, cursor: 'pointer' }}>+ Add</button>
        </div>
      </div>

      {editing && (
        <form onSubmit={handleSave} style={{ background: '#1a1a1a', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.06)', marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {([['tier','Tier'],['monthly_price','Monthly Price'],['annual_price','Annual Price']] as [string,string][]).map(([k,label]) => (
            <div key={k}>
              <label style={{ color: '#888', fontSize: '0.78rem', display: 'block', marginBottom: '0.3rem' }}>{label}</label>
              <input value={editing[k] ?? ''} onChange={e => setEditing((f: any) => ({ ...f, [k]: k.includes('price') ? Number(e.target.value) : e.target.value }))} style={inp} type={k.includes('price') ? 'number' : 'text'} required />
            </div>
          ))}
          <div style={{ gridColumn: '1/-1' }}>
            <label style={{ color: '#888', fontSize: '0.78rem', display: 'block', marginBottom: '0.3rem' }}>Features (one per line)</label>
            <textarea value={editing.features_text ?? (editing.features ?? []).join('\n')} onChange={e => setEditing((f: any) => ({ ...f, features_text: e.target.value }))} rows={5} style={{ ...inp, resize: 'vertical' }} />
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#aaa', fontSize: '0.88rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={editing.highlighted} onChange={e => setEditing((f: any) => ({ ...f, highlighted: e.target.checked }))} /> Highlighted
          </label>
          <div style={{ gridColumn: '1/-1', display: 'flex', gap: '0.75rem' }}>
            <button type="submit" style={{ background: '#bac6ff', color: '#111213', padding: '0.6rem 1.5rem', borderRadius: '0.5rem', border: 'none', fontWeight: 700, cursor: 'pointer' }}>Save</button>
            <button type="button" onClick={() => setEditing(null)} style={{ background: 'transparent', color: '#666', padding: '0.6rem 1rem', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}>Cancel</button>
          </div>
        </form>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
        {packages.map((p: any) => (
          <div key={p.id} style={{ background: '#1a1a1a', borderRadius: '0.75rem', padding: '1.5rem', border: `1px solid ${p.highlighted ? '#bac6ff44' : 'rgba(255,255,255,0.06)'}` }}>
            <p style={{ color: p.highlighted ? '#bac6ff' : '#f8f8f8', fontWeight: 700, textTransform: 'capitalize', marginBottom: '0.5rem' }}>{p.tier}</p>
            <p style={{ color: '#f8f8f8', fontSize: '1.5rem', fontWeight: 700 }}>${p.monthly_price}<span style={{ fontSize: '0.8rem', color: '#666' }}>/mo</span></p>
            <p style={{ color: '#555', fontSize: '0.8rem', marginBottom: '1rem' }}>${p.annual_price}/mo annual</p>
            <ul style={{ paddingLeft: '1rem', color: '#aaa', fontSize: '0.85rem', marginBottom: '1rem' }}>
              {(p.features ?? []).map((f: string) => <li key={f}>{f}</li>)}
            </ul>
            <button onClick={() => setEditing({ ...p, features_text: (p.features ?? []).join('\n') })} style={{ color: '#bac6ff', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', padding: 0 }}>Edit</button>
          </div>
        ))}
        {!packages.length && <p style={{ color: '#444', gridColumn: '1/-1' }}>No packages. Click "Seed Defaults" to add default packages.</p>}
      </div>
    </div>
  )
}
