"use client";
import { useState } from "react";
export default function Login() {
  const [err, setErr] = useState("");
  async function go(e: any) { e.preventDefault(); const r = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: e.target.password.value }) }); if (r.ok) location.href = "/admin"; else setErr("Wrong password"); }
  return <section><div className="wrap" style={{ maxWidth: 420 }}><div className="card"><h1>Admin login</h1><form className="f" onSubmit={go}><label>Password<input name="password" type="password" required autoFocus /></label>{err && <div className="note err">{err}</div>}<button className="btn">Log in</button></form></div></div></section>;
}
