import { one, q } from "@/lib/db";
import { json, bad, clean } from "@/lib/api";
export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}));
  const num = parseInt(String(b.order || "").replace(/\D/g, ""), 10); const email = clean(b.email, 200).toLowerCase();
  const order = num ? await one("select email from orders where number=$1", [num]) : null;
  if (!order || order.email.toLowerCase() !== email) return bad("We couldn't find an order with that number and email.");
  if (await one(`select id from reviews where "orderNum"=$1`, [num])) return bad("A review has already been submitted for this order.");
  const rating = Math.min(5, Math.max(1, parseInt(b.rating, 10) || 5)); const text = clean(b.text, 3000); const name = clean(b.name, 60);
  if (!name || text.length < 10) return bad("Please add your name and a short review.");
  const images = (Array.isArray(b.images) ? b.images : []).slice(0, 4).map((s: string) => { const m = /^data:(image\/(?:jpeg|png|webp));base64,(.+)$/.exec(String(s)); return m ? { mime: m[1], data: Buffer.from(m[2], "base64") } : null; }).filter((x: any) => x && x.data.length < 2_500_000);
  const r = await one(`insert into reviews(name,city,rating,text,"orderNum") values($1,$2,$3,$4,$5) returning id`, [name, clean(b.city, 60), rating, text, num]);
  for (const im of images) await q(`insert into review_images("reviewId",mime,data) values($1,$2,$3)`, [r.id, im.mime, im.data]);
  return json({ ok: true });
}
