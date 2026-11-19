import Link from "next/link";
import { SITE, CITIES } from "@/lib/site";
export default function Footer() {
  return (
    <footer className="site"><div className="wrap">
      <div className="grid">
        <div><h4>{SITE.name}</h4><p>{SITE.tagline}.</p>{SITE.phone && <p>📞 <a href={`tel:${SITE.phone}`}>{SITE.phone}</a></p>}<p>✉️ <a href={`mailto:${SITE.email}`}>{SITE.email}</a></p></div>
        <div><h4>Services</h4><ul><li><Link href="/air-duct-cleaning">Air Duct Cleaning</Link></li><li><Link href="/roof-cleaning">Roof Cleaning</Link></li><li><Link href="/offers">Current Offers</Link></li></ul></div>
        <div><h4>Popular Areas</h4><ul>{CITIES.slice(0, 6).map((c) => <li key={c.slug}><Link href={`/${c.services.includes("duct") ? "air-duct-cleaning" : "roof-cleaning"}/${c.slug}`}>{c.name}, {c.st}</Link></li>)}<li><Link href="/service-areas">All service areas</Link></li></ul></div>
        <div><h4>Company</h4><ul><li><Link href="/about">About</Link></li><li><Link href="/blog">Blog</Link></li><li><Link href="/reviews">Reviews</Link></li><li><Link href="/contact">Contact</Link></li><li><Link href="/privacy">Privacy</Link></li><li><Link href="/terms">Terms</Link></li></ul></div>
      </div>
      <p style={{ marginTop: 30, fontSize: 13, opacity: .7 }}>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
    </div></footer>
  );
}
