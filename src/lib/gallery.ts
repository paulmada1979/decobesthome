export type GalleryCategory = "fencing" | "natural" | "bark" | "moso" | "reed" | "thatch";

export type GalleryItem = {
  id: string;
  image: string;
  cat: GalleryCategory;
};

/** Inspiration gallery. Captions live in messages inspiration.items.{id}; category labels in inspiration.cats.{cat}. */
export const gallery: GalleryItem[] = [
  { id: "natural-bamboo-fence-1", image: "/images/home-hero.webp", cat: "fencing" },
  { id: "moso-bamboo-for-sale", image: "/images/Moso-bamboo-for-sale.webp", cat: "moso" },
  { id: "thatch-roof-for-sale", image: "/images/thatch-roof-for-sale.webp", cat: "thatch" },
  { id: "moso-outdoor-constructions-2", image: "/images/moso-outdoor-constructions-2-1024x574.webp", cat: "moso" },
  { id: "thatch-roof-palapa-1", image: "/images/thatch-roof-palapa-1.webp", cat: "thatch" },
  { id: "moso-guadua-bamboo", image: "/images/Moso-guadua-bamboo.webp", cat: "moso" },
  { id: "moso-for-outdoor-pergola", image: "/images/moso-for-outdoor-pergola.webp", cat: "moso" },
  { id: "moso-for-outdoor-construction", image: "/images/moso-for-outdoor-construction-1024x574.webp", cat: "moso" },
  { id: "thatch-roofing", image: "/images/thatch-roofing.webp", cat: "thatch" },
  { id: "moso-bamboo-wholesaler", image: "/images/Moso-bamboo-wholesaler.webp", cat: "moso" },
  { id: "garden-bamboo-fence", image: "/images/garden-bamboo-fence.webp", cat: "fencing" },
  { id: "reed-fence-balcony-2", image: "/images/reed-fence-balcony-2.webp", cat: "reed" },
  { id: "moso-bamboo-supplier", image: "/images/moso-bamboo-supplier-1024x574.webp", cat: "moso" },
  { id: "moso-bamboo-projects", image: "/images/moso-bamboo-projects.webp", cat: "moso" },
  { id: "thatch-roof-umbrella", image: "/images/thatch-roof-umbrella.webp", cat: "thatch" },
  { id: "moso-bamboo-poles-producer", image: "/images/Moso-bamboo-poles-producer.webp", cat: "moso" },
  { id: "moso-bamboo-for-wall-cladding", image: "/images/moso-bamboo-for-wall-cladding-1024x574.webp", cat: "moso" },
  { id: "moso-bamboo-for-outdoor-constructions", image: "/images/moso-bamboo-for-outdoor-constructions.webp", cat: "moso" },
  { id: "thatch-roof-supplier", image: "/images/thatch-roof-supplier.webp", cat: "thatch" },
  { id: "moso-bamboo-for-interior-decoration", image: "/images/Moso-bamboo-for-interior-decoration.webp", cat: "moso" },
  { id: "moso-bamboo-for-home-decor", image: "/images/moso-bamboo-for-home-decor-1024x574.jpg", cat: "moso" },
  { id: "moso-bamboo-chinese-factory", image: "/images/Moso-bamboo-chinese-factory.webp", cat: "moso" },
  { id: "guadua-bamboo-pergola", image: "/images/guadua-bamboo-pergola.webp", cat: "moso" },
  { id: "giant-moso-bamboo-poles", image: "/images/giant-moso-bamboo-poles.webp", cat: "moso" },
  { id: "reed-fence-garden-3-alt", image: "/images/reed-fence-garden-3-1024x574-3.webp", cat: "reed" },
  { id: "devor-moso-bamboo", image: "/images/devor-moso-bamboo-1024x574.webp", cat: "moso" },
  { id: "reed-fence-garden-4", image: "/images/reed-fence-garden-4.webp", cat: "reed" },
  { id: "decor-moso-bamboo-for-interior", image: "/images/decor-moso-bamboo-for-interior.webp", cat: "moso" },
  { id: "decor-bamboo-poles", image: "/images/decor-bamboo-poles.webp", cat: "moso" },
  { id: "bamboo-poles-for-home", image: "/images/bamboo-poles-for-home-1024x574.webp", cat: "moso" },
  { id: "natural-thatch-roof", image: "/images/natural-thatch-roof.webp", cat: "thatch" },
  { id: "reed-fence-garden-3", image: "/images/reed-fence-garden-3-1.webp", cat: "reed" },
  { id: "natural-bamboo-fence-2", image: "/images/natural-bamboo-fence-2.webp", cat: "fencing" },
  // Reed series banners (labels reuse the variant names)
  { id: "reed-banner-extra-thick-peeled-8-10mm", image: "/images/reed/v/extra-thick-peeled-8-10mm-hero.webp", cat: "reed" },
  { id: "reed-banner-thick-peeled-5-8mm", image: "/images/reed/v/thick-peeled-5-8mm-hero.webp", cat: "reed" },
  { id: "reed-banner-high-density-fine-3-6mm", image: "/images/reed/v/high-density-fine-3-6mm-hero.webp", cat: "reed" },
  { id: "reed-banner-cheap-peeled-3-6mm", image: "/images/reed/v/cheap-peeled-3-6mm-hero.webp", cat: "reed" },
  { id: "reed-banner-extra-thick-unpeeled-8-10mm", image: "/images/reed/v/extra-thick-unpeeled-8-10mm-hero.webp", cat: "reed" },
  { id: "reed-banner-thick-unpeeled-5-8mm", image: "/images/reed/v/thick-unpeeled-5-8mm-hero.webp", cat: "reed" },
  { id: "reed-banner-cheap-unpeeled-3-6mm", image: "/images/reed/v/cheap-unpeeled-3-6mm-hero.webp", cat: "reed" },
  { id: "reed-banner-japanese-with-bamboo", image: "/images/reed/v/japanese-with-bamboo-hero.webp", cat: "reed" },
  // Natural fencing (willow / brushwood / bark)
  { id: "willow-natural-hero", image: "/images/willow-hero.webp", cat: "natural" },
  { id: "willow-scene-brushwood", image: "/images/willow/scene-brushwood.webp", cat: "natural" },
  { id: "willow-scene-bark", image: "/images/willow/scene-bark.webp", cat: "natural" },
  { id: "willow-scene-square", image: "/images/willow/scene-square.webp", cat: "natural" },
  // Bark fences
  { id: "bark-insp-1", image: "/images/bark/bark-hero.webp", cat: "bark" },
  { id: "bark-insp-2", image: "/images/bark/scene-1.webp", cat: "bark" },
  { id: "bark-insp-3", image: "/images/blog/bark-fencing-hero.webp", cat: "bark" },
  { id: "bark-insp-4", image: "/images/bark/scene-2.webp", cat: "bark" },
  { id: "bark-insp-5", image: "/images/blog/bark-fencing-2.webp", cat: "bark" },
];

/** Filter chips order. Keys map to messages inspiration.cats.{key} (with "all" => inspiration.cats.all). */
export const galleryFilters = ["all", "fencing", "natural", "bark", "moso", "reed", "thatch"] as const;
