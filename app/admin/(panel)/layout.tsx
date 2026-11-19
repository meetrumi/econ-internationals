import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import Side from "./Side";
export const dynamic = "force-dynamic";
export default async function Panel({ children }: { children: React.ReactNode }) {
  if (!(await isAdmin())) redirect("/admin/login");
  return <div className="admin"><Side /><main>{children}</main></div>;
}
