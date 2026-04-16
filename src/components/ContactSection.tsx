'use client'

import { useState } from 'react'

const SERVICES = ['Photography', 'Videography', 'Aerial', 'Virtual Tour', 'Floor Plans']

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', suburb: '', services: [] as string[], message: '' })
  const [submitted, setSubmitted] = useState(false)

  function toggle(s: string) {
    setForm(p => ({ ...p, services: p.services.includes(s) ? p.services.filter(x => x !== s) : [...p.services, s] }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    console.log(form)
    setSubmitted(true)
  }

  return (
    <section id="contact" style={{ background: '#f8f8f8', fontFamily: 'Poppins, sans-serif' }}>
      <style>{`
        .contact-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 6rem 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: start;
        }
        @media (max-width: 900px) { .contact-inner { grid-template-columns: 1fr; gap: 3rem; padding: 4rem 1.5rem; } }
        .contact-label { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #bac6ff; margin-bottom: 1rem; }
        .contact-heading { font-size: clamp(1.8rem, 3.5vw, 2.75rem); font-weight: 700; color: #1f1e1f; margin-bottom: 0.75rem; letter-spacing: -0.03em; }
        .contact-sub { font-size: 1rem; color: #555; line-height: 1.65; margin-bottom: 2.5rem; }
        .contact-info-row { display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 1.5rem; }
        .contact-icon { width: 2.25rem; height: 2.25rem; border-radius: 50%; background: rgba(186,198,255,0.15); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .contact-icon svg { width: 1rem; height: 1rem; stroke: #bac6ff; }
        .contact-info-label { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; color: #888; margin-bottom: 0.2rem; }
        .contact-info-val { font-size: 0.9rem; font-weight: 600; color: #1f1e1f; text-decoration: none; }
        .contact-info-val:hover { color: #7a8fff; }
        .contact-form-wrap { background: #fff; border: 1px solid #ebebeb; border-radius: 1rem; padding: 2.5rem; }
        .form-group { margin-bottom: 1.25rem; }
        .form-label { display: block; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #1f1e1f; margin-bottom: 0.5rem; }
        .form-input { width: 100%; padding: 0.75rem 1rem; border: 1px solid #e0e0e0; border-radius: 0.5rem; font-size: 0.875rem; font-family: Poppins, sans-serif; color: #1f1e1f; background: #fff; outline: none; transition: border-color 0.2s, box-shadow 0.2s; box-sizing: border-box; }
        .form-input:focus { border-color: #bac6ff; box-shadow: 0 0 0 3px rgba(186,198,255,0.2); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        @media (max-width: 560px) { .form-row { grid-template-columns: 1fr; } }
        .service-chips { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .service-chip { padding: 0.4rem 1rem; border-radius: 100vw; font-size: 0.75rem; font-weight: 600; font-family: Poppins, sans-serif; cursor: pointer; border: 1px solid #e0e0e0; background: #f0f0f0; color: #555; transition: all 0.2s; }
        .service-chip.active { background: #bac6ff; color: #1f1e1f; border-color: #bac6ff; }
        .submit-btn { width: 100%; padding: 0.9rem; border-radius: 100vw; background: #1f1e1f; color: #f8f8f8; font-size: 0.875rem; font-weight: 700; font-family: Poppins, sans-serif; letter-spacing: 0.05em; text-transform: uppercase; border: none; cursor: pointer; margin-top: 0.5rem; transition: opacity 0.2s; }
        .submit-btn:hover { opacity: 0.85; }
        .success-box { text-align: center; padding: 3rem 1rem; }
        .success-icon { width: 3.5rem; height: 3.5rem; border-radius: 50%; background: #bac6ff; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; }
      `}</style>

      <div className="contact-inner">
        {/* Left info */}
        <div>
          <p className="contact-label">Contact</p>
          <h2 className="contact-heading">Get In Touch</h2>
          <p className="contact-sub">Ready to make your listing stand out? Let&apos;s talk.</p>

          {[
            { label: 'Phone', val: '0400 000 000', href: 'tel:0400000000', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /> },
            { label: 'Email', val: 'hello@impactpropertymedia.com.au', href: 'mailto:hello@impactpropertymedia.com.au', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /> },
            { label: 'Location', val: 'Melbourne, VIC', href: undefined, icon: <><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></> },
            { label: 'Instagram', val: '@impactpropertymedia', href: 'https://instagram.com/impactpropertymedia', icon: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path strokeLinecap="round" strokeLinejoin="round" d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeLinecap="round" strokeLinejoin="round" /></> },
          ].map(({ label, val, href, icon }) => (
            <div key={label} className="contact-info-row">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} xmlns="http://www.w3.org/2000/svg">{icon}</svg>
              </div>
              <div>
                <div className="contact-info-label">{label}</div>
                {href ? <a href={href} className="contact-info-val" target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{val}</a>
                  : <span className="contact-info-val">{val}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Right form */}
        <div className="contact-form-wrap">
          {submitted ? (
            <div className="success-box">
              <div className="success-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1f1e1f" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f1e1f', marginBottom: '0.5rem' }}>Message Sent!</h3>
              <p style={{ fontSize: '0.875rem', color: '#555' }}>Thanks for reaching out. We&apos;ll be in touch shortly.</p>
              <button onClick={() => setSubmitted(false)} style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: '#7a8fff', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontFamily: 'Poppins, sans-serif' }}>Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Name *</label>
                <input className="form-input" type="text" placeholder="Your full name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input className="form-input" type="email" placeholder="you@email.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone *</label>
                  <input className="form-input" type="tel" placeholder="04XX XXX XXX" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Suburb / Property Address *</label>
                <input className="form-input" type="text" placeholder="e.g. 12 Smith St, Richmond VIC" value={form.suburb} onChange={e => setForm(p => ({ ...p, suburb: e.target.value }))} required />
              </div>
              <div className="form-group">
                <label className="form-label">Services</label>
                <div className="service-chips">
                  {SERVICES.map(s => (
                    <button key={s} type="button" onClick={() => toggle(s)} className={`service-chip${form.services.includes(s) ? ' active' : ''}`}>{s}</button>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-input" rows={4} placeholder="Tell us about your property..." value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} style={{ resize: 'vertical', minHeight: '100px' }} />
              </div>
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
