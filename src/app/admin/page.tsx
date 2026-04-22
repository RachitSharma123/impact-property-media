import { supabaseAdmin } from '@/lib/supabase'

export default async function AdminDashboard() {
  const [{ count: leads }, { count: bookings }, { count: portfolio }] = await Promise.all([
    supabaseAdmin.from('leads').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('bookings').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('portfolio_items').select('*', { count: 'exact', head: true }),
  ])

  const { data: newLeads } = await supabaseAdmin
    .from('leads')
    .select('name, email, service, created_at')
    .order('created_at', { ascending: false })
    .limit(5)

  const stats = [
    { label: 'Total Leads', value: leads ?? 0, color: '#bac6ff' },
    { label: 'Bookings', value: bookings ?? 0, color: '#86efac' },
    { label: 'Portfolio Items', value: portfolio ?? 0, color: '#fbbf24' },
  ]

  return (
    <div>
      <h1 style={{ color: '#f8f8f8', fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem' }}>Dashboard</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: '#1a1a1a', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.06)' }}>
            <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '0.5rem' }}>{s.label}</p>
            <p style={{ color: s.color, fontSize: '2rem', fontWeight: 700 }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div style={{ background: '#1a1a1a', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <h2 style={{ color: '#f8f8f8', fontSize: '0.95rem', fontWeight: 600 }}>Recent Leads</h2>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {['Name', 'Email', 'Service', 'Date'].map(h => (
                <th key={h} style={{ padding: '0.75rem 1.25rem', textAlign: 'left', color: '#555', fontSize: '0.78rem', fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(newLeads ?? []).map((lead: any) => (
              <tr key={lead.created_at} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '0.75rem 1.25rem', color: '#f8f8f8', fontSize: '0.88rem' }}>{lead.name}</td>
                <td style={{ padding: '0.75rem 1.25rem', color: '#aaa', fontSize: '0.88rem' }}>{lead.email}</td>
                <td style={{ padding: '0.75rem 1.25rem', color: '#aaa', fontSize: '0.88rem' }}>{lead.service}</td>
                <td style={{ padding: '0.75rem 1.25rem', color: '#555', fontSize: '0.85rem' }}>{new Date(lead.created_at).toLocaleDateString('en-AU')}</td>
              </tr>
            ))}
            {!newLeads?.length && (
              <tr><td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: '#444' }}>No leads yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
