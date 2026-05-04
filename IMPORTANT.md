# Impact Property Media — Project Reference

## Live URLs
| | URL |
|---|---|
| **Site** | https://impact-property-media.vercel.app |
| **Admin** | https://impact-property-media.vercel.app/admin |
| **GitHub** | https://github.com/RachitSharma123/impact-property-media |

---

## Admin Login
- **URL:** `/admin/login`
- **Password:** `Impact@PM`

---

## Environment Variables

> Store in `.env.local` locally (gitignored). Set in Vercel → Project Settings → Environment Variables.

| Key | Value | Used For |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://wrplkntsqjasfiyhuscl.supabase.co` | Supabase client |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | see `.env.local` | Supabase public reads |
| `SUPABASE_SERVICE_ROLE_KEY` | see `.env.local` | Supabase admin writes |
| `ADMIN_PASSWORD` | see `.env.local` | Admin panel login |
| `OPENROUTER_API_KEY` | see `.env.local` | AI chatbot (Llama 3.1 8B) |

---

## Supabase
- **Project ID:** `wrplkntsqjasfiyhuscl`
- **Account:** `sharmairwin6@gmail.com`
- **Region:** Singapore
- **Dashboard:** https://supabase.com/dashboard/project/wrplkntsqjasfiyhuscl

### Tables
| Table | Purpose |
|---|---|
| `settings` | Business name, phone, email, address, Telegram token/chat ID, social URLs |
| `portfolio_items` | Portfolio images — title, category, featured, display_order, image_url, created_at |
| `leads` | Contact form + chatbot leads |
| `bookings` | Booking requests |
| `testimonials` | Client testimonials |
| `packages` | Pricing packages |
| `posts` | Blog posts |
| `faqs` | FAQ items |
| `services` | Services content |
| `site_content` | Editable site copy |

### Storage Buckets
| Bucket | Purpose |
|---|---|
| `portfolio-images` | Portfolio upload images |
| `portfolio` | Legacy portfolio images |

---

## Vercel
- **Project:** `impact-property-media`
- **Token:** stored in `.env.local` only — never commit
- **Auto-deploys:** Yes — every push to `main` deploys automatically

---

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Inline styles + CSS-in-JS (no Tailwind)
- **Database:** Supabase (PostgreSQL)
- **Storage:** Supabase Storage
- **AI Chatbot:** OpenRouter → Llama 3.1 8B (`meta-llama/llama-3.1-8b-instruct`) ~$0.055/M tokens
- **Notifications:** Telegram Bot API (leads → admin Telegram)
- **Hosting:** Vercel

---

## Admin Panel Pages
| Page | Path | Purpose |
|---|---|---|
| Dashboard | `/admin` | Overview stats |
| Portfolio | `/admin/portfolio` | Upload/manage/reorder images |
| Leads | `/admin/leads` | Contact form & chatbot leads |
| Bookings | `/admin/bookings` | Booking management |
| Packages | `/admin/packages` | Edit pricing packages |
| Services | `/admin/services` | Edit services content |
| Testimonials | `/admin/testimonials` | Manage reviews |
| Posts | `/admin/posts` | Blog posts |
| FAQs | `/admin/faqs` | FAQ management |
| Content | `/admin/content` | Editable site copy |
| Settings | `/admin/settings` | Phone, email, Telegram, social links |

---

## API Routes
| Route | Method | Purpose |
|---|---|---|
| `/api/admin/data` | GET/POST/PATCH/DELETE | Generic CRUD for all tables |
| `/api/admin/portfolio-upload` | POST | Upload image to Supabase storage + insert DB row |
| `/api/admin/content` | GET/POST | Site content management |
| `/api/admin/bookings` | POST | Create booking |
| `/api/contact` | POST | Submit lead → Supabase + Telegram notification |
| `/api/chat` | POST | AI chatbot (OpenRouter Llama 3.1 8B) |

---

## Portfolio Admin Features
- Single image upload with title, category, featured toggle
- **Bulk upload** — select multiple files, uploads sequentially with progress bar
- **Category tabs** — All / New / Featured / Photography / Videography / Aerial / Virtual Tours / Floor Plans
- **Drag to reorder** — drag cards, auto-saves `display_order` to DB on drop
- **Inline category change** — dropdown on each card to reassign category
- **New Uploads section** — items uploaded in last 24h shown separately with green badge

---

## AI Chatbot
- Widget: bottom-right floating button on all pages
- Model: `meta-llama/llama-3.1-8b-instruct` via OpenRouter
- Guardrails: **only answers Impact Property Media questions** — deflects anything off-topic
- Lead capture: detects phone numbers → fires lead to Telegram + Supabase
- Fallback: keyword-based responses if AI API fails
- Does not reveal it is powered by any AI model

---

## Telegram Notifications
- Leads from contact form and chatbot → Telegram message
- Configure in **Admin → Settings**:
  1. Paste **Bot Token** (from @BotFather)
  2. Send any message to the bot
  3. Click **Auto-detect** to fetch Chat ID automatically

---

## Contact Details (update in Admin → Settings)
- **Phone:** 1300 906 228
- **Email:** info@impactpropertymedia.com.au
- **Instagram:** @impactpropertymedia
> Updating these in Settings updates Footer, Contact page, and ContactSection everywhere automatically.

---

## Virtual Tours Page — YouTube Player
- File: `src/app/services/virtual-tours/YouTubePlayer.tsx`
- Set `VIDEO_ID = 'your_youtube_id'` to activate the player
- Currently hidden (empty ID = no render)
- Autoplay muted by default, unmute button shown

---

## Bulk Image Upload Script
- Script: `scripts/upload_aj_bhai.py`
- Uploads images from a local folder directly to Supabase (bypasses Next.js server)
- Uses Python stdlib only (`urllib`) — no pip deps
- Edit `FOLDER` and `CATEGORY` at the top to change source

---

## Local Development
```bash
cd ~/Desktop/impact-property-media
npm install
npm run dev       # http://localhost:3000
npm run build     # production build check
```

## Deploy
```bash
git add -A
git commit -m "your message"
git push origin main   # Vercel auto-deploys
```
