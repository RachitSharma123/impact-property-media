'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabasePublic'

type Item = { src: string; alt: string }

function CollageCell({
  images,
  startIdx,
  onOpen,
}: {
  images: Item[]
  startIdx: number
  onOpen: (img: Item) => void
}) {
  const [idx, setIdx] = useState(startIdx % Math.max(images.length, 1))
  const [fade, setFade] = useState(true)
  const ref = useRef(startIdx % Math.max(images.length, 1))

  useEffect(() => {
    const t = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        ref.current = (ref.current + 1) % images.length
        setIdx(ref.current)
        setFade(true)
      }, 380)
    }, 2000)
    return () => clearInterval(t)
  }, [images.length])

  const img = images[idx]
  if (!img) return null

  return (
    <div
      className="portfolio-item"
      onClick={() => onOpen(img)}
    >
      <img
        src={img.src}
        alt={img.alt}
        loading="lazy"
        className="portfolio-item-img"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          opacity: fade ? 1 : 0,
          transition: 'opacity 0.38s ease',
        }}
      />
    </div>
  )
}

const FALLBACK: Item[] = [
  { src: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80', alt: 'Luxury living room' },
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', alt: 'Modern kitchen interior' },
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

const CELL_COUNT = 12

export default function PortfolioPage() {
  const [images, setImages] = useState<Item[]>(FALLBACK)
  const [active, setActive] = useState<Item | null>(null)

  useEffect(() => {
    supabase
      .from('portfolio_items')
      .select('image_url, title')
      .order('display_order')
      .then(({ data }) => {
        if (data?.length) {
          setImages(data.map((i: any) => ({ src: i.image_url, alt: i.title || 'Portfolio image' })))
        }
      })
  }, [])

  const step = Math.max(1, Math.floor(images.length / CELL_COUNT))

  return (
    <>
      <style>{`
        .portfolio-hero { background: #1f1e1f; padding: 8rem 2rem 5rem; text-align: center; }
        .portfolio-hero-label { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: #bac6ff; margin-bottom: 1.25rem; }
        .portfolio-hero h1 { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 700; color: #f8f8f8; letter-spacing: -0.03em; margin: 0 auto 1.25rem; max-width: 700px; line-height: 1.15; }
        .portfolio-hero-sub { font-size: clamp(1rem, 2vw, 1.15rem); color: rgba(248,248,248,0.6); max-width: 520px; margin: 0 auto; line-height: 1.65; }
        .portfolio-grid-section { background: #1f1e1f; padding: 2rem 2rem 5rem; }
        .portfolio-masonry { max-width: 1200px; margin: 0 auto; columns: 3; column-gap: 1.25rem; }
        @media (max-width: 900px) { .portfolio-masonry { columns: 2; } }
        @media (max-width: 560px) { .portfolio-masonry { columns: 1; } }
        .portfolio-item { break-inside: avoid; margin-bottom: 1.25rem; border-radius: 0.75rem; overflow: hidden; position: relative; cursor: pointer; display: block; }
        .portfolio-item-img { display: block; width: 100%; height: auto; }
        .portfolio-cta { background: #bac6ff; padding: 5rem 2rem; text-align: center; }
        .portfolio-cta h2 { font-size: clamp(1.5rem, 3.5vw, 2.5rem); font-weight: 700; color: #1f1e1f; letter-spacing: -0.03em; margin-bottom: 0.75rem; line-height: 1.2; }
        .portfolio-cta p { font-size: 1rem; color: rgba(31,30,31,0.7); margin-bottom: 2rem; max-width: 440px; margin-left: auto; margin-right: auto; }
        .portfolio-cta-btn { display: inline-block; padding: 0.9rem 2.5rem; border-radius: 100vw; background: #1f1e1f; color: #f8f8f8; font-size: 0.875rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; text-decoration: none; transition: opacity 0.2s, transform 0.2s; }
        .portfolio-cta-btn:hover { opacity: 0.85; transform: translateY(-2px); }
        .lightbox-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.92); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 1rem; }
        .lightbox-close { position: fixed; top: 1.25rem; right: 1.5rem; color: #fff; font-size: 2rem; cursor: pointer; line-height: 1; z-index: 1001; background: none; border: none; }
        .lightbox-alt { position: fixed; bottom: 1.5rem; left: 50%; transform: translateX(-50%); color: #ccc; font-size: 0.875rem; font-family: Poppins, sans-serif; }
      `}</style>

      <section className="portfolio-hero">
        <p className="portfolio-hero-label">Our Work</p>
        <h1>Our Portfolio</h1>
        <p className="portfolio-hero-sub">Every property tells a story. We make sure it&apos;s a great one.</p>
      </section>

      <section className="portfolio-grid-section">
        <div className="portfolio-masonry">
          {Array.from({ length: CELL_COUNT }).map((_, i) => (
            <CollageCell
              key={i}
              images={images}
              startIdx={i * step}
              onOpen={setActive}
            />
          ))}
        </div>
      </section>

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
