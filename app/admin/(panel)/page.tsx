"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "../../../lib/adminapi";
export default function Overview() {
  const [s, setS] = useState<any>(null);
  useEffect(() => { api("stats").then(setS); }, []);
  if (!s) return <p>Loading…</p>;
  const cards = [["New tickets", s.newOrders, "/admin/orders"], ["Unread chats", s.unread, "/admin/messages"], ["Reviews to approve", s.pending, "/admin/reviews"], ["Total orders", s.orders, "/admin/orders"], ["Offers", s.offers, "/admin/offers"], ["Blog posts", s.posts, "/admin/blog"]];
  return <><h1>Overview</h1><div className="grid">{cards.map(([t, v, h]) => <Link key={t} href={h} className="card" style={{ textDecoration: "none" }}><div className="stat">{v}</div><div>{t}</div></Link>)}</div></>;
}
