import Image from 'next/image';

const stats = [
  { value: '200+', label: 'Agents Trust Us' },
  { value: '5000+', label: 'Properties Shot' },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      style={{ backgroundColor: '#f8f8f8' }}
      className="py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text content */}
          <div>
            <p
              className="text-xs font-bold uppercase tracking-[0.2em] mb-4"
              style={{ color: '#bac6ff', fontFamily: 'Poppins, sans-serif' }}
            >
              About Us
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6"
              style={{ color: '#1f1e1f', fontFamily: 'Poppins, sans-serif' }}
            >
              We Tell Your Property&apos;s Story
            </h2>
            <p
              className="text-base leading-relaxed mb-4"
              style={{ color: '#444444', fontFamily: 'Poppins, sans-serif' }}
            >
              Impact Property Media is Melbourne&apos;s premier real estate media company. We combine
              technical precision with creative vision to produce photography, video and digital
              content that makes properties stand out in any market.
            </p>
            <p
              className="text-base leading-relaxed mb-10"
              style={{ color: '#444444', fontFamily: 'Poppins, sans-serif' }}
            >
              Founded by passionate photographers with deep roots in the Melbourne property market,
              we understand what buyers respond to — and we make sure your listing delivers it.
            </p>

            {/* Stats */}
            <div className="flex gap-10 mb-10">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p
                    className="text-3xl font-bold"
                    style={{ color: '#1f1e1f', fontFamily: 'Poppins, sans-serif' }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-sm mt-1"
                    style={{ color: '#666666', fontFamily: 'Poppins, sans-serif' }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="/about"
              className="inline-block px-7 py-3 rounded-full font-semibold text-sm uppercase tracking-widest transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
              style={{
                backgroundColor: '#1f1e1f',
                color: '#f8f8f8',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              Meet the Team
            </a>
          </div>

          {/* Right: Image with floating badge */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80"
                alt="Impact Property Media team at work"
                width={800}
                height={900}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full h-auto object-cover"
                style={{ display: 'block' }}
              />
              {/* Subtle dark overlay */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(31,30,31,0.35) 100%)' }}
              />
            </div>

            {/* Floating badge */}
            <div
              className="absolute -bottom-5 -left-5 sm:bottom-6 sm:left-6 px-5 py-4 rounded-xl shadow-xl"
              style={{
                backgroundColor: '#bac6ff',
                maxWidth: '200px',
              }}
            >
              <p
                className="text-xs font-bold uppercase tracking-wide leading-snug"
                style={{ color: '#1f1e1f', fontFamily: 'Poppins, sans-serif' }}
              >
                Melbourne&apos;s #1 Property Media Team
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
