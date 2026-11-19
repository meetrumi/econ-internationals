import Link from "next/link";
export default function NotFound() { return <section><div className="wrap" style={{ textAlign: "center" }}><h1>Page not found</h1><p className="lead" style={{ margin: "0 auto 20px" }}>The page you're looking for doesn't exist.</p><Link className="btn" href="/">Go home</Link> <Link className="btn alt" href="/offers">See offers</Link></div></section>; }
