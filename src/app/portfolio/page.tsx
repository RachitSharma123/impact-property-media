'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabasePublic'

const CATEGORIES = ['All', 'Photography', 'Videography', 'Aerial', 'Virtual Tours'] as const
type Category = (typeof CATEGORIES)[number]

const CAT_MAP: Record<string, Category> = {
  photography: 'Photography',
  videography: 'Videography',
  aerial: 'Aerial',
  'virtual-tours': 'Virtual Tours',
  'floor-plans': 'Photography',
}

const FALLBACK: { src: string; alt: string; category: Exclude<Category, 'All'> }[] = [
  { src: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80', alt: 'Luxury living room', category: 'Photography' },
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', alt: 'Modern kitchen interior', category: 'Photography' },
  { src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80', alt: 'Open-plan living space', category: 'Videography' },
  { src: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80', alt: 'Family home exterior', category: 'Photography' },
  { src: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&q=80', alt: 'Beachside property aerial', category: 'Aerial' },
  { src: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80', alt: 'Suburban family home', category: 'Photography' },
  { src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80', alt: 'Pool and entertainment area', category: 'Aerial' },
  { src: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80', alt: 'Master bedroom suite', category: 'Virtual Tours' },
  { src: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80', alt: 'Waterfront property', category: 'Aerial' },
  { src: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80', alt: 'Modern apartment building', category: 'Videography' },
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', alt: '3D virtual tour view', category: 'Virtual Tours' },
  { src: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80', alt: 'Contemporary home interior', category: 'Virtual Tours' },
]

export default function PortfolioPage() {
  const [active, setActive] = useState<Category>('All')
  const [items, setItems] = useState(FALLBACK)

  useEffect(() => {
    supabase.from('portfolio_items').select('*').order('display_order').then(({ data }) => {
      if (data?.length) {
        setItems(data.map((i: any) => ({
          src: i.image_url,
          alt: i.title || 'Portfolio image',
          category: (CAT_MAP[i.category] ?? 'Photography') as Exclude<Category, 'All'>,
        })))
      }
    })
  }, [])

  const filtered = active === 'All' ? items : items.filter(i => i.category === active)

  return (
    <>
      <style>{`
        .portfolio-hero { background: #1f1e1f; padding: 8rem 2rem 5rem; text-align: center; }
        .portfolio-hero-label { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: #bac6ff; margin-bottom: 1.25rem; }
        .portfolio-hero h1 { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 700; color: #f8f8f8; letter-spacing: -0.03em; margin: 0 auto 1.25rem; max-width: 700px; line-height: 1.15; }
        .portfolio-hero-sub { font-size: clamp(1rem, 2vw, 1.15rem); color: rgba(248,248,248,0.6); max-width: 520px; margin: 0 auto; line-height: 1.65; }
        .portfolio-filter-wrap { background: #1f1e1f; padding: 0 2rem 3rem; }
        .portfolio-filter { max-width: 1200px; margin: 0 auto; display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center; }
        .filter-btn { padding: 0.55rem 1.5rem; border-radius: 100vw; font-size: 0.8rem; font-weight: 600; font-family: Poppins, sans-serif; cursor: pointer; transition: all 0.2s ease; letter-spacing: 0.04em; text-transform: uppercase; }
        .filter-btn-inactive { background: transparent; border: 1px solid rgba(248,248,248,0.25); color: rgba(248,248,248,0.7); }
        .filter-btn-inactive:hover { border-color: #bac6ff; color: #bac6ff; }
        .filter-btn-active { background: #bac6ff; border: 1px solid #bac6ff; color: #1f1e1f; }
        .portfolio-grid-section { background: #1f1e1f; padding: 0 2rem 5rem; }
        .portfolio-masonry { max-width: 1200px; margin: 0 auto; columns: 3; column-gap: 1.25rem; }
        @media (max-width: 900px) { .portfolio-masonry { columns: 2; } }
        @media (max-width: 560px) { .portfolio-masonry { columns: 1; } }
        .portfolio-item { break-inside: avoid; margin-bottom: 1.25rem; border-radius: 0.75rem; overflow: hidden; position: relative; cursor: pointer; display: block; }
        .portfolio-item-img { display: block; width: 100%; height: auto; transition: transform 0.45s ease; }
        .portfolio-item:hover .portfolio-item-img { transform: scale(1.04); }
        .portfolio-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(31,30,31,0.85) 0%, transparent 55%); opacity: 0; transition: opacity 0.3s ease; display: flex; align-items: flex-end; padding: 1.25rem 1rem; }
        .portfolio-item:hover .portfolio-overlay { opacity: 1; }
        .portfolio-overlay-tag { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #bac6ff; background: rgba(31,30,31,0.6); padding: 0.3rem 0.85rem; border-radius: 100vw; border: 1px solid rgba(186,198,255,0.35); }
        .portfolio-cta { background: #bac6ff; padding: 5rem 2rem; text-align: center; }
        .portfolio-cta h2 { font-size: clamp(1.5rem, 3.5vw, 2.5rem); font-weight: 700; color: #1f1e1f; letter-spacing: -0.03em; margin-bottom: 0.75rem; line-height: 1.2; }
        .portfolio-cta p { font-size: 1rem; color: rgba(31,30,31,0.7); margin-bottom: 2rem; max-width: 440px; margin-left: auto; margin-right: auto; }
        .portfolio-cta-btn { display: inline-block; padding: 0.9rem 2.5rem; border-radius: 100vw; background: #1f1e1f; color: #f8f8f8; font-size: 0.875rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; text-decoration: none; transition: opacity 0.2s, transform 0.2s; }
        .portfolio-cta-btn:hover { opacity: 0.85; transform: translateY(-2px); }
      `}</style>

      <section className="portfolio-hero">
        <p className="portfolio-hero-label">Our Work</p>
        <h1>Our Portfolio</h1>
        <p className="portfolio-hero-sub">Every property tells a story. We make sure it&apos;s a great one.</p>
      </section>

      <div className="portfolio-filter-wrap">
        <div className="portfolio-filter">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActive(cat)} className={`filter-btn ${active === cat ? 'filter-btn-active' : 'filter-btn-inactive'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <section className="portfolio-grid-section">
        <div className="portfolio-masonry">
          {filtered.map((item, idx) => (
            <div key={`${item.src}-${idx}`} className="portfolio-item">
              <Image
                src={item.src}
                alt={item.alt}
                width={800}
                height={600}
                className="portfolio-item-img"
                sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
              <div className="portfolio-overlay">
                <span className="portfolio-overlay-tag">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="portfolio-cta">
        <h2>Like What You See?<br />Let&apos;s Work Together</h2>
        <p>Book a shoot or request a quote — we&apos;ll get back to you within the hour.</p>
        <Link href="/contact" className="portfolio-cta-btn">Get In Touch</Link>
      </section>
    </>
  )
}
