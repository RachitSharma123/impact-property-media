'use client';

import { useEffect, useRef } from 'react';

interface VideoHeroProps {
  label: string
  heading: string
  subtext: string
  videoUrl: string
  btn1Text: string
  btn1Href: string
  btn2Text: string
  btn2Href: string
}

export default function VideoHeroClient({
  label,
  heading,
  subtext,
  videoUrl,
  btn1Text,
  btn1Href,
  btn2Text,
  btn2Href,
}: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const attemptPlay = () => {
      video.play().catch(() => {});
    };

    if (video.readyState >= 3) {
      attemptPlay();
    } else {
      video.addEventListener('canplay', attemptPlay, { once: true });
    }

    return () => video.removeEventListener('canplay', attemptPlay);
  }, []);

  // Split heading on newline for two-line display
  const headingLines = heading.split('\n');

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap');

        .vh-section {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 600px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Poppins', sans-serif;
        }

        .vh-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          -webkit-object-fit: cover;
          object-position: center;
          z-index: 0;
        }

        .vh-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          z-index: 1;
        }

        .vh-content {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 0 1.5rem;
          max-width: 860px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
        }

        .vh-label {
          font-size: 1.2rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #bac6ff;
          margin: 0;
        }

        .vh-heading {
          font-size: clamp(2.5rem, 6vw, 5.5rem);
          font-weight: 700;
          color: #f8f8f8;
          letter-spacing: -0.03em;
          line-height: 1.08;
          margin: 0;
        }

        .vh-heading span {
          display: block;
        }

        .vh-subtext {
          font-size: clamp(1rem, 2vw, 1.15rem);
          color: rgba(248, 248, 248, 0.8);
          max-width: 500px;
          line-height: 1.65;
          font-weight: 300;
          margin: 0;
        }

        .vh-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 0.5rem;
        }

        .vh-btn-primary {
          display: inline-block;
          padding: 0.85rem 2.1rem;
          background: #bac6ff;
          color: #1f1e1f;
          font-family: 'Poppins', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          border: none;
          border-radius: 9999px;
          cursor: pointer;
          text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
          white-space: nowrap;
        }

        .vh-btn-primary:hover {
          background: #cdd6ff;
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(186, 198, 255, 0.35);
        }

        .vh-btn-secondary {
          display: inline-block;
          padding: 0.85rem 2.1rem;
          background: transparent;
          color: #f8f8f8;
          font-family: 'Poppins', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          border: 2px solid rgba(248, 248, 248, 0.75);
          border-radius: 9999px;
          cursor: pointer;
          text-decoration: none;
          transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
          white-space: nowrap;
        }

        .vh-btn-secondary:hover {
          border-color: #f8f8f8;
          background: rgba(248, 248, 248, 0.1);
          transform: translateY(-2px);
        }

        .vh-scroll-indicator {
          position: absolute;
          bottom: 2.25rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          cursor: pointer;
          opacity: 0.7;
          transition: opacity 0.2s;
        }

        .vh-scroll-indicator:hover {
          opacity: 1;
        }

        .vh-scroll-text {
          font-family: 'Poppins', sans-serif;
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #f8f8f8;
        }

        .vh-scroll-arrow {
          width: 22px;
          height: 22px;
          border-right: 2px solid #f8f8f8;
          border-bottom: 2px solid #f8f8f8;
          transform: rotate(45deg);
          animation: vh-bounce 1.6s ease-in-out infinite;
        }

        @keyframes vh-bounce {
          0%, 100% {
            transform: rotate(45deg) translateY(0);
            opacity: 1;
          }
          50% {
            transform: rotate(45deg) translateY(7px);
            opacity: 0.5;
          }
        }

        @media (max-width: 480px) {
          .vh-buttons {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>

      <section className="vh-section">
        {/* Background video */}
        <video
          ref={videoRef}
          className="vh-video"
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          // @ts-ignore — webkit-playsinline needed for older iOS Safari
          webkit-playsinline="true"
        />

        {/* Dark overlay */}
        <div className="vh-overlay" />

        {/* Centered text content */}
        <div className="vh-content">
          <p className="vh-label">{label}</p>

          <h1 className="vh-heading">
            {headingLines.map((line, i) => (
              <span key={i}>{line}</span>
            ))}
          </h1>

          <p className="vh-subtext">{subtext}</p>

          <div className="vh-buttons">
            <a href={btn1Href} className="vh-btn-primary">
              {btn1Text}
            </a>
            <a href={btn2Href} className="vh-btn-secondary">
              {btn2Text}
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="vh-scroll-indicator"
          onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
          role="button"
          aria-label="Scroll down"
        >
          <span className="vh-scroll-text">Scroll</span>
          <div className="vh-scroll-arrow" />
        </div>
      </section>
    </>
  );
}
