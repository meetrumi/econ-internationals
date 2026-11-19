import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { serviceBySlug, CITIES } from "@/lib/site";
import ServicePage from "@/components/ServicePage";
export const dynamic = "force-dynamic";
type P = { params: Promise<{ service: string; city: string }> };
const find = async (p: P["params"]) => { const { service, city } = await p; const s = serviceBySlug(service); const c = CITIES.find((x) => x.slug === city); return s && c && c.services.includes(s.key) ? { s, c } : null; };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const r = await find(params); if (!r) return {}; const { s, c } = r;
  const title = `${s.name} in ${c.name}, ${c.st}`;
  const description = `Professional ${s.name.toLowerCase()} in ${c.name}, ${c.state}. ${s.key === "duct" ? "Cleaner air, better airflow, dryer vent cleaning available." : "Remove black streaks, algae and moss safely with soft washing."} See offers or chat with us for a quote.`;
  return { title, description, keywords: s.keywords.map((k) => `${k.replace(" near me", "")} ${c.name}`), alternates: { canonical: `/${s.slug}/${c.slug}` }, openGraph: { title, description, url: `/${s.slug}/${c.slug}` } };
}
export default async function Page({ params }: P) { const r = await find(params); if (!r) notFound(); return <ServicePage s={r.s} city={r.c} />; }
