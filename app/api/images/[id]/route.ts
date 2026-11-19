import { one } from "@/lib/db";
import { isAdmin } from "@/lib/auth";
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const im = await one(`select i.mime, i.data, r.approved from review_images i join reviews r on r.id=i."reviewId" where i.id=$1`, [(await params).id]).catch(() => null);
  if (!im || (!im.approved && !(await isAdmin()))) return new Response("Not found", { status: 404 });
  return new Response(new Uint8Array(im.data), { headers: { "Content-Type": im.mime, "Cache-Control": im.approved ? "public, max-age=31536000, immutable" : "private, no-store" } });
}
