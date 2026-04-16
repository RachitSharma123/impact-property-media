import Image from 'next/image';

const services = [
  {
    name: 'Photography',
    description: 'HDR stills that showcase every room in its best light.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
  },
  {
    name: 'Videography',
    description:
      'Cinematic walkthroughs that put buyers in the property before they visit.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    name: 'Aerial & Drone',
    description:
      "Bird's-eye perspective that showcases land, location and lifestyle.",
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80',
  },
  {
    name: 'Virtual Tours',
    description:
      'Interactive 3D tours so buyers can walk through anytime, anywhere.',
    image: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80',
  },
  {
    name: 'Floor Plans',
    description:
      'Accurate, detailed floor plans that help buyers understand the space.',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
  },
];

export default function ServicesGrid() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

        .services-section {
          background: #f8f8f8;
          padding: 5.5rem 2rem;
          font-family: 'Poppins', sans-serif;
        }

        .services-header {
          text-align: center;
          max-width: 640px;
          margin: 0 auto 3.5rem;
        }

        .services-heading {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          color: #1f1e1f;
          line-height: 1.15;
          margin: 0 0 0.85rem;
          letter-spacing: -0.02em;
        }

        .services-sub {
          font-size: 1.05rem;
          font-weight: 300;
          color: rgba(31, 30, 31, 0.65);
          margin: 0;
          line-height: 1.65;
        }

        .services-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
        }

        .service-card {
          background: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(31, 30, 31, 0.07);
          transition: transform 0.28s ease, box-shadow 0.28s ease;
          display: flex;
          flex-direction: column;
        }

        .service-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 36px rgba(31, 30, 31, 0.14);
        }

        .service-image-wrap {
          position: relative;
          aspect-ratio: 16 / 9;
          overflow: hidden;
        }

        .service-image-overlay {
          position: absolute;
          inset: 0;
          background: rgba(31, 30, 31, 0);
          transition: background 0.3s ease;
          z-index: 1;
        }

        .service-card:hover .service-image-overlay {
          background: rgba(31, 30, 31, 0.35);
        }

        .service-body {
          padding: 1.35rem 1.5rem 1.6rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .service-name {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1f1e1f;
          margin: 0 0 0.5rem;
        }

        .service-description {
          font-size: 0.9rem;
          font-weight: 300;
          color: rgba(31, 30, 31, 0.65);
          line-height: 1.65;
          margin: 0 0 1.1rem;
          flex: 1;
        }

        .service-link {
          font-size: 0.88rem;
          font-weight: 600;
          color: #bac6ff;
          text-decoration: none;
          letter-spacing: 0.01em;
          transition: color 0.2s;
          align-self: flex-start;
          /* Darken slightly on hover for legibility on light bg */
          filter: brightness(0.82);
        }

        .service-link:hover {
          color: #8fa0f5;
          filter: none;
        }

        @media (max-width: 900px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 560px) {
          .services-grid {
            grid-template-columns: 1fr;
          }

          .services-section {
            padding: 4rem 1.25rem;
          }
        }
      `}</style>

      <section id="services" className="services-section">
        <div className="services-header">
          <h2 className="services-heading">Our Services</h2>
          <p className="services-sub">
            Everything your listing needs, captured in one day.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-image-wrap">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
                />
                <div className="service-image-overlay" />
              </div>
              <div className="service-body">
                <h3 className="service-name">{service.name}</h3>
                <p className="service-description">{service.description}</p>
                <a href={`#${service.name.toLowerCase().replace(/\s+/g, '-')}`} className="service-link">
                  Learn More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
