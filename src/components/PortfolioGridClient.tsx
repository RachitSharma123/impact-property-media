'use client'
import { useState } from 'react'

type Item = { src: string; alt: string }

const CELL_COUNT = 9

export default function PortfolioGridClient({ images }: { images: Item[] }) {
  const [active, setActive] = useState<Item | null>(null)

  if (!images.length) return null

  const displayed = images.slice(0, CELL_COUNT)

  return (
    <>
      <style>{`
        .port-grid { columns: 3; column-gap: 1rem; }
        @media (max-width: 900px) { .port-grid { columns: 2; } }
        @media (max-width: 560px) { .port-grid { columns: 1; } }
        .port-item { break-inside: avoid; margin-bottom: 1rem; border-radius: 0.5rem; overflow: hidden; position: relative; cursor: pointer; }
        .port-item img { width: 100%; height: auto; display: block; transition: transform 0.4s ease; }
        .port-item:hover img { transform: scale(1.04); }
        .port-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.45); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s; }
        .port-item:hover .port-overlay { opacity: 1; }
        .lightbox-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.92); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 1rem; }
        .lightbox-img { max-width: 90vw; max-height: 90vh; border-radius: 0.5rem; object-fit: contain; }
        .lightbox-close { position: fixed; top: 1.25rem; right: 1.5rem; color: #fff; font-size: 2rem; cursor: pointer; line-height: 1; z-index: 1001; background: none; border: none; }
        .lightbox-alt { position: fixed; bottom: 1.5rem; left: 50%; transform: translateX(-50%); color: #ccc; font-size: 0.875rem; font-family: Poppins, sans-serif; }
      `}</style>

      <div className="port-grid">
        {displayed.map((img, i) => (
          <div key={i} className="port-item" onClick={() => setActive(img)}>
            <img src={img.src} alt={img.alt} loading="lazy" />
            <div className="port-overlay">
              <span style={{ color: '#f8f8f8', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.6)', padding: '0.5rem 1.25rem', borderRadius: '100vw' }}>View</span>
            </div>
          </div>
        ))}
      </div>

      {active && (
        <div className="lightbox-backdrop" onClick={() => setActive(null)}>
          <button className="lightbox-close" onClick={() => setActive(null)}>×</button>
          <img
            className="lightbox-img"
            src={active.src}
            alt={active.alt}
            onClick={e => e.stopPropagation()}
          />
          <p className="lightbox-alt">{active.alt}</p>
        </div>
      )}
    </>
  )
}
