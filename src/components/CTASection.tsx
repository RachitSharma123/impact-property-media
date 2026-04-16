export default function CTASection() {
  return (
    <section
      style={{
        background: "#bac6ff",
        width: "100%",
        padding: "6rem 2rem",
        fontFamily: "Poppins, sans-serif",
        textAlign: "center",
        boxSizing: "border-box",
      }}
    >
      <style>{`
        .cta-stat {
          font-size: clamp(5rem, 10vw, 8rem);
          font-weight: 700;
          color: #1f1e1f;
          line-height: 1;
          margin: 0 0 0.5rem 0;
        }
        .cta-stat-label {
          font-size: 1.25rem;
          color: #1f1e1f;
          opacity: 0.8;
          margin: 0 0 1.25rem 0;
          font-weight: 500;
        }
        .cta-subtext {
          font-size: 1.1rem;
          color: #1f1e1f;
          opacity: 0.75;
          margin: 0 0 2.5rem 0;
          font-weight: 400;
        }
        .cta-btn {
          display: inline-block;
          background: #1f1e1f;
          color: #f8f8f8;
          border: none;
          border-radius: 100vw;
          padding: 1rem 2.5rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          font-family: Poppins, sans-serif;
          text-decoration: none;
          transition: background 0.2s ease, transform 0.15s ease;
          letter-spacing: 0.01em;
        }
        .cta-btn:hover {
          background: #2e2d2e;
          transform: translateY(-2px);
        }
      `}</style>

      <p className="cta-stat">1,000+</p>
      <p className="cta-stat-label">agents trust Impact Property Media</p>
      <p className="cta-subtext">Ready to make your listing stand out?</p>
      <a href="#contact" className="cta-btn">Book Your Shoot Today →</a>
    </section>
  );
}
