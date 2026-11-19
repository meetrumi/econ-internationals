# E-CON Internationals — Website Build Plan

Phase 1 services: **Air Duct Cleaning** and **Roof Cleaning** (US homeowners).
Logo: placeholder (`public/logo.svg`) — swap for the company logo later.

## 1. Tech stack
- Next.js 15 (App Router), TypeScript — server-rendered for SEO
- PostgreSQL (Neon free tier) + Prisma
- Hosted on Vercel; code in GitHub repo `meetrumi/econ-internationals`
- Admin login: password + signed cookie (env `ADMIN_PASSWORD`, `SESSION_SECRET`)
- Review images stored in DB (resized in browser to ≤1200px) — no extra storage service

## 2. Site map (public)
| URL | Purpose | Main keyword |
|---|---|---|
| `/` | Home: hero, services, offers (from admin), reviews, FAQ | duct and roof cleaning services |
| `/air-duct-cleaning` | Service pillar page | air duct cleaning |
| `/roof-cleaning` | Service pillar page | roof cleaning / soft wash roof cleaning |
| `/air-duct-cleaning/[city]` | City landing pages | air duct cleaning [city] |
| `/roof-cleaning/[city]` | City landing pages | roof cleaning [city] |
| `/offers` + `/offers/[id]` | All offers, offer detail + order form | duct cleaning deals |
| `/reviews` | Approved reviews + submit form (text + images) | — |
| `/blog`, `/blog/[slug]` | Articles managed from admin | informational keywords |
| `/contact` → `/chat/[token]` | Live text chat with admin | — |
| `/about`, `/privacy`, `/terms` | Trust + legal | — |
| `/sitemap.xml`, `/robots.txt` | Auto-generated, includes blog + city pages | — |

City pages launch with Tier 1 metros (Houston, Dallas, Fort Worth, San Antonio, Austin, Tampa, Orlando, Jacksonville, Atlanta, Charlotte, Raleigh, Alexandria, Richmond, Rockville) plus Seattle/Portland for roof cleaning. Each gets unique local copy (climate, home types, common problems) to avoid thin/duplicate content. More cities added later from admin-free config.

## 3. Customer flows
1. **Offers** — Admin creates unlimited offers: title, price, "what's included" list, terms, service (duct/roof), featured on homepage toggle, order/sort, active toggle.
2. **Order (ticket)** — Customer picks offer → form: name, email*, phone*, full address* (street, city, state, ZIP), preferred date, notes → submit → **ticket** with order number (e.g. `EC-10234`) appears in admin dashboard. Status: New → Contacted → Scheduled → Completed / Cancelled.
3. **Chat** — Customer starts a chat (name + email/phone + first message), gets a private link to continue; admin replies from dashboard; used to agree price/payment terms and custom offers. Admin can turn a chat into an order ticket.
4. **Reviews** — Only real customers: order number + email verifies them. Rating (1–5), text, up to 4 photos. Admin approves before it shows. Approved reviews feed `AggregateRating` schema.
5. **Payment** — skipped for now; added later.

## 4. Admin dashboard (`/admin`)
- Overview: new tickets, unread chats, pending reviews, counts
- Orders/Tickets: list, filter by status, detail view, status change, internal notes
- Offers: create / edit / delete / reorder / feature on homepage
- Messages: chat inbox with unread badges, reply
- Reviews: approve / hide / delete, view photos
- Blog: create / edit / publish, slug, meta title, meta description, tags, cover image
- Settings: business phone, email, service hours, homepage headline

## 5. SEO plan
**Technical:** server rendering, unique `<title>`/meta description per page, canonical URLs, Open Graph/Twitter cards, auto `sitemap.xml` + `robots.txt`, fast load (no heavy libraries), mobile-first, semantic headings, alt text, 404 page, `/admin` and `/chat` set to noindex.

**Schema (JSON-LD):** `HomeAndConstructionBusiness` (site-wide), `Service` + `Offer` on service pages, `FAQPage`, `BreadcrumbList`, `BlogPosting`, `AggregateRating`/`Review` (approved only).

**Keyword clusters**
- Duct, commercial: air duct cleaning, air duct cleaning near me, duct cleaning service, HVAC duct cleaning, dryer vent cleaning, air duct cleaning cost, [city] variants
- Duct, informational (blog): how often should you clean air ducts, signs your ducts need cleaning, is duct cleaning worth it, duct cleaning for allergies, mold in air ducts
- Roof, commercial: roof cleaning, roof cleaning near me, soft wash roof cleaning, roof moss removal, black streaks on roof removal, roof algae cleaning, [city] variants
- Roof, informational (blog): what causes black streaks on roofs, pressure washing vs soft washing roof, how often to clean a roof, does roof cleaning damage shingles

**Launch blog posts (6):** 3 duct + 3 roof from the informational lists above.

**Search Console:** verify domain → submit sitemap → URL inspection on home + service pages → check coverage, mobile usability, Core Web Vitals, enhancements (FAQ, breadcrumbs, reviews) → fix any issues.

## 6. Build phases
| Day | Work |
|---|---|
| 1 | Project setup, database schema, design system, home + 2 service pages, placeholder logo |
| 2 | Offers + order tickets, admin login, admin orders/offers |
| 3 | Chat system, reviews with images, admin inbox + moderation |
| 4 | Blog + admin editor, city pages, all schema, sitemap/robots, 6 posts |
| 5 | Testing, speed/SEO checks, GitHub repo, Vercel + Neon deploy, Search Console setup and checks |
| Ongoing | New cities, more blog posts, more services (gutter, grass, car wash), Stripe |

## 7. What's needed from you
- Domain name (buy one, e.g. `econinternationals.com`) — Search Console needs the final domain
- Vercel + Neon accounts (free) connected to GitHub
- Business phone/email to show on site (a US number via Google Voice/OpenPhone builds trust)
- Real logo later
