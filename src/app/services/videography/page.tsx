import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Cinematic Videography | Impact Property Media",
  description:
    "4K cinematic real estate walkthroughs with professional colour grading, licensed music, and a 90–120 second highlight reel. Melbourne.",
};

const included = [
  { icon: "🎬", title: "4K Filming", desc: "Shot on cinema-grade cameras for richly detailed, ultra-sharp footage." },
  { icon: "✂️", title: "Professional Edit", desc: "Smooth transitions, pace-perfect cuts, and a compelling narrative arc." },
  { icon: "🎵", title: "Licensed Music", desc: "Hand-selected royalty-free soundtrack to match your property's mood." },
  { icon: "🎨", title: "Colour Grading", desc: "Cinematic grade that gives your property a warm, premium look and feel." },
  { icon: "📅", title: "48hr Delivery", desc: "Final edited video delivered to your inbox within two business days." },
  { icon: "📱", title: "Social Media Cut", desc: "9:16 vertical cut included for Instagram Reels, TikTok and Stories." },
];

const samples = [
  { id: "photo-1558618666-fcd25c85cd64", alt: "Drone shot of modern home" },
  { id: "photo-1600047509807-ba8f99d2cdde", alt: "Wide-angle interior shot" },
  { id: "photo-1600585154340-be6161a56a0c", alt: "Cinematic bedroom reveal" },
];

export default function VideographyPage() {
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
          flex: 1 1 160px;
          max-width: 180px;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          transition: transform 0.2s ease;
        }
        .svc-included-card:hover { transform: translateY(-3px); }
        .svc-inc-icon { font-size: 2rem; }
        .svc-inc-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #f8f8f8;
        }
        .svc-inc-desc {
          font-size: 0.82rem;
          color: #ffffff88;
          line-height: 1.55;
        }

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
          aspect-ratio: 16/9;
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
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
            alt="Aerial view of a property shoot in progress"
            fill
            className="svc-hero-img"
            priority
            sizes="100vw"
          />
          <div className="svc-hero-overlay" />
          <div className="svc-hero-content">
            <span className="svc-hero-kicker">Our Services</span>
            <h1>Cinematic Videography</h1>
            <p className="svc-hero-tagline">
              Walkthroughs that put buyers in the property before they visit.
            </p>
            <span className="svc-hero-price">From $299 add-on to photography</span>
          </div>
        </section>

        {/* Overview */}
        <section className="svc-overview">
          <div className="svc-overview-inner">
            <div className="svc-overview-text">
              <span className="svc-overview-kicker">What We Do</span>
              <h2>4K Walkthroughs That Move Buyers</h2>
              <p>
                Our videography team captures a fluid, cinematic walkthrough of your
                property in stunning 4K resolution. We plan every shot to tell a story —
                from the kerb appeal to the master suite.
              </p>
              <p>
                We apply a professional colour grade to give your property a warm,
                premium look, then pair it with a hand-selected licensed soundtrack
                that matches the mood of the home.
              </p>
              <p>
                The final cut is a 90–120 second highlight reel, ready for real estate
                portals and social media. A vertical 9:16 cut is included at no extra cost.
              </p>
            </div>
            <div className="svc-overview-image-wrap">
              <Image
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80"
                alt="Videographer filming a luxury property"
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
          <p className="svc-section-sub">A complete cinematic package, start to screen.</p>
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
          <p>Combine with photography and save. Let&apos;s talk about your listing.</p>
          <a href="/contact" className="btn-cta-dark">Get in Touch</a>
        </section>
      </div>
    </>
  );
}
