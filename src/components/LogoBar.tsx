const agencies = [
  "Ray White",
  "Barry Plant",
  "Harcourts",
  "McGrath",
  "Marshall White",
  "Jellis Craig",
  "Nelson Alexander",
  "Biggin & Scott",
  "RT Edgar",
  "Kay & Burton",
];

export default function LogoBar() {
  const duplicated = [...agencies, ...agencies];

  return (
    <div
      style={{
        background: "#1f1e1f",
        borderTop: "1px solid #ffffff1a",
        borderBottom: "1px solid #ffffff1a",
        padding: "1.5rem 0",
        fontFamily: "Poppins, sans-serif",
        overflow: "hidden",
      }}
    >
      <style>{`
        .logobar-label {
          text-align: center;
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          color: #ffffff55;
          text-transform: uppercase;
          margin-bottom: 1.25rem;
          font-family: Poppins, sans-serif;
        }
        .logobar-track-wrapper {
          overflow: hidden;
          width: 100%;
        }
        .logobar-track {
          display: flex;
          flex-direction: row;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        .logobar-track:hover {
          animation-play-state: paused;
        }
        .logobar-item {
          font-size: 1rem;
          font-weight: 600;
          color: #ffffff33;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 0 2.5rem;
          white-space: nowrap;
          font-family: Poppins, sans-serif;
          transition: color 0.2s ease;
        }
        .logobar-item:hover {
          color: #ffffff66;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      <p className="logobar-label">Trusted by agents at</p>

      <div className="logobar-track-wrapper">
        <div className="logobar-track">
          {duplicated.map((name, i) => (
            <span key={i} className="logobar-item">{name}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
