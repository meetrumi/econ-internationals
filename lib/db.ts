import { Pool } from "pg";
const url = process.env.DATABASE_URL || "";
const g = globalThis as any;
export const pool: Pool = g.__pool || new Pool({ connectionString: url, max: 5, ssl: /sslmode=require|neon\.tech|supabase/.test(url) ? { rejectUnauthorized: false } : undefined });
if (process.env.NODE_ENV !== "production") g.__pool = pool;
export async function q<T = any>(text: string, params: any[] = []): Promise<T[]> { return (await pool.query(text, params)).rows; }
export async function one<T = any>(text: string, params: any[] = []): Promise<T | null> { return (await q<T>(text, params))[0] || null; }
