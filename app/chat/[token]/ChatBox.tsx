"use client";
import { useEffect, useRef, useState } from "react";
export default function ChatBox({ token }: { token: string }) {
  const [msgs, setMsgs] = useState<any[]>([]); const [err, setErr] = useState(""); const [text, setText] = useState(""); const box = useRef<HTMLDivElement>(null);
  async function load() { const r = await fetch(`/api/chat/${token}`, { cache: "no-store" }); if (!r.ok) return setErr("Chat not found."); const d = await r.json(); setMsgs(d.messages); }
  useEffect(() => { load(); const t = setInterval(load, 5000); try { localStorage.setItem("econ_chat", token); } catch {} return () => clearInterval(t); }, []);
  useEffect(() => { box.current?.scrollTo(0, box.current.scrollHeight); }, [msgs.length]);
  async function send(e: any) { e.preventDefault(); if (!text.trim()) return; const body = text; setText(""); await fetch(`/api/chat/${token}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ body }) }); load(); }
  if (err) return <div className="note err">{err}</div>;
  return <div className="chat"><div className="msgs" ref={box}>{msgs.map((m) => <div key={m.id} className={`bubble ${m.from === "customer" ? "me" : "them"}`}>{m.body}<small>{m.from === "admin" ? "E-CON team · " : ""}{new Date(m.at).toLocaleString()}</small></div>)}</div>
    <form onSubmit={send}><input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your message…" maxLength={2000} /><button className="btn">Send</button></form></div>;
}
