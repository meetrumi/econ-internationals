"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const items = [["/admin", "📊 Overview"], ["/admin/orders", "🧾 Orders / Tickets"], ["/admin/messages", "💬 Messages"], ["/admin/offers", "🏷️ Offers"], ["/admin/reviews", "⭐ Reviews"], ["/admin/blog", "📝 Blog"]];
export default function Side() {
  const p = usePathname();
  return <aside><img src="/icon.svg" width={40} alt="" /><p style={{ fontWeight: 800, margin: "8px 0 20px" }}>E-CON Admin</p>
    {items.map(([h, t]) => <Link key={h} href={h} className={p === h ? "on" : ""}>{t}</Link>)}
    <a href="/" target="_blank">🌐 View site</a>
    <a href="#" onClick={async (e) => { e.preventDefault(); await fetch("/api/admin/logout", { method: "POST" }); location.href = "/admin/login"; }}>🚪 Log out</a></aside>;
}
