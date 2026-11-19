import crypto from "crypto";
import { cookies } from "next/headers";
const secret = () => process.env.SESSION_SECRET || "dev-secret-change-me";
const sign = (v: string) => crypto.createHmac("sha256", secret()).update(v).digest("hex");
export function makeToken() { const exp = Date.now() + 7 * 864e5; return `${exp}.${sign(String(exp))}`; }
export function validToken(t?: string) {
  if (!t) return false; const [exp, sig] = t.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const good = sign(exp); return good.length === sig.length && crypto.timingSafeEqual(Buffer.from(good), Buffer.from(sig));
}
export async function isAdmin() { return validToken((await cookies()).get("econ_admin")?.value); }
export function checkPassword(p: string) {
  const real = process.env.ADMIN_PASSWORD || "admin123";
  const a = Buffer.from(sign(p)), b = Buffer.from(sign(real));
  return crypto.timingSafeEqual(a, b);
}
