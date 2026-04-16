import Image from 'next/image'

export default function AboutSection() {
  return (
    <section id="about" style={{ backgroundColor: '#f8f8f8', fontFamily: 'Poppins, sans-serif' }}>
      <style>{`
        .about-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 6rem 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }
        @media (max-width: 900px) {
          .about-inner { grid-template-columns: 1fr; gap: 3rem; padding: 4rem 1.5rem; }
        }
        .about-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #bac6ff;
          margin-bottom: 1rem;
        }
        .about-heading {
          font-size: clamp(1.8rem, 3.5vw, 2.75rem);
          font-weight: 700;
          color: #1f1e1f;
          line-height: 1.2;
          margin-bottom: 1.5rem;
          letter-spacing: -0.03em;
        }
        .about-body {
          font-size: 1rem;
          color: #444;
          line-height: 1.75;
          margin-bottom: 1rem;
        }
        .about-stats {
          display: flex;
          gap: 2.5rem;
          margin: 2rem 0;
        }
        .about-stat-value {
          font-size: 2rem;
          font-weight: 700;
          color: #1f1e1f;
          line-height: 1;
        }
        .about-stat-label {
          font-size: 0.8rem;
          color: #666;
          margin-top: 0.35rem;
        }
        .about-cta {
          display: inline-block;
          padding: 0.85rem 2rem;
          border-radius: 100vw;
          background: #1f1e1f;
          color: #f8f8f8;
          font-size: 0.875rem;
          font-weight: 600;
          text-decoration: none;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          transition: opacity 0.2s;
        }
        .about-cta:hover { opacity: 0.85; }
        .about-img-wrap {
          position: relative;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.12);
        }
        .about-badge {
          position: absolute;
          bottom: 1.5rem;
          left: 1.5rem;
          background: #bac6ff;
          padding: 0.75rem 1.1rem;
          border-radius: 0.75rem;
          max-width: 180px;
          font-size: 0.8rem;
          font-weight: 700;
          color: #1f1e1f;
          line-height: 1.35;
        }
      `}</style>

      <div className="about-inner">
        {/* Left */}
        <div>
          <p className="about-label">About Us</p>
          <h2 className="about-heading">We Tell Your Property&apos;s Story</h2>
          <p className="about-body">
            Impact Property Media is Melbourne&apos;s premier real estate media company. We combine
            technical precision with creative vision to produce photography, video and digital
            content that makes properties stand out in any market.
          </p>
          <p className="about-body">
            Founded by passionate photographers with deep roots in the Melbourne property market,
            we understand what buyers respond to — and we make sure your listing delivers it.
          </p>
          <div className="about-stats">
            <div>
              <div className="about-stat-value">200+</div>
              <div className="about-stat-label">Agents Trust Us</div>
            </div>
            <div>
              <div className="about-stat-value">5000+</div>
              <div className="about-stat-label">Properties Shot</div>
            </div>
          </div>
          <a href="/about" className="about-cta">Meet the Team</a>
        </div>

        {/* Right */}
        <div className="about-img-wrap">
          <Image
            src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80"
            alt="Impact Property Media team at work"
            width={800}
            height={900}
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
          />
          <div className="about-badge">Melbourne&apos;s #1 Property Media Team</div>
        </div>
      </div>
    </section>
  )
}
