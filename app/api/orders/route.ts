import { one } from "@/lib/db";
import { json, bad, clean, emailOk } from "@/lib/api";
export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}));
  if (b.company) return json({ number: 0 });
  const d = { name: clean(b.name, 100), email: clean(b.email, 200), phone: clean(b.phone, 40), street: clean(b.street, 200), city: clean(b.city, 100), state: clean(b.state, 50), zip: clean(b.zip, 12), date: clean(b.date, 20), notes: clean(b.notes) };
  if (!d.name || !d.street || !d.city || !d.state || !d.zip) return bad("Please fill in your name and full address.");
  if (!emailOk(d.email)) return bad("Please enter a valid email.");
  if (d.phone.replace(/\D/g, "").length < 7) return bad("Please enter a valid phone number.");
  const offer = b.offerId ? await one("select * from offers where id=$1", [String(b.offerId)]) : null;
  const o = await one(`insert into orders("offerId","offerName",name,email,phone,street,city,state,zip,date,notes) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) returning number`,
    [offer?.id || null, offer ? `${offer.title} (${offer.price})` : clean(b.offerName, 200), d.name, d.email, d.phone, d.street, d.city, d.state, d.zip, d.date, d.notes]);
  return json({ number: o.number });
}
