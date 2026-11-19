import Link from "next/link";
function inline(t: string, k: string) {
  const parts: any[] = []; const re = /\*\*(.+?)\*\*|\*(.+?)\*|\[(.+?)\]\((.+?)\)/g; let last = 0, m, i = 0;
  while ((m = re.exec(t))) {
    if (m.index > last) parts.push(t.slice(last, m.index));
    if (m[1]) parts.push(<strong key={k + i++}>{m[1]}</strong>);
    else if (m[2]) parts.push(<em key={k + i++}>{m[2]}</em>);
    else parts.push(m[4].startsWith("/") ? <Link key={k + i++} href={m[4]}>{m[3]}</Link> : <a key={k + i++} href={m[4]} rel="noopener nofollow" target="_blank">{m[3]}</a>);
    last = re.lastIndex;
  }
  if (last < t.length) parts.push(t.slice(last)); return parts;
}
export default function Markdown({ text }: { text: string }) {
  const blocks = text.replace(/\r/g, "").split(/\n\s*\n/); const out: any[] = [];
  blocks.forEach((b, i) => {
    const lines = b.split("\n").filter(Boolean); if (!lines.length) return;
    if (lines[0].startsWith("### ")) out.push(<h3 key={i}>{inline(lines[0].slice(4), "h" + i)}</h3>);
    else if (lines[0].startsWith("## ")) { out.push(<h2 key={i}>{inline(lines[0].slice(3), "h" + i)}</h2>); if (lines.length > 1) out.push(<Markdown key={i + "r"} text={lines.slice(1).join("\n")} />); }
    else if (lines.every((l) => l.startsWith("- "))) out.push(<ul key={i}>{lines.map((l, j) => <li key={j}>{inline(l.slice(2), `l${i}-${j}`)}</li>)}</ul>);
    else out.push(<p key={i}>{inline(lines.join(" "), "p" + i)}</p>);
  });
  return <>{out}</>;
}
