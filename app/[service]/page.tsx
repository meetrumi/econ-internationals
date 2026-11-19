import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { serviceBySlug, SERVICES } from "@/lib/site";
import ServicePage from "@/components/ServicePage";
export const dynamic = "force-dynamic";
type P = { params: Promise<{ service: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const s = serviceBySlug((await params).service); if (!s) return {};
  return { title: s.metaTitle, description: s.metaDesc, keywords: s.keywords, alternates: { canonical: `/${s.slug}` }, openGraph: { title: s.metaTitle, description: s.metaDesc, url: `/${s.slug}` } };
}
export default async function Page({ params }: P) { const s = serviceBySlug((await params).service); if (!s) notFound(); return <ServicePage s={s} />; }
