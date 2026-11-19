"use client";
import { useState } from "react";
async function shrink(file: File): Promise<string> {
  const img = await createImageBitmap(file); const max = 1200; const k = Math.min(1, max / Math.max(img.width, img.height));
  const c = document.createElement("canvas"); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
  c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height); return c.toDataURL("image/jpeg", 0.82);
}
export default function ReviewForm() {
  const [rating, setRating] = useState(5); const [imgs, setImgs] = useState<string[]>([]); const [st, setSt] = useState<any>({});
  async function pick(e: any) { const files = Array.from(e.target.files as FileList).slice(0, 4 - imgs.length); const out = await Promise.all(files.map(shrink)); setImgs([...imgs, ...out].slice(0, 4)); e.target.value = ""; }
  async function submit(e: any) {
    e.preventDefault(); setSt({ busy: true });
    const body = { ...Object.fromEntries(new FormData(e.target)), rating, images: imgs };
    const r = await fetch("/api/reviews", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }); const d = await r.json();
    if (r.ok) setSt({ ok: "Thank you! Your review was submitted and will appear after a quick check." }); else setSt({ err: d.error });
  }
  if (st.ok) return <div className="note ok">{st.ok}</div>;
  return <form className="f" onSubmit={submit}>
    <div className="row2"><label>Order number *<input name="order" placeholder="EC-123" required /></label><label>Order email *<input name="email" type="email" required /></label></div>
    <div className="row2"><label>Your name (shown) *<input name="name" required maxLength={60} /></label><label>City<input name="city" maxLength={60} /></label></div>
    <label>Rating *<div style={{ fontSize: 30, cursor: "pointer" }} className="stars">{[1, 2, 3, 4, 5].map((n) => <span key={n} role="button" aria-label={`${n} stars`} onClick={() => setRating(n)}>{n <= rating ? "★" : "☆"}</span>)}</div></label>
    <label>Your review *<textarea name="text" required minLength={10} maxLength={3000} /></label>
    <label>Photos (up to 4)<input type="file" accept="image/*" multiple onChange={pick} disabled={imgs.length >= 4} /></label>
    {imgs.length > 0 && <div className="thumbs">{imgs.map((s, i) => <img key={i} src={s} alt="" onClick={() => setImgs(imgs.filter((_, j) => j !== i))} title="Click to remove" />)}</div>}
    {st.err && <div className="note err">{st.err}</div>}
    <button className="btn" disabled={st.busy}>{st.busy ? "Submitting…" : "Submit review"}</button>
  </form>;
}
