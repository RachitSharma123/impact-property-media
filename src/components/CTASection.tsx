import { supabaseAdmin } from '@/lib/supabase'

const DEFAULTS: Record<string, string> = {
  cta_stat: '1,000+',
  cta_stat_label: 'agents trust Impact Property Media',
  cta_subtext: 'Ready to make your listing stand out?',
  cta_btn_text: 'Book Your Shoot Today →',
  cta_btn_href: '#contact',
}

export default async function CTASection() {
  let content: Record<string, string> = { ...DEFAULTS }

  try {
    const { data } = await supabaseAdmin
      .from('site_content')
      .select('key, value')
      .in('key', Object.keys(DEFAULTS))

    if (data) {
      data.forEach(row => {
        content[row.key] = row.value
      })
    }
  } catch {
    // fall back to defaults
  }

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

      <p className="cta-stat">{content.cta_stat}</p>
      <p className="cta-stat-label">{content.cta_stat_label}</p>
      <p className="cta-subtext">{content.cta_subtext}</p>
      <a href={content.cta_btn_href} className="cta-btn">{content.cta_btn_text}</a>
    </section>
  );
}
