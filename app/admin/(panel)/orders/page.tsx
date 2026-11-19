"use client";
import { useEffect, useState } from "react";
import { api } from "../../../../lib/adminapi";
const ST = ["new", "contacted", "scheduled", "completed", "cancelled"];
export default function Orders() {
  const [list, setList] = useState<any[]>([]); const [f, setF] = useState(""); const [open, setOpen] = useState<string | null>(null);
  const load = () => api("orders", { q: f ? `status=${f}` : "" }).then(setList);
  useEffect(() => { load(); }, [f]);
  const upd = async (id: string, data: any) => { await api("orders", { method: "POST", body: { id, ...data } }); load(); };
  return <><h1>Orders / Tickets</h1>
    <p><select value={f} onChange={(e) => setF(e.target.value)} style={{ width: 200 }}><option value="">All statuses</option>{ST.map((s) => <option key={s}>{s}</option>)}</select></p>
    <table className="t"><thead><tr><th>#</th><th>Customer</th><th>Offer</th><th>Location</th><th>Status</th><th>Date</th></tr></thead><tbody>
      {list.map((o) => <><tr key={o.id} onClick={() => setOpen(open === o.id ? null : o.id)} style={{ cursor: "pointer" }}>
        <td><strong>EC-{o.number}</strong></td><td>{o.name}<br /><small>{o.email}</small></td><td>{o.offerName || "—"}</td><td>{o.city}, {o.state}</td>
        <td><span className={`badge ${o.status}`}>{o.status}</span></td><td>{new Date(o.createdAt).toLocaleDateString()}</td></tr>
        {open === o.id && <tr key={o.id + "x"}><td colSpan={6} style={{ background: "#fafcfd" }}><div className="grid">
          <div><strong>Contact</strong><br />📧 <a href={`mailto:${o.email}`}>{o.email}</a><br />📞 <a href={`tel:${o.phone}`}>{o.phone}</a><br /><br /><strong>Address</strong><br />{o.street}<br />{o.city}, {o.state} {o.zip}<br /><br /><strong>Preferred date:</strong> {o.date || "—"}<br /><strong>Notes:</strong> {o.notes || "—"}</div>
          <div><label>Status<select defaultValue={o.status} onChange={(e) => upd(o.id, { status: e.target.value })}>{ST.map((s) => <option key={s}>{s}</option>)}</select></label>
            <label style={{ display: "block", marginTop: 10 }}>Internal note<textarea defaultValue={o.adminNote} onBlur={(e) => upd(o.id, { adminNote: e.target.value })} /></label>
            <button className="btn sm red" style={{ marginTop: 10 }} onClick={async () => { if (confirm("Delete this order?")) { await api("orders", { method: "DELETE", q: `id=${o.id}` }); load(); } }}>Delete</button></div>
        </div></td></tr>}</>)}
    </tbody></table>{list.length === 0 && <p>No orders yet.</p>}</>;
}
