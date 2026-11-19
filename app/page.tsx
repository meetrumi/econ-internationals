import Link from "next/link";
import { SERVICES, SITE, CITIES } from "@/lib/site";
import { getOffers, getReviews, getRating, getPosts } from "@/lib/data";
import OfferCard from "@/components/OfferCard";
import ReviewCard from "@/components/ReviewCard";
import JsonLd from "@/components/JsonLd";
export const dynamic = "force-dynamic";

const faqs = [
  { q: "What services does E-CON Internationals offer?", a: "We currently offer professional air duct cleaning (including dryer vent cleaning) and soft wash roof cleaning for homes across the USA." },
  { q: "Can I ask questions before ordering?", a: "Yes. Use our chat to ask anything, discuss your home and agree on the right offer before you place an order." },
  { q: "How do I order a service?", a: "Choose an offer, fill in your contact details and address, and submit. Our team will contact you to confirm a date." },
  { q: "Which cities do you serve?", a: "We serve major US metros including Houston, Dallas, Atlanta, Tampa, Orlando, Charlotte and more. See our service areas page for the full list." },
];

export default async function Home() {
  const [offers, reviews, rating, posts] = await Promise.all([getOffers(undefined, true), getReviews(6), getRating(), getPosts(3)]);
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
      <section className="hero"><div className="wrap">
        <h1>Air Duct Cleaning &amp; Roof Cleaning Services You Can Trust</h1>
        <p>Breathe cleaner air and bring your roof back to life. {SITE.name} offers clear, upfront packages for homeowners across the USA, and you can chat with our team before you order.</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
          <Link className="btn" href="/offers" style={{ background: "#fff", color: "var(--brand)" }}>See offers</Link>
          <Link className="btn alt" href="/contact" style={{ background: "transparent", color: "#fff" }}>Chat with us</Link>
        </div>
        {rating.count > 0 && <p style={{ marginTop: 20, fontSize: 16 }}><span className="stars">★★★★★</span> Rated {rating.avg.toFixed(1)}/5 from {rating.count} customer reviews</p>}
      </div></section>

      <section><div className="wrap">
        <h2>Our Services</h2>
        <p className="lead">Two specialist services, done properly. Every job starts with a clear quote and ends with a walkthrough.</p>
        <div className="grid" style={{ marginTop: 24 }}>
          {SERVICES.map((s) => (
            <div className="card" key={s.slug}>
              <h3>{s.name}</h3><p>{s.short}</p>
              <ul>{s.benefits.slice(0, 3).map((b) => <li key={b.t}>{b.t}</li>)}</ul>
              <Link className="btn sm" href={`/${s.slug}`}>Learn about {s.name.toLowerCase()}</Link>
            </div>
          ))}
        </div>
      </div></section>

      <section className="tint" id="offers"><div className="wrap">
        <h2>Current Offers</h2>
        <p className="lead">Pick a package and order online, or chat with us first to ask questions and agree on terms.</p>
        <div className="grid" style={{ marginTop: 24 }}>{offers.map((o) => <OfferCard key={o.id} o={o} />)}</div>
        {offers.length === 0 && <p>New offers are coming soon. <Link href="/contact">Chat with us</Link> for a quote.</p>}
      </div></section>

      <section><div className="wrap">
        <h2>How It Works</h2>
        <div className="grid" style={{ marginTop: 20 }}>
          {[["1. Choose or ask", "Browse our offers or message us with your questions."], ["2. Agree on terms", "We confirm what's included, the price and a date that suits you."], ["3. Place your order", "Submit your address and contact details. We'll confirm your booking."], ["4. Job done right", "Our technician completes the work and walks you through the results."]].map(([t, d]) => <div className="card" key={t}><h3>{t}</h3><p>{d}</p></div>)}
        </div>
      </div></section>

      {reviews.length > 0 && <section className="tint"><div className="wrap">
        <h2>What Customers Say</h2>
        <div className="grid" style={{ marginTop: 20 }}>{reviews.map((r) => <ReviewCard key={r.id} r={r} />)}</div>
        <p style={{ marginTop: 20 }}><Link href="/reviews">Read all reviews →</Link></p>
      </div></section>}

      <section><div className="wrap">
        <h2>Service Areas</h2>
        <p className="lead">We serve homeowners in major metro areas across the United States.</p>
        <p style={{ lineHeight: 2.2 }}>{CITIES.map((c) => <Link key={c.slug} className="tag" style={{ marginRight: 8 }} href={`/${c.services.includes("duct") ? "air-duct-cleaning" : "roof-cleaning"}/${c.slug}`}>{c.name}, {c.st}</Link>)}</p>
      </div></section>

      {posts.length > 0 && <section className="tint"><div className="wrap">
        <h2>Tips &amp; Guides</h2>
        <div className="grid" style={{ marginTop: 20 }}>{posts.map((p) => <div className="card" key={p.id}><h3><Link href={`/blog/${p.slug}`}>{p.title}</Link></h3><p>{p.excerpt}</p></div>)}</div>
      </div></section>}

      <section><div className="wrap prose">
        <h2>Frequently Asked Questions</h2>
        {faqs.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
      </div></section>
    </>
  );
}
