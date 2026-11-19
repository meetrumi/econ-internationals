"use client";
import { useEffect, useState } from "react";
import { api } from "../../../../lib/adminapi";
const blank = { title: "", service: "duct", price: "", summary: "", includes: "", terms: "", featured: true, active: true, sort: 0 };
export default function Offers() {
  const [list, setList] = useState<any[]>([]); const [ed, setEd] = useState<any>(null);
  const load = () => api("offers").then(setList); useEffect(() => { load(); }, []);
  async function save(e: any) { e.preventDefault(); await api("offers", { method: "POST", body: ed }); setEd(null); load(); }
  const set = (k: string, v: any) => setEd({ ...ed, [k]: v });
  return <><h1>Offers</h1><button className="btn" onClick={() => setEd({ ...blank })}>+ New offer</button>
    {ed && <form className="card f" onSubmit={save} style={{ marginTop: 16, maxWidth: 720 }}><h2>{ed.id ? "Edit offer" : "New offer"}</h2>
      <div className="row2"><label>Title *<input value={ed.title} onChange={(e) => set("title", e.target.value)} required placeholder="Basic Offer" /></label><label>Price *<input value={ed.price} onChange={(e) => set("price", e.target.value)} required placeholder="$299" /></label></div>
      <div className="row2"><label>Service<select value={ed.service} onChange={(e) => set("service", e.target.value)}><option value="duct">Air Duct Cleaning</option><option value="roof">Roof Cleaning</option></select></label><label>Sort order<input type="number" value={ed.sort} onChange={(e) => set("sort", e.target.value)} /></label></div>
      <label>Short summary<input value={ed.summary} onChange={(e) => set("summary", e.target.value)} /></label>
      <label>What's included (one per line)<textarea value={ed.includes} onChange={(e) => set("includes", e.target.value)} placeholder={"Up to 10 vents\nDryer vent cleaning"} /></label>
      <label>Terms<textarea value={ed.terms} onChange={(e) => set("terms", e.target.value)} /></label>
      <label style={{ display: "flex", gap: 8, alignItems: "center" }}><input type="checkbox" style={{ width: "auto" }} checked={ed.featured} onChange={(e) => set("featured", e.target.checked)} /> Show on homepage</label>
      <label style={{ display: "flex", gap: 8, alignItems: "center" }}><input type="checkbox" style={{ width: "auto" }} checked={ed.active} onChange={(e) => set("active", e.target.checked)} /> Active (visible on site)</label>
      <div style={{ display: "flex", gap: 8 }}><button className="btn">Save</button><button type="button" className="btn alt" onClick={() => setEd(null)}>Cancel</button></div></form>}
    <table className="t" style={{ marginTop: 16 }}><thead><tr><th>Title</th><th>Service</th><th>Price</th><th>Homepage</th><th>Active</th><th></th></tr></thead><tbody>
      {list.map((o) => <tr key={o.id}><td>{o.title}</td><td>{o.service}</td><td>{o.price}</td><td>{o.featured ? "✓" : ""}</td><td>{o.active ? "✓" : "hidden"}</td>
        <td><button className="btn sm" onClick={() => setEd({ ...o, includes: o.includes.join("\n") })}>Edit</button> <button className="btn sm red" onClick={async () => { if (confirm("Delete offer?")) { await api("offers", { method: "DELETE", q: `id=${o.id}` }); load(); } }}>Delete</button></td></tr>)}
    </tbody></table></>;
}
