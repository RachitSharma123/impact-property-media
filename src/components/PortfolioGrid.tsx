import { supabaseAdmin } from '@/lib/supabase'
import PortfolioGridClient from './PortfolioGridClient'

const FALLBACK = [
  { src: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80', alt: 'Modern luxury home exterior' },
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', alt: 'Bright open-plan living area' },
  { src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80', alt: 'Contemporary kitchen design' },
  { src: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80', alt: 'Suburban property with garden' },
  { src: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&q=80', alt: 'Waterfront property aerial' },
  { src: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80', alt: 'Classic Melbourne terrace home' },
  { src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80', alt: 'Designer pool and outdoor living' },
  { src: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80', alt: 'Luxury master bedroom suite' },
  { src: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80', alt: 'Penthouse with city views' },
]

export default async function PortfolioGrid() {
  const { data } = await supabaseAdmin.from('portfolio_items').select('*').order('display_order').limit(9)
  const images = data?.length
    ? data.map((i: any) => ({ src: i.image_url, alt: i.title || 'Portfolio image' }))
    : FALLBACK

  return (
    <section id="portfolio" style={{ background: '#1f1e1f', fontFamily: 'Poppins, sans-serif' }}>
      <style>{`
        .port-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 6rem 2rem;
        }
        .port-label {
          text-align: center;
          font-size: 1.2rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #bac6ff;
          margin-bottom: 0.75rem;
        }
        .port-heading {
          text-align: center;
          font-size: clamp(1.75rem, 3.5vw, 2.75rem);
          font-weight: 700;
          color: #f8f8f8;
          margin-bottom: 3rem;
          letter-spacing: -0.03em;
        }
        .port-grid {
          columns: 3;
          column-gap: 1rem;
        }
        @media (max-width: 900px) { .port-grid { columns: 2; } }
        @media (max-width: 560px) { .port-grid { columns: 1; } }
        .port-item {
          break-inside: avoid;
          margin-bottom: 1rem;
          position: relative;
          overflow: hidden;
          border-radius: 0.5rem;
          cursor: pointer;
        }
        .port-item img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.5s ease;
        }
        .port-item:hover img { transform: scale(1.05); }
        .port-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .port-item:hover .port-overlay { opacity: 1; }
        .port-overlay span {
          color: #f8f8f8;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border: 1px solid rgba(255,255,255,0.6);
          padding: 0.5rem 1.25rem;
          border-radius: 100vw;
        }
        .port-cta-wrap {
          text-align: center;
          margin-top: 3rem;
        }
        .port-cta {
          display: inline-block;
          padding: 0.85rem 2rem;
          border-radius: 100vw;
          background: #bac6ff;
          color: #1f1e1f;
          font-size: 0.875rem;
          font-weight: 700;
          text-decoration: none;
          transition: background 0.2s;
        }
        .port-cta:hover { background: #a0b0ff; }
      `}</style>

      <div className="port-inner">
        <p className="port-label">Recent Projects</p>
        <h2 className="port-heading">Our Work</h2>
        <PortfolioGridClient images={images} />
        <div className="port-cta-wrap">
          <a href="/portfolio" className="port-cta">View All Work →</a>
        </div>
      </div>
    </section>
  )
}
