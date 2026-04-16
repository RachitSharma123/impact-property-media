import Image from "next/image";

const posts = [
  {
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
    tag: "Photography Tips",
    title: "Why Twilight Photography Sells Listings Faster",
    excerpt:
      "The golden hour effect isn't just beautiful — it triggers an emotional response in buyers. Here's why you should always offer twilight as an option.",
  },
  {
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    tag: "Videography",
    title: "How Cinematic Video Increased One Agent's Enquiries by 40%",
    excerpt:
      "A 90-second walkthrough video can do what 30 photos can't — it lets buyers feel the flow of a home before they visit.",
  },
  {
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
    tag: "Aerial",
    title: "Drone Footage: When It's Worth It and When It's Not",
    excerpt:
      "Not every property needs aerial footage — but for homes with land, water views or lifestyle locations, it's non-negotiable.",
  },
];

export default function BlogSection() {
  return (
    <section
      style={{
        background: "#1f1e1f",
        padding: "6rem 2rem",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <style>{`
        .blog-heading {
          text-align: center;
          font-size: clamp(1.75rem, 3.5vw, 2.75rem);
          font-weight: 700;
          color: #f8f8f8;
          margin: 0 0 0.75rem 0;
        }
        .blog-subheading {
          text-align: center;
          color: #ffffff77;
          font-size: 1.05rem;
          margin: 0 0 3.5rem 0;
        }
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .blog-card {
          background: #2a292a;
          border-radius: 0.75rem;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .blog-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px #00000044;
        }
        .blog-img-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          flex-shrink: 0;
        }
        .blog-body {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .blog-tag {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #bac6ff;
          margin-bottom: 0.6rem;
        }
        .blog-title {
          font-size: 1rem;
          font-weight: 700;
          color: #f8f8f8;
          line-height: 1.4;
          margin: 0 0 0.75rem 0;
        }
        .blog-excerpt {
          font-size: 0.875rem;
          color: #ffffff77;
          line-height: 1.65;
          margin: 0 0 1.25rem 0;
          flex: 1;
        }
        .blog-link {
          font-size: 0.875rem;
          font-weight: 600;
          color: #bac6ff;
          text-decoration: none;
          transition: color 0.2s ease;
          align-self: flex-start;
        }
        .blog-link:hover {
          color: #ffffff;
        }
        @media (max-width: 900px) {
          .blog-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <h2 className="blog-heading">Tips & Insights</h2>
      <p className="blog-subheading">Advice for agents who want more from their listings.</p>

      <div className="blog-grid">
        {posts.map((post, i) => (
          <article key={i} className="blog-card">
            <div className="blog-img-wrapper">
              <Image
                src={post.image}
                alt={post.title}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 900px) 100vw, 33vw"
              />
            </div>
            <div className="blog-body">
              <span className="blog-tag">{post.tag}</span>
              <h3 className="blog-title">{post.title}</h3>
              <p className="blog-excerpt">{post.excerpt}</p>
              <a href="#" className="blog-link">Read More →</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
