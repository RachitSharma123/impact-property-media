'use client';

import { useEffect, useRef, useState } from 'react';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
    dropdown: [
      { label: 'Photography', href: '/services/photography' },
      { label: 'Videography', href: '/services/videography' },
      { label: 'Aerial & Drone', href: '/services/aerial-drone' },
      { label: 'Virtual Tours', href: '/services/virtual-tours' },
      { label: 'Floor Plans', href: '/services/floor-plans' },
    ],
  },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Scroll listener ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Close desktop dropdown on outside click ── */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* ── Lock body scroll when mobile menu is open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition:
          'background-color 0.35s ease, box-shadow 0.35s ease, backdrop-filter 0.35s ease',
        backgroundColor: scrolled ? 'rgba(31,30,31,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        boxShadow: scrolled ? '0 1px 0 rgba(255,255,255,0.08)' : 'none',
      }}
      className={scrolled ? 'nav-scrolled' : ''}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '4.5rem',
        }}
      >
        {/* ── Logo ── */}
        <a
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none',
            flexShrink: 0,
          }}
          aria-label="Impact Property Media home"
        >
          {/* Icon mark */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect width="32" height="32" rx="6" fill="#111213"/>
            <circle cx="16" cy="15" r="10" fill="none" stroke="#ffffff" strokeWidth="1.5"/>
            <circle cx="16" cy="15" r="6.5" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="2.5 2"/>
            <circle cx="16" cy="13" r="2.8" fill="#ffffff"/>
            <path d="M13.5,15.5 Q16,21 16,21 Q16,21 18.5,15.5" fill="#ffffff"/>
            <circle cx="16" cy="13" r="1.1" fill="#111213"/>
            <line x1="16" y1="5" x2="16" y2="3" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round"/>
            <line x1="16" y1="25" x2="16" y2="27" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round"/>
            <line x1="7.3" y1="10" x2="5.6" y2="9" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round"/>
            <line x1="24.7" y1="20" x2="26.4" y2="21" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round"/>
            <line x1="7.3" y1="20" x2="5.6" y2="21" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round"/>
            <line x1="24.7" y1="10" x2="26.4" y2="9" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <span
            style={{
              fontWeight: 700,
              fontSize: '1rem',
              letterSpacing: '-0.02em',
              color: '#f8f8f8',
              lineHeight: 1.2,
            }}
          >
            <span style={{ color: '#bac6ff' }}>Impact</span>{' '}
            <span style={{ fontWeight: 500 }}>Property Media</span>
          </span>
        </a>

        {/* ── Desktop Nav ── */}
        <ul
          className="nav-desktop-links"
          style={{
            alignItems: 'center',
            gap: '0.25rem',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          {NAV_LINKS.map((link) =>
            link.dropdown ? (
              <li
                key={link.label}
                ref={dropdownRef}
                style={{ position: 'relative' }}
                onMouseEnter={() => {
                  if (closeTimer.current) clearTimeout(closeTimer.current);
                  setServicesOpen(true);
                }}
                onMouseLeave={() => {
                  closeTimer.current = setTimeout(() => setServicesOpen(false), 2000);
                }}
              >
                <button
                  onClick={() => setServicesOpen((v) => !v)}
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.5rem 0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontFamily: 'inherit',
                    fontWeight: 500,
                    fontSize: '0.92rem',
                    color: servicesOpen ? '#bac6ff' : '#f8f8f8',
                    transition: 'color 0.2s',
                    borderRadius: '100vw',
                  }}
                >
                  {link.label}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    style={{
                      transition: 'transform 0.25s',
                      transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  >
                    <path
                      d="M2 4L6 8L10 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* Dropdown panel */}
                <ul
                  role="menu"
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 0.5rem)',
                    left: '50%',
                    transform: servicesOpen
                      ? 'translateX(-50%) translateY(0)'
                      : 'translateX(-50%) translateY(-8px)',
                    background: '#2a2930',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '0.75rem',
                    padding: '0.5rem',
                    minWidth: '190px',
                    listStyle: 'none',
                    boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
                    opacity: servicesOpen ? 1 : 0,
                    pointerEvents: servicesOpen ? 'auto' : 'none',
                    transition: 'opacity 0.25s ease, transform 0.25s ease',
                  }}
                >
                  {link.dropdown.map((item) => (
                    <li key={item.label} role="menuitem">
                      <a
                        href={item.href}
                        style={{
                          display: 'block',
                          padding: '0.55rem 0.9rem',
                          borderRadius: '0.5rem',
                          fontWeight: 500,
                          fontSize: '0.9rem',
                          color: '#f8f8f8',
                          transition: 'background 0.2s, color 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background =
                            'rgba(186,198,255,0.12)';
                          (e.currentTarget as HTMLElement).style.color = '#bac6ff';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = 'transparent';
                          (e.currentTarget as HTMLElement).style.color = '#f8f8f8';
                        }}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={link.label}>
                <a
                  href={link.href}
                  style={{
                    display: 'block',
                    padding: '0.5rem 0.85rem',
                    fontWeight: 500,
                    fontSize: '0.92rem',
                    color: '#f8f8f8',
                    borderRadius: '100vw',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = '#bac6ff')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = '#f8f8f8')
                  }
                >
                  {link.label}
                </a>
              </li>
            )
          )}
        </ul>

        {/* ── Right side: CTA + Hamburger ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Book Now CTA — hidden on mobile */}
          <a
            href="/contact"
            className="btn-primary nav-desktop-links"
            style={{ fontSize: '0.88rem', padding: '0.65rem 1.25rem' }}
          >
            Book Now
          </a>

          {/* Hamburger — shown on mobile only */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="nav-hamburger"
            style={{
              background: 'none',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              padding: '0.45rem',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '4px',
              width: '40px',
              height: '40px',
            }}
          >
            <span
              style={{
                display: 'block',
                width: '18px',
                height: '2px',
                backgroundColor: '#f8f8f8',
                borderRadius: '2px',
                transition: 'transform 0.3s, opacity 0.3s',
                transform: mobileOpen ? 'translateY(6px) rotate(45deg)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                width: '18px',
                height: '2px',
                backgroundColor: '#f8f8f8',
                borderRadius: '2px',
                transition: 'opacity 0.3s',
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: 'block',
                width: '18px',
                height: '2px',
                backgroundColor: '#f8f8f8',
                borderRadius: '2px',
                transition: 'transform 0.3s, opacity 0.3s',
                transform: mobileOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </div>

      {/* ── Mobile Menu Panel ── */}
      <div
        style={{
          position: 'fixed',
          top: '4.5rem',
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(31,30,31,0.98)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          padding: '1.5rem',
          display: mobileOpen ? 'flex' : 'none',
          flexDirection: 'column',
          gap: '0.25rem',
          overflowY: 'auto',
          zIndex: 200,
        }}
        aria-hidden={!mobileOpen}
      >
        {NAV_LINKS.map((link) =>
          link.dropdown ? (
            <div key={link.label}>
              <button
                onClick={() => setMobileServicesOpen((v) => !v)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 1rem',
                  fontFamily: 'inherit',
                  fontWeight: 600,
                  fontSize: '1.05rem',
                  color: mobileServicesOpen ? '#bac6ff' : '#f8f8f8',
                  borderRadius: '0.65rem',
                  transition: 'color 0.2s',
                }}
              >
                {link.label}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 12 12"
                  fill="none"
                  style={{
                    transition: 'transform 0.25s',
                    transform: mobileServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                >
                  <path
                    d="M2 4L6 8L10 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div
                style={{
                  overflow: 'hidden',
                  maxHeight: mobileServicesOpen ? '400px' : '0',
                  transition: 'max-height 0.35s ease',
                }}
              >
                <div style={{ padding: '0 0.5rem 0.5rem' }}>
                  {link.dropdown.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={closeMobile}
                      style={{
                        display: 'block',
                        padding: '0.7rem 1rem',
                        fontWeight: 500,
                        fontSize: '0.95rem',
                        color: '#c8cfe0',
                        borderRadius: '0.5rem',
                        transition: 'color 0.2s',
                        borderLeft: '2px solid rgba(186,198,255,0.3)',
                        marginBottom: '0.1rem',
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.color = '#bac6ff')
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.color = '#c8cfe0')
                      }
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <a
              key={link.label}
              href={link.href}
              onClick={closeMobile}
              style={{
                display: 'block',
                padding: '0.85rem 1rem',
                fontWeight: 600,
                fontSize: '1.05rem',
                color: '#f8f8f8',
                borderRadius: '0.65rem',
                transition: 'color 0.2s, background 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = '#bac6ff';
                (e.currentTarget as HTMLElement).style.background =
                  'rgba(186,198,255,0.06)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = '#f8f8f8';
                (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
            >
              {link.label}
            </a>
          )
        )}

        <div
          style={{
            marginTop: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <a
            href="/contact"
            className="btn-primary"
            onClick={closeMobile}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Book Now
          </a>
        </div>
      </div>
    </nav>
  );
}
