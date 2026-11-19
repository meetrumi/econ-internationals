import ChatBox from "./ChatBox";
export const metadata = { title: "Your Chat", robots: { index: false, follow: false } };
export default async function Page({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  return <section><div className="wrap" style={{ maxWidth: 760 }}><h1>Your conversation</h1><p className="lead">Bookmark this page to come back to your chat. We usually reply within a few hours.</p><ChatBox token={token} /></div></section>;
}
