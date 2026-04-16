'use client'

import { useState } from 'react'

const SERVICES = ['Photography', 'Videography', 'Aerial', 'Virtual Tour', 'Floor Plans']

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    suburb: '',
    services: [] as string[],
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  function toggleService(s: string) {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(s)
        ? prev.services.filter((x) => x !== s)
        : [...prev.services, s],
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'contact_form' }),
      })
    } catch {}
    setSubmitted(true)
  }

  return (
    <>
      <style>{`
        /* ── Contact Page Styles ──────────────────────────── */
        .contact-hero {
          background: #1f1e1f;
          padding: 8rem 2rem 6rem;
          text-align: center;
        }
        .contact-hero-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #bac6ff;
          margin-bottom: 1.25rem;
        }
        .contact-hero h1 {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          color: #f8f8f8;
          letter-spacing: -0.03em;
          margin: 0 auto 1.25rem;
          max-width: 700px;
          line-height: 1.15;
        }
        .contact-hero-sub {
          font-size: clamp(1rem, 2vw, 1.15rem);
          color: rgba(248,248,248,0.6);
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.65;
        }

        /* ── Two-col body ─────────────────────────────────── */
        .contact-body {
          background: #f8f8f8;
          padding: 5rem 2rem 6rem;
        }
        .contact-body-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 5rem;
          align-items: start;
        }
        @media (max-width: 900px) {
          .contact-body-inner { grid-template-columns: 1fr; gap: 3.5rem; }
        }

        /* ── Left: details ────────────────────────────────── */
        .contact-details-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #bac6ff;
          margin-bottom: 0.85rem;
        }
        .contact-details h2 {
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 700;
          color: #1f1e1f;
          letter-spacing: -0.03em;
          margin-bottom: 0.65rem;
          line-height: 1.2;
        }
        .contact-details-sub {
          font-size: 0.9rem;
          color: #666;
          line-height: 1.65;
          margin-bottom: 2.5rem;
        }
        .contact-info-row {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .contact-icon {
          width: 2.25rem;
          height: 2.25rem;
          border-radius: 50%;
          background: rgba(186,198,255,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .contact-icon svg { width: 1rem; height: 1rem; stroke: #bac6ff; }
        .contact-info-label {
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #999;
          margin-bottom: 0.2rem;
        }
        .contact-info-val {
          font-size: 0.9rem;
          font-weight: 600;
          color: #1f1e1f;
          text-decoration: none;
        }
        .contact-info-val:hover { color: #7a8fff; }
        .contact-hours {
          background: #fff;
          border: 1px solid #ebebeb;
          border-radius: 0.75rem;
          padding: 1.5rem;
          margin-top: 0.5rem;
          margin-bottom: 2rem;
        }
        .contact-hours-title {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #bac6ff;
          margin-bottom: 0.85rem;
        }
        .contact-hours-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: #555;
          margin-bottom: 0.45rem;
        }
        .contact-hours-day { font-weight: 500; color: #1f1e1f; }
        .contact-map {
          background: #2a292a;
          border-radius: 1rem;
          height: 280px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 0.6rem;
          color: rgba(248,248,248,0.5);
          font-size: 0.9rem;
          font-weight: 500;
          border: 1px solid rgba(248,248,248,0.06);
        }
        .contact-map-pin { font-size: 2rem; }

        /* ── Right: form ──────────────────────────────────── */
        .contact-form-wrap {
          background: #fff;
          border: 1px solid #ebebeb;
          border-radius: 1rem;
          padding: 2.75rem 2.25rem;
          box-shadow: 0 4px 24px rgba(0,0,0,0.05);
        }
        .contact-form-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1f1e1f;
          margin-bottom: 0.35rem;
        }
        .contact-form-sub {
          font-size: 0.85rem;
          color: #888;
          margin-bottom: 2rem;
          line-height: 1.5;
        }
        .form-group { margin-bottom: 1.25rem; }
        .form-label {
          display: block;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #1f1e1f;
          margin-bottom: 0.5rem;
        }
        .form-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #e0e0e0;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          font-family: Poppins, sans-serif;
          color: #1f1e1f;
          background: #fafafa;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }
        .form-input:focus {
          border-color: #bac6ff;
          box-shadow: 0 0 0 3px rgba(186,198,255,0.2);
          background: #fff;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        @media (max-width: 560px) { .form-row { grid-template-columns: 1fr; } }
        .service-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .service-chip {
          padding: 0.4rem 1rem;
          border-radius: 100vw;
          font-size: 0.75rem;
          font-weight: 600;
          font-family: Poppins, sans-serif;
          cursor: pointer;
          border: 1px solid #e0e0e0;
          background: #f2f2f2;
          color: #666;
          transition: all 0.2s;
        }
        .service-chip:hover { border-color: #bac6ff; color: #1f1e1f; }
        .service-chip.active {
          background: #bac6ff;
          color: #1f1e1f;
          border-color: #bac6ff;
        }
        .submit-btn {
          width: 100%;
          padding: 0.9rem;
          border-radius: 100vw;
          background: #1f1e1f;
          color: #f8f8f8;
          font-size: 0.875rem;
          font-weight: 700;
          font-family: Poppins, sans-serif;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          margin-top: 0.5rem;
          transition: opacity 0.2s, transform 0.2s;
        }
        .submit-btn:hover { opacity: 0.85; transform: translateY(-1px); }

        /* ── Success state ─────────────────────────────────── */
        .success-box {
          text-align: center;
          padding: 3.5rem 1.5rem;
        }
        .success-icon {
          width: 4rem;
          height: 4rem;
          border-radius: 50%;
          background: #bac6ff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.25rem;
        }
        .success-title {
          font-size: 1.35rem;
          font-weight: 700;
          color: #1f1e1f;
          margin-bottom: 0.6rem;
        }
        .success-sub {
          font-size: 0.9rem;
          color: #666;
          line-height: 1.6;
          margin-bottom: 1.75rem;
        }
        .success-reset {
          font-size: 0.85rem;
          color: #7a8fff;
          background: none;
          border: none;
          cursor: pointer;
          text-decoration: underline;
          font-family: Poppins, sans-serif;
        }
      `}</style>

      {/* ── Hero ── */}
      <section className="contact-hero">
        <p className="contact-hero-label">Contact Us</p>
        <h1>Get In Touch</h1>
        <p className="contact-hero-sub">
          Ready to make your listing unforgettable? We&apos;d love to hear from you.
        </p>
      </section>

      {/* ── Body ── */}
      <section className="contact-body">
        <div className="contact-body-inner">

          {/* ── Left: contact details ── */}
          <div className="contact-details">
            <p className="contact-details-label">Contact Details</p>
            <h2>Let&apos;s Connect</h2>
            <p className="contact-details-sub">
              Whether you have a single listing or a whole agency, we&apos;re here to help.
              Reach out through any of the channels below.
            </p>

            {[
              {
                label: 'Phone',
                val: '0400 000 000',
                href: 'tel:0400000000',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                ),
              },
              {
                label: 'Email',
                val: 'hello@impactpropertymedia.com.au',
                href: 'mailto:hello@impactpropertymedia.com.au',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                ),
              },
              {
                label: 'Location',
                val: 'Melbourne, VIC',
                href: undefined,
                icon: (
                  <>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </>
                ),
              },
              {
                label: 'Instagram',
                val: '@impactpropertymedia',
                href: 'https://instagram.com/impactpropertymedia',
                icon: (
                  <>
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeLinecap="round" strokeLinejoin="round" />
                  </>
                ),
              },
            ].map(({ label, val, href, icon }) => (
              <div key={label} className="contact-info-row">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} xmlns="http://www.w3.org/2000/svg">
                    {icon}
                  </svg>
                </div>
                <div>
                  <div className="contact-info-label">{label}</div>
                  {href ? (
                    <a
                      href={href}
                      className="contact-info-val"
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                    >
                      {val}
                    </a>
                  ) : (
                    <span className="contact-info-val">{val}</span>
                  )}
                </div>
              </div>
            ))}

            {/* Hours */}
            <div className="contact-hours">
              <div className="contact-hours-title">Business Hours</div>
              <div className="contact-hours-row">
                <span className="contact-hours-day">Mon – Fri</span>
                <span>8:00 am – 6:00 pm</span>
              </div>
              <div className="contact-hours-row">
                <span className="contact-hours-day">Saturday</span>
                <span>9:00 am – 4:00 pm</span>
              </div>
              <div className="contact-hours-row">
                <span className="contact-hours-day">Sunday</span>
                <span style={{ color: '#bbb' }}>Closed</span>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="contact-map">
              <span className="contact-map-pin">📍</span>
              <span>Melbourne, VIC</span>
            </div>
          </div>

          {/* ── Right: form ── */}
          <div className="contact-form-wrap">
            {submitted ? (
              <div className="success-box">
                <div className="success-icon">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1f1e1f" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="success-title">Message Sent!</div>
                <p className="success-sub">
                  Thanks for reaching out. Our team will get back to you within the hour during business hours.
                </p>
                <button className="success-reset" onClick={() => setSubmitted(false)}>
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <div className="contact-form-title">Send Us a Message</div>
                <div className="contact-form-sub">Fill in the details below and we&apos;ll be in touch shortly.</div>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Name *</label>
                    <input
                      className="form-input"
                      type="text"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Email *</label>
                      <input
                        className="form-input"
                        type="email"
                        placeholder="you@email.com"
                        value={form.email}
                        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone *</label>
                      <input
                        className="form-input"
                        type="tel"
                        placeholder="04XX XXX XXX"
                        value={form.phone}
                        onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Suburb / Property Address *</label>
                    <input
                      className="form-input"
                      type="text"
                      placeholder="e.g. 12 Smith St, Richmond VIC"
                      value={form.suburb}
                      onChange={(e) => setForm((p) => ({ ...p, suburb: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Services</label>
                    <div className="service-chips">
                      {SERVICES.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleService(s)}
                          className={`service-chip${form.services.includes(s) ? ' active' : ''}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-input"
                      rows={4}
                      placeholder="Tell us about your property or how we can help..."
                      value={form.message}
                      onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                      style={{ resize: 'vertical', minHeight: '110px' }}
                    />
                  </div>
                  <button type="submit" className="submit-btn">Send Message</button>
                </form>
              </>
            )}
          </div>

        </div>
      </section>
    </>
  )
}
