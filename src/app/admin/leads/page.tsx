import { supabaseAdmin } from '@/lib/supabase'

const STATUS_COLORS: Record<string, string> = {
  new: '#bac6ff',
  contacted: '#fbbf24',
  closed: '#86efac',
}

export default async function LeadsPage() {
  const { data: leads } = await supabaseAdmin
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <h1 style={{ color: '#f8f8f8', fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem' }}>Leads</h1>
      <div style={{ background: '#1a1a1a', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {['Name', 'Phone', 'Email', 'Service', 'Source', 'Status', 'Date'].map(h => (
                <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', color: '#555', fontSize: '0.78rem', fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(leads ?? []).map((lead: any) => (
              <tr key={lead.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '0.75rem 1rem', color: '#f8f8f8', fontSize: '0.88rem' }}>{lead.name}</td>
                <td style={{ padding: '0.75rem 1rem', color: '#aaa', fontSize: '0.88rem' }}>{lead.phone}</td>
                <td style={{ padding: '0.75rem 1rem', color: '#aaa', fontSize: '0.88rem' }}>{lead.email}</td>
                <td style={{ padding: '0.75rem 1rem', color: '#aaa', fontSize: '0.88rem' }}>{lead.service}</td>
                <td style={{ padding: '0.75rem 1rem', color: '#666', fontSize: '0.85rem' }}>{lead.source}</td>
                <td style={{ padding: '0.75rem 1rem' }}>
                  <span style={{ background: STATUS_COLORS[lead.status] + '22', color: STATUS_COLORS[lead.status], padding: '0.2rem 0.6rem', borderRadius: '100vw', fontSize: '0.78rem', fontWeight: 600 }}>
                    {lead.status}
                  </span>
                </td>
                <td style={{ padding: '0.75rem 1rem', color: '#555', fontSize: '0.85rem' }}>{new Date(lead.created_at).toLocaleDateString('en-AU')}</td>
              </tr>
            ))}
            {!leads?.length && (
              <tr><td colSpan={7} style={{ padding: '2rem', textAlign: 'center', color: '#444' }}>No leads yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
