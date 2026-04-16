'use client'

const testimonials = [
  {
    quote: 'Impact Property Media transformed how we present our listings. The photography is stunning and the turnaround is always on time.',
    name: 'Sarah K.',
    agency: 'Ray White Melbourne',
  },
  {
    quote: "We've worked with many photographers but Impact Property Media is on another level. Our listings sell 30% faster since switching.",
    name: 'James T.',
    agency: 'Barry Plant',
  },
  {
    quote: "The aerial footage alone is worth it. Buyers see the neighbourhood context immediately. Brilliant team to work with.",
    name: 'Priya M.',
    agency: 'Harcourts',
  },
]

export default function Testimonials() {
  return (
    <section style={{ background: '#1f1e1f', fontFamily: 'Poppins, sans-serif' }}>
      <style>{`
        .testi-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 6rem 2rem;
        }
        .testi-label {
          text-align: center;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #bac6ff;
          margin-bottom: 0.75rem;
        }
        .testi-heading {
          text-align: center;
          font-size: clamp(1.75rem, 3.5vw, 2.75rem);
          font-weight: 700;
          color: #f8f8f8;
          margin-bottom: 3.5rem;
          letter-spacing: -0.03em;
        }
        .testi-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 900px) { .testi-grid { grid-template-columns: 1fr; } }
        .testi-card {
          background: #2a292a;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 1rem;
          padding: 2rem;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .testi-card:hover {
          border-color: rgba(186,198,255,0.25);
          box-shadow: 0 0 30px rgba(186,198,255,0.1);
        }
        .testi-stars {
          color: #bac6ff;
          font-size: 0.9rem;
          letter-spacing: 2px;
          margin-bottom: 1rem;
        }
        .testi-quote {
          font-size: 0.95rem;
          color: #f8f8f8cc;
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }
        .testi-author {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .testi-avatar {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          background: #bac6ff;
          color: #1f1e1f;
          font-weight: 700;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .testi-name {
          font-size: 0.875rem;
          font-weight: 700;
          color: #f8f8f8;
        }
        .testi-agency {
          font-size: 0.75rem;
          color: #ffffff55;
          margin-top: 0.15rem;
        }
      `}</style>

      <div className="testi-inner">
        <p className="testi-label">Client Stories</p>
        <h2 className="testi-heading">What Agents Say</h2>
        <div className="testi-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testi-card">
              <div className="testi-stars">★★★★★</div>
              <p className="testi-quote">&ldquo;{t.quote}&rdquo;</p>
              <div className="testi-author">
                <div className="testi-avatar">{t.name[0]}</div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-agency">{t.agency}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
