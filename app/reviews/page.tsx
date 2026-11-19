import { getReviews, getRating } from "@/lib/data";
import ReviewCard from "@/components/ReviewCard";
import ReviewForm from "./ReviewForm";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/lib/site";
export const dynamic = "force-dynamic";
export const metadata = { title: "Customer Reviews | Air Duct & Roof Cleaning", description: "Read real reviews and photos from E-CON Internationals customers, and share your own experience.", alternates: { canonical: "/reviews" } };
export default async function Page() {
  const [reviews, rating] = await Promise.all([getReviews(100), getRating()]);
  return <section><div className="wrap">
    {rating.count > 0 && <JsonLd data={{ "@context": "https://schema.org", "@type": "HomeAndConstructionBusiness", "@id": `${SITE.url}/#business`, name: SITE.name, aggregateRating: { "@type": "AggregateRating", ratingValue: rating.avg.toFixed(1), reviewCount: rating.count, bestRating: 5 }, review: reviews.slice(0, 10).map((r) => ({ "@type": "Review", author: { "@type": "Person", name: r.name }, reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 }, reviewBody: r.text, datePublished: r.createdAt.toISOString().slice(0, 10) })) }} />}
    <h1>Customer Reviews</h1>
    {rating.count > 0 ? <p className="lead"><span className="stars">★★★★★</span> {rating.avg.toFixed(1)} out of 5 from {rating.count} reviews</p> : <p className="lead">Be one of our first customers to leave a review.</p>}
    <div className="grid" style={{ marginTop: 20 }}>{reviews.map((r) => <ReviewCard key={r.id} r={r} />)}</div>
    <div className="card" style={{ marginTop: 40, maxWidth: 720 }}><h2>Leave a review</h2><p>Reviews are for customers who've ordered a service. Enter your order number and the email you used.</p><ReviewForm /></div>
  </div></section>;
}
