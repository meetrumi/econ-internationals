import { SITE } from "@/lib/site";
export const metadata = { title: "Privacy Policy", description: `Privacy policy for ${SITE.name}.`, alternates: { canonical: "/privacy" } };
export default function Page() { return <section><div className="wrap prose"><h1>Privacy Policy</h1><p>Last updated: November 2026</p>
  <h2>Information we collect</h2><p>When you place an order, start a chat or leave a review, we collect the details you provide: name, email, phone number, service address, messages, review text and photos.</p>
  <h2>How we use it</h2><p>We use your information only to respond to you, schedule and complete services, and display reviews you choose to publish. We do not sell your personal information.</p>
  <h2>Reviews</h2><p>Your review, display name, city and photos may be shown publicly after approval. Your email, phone and address are never shown.</p>
  <h2>Contact</h2><p>To access or delete your data, email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p></div></section>; }
