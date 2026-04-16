import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | Impact Property Media',
  description: 'Melbourne\'s premier real estate media company — built by photographers, for agents.',
}

export default function AboutPage() {
  return (
    <>
      <style>{`
        /* ── About Page Styles ─────────────────────────────── */
        .about-hero {
          background: #1f1e1f;
          padding: 8rem 2rem;
          text-align: center;
        }
        .about-hero-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #bac6ff;
          margin-bottom: 1.25rem;
        }
        .about-hero h1 {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          color: #f8f8f8;
          letter-spacing: -0.03em;
          margin: 0 auto 1.25rem;
          max-width: 800px;
          line-height: 1.15;
        }
        .about-hero-sub {
          font-size: clamp(1rem, 2vw, 1.2rem);
          color: rgba(248,248,248,0.6);
          max-width: 560px;
          margin: 0 auto;
          line-height: 1.65;
        }

        /* ── Story ────────────────────────────────────────── */
        .about-story {
          background: #f8f8f8;
          padding: 6rem 2rem;
        }
        .about-story-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }
        @media (max-width: 900px) {
          .about-story-inner { grid-template-columns: 1fr; gap: 3rem; }
          .about-story-img { order: -1; }
        }
        .about-story-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #bac6ff;
          margin-bottom: 1rem;
        }
        .about-story h2 {
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          font-weight: 700;
          color: #1f1e1f;
          letter-spacing: -0.03em;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }
        .about-story p {
          font-size: 0.95rem;
          color: #555;
          line-height: 1.75;
          margin-bottom: 1.25rem;
        }
        .about-story p:last-child { margin-bottom: 0; }
        .about-story-img {
          position: relative;
          border-radius: 1rem;
          overflow: hidden;
          aspect-ratio: 4 / 3;
          box-shadow: 0 24px 60px rgba(0,0,0,0.12);
        }

        /* ── Team ─────────────────────────────────────────── */
        .about-team {
          background: #1f1e1f;
          padding: 6rem 2rem;
        }
        .about-team-inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .about-team-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .about-team-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #bac6ff;
          margin-bottom: 1rem;
        }
        .about-team h2 {
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          font-weight: 700;
          color: #f8f8f8;
          letter-spacing: -0.03em;
          margin: 0;
        }
        .about-team-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }
        @media (max-width: 900px) { .about-team-grid { grid-template-columns: 1fr; } }
        @media (min-width: 601px) and (max-width: 900px) { .about-team-grid { grid-template-columns: 1fr 1fr; } }
        .team-card {
          background: #2a292a;
          border-radius: 1rem;
          padding: 2.25rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: transform 0.3s ease;
        }
        .team-card:hover { transform: translateY(-4px); }
        .team-avatar {
          width: 4rem;
          height: 4rem;
          border-radius: 50%;
          background: #bac6ff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f1e1f;
          margin-bottom: 1.5rem;
          flex-shrink: 0;
        }
        .team-name {
          font-size: 1.1rem;
          font-weight: 700;
          color: #f8f8f8;
          margin-bottom: 0.35rem;
        }
        .team-role {
          font-size: 0.78rem;
          font-weight: 600;
          color: #bac6ff;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }
        .team-bio {
          font-size: 0.875rem;
          color: rgba(248,248,248,0.6);
          line-height: 1.7;
        }

        /* ── Values ───────────────────────────────────────── */
        .about-values {
          background: #f8f8f8;
          padding: 6rem 2rem;
        }
        .about-values-inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .about-values-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .about-values-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #bac6ff;
          margin-bottom: 1rem;
        }
        .about-values h2 {
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          font-weight: 700;
          color: #1f1e1f;
          letter-spacing: -0.03em;
          margin: 0;
        }
        .about-values-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        @media (max-width: 600px) { .about-values-grid { grid-template-columns: 1fr; } }
        .value-card {
          background: #fff;
          border: 1px solid #ebebeb;
          border-radius: 1rem;
          padding: 2.25rem 2rem;
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
          transition: box-shadow 0.25s ease;
        }
        .value-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.08); }
        .value-num {
          font-size: 2rem;
          font-weight: 800;
          color: rgba(186,198,255,0.4);
          line-height: 1;
          flex-shrink: 0;
          min-width: 2rem;
        }
        .value-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #1f1e1f;
          margin-bottom: 0.4rem;
        }
        .value-desc {
          font-size: 0.875rem;
          color: #666;
          line-height: 1.6;
          margin: 0;
        }

        /* ── CTA ──────────────────────────────────────────── */
        .about-cta {
          background: #1f1e1f;
          padding: 6rem 2rem;
          text-align: center;
        }
        .about-cta h2 {
          font-size: clamp(1.75rem, 4vw, 3rem);
          font-weight: 700;
          color: #f8f8f8;
          letter-spacing: -0.03em;
          margin-bottom: 1rem;
        }
        .about-cta p {
          font-size: 1rem;
          color: rgba(248,248,248,0.6);
          margin-bottom: 2.5rem;
          max-width: 480px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.65;
        }
        .about-cta-btn {
          display: inline-block;
          padding: 0.9rem 2.5rem;
          border-radius: 100vw;
          background: #bac6ff;
          color: #1f1e1f;
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.2s;
        }
        .about-cta-btn:hover { opacity: 0.88; transform: translateY(-2px); }
      `}</style>

      {/* ── Hero ── */}
      <section className="about-hero">
        <p className="about-hero-label">Who We Are</p>
        <h1>About Impact Property Media</h1>
        <p className="about-hero-sub">
          Melbourne&apos;s premier real estate media company — built by photographers, for agents.
        </p>
      </section>

      {/* ── Story ── */}
      <section className="about-story">
        <div className="about-story-inner">
          <div>
            <p className="about-story-label">Our Story</p>
            <h2>Our Story</h2>
            <p>
              Impact Property Media was born from a simple frustration: too many Melbourne listings were
              being sold short by mediocre photography. In 2016, founder Alex Chen set out to change that,
              bringing a fine-art eye and cinematic sensibility to the real estate world.
            </p>
            <p>
              What started as a solo operation shooting weekend opens for local agencies quickly grew into
              a full-service media studio. We added drone pilots, videographers, and virtual-tour
              specialists — each sharing the same obsession with quality and light that defines
              the Impact look.
            </p>
            <p>
              Today we serve hundreds of agents and vendors across Greater Melbourne, from inner-city
              apartments to sprawling Mornington Peninsula estates. Every shoot is treated with the same
              care: the property is the hero, and our job is to tell its story beautifully.
            </p>
          </div>
          <div className="about-story-img">
            <Image
              src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80"
              alt="Modern Melbourne property interior"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="about-team">
        <div className="about-team-inner">
          <div className="about-team-header">
            <p className="about-team-label">The People</p>
            <h2>Meet The Team</h2>
          </div>
          <div className="about-team-grid">
            {[
              {
                initial: 'A',
                name: 'Alex Chen',
                role: 'Lead Photographer & Founder',
                bio: "10+ years shooting Melbourne's finest properties. Alex's eye for light and composition has defined our signature style.",
              },
              {
                initial: 'J',
                name: 'Jordan Lee',
                role: 'Videographer & Drone Pilot',
                bio: 'Licensed drone pilot and cinematic videographer. Jordan brings aerial perspectives that transform how buyers see a property.',
              },
              {
                initial: 'M',
                name: 'Mia Patel',
                role: 'Virtual Tours Specialist',
                bio: 'Mia produces immersive 3D virtual tours and floor plans that give buyers the full picture before they visit.',
              },
            ].map((m) => (
              <div key={m.name} className="team-card">
                <div className="team-avatar">{m.initial}</div>
                <div className="team-name">{m.name}</div>
                <div className="team-role">{m.role}</div>
                <p className="team-bio">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="about-values">
        <div className="about-values-inner">
          <div className="about-values-header">
            <p className="about-values-label">What We Stand For</p>
            <h2>Our Values</h2>
          </div>
          <div className="about-values-grid">
            {[
              { num: '01', title: 'Precision', desc: 'Every angle, every edit — crafted to the exact standard your listing deserves.' },
              { num: '02', title: 'Speed', desc: 'Next-business-day turnaround as standard, because your listing can\'t wait.' },
              { num: '03', title: 'Quality', desc: 'Uncompromising post-production and on-set discipline in every single shoot.' },
              { num: '04', title: 'Results', desc: 'We measure success by how fast your listing sells — and for how much.' },
            ].map((v) => (
              <div key={v.title} className="value-card">
                <span className="value-num">{v.num}</span>
                <div>
                  <div className="value-title">{v.title}</div>
                  <p className="value-desc">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="about-cta">
        <h2>Ready to Work Together?</h2>
        <p>Let&apos;s create something extraordinary for your next listing.</p>
        <Link href="/contact" className="about-cta-btn">Get In Touch</Link>
      </section>
    </>
  )
}
