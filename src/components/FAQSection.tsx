"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabasePublic";

const FALLBACK = [
  { q: "How quickly will I receive my photos and videos?", a: "Photos are delivered within 24 hours of the shoot. Video packages are delivered within 48 hours. Rush delivery is available on request." },
  { q: "Do you cover all of Melbourne?", a: "Yes, we cover all Melbourne metro suburbs and surrounding regions. Travel fees may apply beyond 50km from the CBD." },
  { q: "What happens if the weather is bad on shoot day?", a: "We monitor weather closely and will contact you if conditions aren't suitable. We rebook at no extra charge." },
  { q: "Can I request specific shots or angles?", a: "Absolutely. We encourage you to share a shot list before the shoot. Our photographers will also recommend their best angles." },
  { q: "Do you offer twilight photography?", a: "Yes — twilight shoots are available as an add-on to any package. They're particularly effective for premium listings." },
  { q: "How do I book?", a: "Simply fill out the contact form or call us on 0400 000 000. We'll confirm your booking within 2 hours." },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [faqs, setFaqs] = useState(FALLBACK);

  useEffect(() => {
    supabase.from('faqs').select('*').order('display_order').then(({ data }) => {
      if (data?.length) setFaqs(data.map((f: any) => ({ q: f.question, a: f.answer })))
    })
  }, [])

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section style={{ background: "#f8f8f8", padding: "6rem 2rem", fontFamily: "Poppins, sans-serif" }}>
      <style>{`
        .faq-heading { text-align: center; font-size: clamp(1.75rem, 3.5vw, 2.75rem); font-weight: 700; color: #1f1e1f; margin: 0 0 3rem 0; }
        .faq-list { max-width: 760px; margin: 0 auto; }
        .faq-item { border-bottom: 1px solid #1f1e1f22; }
        .faq-question-row { display: flex; justify-content: space-between; align-items: center; padding: 1.25rem 0; cursor: pointer; gap: 1rem; user-select: none; }
        .faq-question-row:hover .faq-question-text { color: #7a8fff; }
        .faq-question-text { font-size: 1rem; font-weight: 600; color: #1f1e1f; transition: color 0.2s ease; line-height: 1.4; }
        .faq-question-text-active { color: #7a8fff; }
        .faq-icon { font-size: 1.3rem; font-weight: 400; color: #7a8fff; flex-shrink: 0; width: 1.5rem; text-align: center; line-height: 1; }
        .faq-answer-wrapper { overflow: hidden; transition: max-height 0.35s ease, opacity 0.25s ease; }
        .faq-answer { font-size: 0.95rem; color: #1f1e1fbb; line-height: 1.7; padding-bottom: 1.25rem; }
      `}</style>

      <h2 className="faq-heading">Frequently Asked Questions</h2>

      <div className="faq-list">
        {faqs.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className="faq-item">
              <div className="faq-question-row" onClick={() => toggle(i)} role="button" aria-expanded={isOpen}>
                <span className={`faq-question-text${isOpen ? " faq-question-text-active" : ""}`}>{item.q}</span>
                <span className="faq-icon">{isOpen ? "−" : "+"}</span>
              </div>
              <div className="faq-answer-wrapper" style={{ maxHeight: isOpen ? "300px" : "0px", opacity: isOpen ? 1 : 0 }}>
                <p className="faq-answer">{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
