import Image from 'next/image';

const portfolioImages = [
  {
    src: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
    alt: 'Modern luxury home exterior',
  },
  {
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    alt: 'Bright open-plan living area',
  },
  {
    src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80',
    alt: 'Contemporary kitchen design',
  },
  {
    src: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
    alt: 'Suburban property with garden',
  },
  {
    src: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&q=80',
    alt: 'Waterfront property aerial',
  },
  {
    src: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
    alt: 'Classic Melbourne terrace home',
  },
  {
    src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    alt: 'Designer pool and outdoor living',
  },
  {
    src: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80',
    alt: 'Luxury master bedroom suite',
  },
  {
    src: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
    alt: 'Penthouse with city views',
  },
];

export default function PortfolioGrid() {
  return (
    <section
      id="portfolio"
      style={{ backgroundColor: '#1f1e1f' }}
      className="py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Headings */}
        <div className="text-center mb-14">
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: '#bac6ff' }}
          >
            Recent Projects
          </p>
          <h2
            className="text-4xl sm:text-5xl font-bold"
            style={{ color: '#f8f8f8', fontFamily: 'Poppins, sans-serif' }}
          >
            Our Work
          </h2>
        </div>

        {/* Masonry grid */}
        <div
          className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
        >
          {portfolioImages.map((image, index) => (
            <div
              key={index}
              className="break-inside-avoid group relative overflow-hidden rounded-lg cursor-pointer"
              style={{ marginBottom: '1rem' }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={800}
                height={600}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                style={{ display: 'block' }}
              />
              {/* Dark overlay on hover */}
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
              >
                <span
                  className="text-sm font-semibold uppercase tracking-widest px-5 py-2 rounded-full border"
                  style={{
                    color: '#f8f8f8',
                    borderColor: '#bac6ff',
                    backgroundColor: 'rgba(186,198,255,0.12)',
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  View
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <a
            href="/portfolio"
            className="inline-block px-8 py-3 rounded-full font-semibold text-sm uppercase tracking-widest transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
            style={{
              backgroundColor: '#bac6ff',
              color: '#1f1e1f',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            View All Work →
          </a>
        </div>
      </div>
    </section>
  );
}
