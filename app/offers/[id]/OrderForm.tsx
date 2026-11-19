"use client";
import { useState } from "react";
export default function OrderForm({ offerId }: { offerId: string }) {
  const [st, setSt] = useState<{ ok?: string; err?: string; busy?: boolean }>({});
  async function submit(e: any) {
    e.preventDefault(); setSt({ busy: true });
    const body = Object.fromEntries(new FormData(e.target)); body.offerId = offerId;
    const r = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const d = await r.json();
    if (r.ok) { setSt({ ok: `Order received! Your order number is EC-${d.number}. Our team will contact you to confirm. Keep this number to leave a review later.` }); e.target.reset(); }
    else setSt({ err: d.error || "Something went wrong" });
  }
  if (st.ok) return <div className="note ok">{st.ok}</div>;
  return <form className="f" onSubmit={submit}>
    <label>Full name *<input name="name" required maxLength={100} autoComplete="name" /></label>
    <div className="row2"><label>Email *<input name="email" type="email" required autoComplete="email" /></label><label>Phone *<input name="phone" type="tel" required autoComplete="tel" /></label></div>
    <label>Street address *<input name="street" required autoComplete="street-address" /></label>
    <div className="row2"><label>City *<input name="city" required autoComplete="address-level2" /></label><label>State *<input name="state" required autoComplete="address-level1" /></label></div>
    <div className="row2"><label>ZIP code *<input name="zip" required pattern="[0-9]{5}(-[0-9]{4})?" autoComplete="postal-code" /></label><label>Preferred date<input name="date" type="date" /></label></div>
    <label>Notes (home size, number of vents, roof type…)<textarea name="notes" maxLength={2000} /></label>
    <input name="company" tabIndex={-1} autoComplete="off" style={{ display: "none" }} aria-hidden="true" />
    {st.err && <div className="note err">{st.err}</div>}
    <button className="btn" disabled={st.busy}>{st.busy ? "Submitting…" : "Submit order"}</button>
  </form>;
}
