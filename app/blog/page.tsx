import Link from "next/link";
import { getPosts } from "@/lib/data";
export const dynamic = "force-dynamic";
export const metadata = { title: "Blog | Air Duct & Roof Cleaning Tips", description: "Guides and tips on air duct cleaning, indoor air quality, roof cleaning, moss and algae removal from the E-CON Internationals team.", alternates: { canonical: "/blog" } };
export default async function Page() {
  const posts = await getPosts();
  return <section><div className="wrap"><h1>Home Care Blog</h1><p className="lead">Practical guides on air ducts, indoor air and roof care.</p>
    <div className="grid" style={{ marginTop: 20 }}>{posts.map((p) => <article className="card" key={p.id}>
      {p.cover && <img src={p.cover} alt={p.title} loading="lazy" style={{ borderRadius: 10, marginBottom: 10 }} />}
      <h2 style={{ fontSize: 21 }}><Link href={`/blog/${p.slug}`}>{p.title}</Link></h2><p>{p.excerpt}</p>
      <small style={{ color: "var(--muted)" }}>{p.createdAt.toLocaleDateString("en-US", { dateStyle: "medium" })}</small></article>)}</div>
  </div></section>;
}
