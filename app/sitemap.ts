import type { MetadataRoute } from "next";
import { SITE, SERVICES, CITIES } from "@/lib/site";
import { q } from "@/lib/db";
export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const u = (p: string, priority: number, changeFrequency: any = "weekly", lastModified = new Date()) => ({ url: `${SITE.url}${p}`, lastModified, changeFrequency, priority });
  const out = [u("/", 1, "daily"), ...SERVICES.map((s) => u(`/${s.slug}`, 0.9)), u("/offers", 0.8, "daily"), u("/reviews", 0.7, "daily"), u("/blog", 0.7, "daily"), u("/service-areas", 0.6), u("/contact", 0.6, "monthly"), u("/about", 0.4, "monthly"), u("/privacy", 0.2, "yearly"), u("/terms", 0.2, "yearly")];
  for (const s of SERVICES) for (const c of CITIES) if (c.services.includes(s.key)) out.push(u(`/${s.slug}/${c.slug}`, 0.8));
  try {
    const [posts, offers] = await Promise.all([q(`select slug, "updatedAt" from posts where published`), q(`select id, "createdAt" from offers where active`)]);
    posts.forEach((p) => out.push(u(`/blog/${p.slug}`, 0.6, "monthly", p.updatedAt)));
    offers.forEach((o) => out.push(u(`/offers/${o.id}`, 0.6, "weekly", o.createdAt)));
  } catch {}
  return out;
}
