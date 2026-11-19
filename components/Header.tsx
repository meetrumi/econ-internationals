import Link from "next/link";
export default function Header() {
  return (
    <header className="site"><div className="wrap">
      <Link href="/" aria-label="E-CON Internationals home"><img src="/logo.svg" alt="E-CON Internationals logo" width={190} height={44} /></Link>
      <nav aria-label="Main">
        <Link className="hide-m" href="/air-duct-cleaning">Air Duct Cleaning</Link>
        <Link className="hide-m" href="/roof-cleaning">Roof Cleaning</Link>
        <Link className="hide-m" href="/offers">Offers</Link>
        <Link className="hide-m" href="/reviews">Reviews</Link>
        <Link className="hide-m" href="/blog">Blog</Link>
        <Link className="btn sm" href="/contact">Chat with us</Link>
      </nav>
    </div></header>
  );
}
