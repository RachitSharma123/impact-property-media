import Image from 'next/image'
import { supabaseAdmin } from '@/lib/supabase'

const DEFAULTS: Record<string, string> = {
  about_heading: "We Tell Your Property's Story",
  about_body1: "Impact Property Media is Melbourne's premier real estate media company. We combine technical precision with creative vision to produce photography, video and digital content that makes properties stand out in any market.",
  about_body2: "Founded by passionate photographers with deep roots in the Melbourne property market, we understand what buyers respond to — and we make sure your listing delivers it.",
  about_stat1_value: '200+',
  about_stat1_label: 'Agents Trust Us',
  about_stat2_value: '5000+',
  about_stat2_label: 'Properties Shot',
  about_image_url: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80',
  about_badge: "Melbourne's #1 Property Media Team",
}

export default async function AboutSection() {
  let content: Record<string, string> = { ...DEFAULTS }

  try {
    const { data } = await supabaseAdmin
      .from('site_content')
      .select('key, value')
      .in('key', Object.keys(DEFAULTS))

    if (data) {
      data.forEach(row => {
        content[row.key] = row.value
      })
    }
  } catch {
    // fall back to defaults
  }

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
          font-size: 1.2rem;
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
          font-size: 1.2rem;
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
          font-size: 1.2rem;
          font-weight: 700;
          color: #1f1e1f;
          line-height: 1.35;
        }
      `}</style>

      <div className="about-inner">
        {/* Left */}
        <div>
          <p className="about-label">About Us</p>
          <h2 className="about-heading">{content.about_heading}</h2>
          <p className="about-body">{content.about_body1}</p>
          <p className="about-body">{content.about_body2}</p>
          <div className="about-stats">
            <div>
              <div className="about-stat-value">{content.about_stat1_value}</div>
              <div className="about-stat-label">{content.about_stat1_label}</div>
            </div>
            <div>
              <div className="about-stat-value">{content.about_stat2_value}</div>
              <div className="about-stat-label">{content.about_stat2_label}</div>
            </div>
          </div>
          <a href="/about" className="about-cta">Meet the Team</a>
        </div>

        {/* Right */}
        <div className="about-img-wrap">
          <Image
            src={content.about_image_url}
            alt="Impact Property Media team at work"
            width={800}
            height={900}
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
          />
          <div className="about-badge">{content.about_badge}</div>
        </div>
      </div>
    </section>
  )
}
