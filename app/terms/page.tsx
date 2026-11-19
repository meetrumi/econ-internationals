import { SITE } from "@/lib/site";
export const metadata = { title: "Terms of Service", description: `Terms of service for ${SITE.name}.`, alternates: { canonical: "/terms" } };
export default function Page() { return <section><div className="wrap prose"><h1>Terms of Service</h1><p>Last updated: November 2026</p>
  <h2>Orders</h2><p>Submitting an order is a service request. Your booking is confirmed once our team contacts you and agrees the date, scope and price.</p>
  <h2>Offers</h2><p>Each offer lists what's included and any specific terms. Work outside the listed scope will be discussed and agreed with you before it is done.</p>
  <h2>Reviews</h2><p>Reviews must be honest and relate to a real order. We may decline reviews that are abusive, off-topic or include personal information.</p>
  <h2>Contact</h2><p>Questions? Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p></div></section>; }
