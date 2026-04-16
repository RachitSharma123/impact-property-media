const features = {
  essential: [
    { text: "20 HDR Photos", included: true },
    { text: "Same-day editing", included: true },
    { text: "Web & print ready", included: true },
    { text: "Online delivery portal", included: true },
    { text: "Video", included: false },
    { text: "Aerial", included: false },
  ],
  professional: [
    { text: "30 HDR Photos", included: true },
    { text: "Cinematic Video", included: true },
    { text: "Same-day editing", included: true },
    { text: "Web & print ready", included: true },
    { text: "Online delivery portal", included: true },
    { text: "Aerial", included: false },
  ],
  luxury: [
    { text: "40 HDR Photos", included: true },
    { text: "Cinematic Video", included: true },
    { text: "Aerial & Drone", included: true },
    { text: "Virtual Tour", included: true },
    { text: "Floor Plan", included: true },
    { text: "Same-day editing", included: true },
    { text: "Priority booking", included: true },
  ],
};

export default function PackagesSection() {
  return (
    <section
      style={{
        background: "#1f1e1f",
        padding: "6rem 2rem",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <style>{`
        .pkg-heading {
          text-align: center;
          color: #f8f8f8;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          margin: 0 0 0.75rem 0;
        }
        .pkg-subheading {
          text-align: center;
          color: #ffffff99;
          font-size: 1.05rem;
          margin: 0 0 3.5rem 0;
        }
        .pkg-cards-row {
          display: flex;
          flex-direction: row;
          gap: 1.5rem;
          justify-content: center;
          align-items: stretch;
          flex-wrap: wrap;
          max-width: 1100px;
          margin: 0 auto;
        }
        .pkg-card {
          background: #2a292a;
          border-radius: 1rem;
          padding: 2rem;
          flex: 1 1 280px;
          max-width: 340px;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s ease;
        }
        .pkg-card:hover {
          transform: translateY(-4px);
        }
        .pkg-card-featured {
          box-shadow: 0 0 30px #bac6ff22;
          position: relative;
          z-index: 1;
        }
        .pkg-badge {
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
        .pkg-badge-default {
          background: #ffffff11;
          color: #ffffff88;
        }
        .pkg-badge-featured {
          background: #bac6ff22;
          color: #bac6ff;
        }
        .pkg-name {
          font-size: 1.4rem;
          font-weight: 700;
          color: #f8f8f8;
          margin: 0 0 0.5rem 0;
        }
        .pkg-price {
          font-size: 2rem;
          font-weight: 700;
          color: #f8f8f8;
          margin: 0 0 1.75rem 0;
        }
        .pkg-price-featured {
          color: #bac6ff;
        }
        .pkg-features {
          list-style: none;
          padding: 0;
          margin: 0 0 2rem 0;
          flex: 1;
        }
        .pkg-feature-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.9rem;
          padding: 0.4rem 0;
          border-bottom: 1px solid #ffffff0d;
        }
        .pkg-feature-item:last-child {
          border-bottom: none;
        }
        .pkg-feature-check {
          color: #bac6ff;
          font-size: 1rem;
          flex-shrink: 0;
        }
        .pkg-feature-cross {
          color: #ffffff33;
          font-size: 1rem;
          flex-shrink: 0;
        }
        .pkg-feature-text-included {
          color: #f8f8f8cc;
        }
        .pkg-feature-text-excluded {
          color: #ffffff33;
          text-decoration: line-through;
        }
        .btn-primary-pkg {
          display: block;
          text-align: center;
          background: #bac6ff;
          color: #1f1e1f;
          border: none;
          border-radius: 100vw;
          padding: 0.85rem 2rem;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          font-family: Poppins, sans-serif;
          transition: background 0.2s ease, transform 0.1s ease;
          text-decoration: none;
        }
        .btn-primary-pkg:hover {
          background: #a0b0ff;
        }
        .btn-secondary-pkg {
          display: block;
          text-align: center;
          background: transparent;
          color: #f8f8f8;
          border: 1px solid #ffffff33;
          border-radius: 100vw;
          padding: 0.85rem 2rem;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          font-family: Poppins, sans-serif;
          transition: border-color 0.2s ease, background 0.2s ease;
          text-decoration: none;
        }
        .btn-secondary-pkg:hover {
          border-color: #bac6ff;
          background: #ffffff08;
        }
        @media (max-width: 768px) {
          .pkg-cards-row {
            flex-direction: column;
            align-items: center;
          }
          .pkg-card {
            max-width: 100%;
            width: 100%;
          }
        }
      `}</style>

      <h2 className="pkg-heading">Our Packages</h2>
      <p className="pkg-subheading">Choose the package that fits your listing.</p>

      <div className="pkg-cards-row">
        {/* Card 1 — Essential */}
        <div
          className="pkg-card"
          style={{ border: "1px solid #ffffff1a" }}
        >
          <span className="pkg-badge pkg-badge-default">Most Popular</span>
          <h3 className="pkg-name">Essential</h3>
          <p className="pkg-price">From $299</p>
          <ul className="pkg-features">
            {features.essential.map((f) => (
              <li key={f.text} className="pkg-feature-item">
                <span className={f.included ? "pkg-feature-check" : "pkg-feature-cross"}>
                  {f.included ? "✓" : "✗"}
                </span>
                <span className={f.included ? "pkg-feature-text-included" : "pkg-feature-text-excluded"}>
                  {f.text}
                </span>
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn-secondary-pkg">Get Started</a>
        </div>

        {/* Card 2 — Professional (featured) */}
        <div
          className="pkg-card pkg-card-featured"
          style={{ border: "1px solid #bac6ff" }}
        >
          <span className="pkg-badge pkg-badge-featured">Best Value</span>
          <h3 className="pkg-name">Professional</h3>
          <p className="pkg-price pkg-price-featured">From $549</p>
          <ul className="pkg-features">
            {features.professional.map((f) => (
              <li key={f.text} className="pkg-feature-item">
                <span className={f.included ? "pkg-feature-check" : "pkg-feature-cross"}>
                  {f.included ? "✓" : "✗"}
                </span>
                <span className={f.included ? "pkg-feature-text-included" : "pkg-feature-text-excluded"}>
                  {f.text}
                </span>
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn-primary-pkg">Get Started</a>
        </div>

        {/* Card 3 — Luxury */}
        <div
          className="pkg-card"
          style={{ border: "1px solid #ffffff1a" }}
        >
          <span className="pkg-badge pkg-badge-default">Premium</span>
          <h3 className="pkg-name">Luxury</h3>
          <p className="pkg-price">From $849</p>
          <ul className="pkg-features">
            {features.luxury.map((f) => (
              <li key={f.text} className="pkg-feature-item">
                <span className={f.included ? "pkg-feature-check" : "pkg-feature-cross"}>
                  {f.included ? "✓" : "✗"}
                </span>
                <span className={f.included ? "pkg-feature-text-included" : "pkg-feature-text-excluded"}>
                  {f.text}
                </span>
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn-secondary-pkg">Get Started</a>
        </div>
      </div>
    </section>
  );
}
