import Link from "next/link";
import { SITE } from "@/lib/site";
export const metadata = { title: "About Us", description: "Learn about E-CON Internationals, a home services company offering air duct cleaning and roof cleaning across the USA.", alternates: { canonical: "/about" } };
export default function Page() { return <section><div className="wrap prose"><h1>About {SITE.name}</h1>
  <p>{SITE.name} is a home services company focused on two things: cleaner indoor air and cleaner, longer-lasting roofs. We work with trained local technicians in major US metro areas to deliver air duct cleaning and soft wash roof cleaning.</p>
  <h2>How we work</h2><ul><li><strong>Clear offers.</strong> Every package lists exactly what's included and its terms.</li><li><strong>Talk first.</strong> Chat with us before ordering to get answers and agree on details.</li><li><strong>Careful methods.</strong> Negative-pressure duct cleaning and low-pressure soft washing that protects your roof.</li></ul>
  <p><Link className="btn" href="/offers">See our offers</Link></p></div></section>; }
