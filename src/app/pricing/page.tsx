import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Impact Property Media",
  description:
    "Simple, transparent pricing for real estate photography, video, aerial and virtual tours in Melbourne. No hidden fees.",
};

const essentialFeatures = [
  { text: "20 HDR Photos", included: true },
  { text: "Same-day editing", included: true },
  { text: "Web & print ready files", included: true },
  { text: "Online delivery portal", included: true },
  { text: "Cinematic video", included: false },
  { text: "Aerial / drone", included: false },
];

const professionalFeatures = [
  { text: "30 HDR Photos", included: true },
  { text: "Cinematic video walkthrough", included: true },
  { text: "Same-day editing", included: true },
  { text: "Web & print ready files", included: true },
  { text: "Online delivery portal", included: true },
  { text: "Aerial / drone", included: false },
];

const luxuryFeatures = [
  { text: "40 HDR Photos", included: true },
  { text: "Cinematic video walkthrough", included: true },
  { text: "Aerial & drone footage", included: true },
  { text: "Interactive virtual tour", included: true },
  { text: "Floor plan", included: true },
  { text: "Same-day editing", included: true },
  { text: "Priority booking", included: true },
];

const addons = [
  {
    name: "Twilight Photography",
    desc: "Golden-hour and dusk shots that make listings glow.",
    price: "+$149",
    icon: "🌅",
  },
  {
    name: "Additional Photos (10 extra)",
    desc: "Ten extra HDR stills on top of your package allocation.",
    price: "+$79",
    icon: "📷",
  },
  {
    name: "Rush Delivery (same day)",
    desc: "Receive your edited files the same day as your shoot.",
    price: "+$99",
    icon: "⚡",
  },
  {
    name: "Social Media Edits (9:16)",
    desc: "Vertical crops optimised for Instagram Reels & Stories.",
    price: "+$69",
    icon: "📱",
  },
  {
    name: "Copywriting for Listing",
    desc: "Professionally written property description for your ad.",
    price: "+$129",
    icon: "✍️",
  },
];

const faqs = [
  {
    q: "Are there any hidden fees?",
    a: "Never. The price you see is the price you pay. Travel fees only apply beyond 50 km from Melbourne CBD.",
  },
  {
    q: "Can I upgrade my package later?",
    a: "Yes — you can upgrade or add services right up until shoot day. Just contact us and we will adjust your booking.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept bank transfer, all major credit cards, and PayPal. Payment is due within 7 days of delivery.",
  },
];

export default function PricingPage() {
  return (
    <>
      <style>{`
        /* ── Global reset for this page ── */
        .pr-page {
          font-family: Poppins, sans-serif;
        }

        /* ── Hero ── */
        .pr-hero {
          background: #1f1e1f;
          padding: 8rem 2rem 6rem;
          text-align: center;
        }
        .pr-hero-kicker {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #bac6ff;
          margin-bottom: 1.25rem;
        }
        .pr-hero h1 {
          font-size: clamp(2.2rem, 5vw, 3.75rem);
          font-weight: 700;
          color: #f8f8f8;
          margin: 0 0 1rem 0;
          line-height: 1.15;
        }
        .pr-hero p {
          font-size: 1.15rem;
          color: #ffffff99;
          margin: 0;
        }

        /* ── Packages ── */
        .pr-packages {
          background: #1f1e1f;
          padding: 4rem 2rem 6rem;
        }
        .pr-cards-row {
          display: flex;
          flex-direction: row;
          gap: 1.5rem;
          justify-content: center;
          align-items: stretch;
          flex-wrap: wrap;
          max-width: 1140px;
          margin: 0 auto;
        }
        .pr-card {
          background: #2a292a;
          border-radius: 1rem;
          padding: 2.25rem;
          flex: 1 1 300px;
          max-width: 360px;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s ease;
        }
        .pr-card:hover {
          transform: translateY(-4px);
        }
        .pr-card-featured {
          border: 1px solid #bac6ff !important;
          box-shadow: 0 0 40px #bac6ff18;
          position: relative;
          z-index: 1;
        }
        .pr-badge {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.3rem 0.9rem;
          border-radius: 100vw;
          margin-bottom: 1.25rem;
          width: fit-content;
        }
        .pr-badge-default {
          background: #ffffff11;
          color: #ffffff88;
        }
        .pr-badge-featured {
          background: #bac6ff22;
          color: #bac6ff;
        }
        .pr-card-name {
          font-size: 1.5rem;
          font-weight: 700;
          color: #f8f8f8;
          margin: 0 0 0.4rem 0;
        }
        .pr-card-price {
          font-size: 2.25rem;
          font-weight: 700;
          color: #f8f8f8;
          margin: 0 0 0.4rem 0;
          line-height: 1.1;
        }
        .pr-card-price-featured {
          color: #bac6ff;
        }
        .pr-card-meta {
          font-size: 0.82rem;
          color: #ffffff66;
          margin: 0 0 0.5rem 0;
        }
        .pr-card-ideal {
          font-size: 0.85rem;
          color: #bac6ff99;
          font-style: italic;
          margin: 0 0 1.75rem 0;
        }
        .pr-features {
          list-style: none;
          padding: 0;
          margin: 0 0 2rem 0;
          flex: 1;
        }
        .pr-feature-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.88rem;
          padding: 0.45rem 0;
          border-bottom: 1px solid #ffffff0d;
        }
        .pr-feature-item:last-child {
          border-bottom: none;
        }
        .pr-check {
          color: #bac6ff;
          font-size: 1rem;
          flex-shrink: 0;
        }
        .pr-cross {
          color: #ffffff33;
          font-size: 1rem;
          flex-shrink: 0;
        }
        .pr-feat-in {
          color: #f8f8f8cc;
        }
        .pr-feat-out {
          color: #ffffff33;
          text-decoration: line-through;
        }
        .btn-primary {
          display: block;
          text-align: center;
          background: #bac6ff;
          color: #1f1e1f;
          border: none;
          border-radius: 100vw;
          padding: 0.9rem 2rem;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          font-family: Poppins, sans-serif;
          transition: background 0.2s ease;
          text-decoration: none;
        }
        .btn-primary:hover {
          background: #a0b0ff;
        }
        .btn-secondary {
          display: block;
          text-align: center;
          background: transparent;
          color: #f8f8f8;
          border: 1px solid #ffffff33;
          border-radius: 100vw;
          padding: 0.9rem 2rem;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          font-family: Poppins, sans-serif;
          transition: border-color 0.2s ease, background 0.2s ease;
          text-decoration: none;
        }
        .btn-secondary:hover {
          border-color: #bac6ff;
          background: #ffffff08;
        }

        /* ── Add-ons ── */
        .pr-addons {
          background: #f8f8f8;
          padding: 6rem 2rem;
        }
        .pr-section-heading {
          text-align: center;
          font-size: clamp(1.75rem, 3.5vw, 2.75rem);
          font-weight: 700;
          color: #1f1e1f;
          margin: 0 0 0.75rem 0;
        }
        .pr-section-sub {
          text-align: center;
          font-size: 1rem;
          color: #1f1e1f99;
          margin: 0 0 3rem 0;
        }
        .pr-addons-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 1.25rem;
          justify-content: center;
          max-width: 1100px;
          margin: 0 auto;
        }
        .pr-addon-card {
          background: #ffffff;
          border: 1px solid #1f1e1f12;
          border-radius: 1rem;
          padding: 1.75rem;
          flex: 1 1 200px;
          max-width: 210px;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          box-shadow: 0 2px 12px #0000000a;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .pr-addon-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px #00000014;
        }
        .pr-addon-icon {
          font-size: 1.75rem;
        }
        .pr-addon-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: #1f1e1f;
          line-height: 1.3;
        }
        .pr-addon-desc {
          font-size: 0.82rem;
          color: #1f1e1f99;
          line-height: 1.5;
          flex: 1;
        }
        .pr-addon-price {
          display: inline-block;
          background: #bac6ff;
          color: #1f1e1f;
          font-size: 0.85rem;
          font-weight: 700;
          padding: 0.25rem 0.85rem;
          border-radius: 100vw;
          width: fit-content;
        }

        /* ── FAQ teaser ── */
        .pr-faq {
          background: #1f1e1f;
          padding: 6rem 2rem;
        }
        .pr-faq-heading {
          text-align: center;
          font-size: clamp(1.75rem, 3.5vw, 2.75rem);
          font-weight: 700;
          color: #f8f8f8;
          margin: 0 0 3rem 0;
        }
        .pr-faq-list {
          max-width: 760px;
          margin: 0 auto;
        }
        .pr-faq-item {
          border-bottom: 1px solid #ffffff14;
          padding: 1.5rem 0;
        }
        .pr-faq-item:last-child {
          border-bottom: none;
        }
        .pr-faq-q {
          font-size: 1rem;
          font-weight: 600;
          color: #bac6ff;
          margin: 0 0 0.6rem 0;
        }
        .pr-faq-a {
          font-size: 0.92rem;
          color: #ffffff99;
          line-height: 1.7;
          margin: 0;
        }

        /* ── CTA ── */
        .pr-cta {
          background: #bac6ff;
          padding: 5rem 2rem;
          text-align: center;
        }
        .pr-cta h2 {
          font-size: clamp(1.6rem, 3.5vw, 2.5rem);
          font-weight: 700;
          color: #1f1e1f;
          margin: 0 0 1rem 0;
        }
        .pr-cta p {
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
        .btn-cta-dark:hover {
          background: #2a292a;
        }

        @media (max-width: 768px) {
          .pr-cards-row {
            flex-direction: column;
            align-items: center;
          }
          .pr-card {
            max-width: 100%;
            width: 100%;
          }
          .pr-addons-grid {
            flex-direction: column;
            align-items: center;
          }
          .pr-addon-card {
            max-width: 100%;
            width: 100%;
          }
        }
      `}</style>

      <div className="pr-page">
        {/* Hero */}
        <section className="pr-hero">
          <span className="pr-hero-kicker">Pricing</span>
          <h1>Simple, Transparent Pricing</h1>
          <p>No hidden fees. Just stunning results.</p>
        </section>

        {/* Package Cards */}
        <section className="pr-packages">
          <div className="pr-cards-row">
            {/* Essential */}
            <div className="pr-card" style={{ border: "1px solid #ffffff1a" }}>
              <span className="pr-badge pr-badge-default">Starter</span>
              <h2 className="pr-card-name">Essential</h2>
              <p className="pr-card-price">$299</p>
              <p className="pr-card-meta">Delivery within 24 hours</p>
              <p className="pr-card-ideal">Ideal for apartments &amp; townhouses</p>
              <ul className="pr-features">
                {essentialFeatures.map((f) => (
                  <li key={f.text} className="pr-feature-item">
                    <span className={f.included ? "pr-check" : "pr-cross"}>
                      {f.included ? "✓" : "✗"}
                    </span>
                    <span className={f.included ? "pr-feat-in" : "pr-feat-out"}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>
              <a href="/contact" className="btn-secondary">Get Started</a>
            </div>

            {/* Professional (featured) */}
            <div className="pr-card pr-card-featured">
              <span className="pr-badge pr-badge-featured">Best Value</span>
              <h2 className="pr-card-name">Professional</h2>
              <p className="pr-card-price pr-card-price-featured">$549</p>
              <p className="pr-card-meta">Delivery within 48 hours</p>
              <p className="pr-card-ideal">Ideal for family homes &amp; prestige properties</p>
              <ul className="pr-features">
                {professionalFeatures.map((f) => (
                  <li key={f.text} className="pr-feature-item">
                    <span className={f.included ? "pr-check" : "pr-cross"}>
                      {f.included ? "✓" : "✗"}
                    </span>
                    <span className={f.included ? "pr-feat-in" : "pr-feat-out"}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>
              <a href="/contact" className="btn-primary">Get Started</a>
            </div>

            {/* Luxury */}
            <div className="pr-card" style={{ border: "1px solid #ffffff1a" }}>
              <span className="pr-badge pr-badge-default">Premium</span>
              <h2 className="pr-card-name">Luxury</h2>
              <p className="pr-card-price">$849</p>
              <p className="pr-card-meta">Priority delivery within 24 hours</p>
              <p className="pr-card-ideal">Ideal for luxury homes &amp; acreage</p>
              <ul className="pr-features">
                {luxuryFeatures.map((f) => (
                  <li key={f.text} className="pr-feature-item">
                    <span className={f.included ? "pr-check" : "pr-cross"}>
                      {f.included ? "✓" : "✗"}
                    </span>
                    <span className={f.included ? "pr-feat-in" : "pr-feat-out"}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>
              <a href="/contact" className="btn-secondary">Get Started</a>
            </div>
          </div>
        </section>

        {/* Add-Ons */}
        <section className="pr-addons">
          <h2 className="pr-section-heading">Add-Ons</h2>
          <p className="pr-section-sub">Customise any package to match your listing needs.</p>
          <div className="pr-addons-grid">
            {addons.map((a) => (
              <div key={a.name} className="pr-addon-card">
                <span className="pr-addon-icon">{a.icon}</span>
                <p className="pr-addon-name">{a.name}</p>
                <p className="pr-addon-desc">{a.desc}</p>
                <span className="pr-addon-price">{a.price}</span>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ teaser */}
        <section className="pr-faq">
          <h2 className="pr-faq-heading">Common Questions</h2>
          <div className="pr-faq-list">
            {faqs.map((item) => (
              <div key={item.q} className="pr-faq-item">
                <p className="pr-faq-q">{item.q}</p>
                <p className="pr-faq-a">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="pr-cta">
          <h2>Not sure which package? Let&apos;s talk.</h2>
          <p>We&apos;ll recommend the right package for your property in minutes.</p>
          <a href="/contact" className="btn-cta-dark">Contact Us</a>
        </section>
      </div>
    </>
  );
}
