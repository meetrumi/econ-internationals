import { NextResponse } from "next/server";
import { checkPassword, makeToken } from "@/lib/auth";
export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({}));
  await new Promise((r) => setTimeout(r, 400));
  if (!password || !checkPassword(String(password))) return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  const res = NextResponse.json({ ok: true });
  res.cookies.set("econ_admin", makeToken(), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 7 * 86400 });
  return res;
}
