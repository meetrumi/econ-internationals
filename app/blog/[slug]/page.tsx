import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost, getPosts } from "@/lib/data";
import Markdown from "@/components/Markdown";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/lib/site";
export const dynamic = "force-dynamic";
type P = { params: Promise<{ slug: string }> };
const get = getPost;
export async function generateMetadata({ params }: P) {
  const p = await get((await params).slug); if (!p) return {};
  const title = p.metaTitle || p.title, description = p.metaDesc || p.excerpt;
  return { title: { absolute: title }, description, keywords: p.tags, alternates: { canonical: `/blog/${p.slug}` }, openGraph: { type: "article", title, description, url: `/blog/${p.slug}`, publishedTime: p.createdAt.toISOString(), modifiedTime: p.updatedAt.toISOString(), ...(p.cover ? { images: [p.cover] } : {}) } };
}
export default async function Page({ params }: P) {
  const p = await get((await params).slug); if (!p) notFound();
  const more = (await getPosts(4)).filter((x) => x.id !== p.id).slice(0, 3);
  return <section><div className="wrap">
    <JsonLd data={{ "@context": "https://schema.org", "@type": "BlogPosting", headline: p.title, description: p.metaDesc || p.excerpt, datePublished: p.createdAt.toISOString(), dateModified: p.updatedAt.toISOString(), author: { "@type": "Organization", name: SITE.name, url: SITE.url }, publisher: { "@id": `${SITE.url}/#business` }, mainEntityOfPage: `${SITE.url}/blog/${p.slug}`, keywords: p.tags.join(", "), ...(p.cover ? { image: p.cover } : {}) }} />
    <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE.url }, { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.url}/blog` }, { "@type": "ListItem", position: 3, name: p.title, item: `${SITE.url}/blog/${p.slug}` }] }} />
    <div className="crumbs"><Link href="/">Home</Link> › <Link href="/blog">Blog</Link> › {p.title}</div>
    <article className="prose"><h1>{p.title}</h1><p style={{ color: "var(--muted)" }}>Updated {p.updatedAt.toLocaleDateString("en-US", { dateStyle: "long" })}</p>
      {p.cover && <img src={p.cover} alt={p.title} style={{ borderRadius: 12 }} />}<Markdown text={p.content} />
      {p.tags.length > 0 && <p>{p.tags.map((t: string) => <span key={t} className="tag" style={{ marginRight: 6 }}>{t}</span>)}</p>}
      <div className="note" style={{ marginTop: 30 }}><strong>Need help?</strong> See our <Link href="/air-duct-cleaning">air duct cleaning</Link> and <Link href="/roof-cleaning">roof cleaning</Link> services, or <Link href="/contact">chat with us</Link>.</div></article>
    {more.length > 0 && <><h2 style={{ marginTop: 40 }}>More articles</h2><div className="grid">{more.map((m) => <div className="card" key={m.id}><h3><Link href={`/blog/${m.slug}`}>{m.title}</Link></h3><p>{m.excerpt}</p></div>)}</div></>}
  </div></section>;
}
