const stats = [
  { value: '500+', label: 'Properties Sold Faster' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '24hr', label: 'Turnaround Time' },
  { value: '10+', label: 'Years Experience' },
];

export default function TrustBar() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

        .trust-bar {
          background: #1f1e1f;
          border-top: 2px solid #bac6ff;
          padding: 3.5rem 2rem;
          font-family: 'Poppins', sans-serif;
        }

        .trust-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
        }

        .trust-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 1rem 1.5rem;
          position: relative;
        }

        .trust-item:not(:last-child)::after {
          content: '';
          position: absolute;
          right: 0;
          top: 15%;
          height: 70%;
          width: 1px;
          background: rgba(186, 198, 255, 0.2);
        }

        .trust-value {
          font-size: clamp(2.25rem, 4vw, 3.25rem);
          font-weight: 700;
          color: #bac6ff;
          line-height: 1.1;
          margin: 0 0 0.45rem;
          letter-spacing: -0.02em;
        }

        .trust-label {
          font-size: 0.72rem;
          font-weight: 400;
          color: rgba(248, 248, 248, 0.6);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin: 0;
          line-height: 1.4;
        }

        @media (max-width: 640px) {
          .trust-inner {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0;
          }

          .trust-item:not(:last-child)::after {
            display: none;
          }

          .trust-item {
            padding: 1.5rem 1rem;
            border-right: 1px solid rgba(186, 198, 255, 0.15);
            border-bottom: 1px solid rgba(186, 198, 255, 0.15);
          }

          .trust-item:nth-child(2n) {
            border-right: none;
          }

          .trust-item:nth-last-child(-n+2) {
            border-bottom: none;
          }
        }
      `}</style>

      <section id="trust" className="trust-bar">
        <div className="trust-inner">
          {stats.map((stat, index) => (
            <div key={index} className="trust-item">
              <p className="trust-value">{stat.value}</p>
              <p className="trust-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
