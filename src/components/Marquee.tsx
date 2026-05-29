export default function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="m-item">
            {item} <span className="dot" />
          </span>
        ))}
      </div>
    </div>
  );
}
