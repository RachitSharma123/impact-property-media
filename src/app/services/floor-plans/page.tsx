import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Floor Plans | Impact Property Media",
  description:
    "CAD-accurate, dimensioned floor plans for Melbourne real estate listings. Digital and print ready. Same-day delivery. From $99.",
};

const included = [
  { icon: "📐", title: "CAD-Accurate Plans", desc: "Drawn with millimetre precision from on-site measurements for total buyer confidence." },
  { icon: "🏷️", title: "Room Labels & Dimensions", desc: "Every room clearly labelled with width, depth, and area in square metres." },
  { icon: "🖥️", title: "Digital & Print Ready", desc: "Delivered as high-resolution PNG and PDF, ready for portals, brochures, and signboards." },
  { icon: "⚡", title: "Same-Day Delivery", desc: "Floor plans are finalised and delivered the same day as the measurement appointment." },
  { icon: "📂", title: "Multiple Formats", desc: "PNG, PDF, and editable formats available on request for your design team." },
];

const samples = [
  { id: "photo-1524758631624-e2822e304c36", alt: "Blueprint architectural drawing" },
  { id: "photo-1600047509807-ba8f99d2cdde", alt: "Bright open-plan living space" },
  { id: "photo-1600585154340-be6161a56a0c", alt: "Master bedroom floor plan reference" },
];

export default function FloorPlansPage() {
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
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1920&q=80"
            alt="Architectural blueprint drawings on a desk"
            fill
            className="svc-hero-img"
            priority
            sizes="100vw"
          />
          <div className="svc-hero-overlay" />
          <div className="svc-hero-content">
            <span className="svc-hero-kicker">Our Services</span>
            <h1>Floor Plans</h1>
            <p className="svc-hero-tagline">
              Accurate, detailed floor plans buyers actually use.
            </p>
            <span className="svc-hero-price">Starting from $99</span>
          </div>
        </section>

        {/* Overview */}
        <section className="svc-overview">
          <div className="svc-overview-inner">
            <div className="svc-overview-text">
              <span className="svc-overview-kicker">What We Do</span>
              <h2>Floor Plans That Earn Buyer Confidence</h2>
              <p>
                Buyers use floor plans to understand spatial flow before they inspect.
                We produce CAD-accurate plans from on-site measurements — every room
                labelled, every dimension included — so buyers get the full picture.
              </p>
              <p>
                Delivered the same day as your shoot, our floor plans are ready for
                immediate upload to realestate.com.au, Domain, and your print brochures.
              </p>
              <p>
                Files arrive as high-resolution PDF and PNG in both colour and
                black-and-white variants. Editable CAD files are available on request
                for your design team.
              </p>
            </div>
            <div className="svc-overview-image-wrap">
              <Image
                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&q=80"
                alt="Detailed floor plan blueprint on paper"
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
          <p className="svc-section-sub">Precision plans, fast delivery, no fuss.</p>
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
          <p>Add a floor plan to any package for just $99. Same-day delivery guaranteed.</p>
          <a href="/contact" className="btn-cta-dark">Get in Touch</a>
        </section>
      </div>
    </>
  );
}
