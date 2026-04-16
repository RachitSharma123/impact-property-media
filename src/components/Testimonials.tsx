'use client'

const testimonials = [
  {
    quote:
      'Impact Property Media transformed how we present our listings. The photography is stunning and the turnaround is always on time.',
    name: 'Sarah K.',
    agency: 'Ray White Melbourne',
    initial: 'S',
  },
  {
    quote:
      "We've worked with many photographers but Impact Property Media is on another level. Our listings sell 30% faster since switching.",
    name: 'James T.',
    agency: 'Barry Plant',
    initial: 'J',
  },
  {
    quote:
      'The aerial footage alone is worth it. Buyers see the neighbourhood context immediately. Brilliant team to work with.',
    name: 'Priya M.',
    agency: 'Harcourts',
    initial: 'P',
  },
];

function StarRating() {
  return (
    <div className="flex gap-1 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#bac6ff"
          className="w-4 h-4"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function QuoteIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="#bac6ff"
      className="w-8 h-8 mb-4 opacity-60"
    >
      <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
    </svg>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      style={{ backgroundColor: '#1f1e1f' }}
      className="py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: '#bac6ff' }}
          >
            Client Stories
          </p>
          <h2
            className="text-4xl sm:text-5xl font-bold"
            style={{ color: '#f8f8f8', fontFamily: 'Poppins, sans-serif' }}
          >
            What Agents Say
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="flex flex-col p-8 rounded-2xl transition-all duration-300 cursor-default"
              style={{
                backgroundColor: '#2a292a',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  '0 0 30px rgba(186,198,255,0.12)';
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  'rgba(186,198,255,0.25)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  'rgba(255,255,255,0.08)';
              }}
            >
              <QuoteIcon />
              <StarRating />

              <p
                className="text-base leading-relaxed flex-1 mb-6"
                style={{
                  color: '#c8c8c8',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{
                    backgroundColor: '#bac6ff',
                    color: '#1f1e1f',
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  {t.initial}
                </div>
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: '#f8f8f8', fontFamily: 'Poppins, sans-serif' }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: '#888888', fontFamily: 'Poppins, sans-serif' }}
                  >
                    {t.agency}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
