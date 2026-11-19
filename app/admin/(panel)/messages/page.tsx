"use client";
import { useEffect, useRef, useState } from "react";
import { api } from "../../../../lib/adminapi";
export default function Messages() {
  const [convs, setConvs] = useState<any[]>([]); const [cur, setCur] = useState<any>(null); const [text, setText] = useState(""); const box = useRef<HTMLDivElement>(null);
  const loadList = () => api("conversations").then(setConvs);
  const open = (id: string) => api("conversation", { q: `id=${id}` }).then((c) => { setCur(c); loadList(); });
  useEffect(() => { loadList(); const t = setInterval(() => { loadList(); }, 8000); return () => clearInterval(t); }, []);
  useEffect(() => { if (!cur) return; const t = setInterval(() => api("conversation", { q: `id=${cur.id}` }).then(setCur), 5000); return () => clearInterval(t); }, [cur?.id]);
  useEffect(() => { box.current?.scrollTo(0, box.current.scrollHeight); }, [cur?.messages?.length]);
  async function send(e: any) { e.preventDefault(); if (!text.trim()) return; await api("reply", { method: "POST", body: { id: cur.id, body: text } }); setText(""); open(cur.id); }
  return <><h1>Messages</h1><div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 16 }}>
    <div className="card" style={{ padding: 0, maxHeight: 560, overflow: "auto" }}>{convs.map((c) => <div key={c.id} onClick={() => open(c.id)} style={{ padding: 12, borderBottom: "1px solid var(--line)", cursor: "pointer", background: cur?.id === c.id ? "var(--light)" : "" }}>
      <strong>{c.name}</strong> {c.unread && <span className="badge new">new</span>}<br /><small>{c.contact}</small><br /><small style={{ color: "var(--muted)" }}>{(c.last || "").slice(0, 60)}</small></div>)}{convs.length === 0 && <p style={{ padding: 12 }}>No chats yet.</p>}</div>
    {cur ? <div><p><strong>{cur.name}</strong> · {cur.contact} · <a href={`/chat/${cur.token}`} target="_blank">customer link</a> · <a href="#" onClick={async (e) => { e.preventDefault(); if (confirm("Delete chat?")) { await api("conversations", { method: "DELETE", q: `id=${cur.id}` }); setCur(null); loadList(); } }}>delete</a></p>
      <div className="chat"><div className="msgs" ref={box}>{cur.messages.map((m: any) => <div key={m.id} className={`bubble ${m.from === "admin" ? "me" : "them"}`}>{m.body}<small>{new Date(m.at).toLocaleString()}</small></div>)}</div>
      <form onSubmit={send}><input value={text} onChange={(e) => setText(e.target.value)} placeholder="Reply…" /><button className="btn">Send</button></form></div></div> : <p>Select a conversation.</p>}
  </div></>;
}
