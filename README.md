# E-CON Internationals

Website for E-CON Internationals: air duct cleaning and roof cleaning services across the USA.

**Features:** offers managed from admin, online order tickets, customer chat, verified reviews with photos, blog, city landing pages, full SEO (meta tags, JSON-LD schema, sitemap, robots).

## Tech
Next.js 15 · PostgreSQL (`pg`) · deploy on Vercel + Neon (free tier).

## Setup
1. Create a Postgres database (e.g. Neon) and copy its connection string.
2. Set environment variables (see `.env.example`):
   - `DATABASE_URL`, `ADMIN_PASSWORD`, `SESSION_SECRET`, `NEXT_PUBLIC_SITE_URL`
   - optional: `NEXT_PUBLIC_EMAIL`, `NEXT_PUBLIC_PHONE`, `GOOGLE_SITE_VERIFICATION`
3. `npm install && npm run build && npm start`

The build creates database tables automatically and adds starter offers and blog posts.

## Admin
Go to `/admin` and log in with `ADMIN_PASSWORD`. Manage orders/tickets, chats, offers, reviews and blog posts.

## Adding cities
Edit `CITIES` in `lib/site.ts`. Pages and sitemap update automatically.

## Logo
Replace `public/logo.svg`, `public/icon.svg` and `public/og.png` with the company logo.
