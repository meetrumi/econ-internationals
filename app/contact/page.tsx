import { Suspense } from "react";
import { SITE } from "@/lib/site";
import StartChat from "./StartChat";
export const metadata = { title: "Contact & Live Chat | Ask Us Anything", description: "Message E-CON Internationals directly about air duct cleaning or roof cleaning. Ask questions, get a quote and agree on an offer before ordering.", alternates: { canonical: "/contact" } };
export default function Page() {
  return <section><div className="wrap"><div className="grid" style={{ alignItems: "start" }}>
    <div><h1>Chat With Our Team</h1><p className="lead">Ask anything about your home, our offers or scheduling. You'll get a private chat link so you can come back to the conversation any time.</p>
      <ul><li>Get a custom quote</li><li>Ask what's included in an offer</li><li>Agree on terms before you order</li></ul>
      <p>✉️ <a href={`mailto:${SITE.email}`}>{SITE.email}</a>{SITE.phone && <><br />📞 <a href={`tel:${SITE.phone}`}>{SITE.phone}</a></>}</p></div>
    <div className="card"><Suspense><StartChat /></Suspense></div>
  </div></div></section>;
}
