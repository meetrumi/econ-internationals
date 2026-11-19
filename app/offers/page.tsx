import Link from "next/link";
import { getOffers } from "@/lib/data";
import OfferCard from "@/components/OfferCard";
export const dynamic = "force-dynamic";
export const metadata = { title: "Offers & Packages | Air Duct and Roof Cleaning Deals", description: "Compare our air duct cleaning and roof cleaning packages: what's included, prices and terms. Order online or chat with us first.", alternates: { canonical: "/offers" } };
export default async function Page() {
  const offers = await getOffers();
  const groups = [["duct", "Air Duct Cleaning Offers"], ["roof", "Roof Cleaning Offers"]];
  return <section><div className="wrap"><h1>Our Offers</h1><p className="lead">Every package lists exactly what's included. Want something custom? <Link href="/contact">Chat with us</Link>.</p>
    {groups.map(([k, t]) => { const list = offers.filter((o) => o.service === k); return list.length ? <div key={k} style={{ marginTop: 30 }}><h2>{t}</h2><div className="grid">{list.map((o) => <OfferCard key={o.id} o={o} />)}</div></div> : null; })}
  </div></section>;
}
