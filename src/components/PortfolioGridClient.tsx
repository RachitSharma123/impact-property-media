'use client'
import { useState, useEffect, useRef } from 'react'

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
      className="port-item"
      onClick={() => onOpen(img)}
      style={{ cursor: 'pointer', breakInside: 'avoid', marginBottom: '1rem', borderRadius: '0.5rem', overflow: 'hidden', position: 'relative' }}
    >
      <img
        src={img.src}
        alt={img.alt}
        loading="lazy"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          opacity: fade ? 1 : 0,
          transition: 'opacity 0.38s ease',
        }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,0,0,0.45)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: 0, transition: 'opacity 0.3s',
      }} className="port-overlay">
        <span style={{
          color: '#f8f8f8', fontSize: '0.875rem', fontWeight: 600,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          border: '1px solid rgba(255,255,255,0.6)', padding: '0.5rem 1.25rem', borderRadius: '100vw',
        }}>View</span>
      </div>
    </div>
  )
}

const CELL_COUNT = 9

export default function PortfolioGridClient({ images }: { images: Item[] }) {
  const [active, setActive] = useState<Item | null>(null)

  if (!images.length) return null

  // Space starting offsets evenly across all images
  const step = Math.max(1, Math.floor(images.length / CELL_COUNT))

  return (
    <>
      <style>{`
        .port-grid { columns: 3; column-gap: 1rem; }
        @media (max-width: 900px) { .port-grid { columns: 2; } }
        @media (max-width: 560px) { .port-grid { columns: 1; } }
        .port-item:hover .port-overlay { opacity: 1 !important; }

        .lightbox-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.92); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 1rem; }
        .lightbox-img { max-width: 90vw; max-height: 90vh; border-radius: 0.5rem; object-fit: contain; }
        .lightbox-close { position: fixed; top: 1.25rem; right: 1.5rem; color: #fff; font-size: 2rem; cursor: pointer; line-height: 1; z-index: 1001; background: none; border: none; }
        .lightbox-alt { position: fixed; bottom: 1.5rem; left: 50%; transform: translateX(-50%); color: #ccc; font-size: 0.875rem; font-family: Poppins, sans-serif; }
      `}</style>

      <div className="port-grid">
        {Array.from({ length: CELL_COUNT }).map((_, i) => (
          <CollageCell
            key={i}
            images={images}
            startIdx={i * step}
            onOpen={setActive}
          />
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
            style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: '0.5rem' }}
          />
          <p className="lightbox-alt">{active.alt}</p>
        </div>
      )}
    </>
  )
}
