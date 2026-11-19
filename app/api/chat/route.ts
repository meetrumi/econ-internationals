import crypto from "crypto";
import { one, q } from "@/lib/db";
import { json, bad, clean } from "@/lib/api";
export async function POST(req: Request) {
  const b = await req.json().catch(() => ({})); if (b.company) return bad("Blocked");
  const name = clean(b.name, 80), contact = clean(b.contact, 120), message = clean(b.message);
  if (!name || !contact || !message) return bad("Please fill in all fields.");
  const token = crypto.randomBytes(18).toString("base64url");
  const c = await one("insert into conversations(token,name,contact) values($1,$2,$3) returning id", [token, name, contact]);
  await q(`insert into messages("convId","from",body) values($1,'customer',$2)`, [c.id, message]);
  return json({ token });
}
