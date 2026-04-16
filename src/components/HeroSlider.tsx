'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=1920&q=80',
    heading: 'We Make Properties Unforgettable',
    subheading: 'Premium real estate media that stops the scroll and sells the story.',
    buttons: true,
  },
  {
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80',
    heading: 'Aerial. Cinematic. Precise.',
    subheading: 'From twilight shoots to 4K drone footage — we capture every angle.',
    buttons: false,
  },
  {
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80',
    heading: 'Your Listing Deserves More',
    subheading:
      'Photography, video, floor plans and virtual tours — all in one shoot day.',
    buttons: false,
  },
];

export default function HeroSlider() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

        .hero-swiper {
          width: 100%;
          height: 100vh;
        }

        .hero-swiper .swiper-slide {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.52);
          z-index: 1;
        }

        .hero-content {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 0 1.5rem;
          font-family: 'Poppins', sans-serif;
        }

        .swiper-slide-active .hero-text {
          animation: fadeUp 0.8s ease both;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(32px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-heading {
          font-size: clamp(2rem, 5vw, 3.75rem);
          font-weight: 700;
          color: #f8f8f8;
          line-height: 1.15;
          max-width: 800px;
          margin: 0 0 1.125rem;
          letter-spacing: -0.01em;
        }

        .hero-sub {
          font-size: clamp(1rem, 2vw, 1.25rem);
          font-weight: 300;
          color: rgba(248, 248, 248, 0.82);
          max-width: 560px;
          margin: 0 0 2.25rem;
          line-height: 1.65;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .btn-primary {
          display: inline-block;
          padding: 0.8rem 2rem;
          border-radius: 100vw;
          background: #bac6ff;
          color: #1f1e1f;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          transition: background 0.25s, transform 0.2s;
          cursor: pointer;
          border: none;
          white-space: nowrap;
        }

        .btn-primary:hover {
          background: #d0d9ff;
          transform: translateY(-2px);
        }

        .btn-secondary {
          display: inline-block;
          padding: 0.8rem 2rem;
          border-radius: 100vw;
          background: transparent;
          color: #f8f8f8;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          border: 2px solid rgba(248, 248, 248, 0.7);
          transition: border-color 0.25s, color 0.25s, transform 0.2s;
          cursor: pointer;
          white-space: nowrap;
        }

        .btn-secondary:hover {
          border-color: #bac6ff;
          color: #bac6ff;
          transform: translateY(-2px);
        }

        .scroll-indicator {
          position: absolute;
          bottom: 2.25rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          animation: bounce 2s infinite;
          cursor: pointer;
        }

        .scroll-indicator span {
          font-family: 'Poppins', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(248, 248, 248, 0.55);
        }

        .scroll-arrow {
          width: 24px;
          height: 24px;
          border-right: 2px solid rgba(248, 248, 248, 0.55);
          border-bottom: 2px solid rgba(248, 248, 248, 0.55);
          transform: rotate(45deg);
        }

        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
      `}</style>

      <section style={{ position: 'relative', width: '100%', height: '100vh' }}>
        <Swiper
          className="hero-swiper"
          modules={[Autoplay, EffectFade]}
          effect="fade"
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          speed={900}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <Image
                src={slide.image}
                alt=""
                role="presentation"
                fill
                style={{ objectFit: 'cover' }}
                priority={index === 0}
                sizes="100vw"
              />
              <div className="hero-overlay" />
              <div className="hero-content">
                <div className="hero-text">
                  <h1 className="hero-heading">{slide.heading}</h1>
                  <p className="hero-sub">{slide.subheading}</p>
                  {slide.buttons && (
                    <div className="hero-buttons">
                      <a href="#services" className="btn-primary">
                        Our Services
                      </a>
                      <a href="#portfolio" className="btn-secondary">
                        View Portfolio
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div
          className="scroll-indicator"
          onClick={() =>
            document.getElementById('trust')?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          <span>Scroll</span>
          <div className="scroll-arrow" />
        </div>
      </section>
    </>
  );
}
