import { supabaseAdmin } from '@/lib/supabase'

const FALLBACK = [
  { tier: 'Essential', monthly_price: 299, features: ['20 HDR Photos', 'Same-day editing', 'Web & print ready', 'Online delivery portal'], highlighted: false },
  { tier: 'Professional', monthly_price: 549, features: ['30 HDR Photos', 'Cinematic Video', 'Same-day editing', 'Web & print ready', 'Online delivery portal'], highlighted: true },
  { tier: 'Luxury', monthly_price: 849, features: ['40 HDR Photos', 'Cinematic Video', 'Aerial & Drone', 'Virtual Tour', 'Floor Plan', 'Same-day editing', 'Priority booking'], highlighted: false },
]

export default async function PackagesSection() {
  const { data } = await supabaseAdmin.from('packages').select('*').order('monthly_price')
  const packages = data?.length ? data : FALLBACK

  return (
    <section style={{ background: '#1f1e1f', padding: '6rem 2rem', fontFamily: 'Poppins, sans-serif' }}>
      <style>{`
        .pkg-heading { text-align: center; color: #f8f8f8; font-size: clamp(2rem, 4vw, 3rem); font-weight: 700; margin: 0 0 0.75rem 0; }
        .pkg-subheading { text-align: center; color: #ffffff99; font-size: 1.05rem; margin: 0 0 3.5rem 0; }
        .pkg-cards-row { display: flex; flex-direction: row; gap: 1.5rem; justify-content: center; align-items: stretch; flex-wrap: wrap; max-width: 1100px; margin: 0 auto; }
        .pkg-card { background: #2a292a; border-radius: 1rem; padding: 2rem; flex: 1 1 280px; max-width: 340px; display: flex; flex-direction: column; transition: transform 0.2s ease; }
        .pkg-card:hover { transform: translateY(-4px); }
        .pkg-card-featured { box-shadow: 0 0 30px #bac6ff22; position: relative; z-index: 1; }
        .pkg-badge { display: inline-block; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 0.3rem 0.9rem; border-radius: 100vw; margin-bottom: 1.25rem; width: fit-content; }
        .pkg-badge-default { background: #ffffff11; color: #ffffff88; }
        .pkg-badge-featured { background: #bac6ff22; color: #bac6ff; }
        .pkg-name { font-size: 1.4rem; font-weight: 700; color: #f8f8f8; margin: 0 0 0.5rem 0; text-transform: capitalize; }
        .pkg-price { font-size: 2rem; font-weight: 700; color: #f8f8f8; margin: 0 0 1.75rem 0; }
        .pkg-price-featured { color: #bac6ff; }
        .pkg-features { list-style: none; padding: 0; margin: 0 0 2rem 0; flex: 1; }
        .pkg-feature-item { display: flex; align-items: center; gap: 0.6rem; font-size: 0.9rem; padding: 0.4rem 0; border-bottom: 1px solid #ffffff0d; color: #f8f8f8cc; }
        .pkg-feature-item:last-child { border-bottom: none; }
        .pkg-feature-check { color: #bac6ff; font-size: 1rem; flex-shrink: 0; }
        .btn-primary-pkg { display: block; text-align: center; background: #bac6ff; color: #1f1e1f; border: none; border-radius: 100vw; padding: 0.85rem 2rem; font-size: 0.95rem; font-weight: 700; cursor: pointer; font-family: Poppins, sans-serif; transition: background 0.2s ease; text-decoration: none; }
        .btn-primary-pkg:hover { background: #a0b0ff; }
        .btn-secondary-pkg { display: block; text-align: center; background: transparent; color: #f8f8f8; border: 1px solid #ffffff33; border-radius: 100vw; padding: 0.85rem 2rem; font-size: 0.95rem; font-weight: 600; cursor: pointer; font-family: Poppins, sans-serif; transition: border-color 0.2s ease, background 0.2s ease; text-decoration: none; }
        .btn-secondary-pkg:hover { border-color: #bac6ff; background: #ffffff08; }
        @media (max-width: 768px) { .pkg-cards-row { flex-direction: column; align-items: center; } .pkg-card { max-width: 100%; width: 100%; } }
      `}</style>

      <h2 className="pkg-heading">Our Packages</h2>
      <p className="pkg-subheading">Choose the package that fits your listing.</p>

      <div className="pkg-cards-row">
        {packages.map((pkg: any) => (
          <div
            key={pkg.tier}
            className={`pkg-card${pkg.highlighted ? ' pkg-card-featured' : ''}`}
            style={{ border: pkg.highlighted ? '1px solid #bac6ff' : '1px solid #ffffff1a' }}
          >
            <span className={`pkg-badge ${pkg.highlighted ? 'pkg-badge-featured' : 'pkg-badge-default'}`}>
              {pkg.highlighted ? 'Best Value' : 'Popular'}
            </span>
            <h3 className="pkg-name">{pkg.tier}</h3>
            <p className={`pkg-price${pkg.highlighted ? ' pkg-price-featured' : ''}`}>
              From ${pkg.monthly_price}
            </p>
            <ul className="pkg-features">
              {(pkg.features ?? []).map((f: string) => (
                <li key={f} className="pkg-feature-item">
                  <span className="pkg-feature-check">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <a href="#contact" className={pkg.highlighted ? 'btn-primary-pkg' : 'btn-secondary-pkg'}>
              Get Started
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
