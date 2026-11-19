export async function api(res: string, opts: { method?: string; body?: any; q?: string } = {}) {
  const r = await fetch(`/api/admin/${res}${opts.q ? "?" + opts.q : ""}`, { method: opts.method || "GET", headers: { "Content-Type": "application/json" }, body: opts.body ? JSON.stringify(opts.body) : undefined, cache: "no-store" });
  if (r.status === 401) { location.href = "/admin/login"; throw new Error("auth"); }
  const d = await r.json(); if (!r.ok) { alert(d.error || "Error"); throw new Error(d.error); } return d;
}
