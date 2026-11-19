import { one, q } from "@/lib/db";
import { json, bad, clean } from "@/lib/api";
type C = { params: Promise<{ token: string }> };
export async function GET(_: Request, { params }: C) {
  const c = await one("select id, name from conversations where token=$1", [(await params).token]); if (!c) return bad("Not found", 404);
  return json({ name: c.name, messages: await q(`select id, "from", body, at from messages where "convId"=$1 order by at`, [c.id]) });
}
export async function POST(req: Request, { params }: C) {
  const c = await one("select id from conversations where token=$1", [(await params).token]); if (!c) return bad("Not found", 404);
  const body = clean((await req.json().catch(() => ({}))).body); if (!body) return bad("Empty");
  await q(`insert into messages("convId","from",body) values($1,'customer',$2)`, [c.id, body]);
  await q(`update conversations set unread=true, "updatedAt"=now() where id=$1`, [c.id]);
  return json({ ok: true });
}
