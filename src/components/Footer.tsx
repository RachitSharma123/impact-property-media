'use client'

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const serviceLinks = [
  { label: 'Photography', href: '/services/photography' },
  { label: 'Videography', href: '/services/videography' },
  { label: 'Aerial Drone', href: '/services/aerial' },
  { label: 'Virtual Tours', href: '/services/virtual-tours' },
  { label: 'Floor Plans', href: '/services/floor-plans' },
];

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About Us', href: '/about' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  return (
    <footer
      style={{ backgroundColor: '#1f1e1f' }}
    >
      {/* Accent top border */}
      <div style={{ height: '2px', backgroundColor: '#bac6ff' }} />

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1: Brand */}
          <div>
            <div className="mb-4">
              <span
                className="text-xl font-bold tracking-tight"
                style={{ color: '#f8f8f8', fontFamily: 'Poppins, sans-serif' }}
              >
                Impact<span style={{ color: '#bac6ff' }}>Property</span>
              </span>
              <br />
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: '#888888', fontFamily: 'Poppins, sans-serif' }}
              >
                Media
              </span>
            </div>
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: '#888888', fontFamily: 'Poppins, sans-serif' }}
            >
              Melbourne&apos;s premier real estate media company. Cinematic photography and video
              that sells properties faster.
            </p>
            {/* Social icons */}
            <div className="flex gap-4">
              <a
                href="https://instagram.com/impactpropertymedia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="transition-colors duration-200"
                style={{ color: '#888888' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#bac6ff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#888888')}
              >
                <InstagramIcon />
              </a>
              <a
                href="https://facebook.com/impactpropertymedia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="transition-colors duration-200"
                style={{ color: '#888888' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#bac6ff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#888888')}
              >
                <FacebookIcon />
              </a>
              <a
                href="https://linkedin.com/company/impactpropertymedia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="transition-colors duration-200"
                style={{ color: '#888888' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#bac6ff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#888888')}
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4
              className="text-xs font-bold uppercase tracking-widest mb-5"
              style={{ color: '#bac6ff', fontFamily: 'Poppins, sans-serif' }}
            >
              Services
            </h4>
            <ul className="flex flex-col gap-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: '#888888', fontFamily: 'Poppins, sans-serif' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#f8f8f8')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#888888')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4
              className="text-xs font-bold uppercase tracking-widest mb-5"
              style={{ color: '#bac6ff', fontFamily: 'Poppins, sans-serif' }}
            >
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: '#888888', fontFamily: 'Poppins, sans-serif' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#f8f8f8')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#888888')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4
              className="text-xs font-bold uppercase tracking-widest mb-5"
              style={{ color: '#bac6ff', fontFamily: 'Poppins, sans-serif' }}
            >
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              <p
                className="text-sm"
                style={{ color: '#888888', fontFamily: 'Poppins, sans-serif' }}
              >
                Melbourne, VIC
              </p>
              <a
                href="tel:0400000000"
                className="text-sm transition-colors duration-200"
                style={{ color: '#888888', fontFamily: 'Poppins, sans-serif' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#f8f8f8')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#888888')}
              >
                0400 000 000
              </a>
              <a
                href="mailto:hello@impactpropertymedia.com.au"
                className="text-sm transition-colors duration-200 break-words"
                style={{ color: '#888888', fontFamily: 'Poppins, sans-serif' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#f8f8f8')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#888888')}
              >
                hello@impactpropertymedia.com.au
              </a>
              <a
                href="https://instagram.com/impactpropertymedia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition-colors duration-200"
                style={{ color: '#888888', fontFamily: 'Poppins, sans-serif' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#bac6ff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#888888')}
              >
                @impactpropertymedia
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p
            className="text-xs"
            style={{ color: '#555555', fontFamily: 'Poppins, sans-serif' }}
          >
            &copy; 2026 Impact Property Media. All rights reserved.
          </p>
          <p
            className="text-xs"
            style={{ color: '#555555', fontFamily: 'Poppins, sans-serif' }}
          >
            Built with precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
