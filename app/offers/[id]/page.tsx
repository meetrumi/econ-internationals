import { notFound } from "next/navigation";
import Link from "next/link";
import { getOffer } from "@/lib/data";
import OrderForm from "./OrderForm";
export const dynamic = "force-dynamic";
type P = { params: Promise<{ id: string }> };
const get = getOffer;
export async function generateMetadata({ params }: P) {
  const o = await get((await params).id); if (!o) return {};
  return { title: `${o.title} – ${o.price}`, description: `${o.summary} Includes: ${o.includes.join(", ")}.`.slice(0, 160), alternates: { canonical: `/offers/${o.id}` } };
}
export default async function Page({ params }: P) {
  const o = await get((await params).id); if (!o) notFound();
  return <section><div className="wrap"><div className="crumbs"><Link href="/">Home</Link> › <Link href="/offers">Offers</Link> › {o.title}</div>
    <div className="grid" style={{ alignItems: "start" }}>
      <div className="card"><span className="tag">{o.service === "duct" ? "Air Duct Cleaning" : "Roof Cleaning"}</span><h1 style={{ margin: "10px 0" }}>{o.title}</h1><div className="stat">{o.price}</div><p>{o.summary}</p>
        <h3>What's included</h3><ul>{o.includes.map((x: string, i: number) => <li key={i}>{x}</li>)}</ul>{o.terms && <><h3>Terms</h3><p>{o.terms}</p></>}
        <p>Questions first? <Link href={`/contact?offer=${encodeURIComponent(o.title)}`}>Chat with us</Link>.</p></div>
      <div className="card"><h2>Order this offer</h2><OrderForm offerId={o.id} /></div>
    </div></div></section>;
}
