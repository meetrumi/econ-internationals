import Link from "next/link";
export default function OfferCard({ o }: { o: any }) {
  return (
    <div className="card offer">
      <span className="tag">{o.service === "duct" ? "Air Duct Cleaning" : "Roof Cleaning"}</span>
      <h3 style={{ marginTop: 10 }}>{o.title}</h3>
      <div className="price">{o.price}</div>
      {o.summary && <p style={{ margin: "4px 0" }}>{o.summary}</p>}
      <ul>{o.includes.map((x: string, i: number) => <li key={i}>{x}</li>)}</ul>
      {o.terms && <div className="terms"><strong>Terms:</strong> {o.terms}</div>}
      <Link className="btn" href={`/offers/${o.id}`}>Order this offer</Link>
      <Link href={`/contact?offer=${encodeURIComponent(o.title)}`} style={{ textAlign: "center", marginTop: 10, fontSize: 14 }}>Have questions? Chat first</Link>
    </div>
  );
}
