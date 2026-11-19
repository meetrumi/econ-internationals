import { NextResponse } from "next/server";
import { isAdmin } from "./auth";
export const json = (d: any, s = 200) => NextResponse.json(d, { status: s });
export const bad = (m: string, s = 400) => NextResponse.json({ error: m }, { status: s });
export async function guard() { return (await isAdmin()) ? null : bad("Unauthorized", 401); }
export const clean = (v: any, max = 2000) => String(v ?? "").trim().slice(0, max);
export const emailOk = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
