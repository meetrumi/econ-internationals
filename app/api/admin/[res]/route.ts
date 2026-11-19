import { q, one } from "@/lib/db";
import { json, bad, guard, clean } from "@/lib/api";
type C = { params: Promise<{ res: string }> };
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
const list = (v: any) => (Array.isArray(v) ? v : String(v || "").split(/\n|,/)).map((x: string) => String(x).trim()).filter(Boolean);

export async function GET(req: Request, { params }: C) {
  const g = await guard(); if (g) return g; const res = (await params).res; const sp = new URL(req.url).searchParams;
  switch (res) {
    case "stats":
      return json(await one(`select (select count(*) from orders where status='new')::int "newOrders", (select count(*) from orders)::int orders,
        (select count(*) from conversations where unread)::int unread, (select count(*) from reviews where not approved)::int pending,
        (select count(*) from offers)::int offers, (select count(*) from posts)::int posts`));
    case "orders": { const s = sp.get("status"); return json(await q(`select * from orders ${s ? "where status=$1" : ""} order by "createdAt" desc limit 500`, s ? [s] : [])); }
    case "offers": return json(await q(`select * from offers order by sort, "createdAt"`));
    case "reviews": return json(await q(`select r.*, coalesce((select json_agg(json_build_object('id', i.id)) from review_images i where i."reviewId"=r.id), '[]') images from reviews r order by "createdAt" desc`));
    case "posts": return json(await q(`select * from posts order by "createdAt" desc`));
    case "conversations": return json(await q(`select c.*, (select body from messages m where m."convId"=c.id order by at desc limit 1) last from conversations c order by "updatedAt" desc`));
    case "conversation": {
      const c = await one(`update conversations set unread=false where id=$1 returning *`, [sp.get("id")]); if (!c) return bad("Not found", 404);
      c.messages = await q(`select * from messages where "convId"=$1 order by at`, [c.id]); return json(c);
    }
  }
  return bad("Unknown", 404);
}

export async function POST(req: Request, { params }: C) {
  const g = await guard(); if (g) return g; const res = (await params).res; const b = await req.json().catch(() => ({}));
  switch (res) {
    case "offers": {
      const v = [clean(b.title, 120), b.service === "roof" ? "roof" : "duct", clean(b.price, 40), clean(b.summary, 300), list(b.includes), clean(b.terms), !!b.featured, b.active !== false, parseInt(b.sort, 10) || 0];
      if (!v[0] || !v[2]) return bad("Title and price are required");
      return json(b.id
        ? await one(`update offers set title=$1,service=$2,price=$3,summary=$4,includes=$5,terms=$6,featured=$7,active=$8,sort=$9 where id=$10 returning *`, [...v, b.id])
        : await one(`insert into offers(title,service,price,summary,includes,terms,featured,active,sort) values($1,$2,$3,$4,$5,$6,$7,$8,$9) returning *`, v));
    }
    case "posts": {
      const v = [clean(b.title, 200), slugify(b.slug || b.title || ""), clean(b.metaTitle, 70), clean(b.metaDesc, 170), clean(b.excerpt, 300), clean(b.content, 100000), list(b.tags), clean(b.cover, 500), !!b.published];
      if (!v[0] || !v[1] || !v[5]) return bad("Title and content are required");
      try {
        return json(b.id
          ? await one(`update posts set title=$1,slug=$2,"metaTitle"=$3,"metaDesc"=$4,excerpt=$5,content=$6,tags=$7,cover=$8,published=$9,"updatedAt"=now() where id=$10 returning *`, [...v, b.id])
          : await one(`insert into posts(title,slug,"metaTitle","metaDesc",excerpt,content,tags,cover,published) values($1,$2,$3,$4,$5,$6,$7,$8,$9) returning *`, v));
      } catch { return bad("That URL slug is already used"); }
    }
    case "orders": {
      const allowed = ["new", "contacted", "scheduled", "completed", "cancelled"];
      if (allowed.includes(b.status)) await q(`update orders set status=$1 where id=$2`, [b.status, b.id]);
      if (b.adminNote !== undefined) await q(`update orders set "adminNote"=$1 where id=$2`, [clean(b.adminNote, 5000), b.id]);
      return json({ ok: true });
    }
    case "reviews": await q(`update reviews set approved=$1 where id=$2`, [!!b.approved, b.id]); return json({ ok: true });
    case "reply": {
      const body = clean(b.body); if (!body) return bad("Empty");
      await q(`insert into messages("convId","from",body) values($1,'admin',$2)`, [b.id, body]);
      await q(`update conversations set unread=false, "updatedAt"=now() where id=$1`, [b.id]);
      return json({ ok: true });
    }
  }
  return bad("Unknown", 404);
}

const TABLES: Record<string, string> = { offers: "offers", posts: "posts", reviews: "reviews", orders: "orders", conversations: "conversations" };
export async function DELETE(req: Request, { params }: C) {
  const g = await guard(); if (g) return g; const t = TABLES[(await params).res]; if (!t) return bad("Unknown", 404);
  await q(`delete from ${t} where id=$1`, [new URL(req.url).searchParams.get("id")]); return json({ ok: true });
}
