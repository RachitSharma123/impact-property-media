import Link from 'next/link'

const NAV = [
  { href: '/admin', label: '📊 Dashboard' },
  { href: '/admin/content', label: '✏️ Content' },
  { href: '/admin/services', label: '🛠️ Services' },
  { href: '/admin/leads', label: '📥 Leads' },
  { href: '/admin/bookings', label: '📅 Bookings' },
  { href: '/admin/portfolio', label: '🖼️ Portfolio' },
  { href: '/admin/testimonials', label: '⭐ Testimonials' },
  { href: '/admin/packages', label: '📦 Packages' },
  { href: '/admin/posts', label: '📝 Posts' },
  { href: '/admin/faqs', label: '❓ FAQs' },
  { href: '/admin/settings', label: '⚙️ Settings' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f0f10', fontFamily: 'system-ui, sans-serif' }}>
      {/* Sidebar */}
      <aside style={{ width: '220px', flexShrink: 0, background: '#111213', borderRight: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem 0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '0 1.25rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#f8f8f8' }}>
            <span style={{ color: '#bac6ff' }}>Impact</span> Admin
          </span>
        </div>
        <nav style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.125rem', padding: '0 0.75rem' }}>
          {NAV.map(item => (
            <Link
              key={item.href}
              href={item.href}
              style={{ padding: '0.6rem 0.75rem', borderRadius: '0.5rem', color: '#aaa', fontSize: '0.88rem', textDecoration: 'none', transition: 'background 0.15s, color 0.15s' }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div style={{ marginTop: 'auto', padding: '1rem 1.25rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <a href="/" style={{ color: '#555', fontSize: '0.8rem', textDecoration: 'none' }}>← Back to site</a>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
        {children}
      </main>
    </div>
  )
}
