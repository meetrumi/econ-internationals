"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
export default function StartChat() {
  const router = useRouter(); const sp = useSearchParams(); const offer = sp.get("offer");
  const [prev, setPrev] = useState<string | null>(null); const [st, setSt] = useState<any>({});
  useEffect(() => { try { setPrev(localStorage.getItem("econ_chat")); } catch {} }, []);
  async function submit(e: any) {
    e.preventDefault(); setSt({ busy: true });
    const r = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(e.target))) });
    const d = await r.json(); if (!r.ok) return setSt({ err: d.error });
    try { localStorage.setItem("econ_chat", d.token); } catch {} router.push(`/chat/${d.token}`);
  }
  return <form className="f" onSubmit={submit}>
    <h2 style={{ margin: 0 }}>Start a conversation</h2>
    {prev && <div className="note">You have an open chat. <a href={`/chat/${prev}`}>Continue it →</a></div>}
    <label>Your name *<input name="name" required maxLength={80} /></label>
    <label>Email or phone *<input name="contact" required maxLength={120} /></label>
    <label>Message *<textarea name="message" required maxLength={2000} defaultValue={offer ? `Hi, I have a question about the "${offer}" offer: ` : ""} /></label>
    <input name="company" tabIndex={-1} autoComplete="off" style={{ display: "none" }} aria-hidden="true" />
    {st.err && <div className="note err">{st.err}</div>}
    <button className="btn" disabled={st.busy}>{st.busy ? "Starting…" : "Send message"}</button>
  </form>;
}
