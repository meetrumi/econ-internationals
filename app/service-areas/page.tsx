import Link from "next/link";
import { CITIES, SERVICES } from "@/lib/site";
export const metadata = { title: "Service Areas | Air Duct & Roof Cleaning Cities", description: "See every US city where E-CON Internationals provides air duct cleaning and roof cleaning services.", alternates: { canonical: "/service-areas" } };
export default function Page() {
  return <section><div className="wrap"><h1>Our Service Areas</h1><p className="lead">Air duct cleaning and roof cleaning in these US metro areas. Don't see your city? <Link href="/contact">Ask us</Link>.</p>
    {SERVICES.map((s) => <div key={s.key} style={{ marginTop: 30 }}><h2>{s.name}</h2><div className="grid">{CITIES.filter((c) => c.services.includes(s.key)).map((c) => <Link className="card" style={{ textDecoration: "none" }} key={c.slug} href={`/${s.slug}/${c.slug}`}><strong>{s.name} in {c.name}, {c.st}</strong></Link>)}</div></div>)}
  </div></section>;
}
