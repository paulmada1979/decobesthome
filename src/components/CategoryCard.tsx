import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Product } from "@/lib/products";

const ArrowGo = () => (
  <span className="go">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 17L17 7M17 7H8M17 7v9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

const PlaceholderMark = () => (
  <span className="ph-mark">
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
      <path d="M12 3c0 6-4 8-4 12a4 4 0 008 0c0-4-4-6-4-12z" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  </span>
);

export default function CategoryCard({
  product,
  index,
  name,
  tagLabel,
}: {
  product: Product;
  index: number;
  name: string;
  /** Localized tag label ("Bestseller" / "Popular"), shown when product.tag is set. */
  tagLabel?: string;
}) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <Link className="card" href={`/products/${product.slug}`}>
      {product.tag && tagLabel && (
        <span className={`tag${product.tag === "bestseller" ? " leaf" : ""}`}>{tagLabel}</span>
      )}
      {product.placeholder ? (
        <div className="ph is-ph">
          <PlaceholderMark />
        </div>
      ) : (
        <div className="ph">
          <Image src={product.image} alt={name} width={400} height={340} />
        </div>
      )}
      <div className="body">
        <div>
          <div className="num">{num}</div>
          <div className="h4">{name}</div>
        </div>
        <ArrowGo />
      </div>
    </Link>
  );
}
