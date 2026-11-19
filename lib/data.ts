import { q, one } from "./db";
const safe = async <T,>(fn: () => Promise<T>, fb: T): Promise<T> => { try { return await fn(); } catch (e) { console.error(e); return fb; } };
export const getOffers = (service?: string, featuredOnly = false) => safe(() => q(
  `select * from offers where active ${service ? "and service=$1" : ""} ${featuredOnly ? "and featured" : ""} order by sort, "createdAt"`, service ? [service] : []), [] as any[]);
export const getOffer = (id: string) => safe(() => one("select * from offers where id=$1 and active", [id]), null as any);
export const getReviews = (take = 50) => safe(() => q(
  `select r.*, coalesce((select json_agg(json_build_object('id', i.id)) from review_images i where i."reviewId"=r.id), '[]') images
   from reviews r where approved order by "createdAt" desc limit $1`, [take]), [] as any[]);
export const getRating = () => safe(async () => { const r = await one("select avg(rating)::float avg, count(*)::int count from reviews where approved"); return { avg: r?.avg || 0, count: r?.count || 0 }; }, { avg: 0, count: 0 });
export const getPosts = (take = 100) => safe(() => q(`select * from posts where published order by "createdAt" desc limit $1`, [take]), [] as any[]);
export const getPost = (slug: string) => safe(() => one("select * from posts where slug=$1 and published", [slug]), null as any);
