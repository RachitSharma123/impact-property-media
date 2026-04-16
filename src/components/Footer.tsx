'use client'

const serviceLinks = [
  { label: 'Photography', href: '/services/photography' },
  { label: 'Videography', href: '/services/videography' },
  { label: 'Aerial Drone', href: '/services/aerial' },
  { label: 'Virtual Tours', href: '/services/virtual-tours' },
  { label: 'Floor Plans', href: '/services/floor-plans' },
]

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About Us', href: '/about' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
]

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{ color: '#888', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }}
      onMouseEnter={e => (e.currentTarget.style.color = '#bac6ff')}
      onMouseLeave={e => (e.currentTarget.style.color = '#888')}
    >
      {children}
    </a>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{ color: '#888', fontSize: '0.9rem', textDecoration: 'none', fontFamily: 'Poppins, sans-serif', transition: 'color 0.2s' }}
      onMouseEnter={e => (e.currentTarget.style.color = '#f8f8f8')}
      onMouseLeave={e => (e.currentTarget.style.color = '#888')}
    >
      {children}
    </a>
  )
}

export default function Footer() {
  return (
    <footer style={{ background: '#1f1e1f', fontFamily: 'Poppins, sans-serif' }}>
      <style>{`
        .footer-accent { height: 2px; background: #bac6ff; }
        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 2rem;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 3rem;
        }
        @media (max-width: 900px) {
          .footer-inner { grid-template-columns: 1fr 1fr; gap: 2rem; }
        }
        @media (max-width: 560px) {
          .footer-inner { grid-template-columns: 1fr; gap: 2rem; }
        }
        .footer-col-heading {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #bac6ff;
          margin-bottom: 1.25rem;
        }
        .footer-links { display: flex; flex-direction: column; gap: 0.75rem; }
        .footer-logo-name { font-size: 1.3rem; font-weight: 700; color: #f8f8f8; letter-spacing: -0.02em; }
        .footer-logo-accent { color: #bac6ff; }
        .footer-tagline { font-size: 0.875rem; color: #888; line-height: 1.7; margin: 0.75rem 0 1.5rem; }
        .footer-socials { display: flex; gap: 1rem; }
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .footer-bottom-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1.25rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }
        @media (max-width: 560px) {
          .footer-bottom-inner { flex-direction: column; text-align: center; }
        }
        .footer-bottom p { font-size: 0.75rem; color: #555; margin: 0; }
      `}</style>

      <div className="footer-accent" />

      <div className="footer-inner">
        {/* Brand */}
        <div>
          <div className="footer-logo-name">
            Impact<span className="footer-logo-accent">Property</span><br />Media
          </div>
          <p className="footer-tagline">
            Melbourne&apos;s premier real estate media company. Cinematic photography and video that sells properties faster.
          </p>
          <div className="footer-socials">
            <SocialIcon href="https://instagram.com/impactpropertymedia" label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </SocialIcon>
            <SocialIcon href="https://facebook.com/impactpropertymedia" label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </SocialIcon>
            <SocialIcon href="https://linkedin.com/company/impactpropertymedia" label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </SocialIcon>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="footer-col-heading">Services</h4>
          <div className="footer-links">
            {serviceLinks.map(l => <FooterLink key={l.href} href={l.href}>{l.label}</FooterLink>)}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="footer-col-heading">Quick Links</h4>
          <div className="footer-links">
            {quickLinks.map(l => <FooterLink key={l.href} href={l.href}>{l.label}</FooterLink>)}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="footer-col-heading">Contact</h4>
          <div className="footer-links">
            <span style={{ color: '#888', fontSize: '0.9rem' }}>Melbourne, VIC</span>
            <a href="tel:0400000000" style={{ color: '#888', fontSize: '0.9rem', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#f8f8f8')}
              onMouseLeave={e => (e.currentTarget.style.color = '#888')}>
              0400 000 000
            </a>
            <a href="mailto:hello@impactpropertymedia.com.au" style={{ color: '#888', fontSize: '0.9rem', textDecoration: 'none', wordBreak: 'break-all', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#f8f8f8')}
              onMouseLeave={e => (e.currentTarget.style.color = '#888')}>
              hello@impactpropertymedia.com.au
            </a>
            <a href="https://instagram.com/impactpropertymedia" target="_blank" rel="noopener noreferrer"
              style={{ color: '#888', fontSize: '0.9rem', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#bac6ff')}
              onMouseLeave={e => (e.currentTarget.style.color = '#888')}>
              @impactpropertymedia
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>© 2026 Impact Property Media. All rights reserved.</p>
          <p>Built with precision.</p>
        </div>
      </div>
    </footer>
  )
}
