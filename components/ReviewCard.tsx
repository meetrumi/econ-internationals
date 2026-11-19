export default function ReviewCard({ r }: { r: any }) {
  return (
    <div className="card">
      <div className="stars" aria-label={`${r.rating} out of 5 stars`}>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
      <p style={{ whiteSpace: "pre-wrap" }}>{r.text}</p>
      {r.images?.length > 0 && <div className="thumbs">{r.images.map((im: any) => <a key={im.id} href={`/api/images/${im.id}`} target="_blank"><img src={`/api/images/${im.id}`} alt={`Customer photo from ${r.name}`} loading="lazy" /></a>)}</div>}
      <p style={{ margin: "10px 0 0", fontWeight: 700 }}>{r.name}{r.city ? <span style={{ fontWeight: 400, color: "var(--muted)" }}> · {r.city}</span> : null}</p>
    </div>
  );
}
