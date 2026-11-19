import Link from "next/link";
import { Service, City, SITE, CITIES } from "@/lib/site";
import { getOffers } from "@/lib/data";
import OfferCard from "./OfferCard";
import JsonLd from "./JsonLd";

export default async function ServicePage({ s, city }: { s: Service; city?: City }) {
  const offers = await getOffers(s.key);
  const where = city ? ` in ${city.name}, ${city.st}` : "";
  const url = `${SITE.url}/${s.slug}${city ? "/" + city.slug : ""}`;
  const crumbs = [{ n: "Home", u: SITE.url }, { n: s.name, u: `${SITE.url}/${s.slug}` }, ...(city ? [{ n: `${city.name}, ${city.st}`, u: url }] : [])];
  const others = CITIES.filter((c) => c.services.includes(s.key) && c.slug !== city?.slug);
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", serviceType: s.name, name: `${s.name}${where}`, url, description: s.metaDesc,
        provider: { "@id": `${SITE.url}/#business` }, areaServed: city ? { "@type": "City", name: `${city.name}, ${city.state}` } : { "@type": "Country", name: "United States" },
        hasOfferCatalog: { "@type": "OfferCatalog", name: `${s.name} offers`, itemListElement: offers.map((o) => ({ "@type": "Offer", name: o.title, price: o.price.replace(/[^0-9.]/g, "") || undefined, priceCurrency: "USD", url: `${SITE.url}/offers/${o.id}` })) } }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.n, item: c.u })) }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: s.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
      <section className="hero"><div className="wrap">
        <h1>{city ? `${s.name} in ${city.name}, ${city.st}` : s.h1}</h1>
        <p>{city ? (s.key === "duct" ? city.duct : city.roof) + " " : ""}{s.short}</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
          <a className="btn" href="#offers" style={{ background: "#fff", color: "var(--brand)" }}>View {s.name.toLowerCase()} offers</a>
          <Link className="btn alt" href="/contact" style={{ background: "transparent", color: "#fff" }}>Ask a question</Link>
        </div>
      </div></section>
      <div className="wrap crumbs"><Link href="/">Home</Link> › <Link href={`/${s.slug}`}>{s.name}</Link>{city && <> › {city.name}, {city.st}</>}</div>
      <section style={{ paddingTop: 10 }}><div className="wrap prose">
        <h2>{city ? `Why ${city.name} homeowners book ${s.name.toLowerCase()}` : `What is ${s.name.toLowerCase()}?`}</h2>
        <p>{s.intro}</p>
        {city && <p>{s.key === "duct" ? city.duct : city.roof} That's why {s.name.toLowerCase()} is one of the most requested home services in {city.name} and across {city.state}.</p>}
      </div></section>
      <section className="tint"><div className="wrap">
        <h2>Benefits of professional {s.name.toLowerCase()}</h2>
        <div className="grid" style={{ marginTop: 20 }}>{s.benefits.map((b) => <div className="card" key={b.t}><h3>{b.t}</h3><p>{b.d}</p></div>)}</div>
      </div></section>
      <section><div className="wrap"><div className="grid">
        <div><h2>Our process</h2><ol className="steps">{s.process.map((p) => <li key={p.t}><strong>{p.t}.</strong> {p.d}</li>)}</ol></div>
        <div><h2>Signs you need it</h2><ul>{s.signs.map((x) => <li key={x}>{x}</li>)}</ul><div className="note" style={{ marginTop: 16 }}><strong>Typical cost:</strong> {s.priceNote}</div></div>
      </div></div></section>
      <section className="tint" id="offers"><div className="wrap">
        <h2>{s.name} offers{where}</h2>
        <p className="lead">Order online or chat with us first. We'll confirm everything before your appointment.</p>
        <div className="grid" style={{ marginTop: 20 }}>{offers.map((o) => <OfferCard key={o.id} o={o} />)}</div>
        {offers.length === 0 && <p><Link href="/contact">Chat with us</Link> for a custom quote.</p>}
      </div></section>
      <section><div className="wrap prose">
        <h2>{s.name} FAQs</h2>
        {s.faqs.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
      </div></section>
      <section className="tint"><div className="wrap">
        <h2>{s.name} service areas</h2>
        <p style={{ lineHeight: 2.2 }}>{others.map((c) => <Link key={c.slug} className="tag" style={{ marginRight: 8 }} href={`/${s.slug}/${c.slug}`}>{s.name} {c.name}, {c.st}</Link>)}</p>
      </div></section>
    </>
  );
}
