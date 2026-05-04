import type { Metadata } from "next";
import Image from "next/image";
import YouTubePlayer from "./YouTubePlayer";

export const metadata: Metadata = {
  title: "Virtual Tours | Impact Property Media",
  description:
    "Interactive 3D virtual tours for Melbourne real estate listings. Embeddable, mobile-friendly, and available 24/7. From $249.",
};

const included = [
  { icon: "🔭", title: "Full 3D Scan", desc: "We capture every room with precision 3D scanning equipment for a complete, immersive model." },
  { icon: "🖱️", title: "Interactive Viewer", desc: "Buyers can click, pan, and explore the property at their own pace from any device." },
  { icon: "🔗", title: "Embeddable Link", desc: "Drop the tour directly into your realestate.com.au or Domain listing with one URL." },
  { icon: "📱", title: "Mobile Compatible", desc: "Fully optimised for smartphones and tablets — no app download required." },
  { icon: "♾️", title: "Unlimited Views", desc: "Your tour is hosted indefinitely with no per-view fees or bandwidth limits." },
];

const samples = [
  { id: "photo-1600573472592-401b489a3cdc", alt: "Virtual tour of a modern living space" },
  { id: "photo-1600047509807-ba8f99d2cdde", alt: "Interactive 3D scan of a lounge room" },
  { id: "photo-1600585154340-be6161a56a0c", alt: "360 view of a master bedroom" },
];

export default function VirtualToursPage() {
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
            src="https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1920&q=80"
            alt="Modern home interior ready for 3D scanning"
            fill
            className="svc-hero-img"
            priority
            sizes="100vw"
          />
          <div className="svc-hero-overlay" />
          <div className="svc-hero-content">
            <span className="svc-hero-kicker">Our Services</span>
            <h1>Virtual Tours</h1>
            <p className="svc-hero-tagline">
              Let buyers walk through anytime, anywhere.
            </p>
            <span className="svc-hero-price">Starting from $249</span>
          </div>
        </section>

        {/* Overview */}
        <section className="svc-overview">
          <div className="svc-overview-inner">
            <div className="svc-overview-text">
              <span className="svc-overview-kicker">What We Do</span>
              <h2>Immersive 3D Tours That Keep Buyers Engaged</h2>
              <p>
                We scan your entire property using precision 3D capture equipment,
                producing a fully interactive virtual tour that buyers can explore
                at their own pace — from their phone, tablet, or desktop.
              </p>
              <p>
                The embeddable viewer integrates directly into your portal listing and
                your own website with a single link. No extra plugins or apps required
                for the buyer.
              </p>
              <p>
                Research consistently shows that listings with virtual tours receive
                significantly more time-on-page and enquiry rates. Give buyers the
                confidence to make faster decisions.
              </p>
            </div>
            <div className="svc-overview-image-wrap">
              <Image
                src="https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=900&q=80"
                alt="Virtual tour interface on a laptop screen"
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
          <p className="svc-section-sub">Everything to get your property online in 3D.</p>
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

        <YouTubePlayer />

        {/* CTA */}
        <section className="svc-cta">
          <h2>Book This Service</h2>
          <p>Give buyers the full experience before they step inside.</p>
          <a href="/contact" className="btn-cta-dark">Get in Touch</a>
        </section>
      </div>
    </>
  );
}
