"use client";
import { useEffect, useState } from "react";
import { api } from "../../../../lib/adminapi";
export default function Reviews() {
  const [list, setList] = useState<any[]>([]); const load = () => api("reviews").then(setList); useEffect(() => { load(); }, []);
  return <><h1>Reviews</h1><div className="grid">{list.map((r) => <div className="card" key={r.id}>
    <span className={`badge ${r.approved ? "completed" : "new"}`}>{r.approved ? "Live" : "Pending"}</span> <small>Order EC-{r.orderNum}</small>
    <div className="stars">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div><p style={{ whiteSpace: "pre-wrap" }}>{r.text}</p>
    <div className="thumbs">{r.images.map((im: any) => <a key={im.id} href={`/api/images/${im.id}`} target="_blank"><img src={`/api/images/${im.id}`} alt="" /></a>)}</div>
    <p><strong>{r.name}</strong> {r.city && `· ${r.city}`}</p>
    <button className="btn sm" onClick={async () => { await api("reviews", { method: "POST", body: { id: r.id, approved: !r.approved } }); load(); }}>{r.approved ? "Hide" : "Approve"}</button>{" "}
    <button className="btn sm red" onClick={async () => { if (confirm("Delete review?")) { await api("reviews", { method: "DELETE", q: `id=${r.id}` }); load(); } }}>Delete</button></div>)}</div>
    {list.length === 0 && <p>No reviews yet.</p>}</>;
}
