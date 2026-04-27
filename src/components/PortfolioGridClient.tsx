'use client'
import Image from 'next/image'
import { useState } from 'react'

type Item = { src: string; alt: string }

export default function PortfolioGridClient({ images }: { images: Item[] }) {
  const [active, setActive] = useState<Item | null>(null)

  return (
    <>
      <style>{`
        .port-grid { columns: 3; column-gap: 1rem; }
        @media (max-width: 900px) { .port-grid { columns: 2; } }
        @media (max-width: 560px) { .port-grid { columns: 1; } }
        .port-item { break-inside: avoid; margin-bottom: 1rem; position: relative; overflow: hidden; border-radius: 0.5rem; cursor: pointer; }
        .port-item img { width: 100%; height: auto; display: block; transition: transform 0.5s ease; }
        .port-item:hover img { transform: scale(1.05); }
        .port-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.55); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease; }
        .port-item:hover .port-overlay { opacity: 1; }
        .port-overlay span { color: #f8f8f8; font-size: 0.875rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; border: 1px solid rgba(255,255,255,0.6); padding: 0.5rem 1.25rem; border-radius: 100vw; }
        .lightbox-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.92); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 1rem; }
        .lightbox-img { max-width: 90vw; max-height: 90vh; border-radius: 0.5rem; object-fit: contain; }
        .lightbox-close { position: fixed; top: 1.25rem; right: 1.5rem; color: #fff; font-size: 2rem; cursor: pointer; line-height: 1; z-index: 1001; background: none; border: none; }
        .lightbox-alt { position: fixed; bottom: 1.5rem; left: 50%; transform: translateX(-50%); color: #ccc; font-size: 0.875rem; font-family: Poppins, sans-serif; }
      `}</style>

      <div className="port-grid">
        {images.map((img, i) => (
          <div key={i} className="port-item" onClick={() => setActive(img)}>
            <Image
              src={img.src}
              alt={img.alt}
              width={800}
              height={600}
              sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
            <div className="port-overlay"><span>View</span></div>
          </div>
        ))}
      </div>

      {active && (
        <div className="lightbox-backdrop" onClick={() => setActive(null)}>
          <button className="lightbox-close" onClick={() => setActive(null)}>×</button>
          <Image
            className="lightbox-img"
            src={active.src}
            alt={active.alt}
            width={1600}
            height={1200}
            style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: '0.5rem' }}
            onClick={e => e.stopPropagation()}
          />
          <p className="lightbox-alt">{active.alt}</p>
        </div>
      )}
    </>
  )
}
