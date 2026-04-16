import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Aerial & Drone Photography | Impact Property Media",
  description:
    "CASA-compliant licensed drone pilots delivering stunning aerial stills and video for Melbourne real estate listings. Add-on from $199.",
};

const included = [
  { icon: "🪪", title: "Licensed & Insured Pilots", desc: "Our drone operators hold current CASA Remote Pilot Licences and full public liability insurance." },
  { icon: "✅", title: "CASA Compliant", desc: "All flights are pre-planned and comply with Australian airspace regulations." },
  { icon: "📸", title: "Aerial Stills", desc: "High-resolution aerial photographs at multiple altitudes and angles." },
  { icon: "🎥", title: "Aerial Video", desc: "Smooth cinematic drone footage to complement your property walkthrough." },
  { icon: "🗺️", title: "Location Context Shots", desc: "Neighbourhood, street, and proximity shots that tell the full location story." },
];

const samples = [
  { id: "photo-1473968512647-3e447244af8f", alt: "Drone flying above suburban neighbourhood" },
  { id: "photo-1600047509807-ba8f99d2cdde", alt: "Aerial view of a large property" },
  { id: "photo-1600566753086-00f18fb6b3ea", alt: "Bird's-eye street perspective" },
];

export default function AerialPage() {
  return (
    <>
      <style>{`
        .svc-page { font-family: Poppins, sans-serif; }

        .svc-hero {
          position: relative;
          height: 80vh;
          min-height: 520px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
          background: #1f1e1f;
        }
        .svc-hero-img {
          position: absolute;
          inset: 0;
          object-fit: cover;
          width: 100%;
          height: 100%;
          opacity: 0.45;
        }
        .svc-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, #1f1e1fee 0%, #1f1e1f88 50%, #1f1e1fee 100%);
        }
        .svc-hero-content {
          position: relative;
          z-index: 2;
          padding: 2rem;
          max-width: 800px;
        }
        .svc-hero-kicker {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #bac6ff;
          margin-bottom: 1.25rem;
        }
        .svc-hero h1 {
          font-size: clamp(2.4rem, 5.5vw, 4rem);
          font-weight: 700;
          color: #f8f8f8;
          margin: 0 0 1rem 0;
          line-height: 1.1;
        }
        .svc-hero-tagline {
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: #ffffffcc;
          margin: 0 0 2rem 0;
          line-height: 1.5;
        }
        .svc-hero-price {
          display: inline-block;
          background: #bac6ff22;
          border: 1px solid #bac6ff55;
          color: #bac6ff;
          font-size: 1rem;
          font-weight: 600;
          padding: 0.5rem 1.5rem;
          border-radius: 100vw;
        }

        .svc-overview {
          background: #f8f8f8;
          padding: 6rem 2rem;
        }
        .svc-overview-inner {
          display: flex;
          flex-direction: row;
          gap: 4rem;
          align-items: center;
          max-width: 1100px;
          margin: 0 auto;
        }
        .svc-overview-text { flex: 1 1 400px; }
        .svc-overview-kicker {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #bac6ff;
          display: block;
          margin-bottom: 0.75rem;
        }
        .svc-overview h2 {
          font-size: clamp(1.75rem, 3vw, 2.5rem);
          font-weight: 700;
          color: #1f1e1f;
          margin: 0 0 1.25rem 0;
          line-height: 1.2;
        }
        .svc-overview p {
          font-size: 0.97rem;
          color: #1f1e1fcc;
          line-height: 1.8;
          margin: 0 0 1rem 0;
        }
        .svc-overview p:last-child { margin-bottom: 0; }
        .svc-overview-image-wrap {
          flex: 1 1 400px;
          border-radius: 1rem;
          overflow: hidden;
          aspect-ratio: 4/3;
          position: relative;
        }

        .svc-included {
          background: #1f1e1f;
          padding: 6rem 2rem;
        }
        .svc-section-heading {
          text-align: center;
          font-size: clamp(1.75rem, 3.5vw, 2.75rem);
          font-weight: 700;
          color: #f8f8f8;
          margin: 0 0 0.75rem 0;
        }
        .svc-section-sub {
          text-align: center;
          font-size: 1rem;
          color: #ffffff99;
          margin: 0 0 3.5rem 0;
        }
        .svc-included-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          justify-content: center;
          max-width: 1100px;
          margin: 0 auto;
        }
        .svc-included-card {
          background: #2a292a;
          border: 1px solid #ffffff0f;
          border-radius: 1rem;
          padding: 1.75rem;
          flex: 1 1 180px;
          max-width: 210px;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          transition: transform 0.2s ease;
        }
        .svc-included-card:hover { transform: translateY(-3px); }
        .svc-inc-icon { font-size: 2rem; }
        .svc-inc-title { font-size: 0.95rem; font-weight: 700; color: #f8f8f8; }
        .svc-inc-desc { font-size: 0.82rem; color: #ffffff88; line-height: 1.55; }

        .svc-samples {
          background: #1f1e1f;
          padding: 2rem 2rem 6rem;
        }
        .svc-samples-heading {
          text-align: center;
          font-size: clamp(1.5rem, 3vw, 2.25rem);
          font-weight: 700;
          color: #f8f8f8;
          margin: 0 0 2.5rem 0;
        }
        .svc-samples-row {
          display: flex;
          flex-direction: row;
          gap: 1rem;
          justify-content: center;
          max-width: 1100px;
          margin: 0 auto;
          flex-wrap: wrap;
        }
        .svc-sample-wrap {
          flex: 1 1 300px;
          aspect-ratio: 4/3;
          border-radius: 0.75rem;
          overflow: hidden;
          position: relative;
        }

        .svc-cta {
          background: #bac6ff;
          padding: 5rem 2rem;
          text-align: center;
        }
        .svc-cta h2 {
          font-size: clamp(1.6rem, 3.5vw, 2.5rem);
          font-weight: 700;
          color: #1f1e1f;
          margin: 0 0 0.75rem 0;
        }
        .svc-cta p {
          font-size: 1.05rem;
          color: #1f1e1fcc;
          margin: 0 0 2rem 0;
        }
        .btn-cta-dark {
          display: inline-block;
          background: #1f1e1f;
          color: #f8f8f8;
          border-radius: 100vw;
          padding: 0.95rem 2.5rem;
          font-size: 1rem;
          font-weight: 700;
          text-decoration: none;
          transition: background 0.2s ease;
        }
        .btn-cta-dark:hover { background: #2a292a; }

        @media (max-width: 768px) {
          .svc-overview-inner { flex-direction: column; }
          .svc-overview-image-wrap { width: 100%; }
          .svc-samples-row { flex-direction: column; }
          .svc-sample-wrap { width: 100%; }
          .svc-included-card { max-width: 100%; width: 100%; }
        }
      `}</style>

      <div className="svc-page">
        {/* Hero */}
        <section className="svc-hero">
          <Image
            src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1920&q=80"
            alt="Drone in flight over suburban rooftops"
            fill
            className="svc-hero-img"
            priority
            sizes="100vw"
          />
          <div className="svc-hero-overlay" />
          <div className="svc-hero-content">
            <span className="svc-hero-kicker">Our Services</span>
            <h1>Aerial &amp; Drone Photography</h1>
            <p className="svc-hero-tagline">
              Bird&apos;s-eye perspective that showcases land, location and lifestyle.
            </p>
            <span className="svc-hero-price">From $199 add-on</span>
          </div>
        </section>

        {/* Overview */}
        <section className="svc-overview">
          <div className="svc-overview-inner">
            <div className="svc-overview-text">
              <span className="svc-overview-kicker">What We Do</span>
              <h2>Perspective That Ground-Level Can&apos;t Achieve</h2>
              <p>
                Our licensed drone pilots capture your property from angles impossible
                to achieve on foot — revealing land size, outdoor entertaining areas,
                pool positioning, and the surrounding neighbourhood lifestyle.
              </p>
              <p>
                All flights are pre-planned for safety and fully compliant with CASA
                regulations. Our operators hold current Remote Pilot Licences and
                carry full public liability insurance.
              </p>
              <p>
                We deliver a set of aerial stills and a short aerial video sequence,
                ready to integrate into your property listing or walkthrough video.
              </p>
            </div>
            <div className="svc-overview-image-wrap">
              <Image
                src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=900&q=80"
                alt="Drone ascending above a property"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="svc-included">
          <h2 className="svc-section-heading">What&apos;s Included</h2>
          <p className="svc-section-sub">Safe, legal, and breathtaking — every time.</p>
          <div className="svc-included-grid">
            {included.map((item) => (
              <div key={item.title} className="svc-included-card">
                <span className="svc-inc-icon">{item.icon}</span>
                <p className="svc-inc-title">{item.title}</p>
                <p className="svc-inc-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sample Work */}
        <section className="svc-samples">
          <h2 className="svc-samples-heading">Sample Work</h2>
          <div className="svc-samples-row">
            {samples.map((s) => (
              <div key={s.id} className="svc-sample-wrap">
                <Image
                  src={`https://images.unsplash.com/${s.id}?w=800&q=80`}
                  alt={s.alt}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="svc-cta">
          <h2>Book This Service</h2>
          <p>Add aerial coverage to any photography or video package.</p>
          <a href="/contact" className="btn-cta-dark">Get in Touch</a>
        </section>
      </div>
    </>
  );
}
