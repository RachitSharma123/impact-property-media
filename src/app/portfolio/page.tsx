'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabasePublic'

type Item = { src: string; alt: string; featured?: boolean }

const FALLBACK: Item[] = [
  { src: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80', alt: 'Luxury living room', featured: true },
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', alt: 'Modern kitchen interior', featured: true },
  { src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80', alt: 'Open-plan living space' },
  { src: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80', alt: 'Family home exterior' },
  { src: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&q=80', alt: 'Beachside property aerial' },
  { src: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80', alt: 'Suburban family home' },
  { src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80', alt: 'Pool and entertainment area' },
  { src: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80', alt: 'Master bedroom suite' },
  { src: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80', alt: 'Waterfront property' },
  { src: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80', alt: 'Modern apartment building' },
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', alt: '3D virtual tour view' },
  { src: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80', alt: 'Contemporary home interior' },
]

export default function PortfolioPage() {
  const [allImages, setAllImages] = useState<Item[] | null>(null)
  const [active, setActive] = useState<Item | null>(null)

  useEffect(() => {
    supabase
      .from('portfolio_items')
      .select('image_url, title, featured, created_at')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data?.length) {
          setAllImages(data.map((i: any) => ({ src: i.image_url, alt: i.title || 'Portfolio image', featured: !!i.featured })))
        } else {
          setAllImages(FALLBACK)
        }
      })
  }, [])

  const featured = allImages?.filter(i => i.featured) ?? []
  const nonFeatured = allImages?.filter(i => !i.featured) ?? []
  const latest = nonFeatured.slice(0, 1)
  const rest = nonFeatured.slice(1)

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        .portfolio-hero { background: #1f1e1f; padding: 8rem 2rem 5rem; text-align: center; }
        .portfolio-hero-label { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: #bac6ff; margin-bottom: 1.25rem; }
        .portfolio-hero h1 { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 700; color: #f8f8f8; letter-spacing: -0.03em; margin: 0 auto 1.25rem; max-width: 700px; line-height: 1.15; }
        .portfolio-hero-sub { font-size: clamp(1rem, 2vw, 1.15rem); color: rgba(248,248,248,0.6); max-width: 520px; margin: 0 auto; line-height: 1.65; }

        .port-section { background: #1f1e1f; padding: 3rem 2rem; }
        .port-section:first-of-type { padding-top: 2rem; }
        .port-inner { max-width: 1200px; margin: 0 auto; }
        .port-section-label { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #bac6ff; margin-bottom: 1.25rem; }

        /* Featured grid — 2 col equal height */
        .featured-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        @media (max-width: 600px) { .featured-grid { grid-template-columns: 1fr; } }
        .featured-item { border-radius: 0.75rem; overflow: hidden; position: relative; cursor: pointer; aspect-ratio: 4/3; }
        .featured-item img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s ease; }
        .featured-item:hover img { transform: scale(1.05); }
        .featured-badge { position: absolute; top: 0.75rem; left: 0.75rem; background: #bac6ff; color: #1f1e1f; font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 0.25rem 0.6rem; border-radius: 100vw; }

        /* Latest — full width hero */
        .latest-item { border-radius: 0.75rem; overflow: hidden; position: relative; cursor: pointer; aspect-ratio: 16/7; }
        .latest-item img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s ease; }
        .latest-item:hover img { transform: scale(1.03); }
        .latest-badge { position: absolute; top: 0.75rem; left: 0.75rem; background: #4ade80; color: #111; font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 0.25rem 0.6rem; border-radius: 100vw; }

        /* Overlay shared */
        .port-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.45); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s; }
        .featured-item:hover .port-overlay,
        .latest-item:hover .port-overlay,
        .rest-item:hover .port-overlay { opacity: 1; }
        .port-overlay span { color: #f8f8f8; font-size: 0.875rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; border: 1px solid rgba(255,255,255,0.6); padding: 0.5rem 1.25rem; border-radius: 100vw; }

        /* Rest — 3 column masonry */
        .rest-grid { columns: 3; column-gap: 1rem; }
        @media (max-width: 900px) { .rest-grid { columns: 2; } }
        @media (max-width: 560px) { .rest-grid { columns: 1; } }
        .rest-item { break-inside: avoid; margin-bottom: 1rem; border-radius: 0.75rem; overflow: hidden; position: relative; cursor: pointer; }
        .rest-item img { width: 100%; height: auto; display: block; transition: transform 0.4s ease; }
        .rest-item:hover img { transform: scale(1.04); }

        /* Skeleton */
        .skeleton { background: #2e2d2e; animation: shimmer 1.5s infinite; border-radius: 0.75rem; }
        @keyframes shimmer { 0%,100% { opacity: 0.4; } 50% { opacity: 0.8; } }

        .portfolio-cta { background: #bac6ff; padding: 5rem 2rem; text-align: center; }
        .portfolio-cta h2 { font-size: clamp(1.5rem, 3.5vw, 2.5rem); font-weight: 700; color: #1f1e1f; letter-spacing: -0.03em; margin-bottom: 0.75rem; line-height: 1.2; }
        .portfolio-cta p { font-size: 1rem; color: rgba(31,30,31,0.7); margin-bottom: 2rem; max-width: 440px; margin-left: auto; margin-right: auto; }
        .portfolio-cta-btn { display: inline-block; padding: 0.9rem 2.5rem; border-radius: 100vw; background: #1f1e1f; color: #f8f8f8; font-size: 0.875rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; text-decoration: none; transition: opacity 0.2s, transform 0.2s; }
        .portfolio-cta-btn:hover { opacity: 0.85; transform: translateY(-2px); }

        .lightbox-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.92); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 1rem; }
        .lightbox-close { position: fixed; top: 1.25rem; right: 1.5rem; color: #fff; font-size: 2rem; cursor: pointer; line-height: 1; z-index: 1001; background: none; border: none; }
        .lightbox-alt { position: fixed; bottom: 1.5rem; left: 50%; transform: translateX(-50%); color: #ccc; font-size: 0.875rem; font-family: Poppins, sans-serif; white-space: nowrap; }
      `}</style>

      <section className="portfolio-hero">
        <p className="portfolio-hero-label">Our Work</p>
        <h1>Our Portfolio</h1>
        <p className="portfolio-hero-sub">Every property tells a story. We make sure it&apos;s a great one.</p>
      </section>

      {allImages === null ? (
        /* Loading skeletons */
        <section className="port-section">
          <div className="port-inner">
            <div className="featured-grid" style={{ marginBottom: '1rem' }}>
              <div className="skeleton" style={{ aspectRatio: '4/3' }} />
              <div className="skeleton" style={{ aspectRatio: '4/3' }} />
            </div>
            <div className="skeleton" style={{ aspectRatio: '16/7', marginBottom: '1rem' }} />
            <div className="rest-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="skeleton" style={{ height: i % 3 === 0 ? 240 : i % 3 === 1 ? 180 : 300, marginBottom: '1rem' }} />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Featured */}
          {featured.length > 0 && (
            <section className="port-section">
              <div className="port-inner">
                <p className="port-section-label">Featured</p>
                <div className="featured-grid">
                  {featured.map((img, i) => (
                    <div key={i} className="featured-item" onClick={() => setActive(img)}>
                      <img src={img.src} alt={img.alt} loading={i < 2 ? 'eager' : 'lazy'} />
                      <span className="featured-badge">Featured</span>
                      <div className="port-overlay"><span>View</span></div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Latest */}
          {latest.length > 0 && (
            <section className="port-section" style={{ paddingTop: featured.length ? '0' : undefined }}>
              <div className="port-inner">
                <p className="port-section-label">Latest Upload</p>
                <div className="latest-item" onClick={() => setActive(latest[0])}>
                  <img src={latest[0].src} alt={latest[0].alt} loading="eager" />
                  <span className="latest-badge">New</span>
                  <div className="port-overlay"><span>View</span></div>
                </div>
              </div>
            </section>
          )}

          {/* Rest — 3 columns */}
          {rest.length > 0 && (
            <section className="port-section" style={{ paddingTop: '0' }}>
              <div className="port-inner">
                <p className="port-section-label">All Work</p>
                <div className="rest-grid">
                  {rest.map((img, i) => (
                    <div key={i} className="rest-item" onClick={() => setActive(img)}>
                      <img src={img.src} alt={img.alt} loading="lazy" />
                      <div className="port-overlay"><span>View</span></div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      <section className="portfolio-cta">
        <h2>Like What You See?<br />Let&apos;s Work Together</h2>
        <p>Book a shoot or request a quote — we&apos;ll get back to you within the hour.</p>
        <Link href="/contact" className="portfolio-cta-btn">Get In Touch</Link>
      </section>

      {active && (
        <div className="lightbox-backdrop" onClick={() => setActive(null)}>
          <button className="lightbox-close" onClick={() => setActive(null)}>×</button>
          <img
            src={active.src}
            alt={active.alt}
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: '0.5rem' }}
          />
          <p className="lightbox-alt">{active.alt}</p>
        </div>
      )}
    </>
  )
}
