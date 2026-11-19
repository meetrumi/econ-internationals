"use client";
import { useEffect, useState } from "react";
import { api } from "../../../../lib/adminapi";
const blank = { title: "", slug: "", metaTitle: "", metaDesc: "", excerpt: "", content: "", tags: "", cover: "", published: true };
export default function Blog() {
  const [list, setList] = useState<any[]>([]); const [ed, setEd] = useState<any>(null);
  const load = () => api("posts").then(setList); useEffect(() => { load(); }, []);
  const set = (k: string, v: any) => setEd({ ...ed, [k]: v });
  async function save(e: any) { e.preventDefault(); await api("posts", { method: "POST", body: ed }); setEd(null); load(); }
  const len = (s: string, max: number) => <small style={{ color: s.length > max ? "var(--err)" : "var(--muted)" }}>{s.length}/{max}</small>;
  return <><h1>Blog</h1><button className="btn" onClick={() => setEd({ ...blank })}>+ New post</button>
    {ed && <form className="card f" onSubmit={save} style={{ marginTop: 16 }}><h2>{ed.id ? "Edit post" : "New post"}</h2>
      <div className="row2"><label>Title *<input value={ed.title} onChange={(e) => set("title", e.target.value)} required /></label><label>URL slug (auto if empty)<input value={ed.slug} onChange={(e) => set("slug", e.target.value)} placeholder="how-often-clean-ducts" /></label></div>
      <label>SEO title {len(ed.metaTitle, 60)}<input value={ed.metaTitle} onChange={(e) => set("metaTitle", e.target.value)} /></label>
      <label>Meta description {len(ed.metaDesc, 160)}<textarea style={{ minHeight: 60 }} value={ed.metaDesc} onChange={(e) => set("metaDesc", e.target.value)} /></label>
      <label>Excerpt (shown on blog list)<input value={ed.excerpt} onChange={(e) => set("excerpt", e.target.value)} /></label>
      <div className="row2"><label>Tags / keywords (comma separated)<input value={ed.tags} onChange={(e) => set("tags", e.target.value)} /></label><label>Cover image URL<input value={ed.cover} onChange={(e) => set("cover", e.target.value)} /></label></div>
      <label>Content * <small>Use ## for headings, - for bullets, **bold**, [link text](/url)</small><textarea style={{ minHeight: 360, fontFamily: "monospace" }} value={ed.content} onChange={(e) => set("content", e.target.value)} required /></label>
      <label style={{ display: "flex", gap: 8, alignItems: "center" }}><input type="checkbox" style={{ width: "auto" }} checked={ed.published} onChange={(e) => set("published", e.target.checked)} /> Published</label>
      <div style={{ display: "flex", gap: 8 }}><button className="btn">Save</button><button type="button" className="btn alt" onClick={() => setEd(null)}>Cancel</button></div></form>}
    <table className="t" style={{ marginTop: 16 }}><thead><tr><th>Title</th><th>Slug</th><th>Status</th><th></th></tr></thead><tbody>
      {list.map((p) => <tr key={p.id}><td>{p.title}</td><td><a href={`/blog/${p.slug}`} target="_blank">/blog/{p.slug}</a></td><td>{p.published ? "Published" : "Draft"}</td>
        <td><button className="btn sm" onClick={() => setEd({ ...p, tags: p.tags.join(", ") })}>Edit</button> <button className="btn sm red" onClick={async () => { if (confirm("Delete post?")) { await api("posts", { method: "DELETE", q: `id=${p.id}` }); load(); } }}>Delete</button></td></tr>)}
    </tbody></table></>;
}
