'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'bot'
  text: string
}

const QUICK_REPLIES = [
  'What services do you offer?',
  'How much does it cost?',
  'How fast is turnaround?',
  'Leave your number',
]

const BOT_RESPONSES: Record<string, string> = {
  default:
    "Hi! I'm the Impact Property Media assistant. I can help you with our services, pricing, and bookings. What would you like to know?",
  services:
    "We offer: 📸 Real Estate Photography, 🎥 Cinematic Videography, 🚁 Aerial & Drone, 🏠 Virtual Tours, and 📐 Floor Plans — all in one shoot day!",
  cost:
    "Our packages start from $299 for photography only. Full media packages (photo + video + aerial) start at $599. Want a custom quote? Leave your number and we'll call you!",
  pricing:
    "Our packages start from $299 for photography only. Full media packages (photo + video + aerial) start at $599. Want a custom quote? Leave your number and we'll call you!",
  price:
    "Our packages start from $299 for photography only. Full media packages (photo + video + aerial) start at $599. Want a custom quote? Leave your number and we'll call you!",
  turnaround:
    "We deliver within 24 hours for photography and 48 hours for video packages. Rush delivery available on request.",
  fast: "We deliver within 24 hours for photography and 48 hours for video packages. Rush delivery available on request.",
  book:
    "To book a shoot, please share: 1️⃣ Your name, 2️⃣ Property address, 3️⃣ Services needed, 4️⃣ Preferred date. Or call us at 1300 906 228!",
  booking:
    "To book a shoot, please share: 1️⃣ Your name, 2️⃣ Property address, 3️⃣ Services needed, 4️⃣ Preferred date. Or call us at 1300 906 228!",
  aerial:
    "Our drone team captures stunning aerial footage showcasing land, location and lifestyle. We're licensed and fully insured. Available across Melbourne.",
  video:
    "Our cinematic walkthrough videos are shot in 4K, professionally edited, with colour grading. Perfect for premium listings and social media.",
  photo:
    "We use professional HDR photography with expert post-processing. Every image is delivered print and web ready within 24 hours.",
  virtual:
    "We create interactive 3D virtual tours using the latest technology, allowing buyers to walk through the property anytime from anywhere.",
  floor:
    "Our floor plans are CAD-accurate, clearly labelled, and delivered digitally. Perfect for portals and marketing brochures.",
  hello: "Hi there! 👋 How can I help you today? I can answer questions about our services, pricing or help you book a shoot.",
  hi: "Hi there! 👋 How can I help you today? I can answer questions about our services, pricing or help you book a shoot.",
  hey: "Hey! 👋 What can I help you with today?",
  contact:
    "You can reach us at:\n📞 1300 906 228\n📧 enquiries@impactpropertymedia.com.au\n📸 @impactpropertymedia",
}

function getBotResponse(input: string): string {
  const lower = input.toLowerCase()
  for (const key of Object.keys(BOT_RESPONSES)) {
    if (key !== 'default' && lower.includes(key)) {
      return BOT_RESPONSES[key]
    }
  }
  return BOT_RESPONSES.default
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: BOT_RESPONSES.default },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const [leadData, setLeadData] = useState<{ name?: string; phone?: string; email?: string }>({})
  const leadDataRef = useRef<{ name?: string; phone?: string; email?: string }>({})

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  async function fireWebhook(data: { name?: string; phone?: string; email?: string; message?: string }) {
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name || 'Unknown',
          phone: data.phone || '',
          email: data.email || '',
          message: data.message || 'Lead captured via chatbot',
          source: 'chatbot',
        }),
      })
    } catch {}
  }

  function detectAndSaveLead(text: string) {
    const updated: { name?: string; phone?: string; email?: string } = { ...leadDataRef.current }

    // Detect phone: Australian mobile (04xx) or landline (+61/0 followed by 8 digits)
    const phoneMatch = text.match(/(\+?61|0)4\d{8}/) || text.match(/(\+?61|0)[2-9]\d{8}/)
    if (phoneMatch) {
      updated.phone = phoneMatch[0]
    }

    // Detect email
    const emailMatch = text.match(/[^\s@]+@[^\s@]+\.[^\s@]+/)
    if (emailMatch) {
      updated.email = emailMatch[0]
    }

    // Detect name: "my name is X", "I'm X", "I am X"
    const nameMatch =
      text.match(/(?:my name is|i(?:'| a)m)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i)
    if (nameMatch) {
      updated.name = nameMatch[1]
    }

    leadDataRef.current = updated
    setLeadData(updated)

    // Fire webhook when phone AND (name or email) are known
    if (updated.phone && (updated.name || updated.email)) {
      fireWebhook({ ...updated, message: `Lead captured via chatbot. Last message: ${text}` })
    }
  }

  function sendMessage(text: string) {
    if (!text.trim()) return
    const userMsg: Message = { role: 'user', text }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setTyping(true)

    // Run lead detection on user messages
    detectAndSaveLead(text)

    // Check if message is primarily a phone number
    const isPhoneOnly =
      /^[\s\d\+\-\(\)]{7,15}$/.test(text.trim()) &&
      (/(\+?61|0)4\d{8}/.test(text) || /(\+?61|0)[2-9]\d{8}/.test(text))

    setTimeout(() => {
      let botReply: string
      if (isPhoneOnly) {
        botReply = "Got it! \uD83D\uDCDE We'll be in touch shortly. Can I also grab your name?"
      } else if (
        /(\+?61|0)4\d{8}/.test(text) ||
        /(\+?61|0)[2-9]\d{8}/.test(text)
      ) {
        botReply = "Thanks! We'll give you a call shortly to discuss your property needs. \uD83D\uDCDE"
      } else {
        botReply = getBotResponse(text)
      }
      setMessages((prev) => [...prev, { role: 'bot', text: botReply }])
      setTyping(false)
    }, 800)
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open chat"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 9999,
          width: '3.5rem',
          height: '3.5rem',
          borderRadius: '100vw',
          background: '#bac6ff',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 24px rgba(186,198,255,0.4)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
        }}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1f1e1f" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1f1e1f" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: '6rem',
            right: '2rem',
            zIndex: 9998,
            width: 'min(380px, calc(100vw - 2rem))',
            height: '520px',
            background: '#1f1e1f',
            borderRadius: '1.25rem',
            border: '1px solid #bac6ff33',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            animation: 'fadeUp 0.25s ease',
          }}
        >
          {/* Header */}
          <div
            style={{
              background: '#bac6ff',
              padding: '1rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <div
              style={{
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '100vw',
                background: '#1f1e1f',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
              }}
            >
              📸
            </div>
            <div>
              <div style={{ fontWeight: 700, color: '#1f1e1f', fontSize: '0.95rem' }}>
                Impact Property Media
              </div>
              <div style={{ fontSize: '0.75rem', color: '#1f1e1faa' }}>
                AI Assistant • Usually replies instantly
              </div>
            </div>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '0.6rem 1rem',
                    borderRadius: msg.role === 'user' ? '1rem 1rem 0.25rem 1rem' : '1rem 1rem 1rem 0.25rem',
                    background: msg.role === 'user' ? '#bac6ff' : '#2e2d2e',
                    color: msg.role === 'user' ? '#1f1e1f' : '#f8f8f8',
                    fontSize: '0.875rem',
                    lineHeight: 1.6,
                    whiteSpace: 'pre-line',
                    fontWeight: msg.role === 'user' ? 500 : 400,
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div
                  style={{
                    padding: '0.6rem 1rem',
                    borderRadius: '1rem 1rem 1rem 0.25rem',
                    background: '#2e2d2e',
                    display: 'flex',
                    gap: '4px',
                    alignItems: 'center',
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: '#bac6ff',
                        animation: `typingDot 1.2s ${i * 0.2}s infinite`,
                        display: 'inline-block',
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          <div
            style={{
              padding: '0.5rem 1rem',
              display: 'flex',
              gap: '0.5rem',
              overflowX: 'auto',
              borderTop: '1px solid #ffffff0d',
            }}
          >
            {QUICK_REPLIES.map((qr) => (
              <button
                key={qr}
                onClick={() => sendMessage(qr)}
                style={{
                  flexShrink: 0,
                  padding: '0.35rem 0.85rem',
                  borderRadius: '100vw',
                  border: '1px solid #bac6ff66',
                  background: 'transparent',
                  color: '#bac6ff',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#bac6ff22'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                {qr}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              sendMessage(input)
            }}
            style={{
              display: 'flex',
              borderTop: '1px solid #ffffff0d',
              padding: '0.75rem 1rem',
              gap: '0.5rem',
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              style={{
                flex: 1,
                background: '#2e2d2e',
                border: '1px solid #ffffff1a',
                borderRadius: '100vw',
                padding: '0.5rem 1rem',
                color: '#f8f8f8',
                fontSize: '0.875rem',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              style={{
                width: '2.25rem',
                height: '2.25rem',
                borderRadius: '100vw',
                background: '#bac6ff',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1f1e1f" strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      )}

      <style>{`
        @keyframes typingDot {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-4px); }
        }
      `}</style>
    </>
  )
}
