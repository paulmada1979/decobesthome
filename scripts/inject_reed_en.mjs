// One-off: inject products.reed (EN) into all 6 locale files + relink reed-fencing variations.
import fs from "node:fs";

const packing = {
  eyebrow: "Logistics",
  title: "Retail packing options",
  lead: "Four standard retail-ready packing options for reed fence rolls — or tell us your own spec and we pack to order.",
  options: [
    { t: "Shrink film + jute bag", d: "Each roll wrapped in shrink film, 5 rolls bundled together in a big jute bag." },
    { t: "Window handbag + colour page", d: "Portable transparent-window handbag with a printed colour insert page." },
    { t: "Woven bag + printing", d: "Woven carry bags with your custom printing." },
    { t: "Non-woven handbag + barcode", d: "Portable non-woven handbag with printing and barcode — shelf-ready." },
  ],
};

const shared = {
  factsTitle: "At a glance",
  whyTitle: "Why choose this one",
  faqEyebrow: "Questions & answers",
  faqTitle: "Frequently asked questions",
  packing,
  series: {
    eyebrow: "The reed range",
    title: "Compare the other reed fences",
    lead: "Eight versions, from budget fine reed to top-quality extra-thick — privacy from about 50% up to a fully closed 100%.",
    overviewCta: "Reed fencing overview",
  },
};

// Common FAQ answers reused across variants (kept factual, from supplier answers)
const A = {
  lifespan:
    "At least 3–5 years outdoors in a normal European garden. Reed is one of the lightest natural fencing materials, and its natural yellow colour changes very little over the years.",
  pool: "Yes. Reed is a natural wetland plant — all our reed fences handle damp, coastal and poolside environments (salt, chlorine, constant moisture) without problems.",
  install:
    "Very easy. The fence unrolls and fixes to any existing fence, railing or frame with wire ties — reed is so light that no reinforced frame is needed, and a screen goes up in minutes.",
  peeledVsUnpeeled:
    "Peeled reed has its skin removed for a smoother, cleaner finish. Unpeeled reed keeps the skin for a slightly rougher, more rustic natural-yellow look and costs a little less. Lifespan and mould resistance are the same, and neither has any smell.",
};

const variants = {
  "extra-thick-peeled-8-10mm": {
    name: "Extra-thick peeled reed fence 8–10 mm",
    cardDesc: "Top quality — up to 100% privacy, fully closed.",
    eyebrow: "Top quality · Maximum privacy",
    pill: "Natural reed · Ø 8–10 mm",
    lead: "Our highest-density reed fence: extra-thick peeled stems woven into a fully closed screen — up to 100% privacy.",
    desc: "The top grade of our reed range. Extra-thick peeled reed stems of 8–10 mm are woven at our highest density into a screen that is effectively closed — the most private and most premium reed fence we make.",
    facts: [
      { k: "Privacy", v: "Up to 100% — fully closed" },
      { k: "Reed diameter", v: "8–10 mm" },
      { k: "Surface", v: "Peeled — smooth finish" },
      { k: "Price tier", v: "Premium — top of the range" },
    ],
    why: "If privacy is the priority, this is the one. It is the most closed reed screen in our range — the highest density and the highest quality, with no view through an installed fence.",
    spec: [
      { k: "Material", v: "100% natural peeled reed" },
      { k: "Stem diameter", v: "8–10 mm" },
      { k: "Weave", v: "Woven with black plastic-coated wire" },
      { k: "Privacy", v: "Up to 100%" },
      { k: "Lifespan outdoors", v: "3–5+ years" },
      { k: "Format", v: "Rolls · custom heights & lengths" },
      { k: "MOQ & OEM", v: "Negotiable · private label welcome" },
      { k: "Loading port", v: "Xiamen, China" },
    ],
    about: {
      eyebrow: "The product",
      title: "The most closed reed screen we make",
      body: [
        { p: "Our extra-thick peeled reed fence 8–10 mm is the highest density and quality among all of our reed fencing types. The thick peeled stems sit tightly against each other, so an installed screen gives up to 100% privacy — in practice a closed natural wall, with no gaps to see through." },
        { p: "The reed is woven with black plastic-coated wire that stands up to outdoor use, and the material itself is remarkably light. Even large rolls go up quickly against an existing fence, railing or simple frame — no heavy supporting structure needed." },
        { h3: "A renewable material" },
        { p: "Reed grows rapidly in natural wetlands and is fully renewable and biodegradable. That makes this screen an eco-friendly choice for outdoor screening, sun shading and privacy — and it works just as well indoors as a decorative natural wall covering." },
        { p: "Like every fence in our reed range it ships as compact rolls, with four retail-ready packing options and custom sizes on request." },
      ],
    },
    faq: [
      { q: "How private is the extra-thick 8–10 mm reed fence?", a: "It is the most closed screen in our reed range. The extra-thick stems are woven at our highest density, giving up to 100% privacy — you cannot see through an installed screen." },
      { q: "How long does a reed fence last outdoors?", a: A.lifespan },
      { q: "Is it safe near a swimming pool or on the coast?", a: A.pool },
      { q: "Why choose this over the cheaper reed grades?", a: "Density. Budget fine reed (3–6 mm) closes roughly 50% of the view; this top grade closes up to 100%. If you want a screen with no gaps, extra-thick is the grade to pick." },
      { q: "What is the difference between peeled and unpeeled reed?", a: A.peeledVsUnpeeled },
    ],
  },

  "thick-peeled-5-8mm": {
    name: "Thick peeled reed fence 5–8 mm",
    cardDesc: "High-density all-rounder — up to ≈ 90% privacy.",
    eyebrow: "High density · All-round favourite",
    pill: "Natural reed · Ø 5–8 mm",
    lead: "High-density peeled reed in a 5–8 mm stem — the all-round blend of strength, looks and up to ≈ 90% privacy.",
    desc: "The all-round choice in our peeled range: 5–8 mm reed stems bound at high density for a refined surface and strong screening — up to about 90% privacy at a sensible price.",
    facts: [
      { k: "Privacy", v: "Up to ≈ 90%" },
      { k: "Reed diameter", v: "5–8 mm" },
      { k: "Surface", v: "Peeled — smooth finish" },
      { k: "Price tier", v: "Mid — strong value" },
    ],
    why: "The everyday balance: thick enough for serious privacy, peeled for a clean refined finish, and priced below the extra-thick top grade.",
    spec: [
      { k: "Material", v: "100% natural peeled reed" },
      { k: "Stem diameter", v: "5–8 mm" },
      { k: "Density", v: "High density weave" },
      { k: "Privacy", v: "Up to ≈ 90%" },
      { k: "Lifespan outdoors", v: "3–5+ years" },
      { k: "Format", v: "Rolls · custom heights & lengths" },
      { k: "MOQ & OEM", v: "Negotiable · private label welcome" },
      { k: "Loading port", v: "Xiamen, China" },
    ],
    about: {
      eyebrow: "The product",
      title: "Beauty, strength and privacy in balance",
      body: [
        { p: "Our thick peeled reed fence pairs a larger 5–8 mm stem with a high-density weave — the practical middle of the range. The reed is expertly peeled for a smoother, refined finish, and the stems are bound firmly together into a solid, good-looking shield." },
        { p: "Thicker reed stems make a more substantial, robust fence that is well equipped to endure weather and everyday knocks, and each fence is treated to resist insect infestation and decay." },
        { h3: "Simple to fit" },
        { p: "The fence conveniently unrolls and attaches to any existing fence or structure, and the natural flexibility of reed lets it follow curves and custom shapes. One person can screen a garden boundary in an afternoon." },
      ],
    },
    faq: [
      { q: "How private is the thick peeled 5–8 mm reed fence?", a: "Woven at high density, it closes up to about 90% of the view — strong everyday privacy for gardens, balconies and terraces." },
      { q: "What is the difference with the extra-thick 8–10 mm version?", a: "The extra-thick grade uses heavier stems at our maximum density and closes up to 100%. This 5–8 mm version is slightly more open but lighter on the budget — the best seller for everyday screening." },
      { q: "How long does it last outdoors?", a: A.lifespan },
      { q: "How is it installed?", a: A.install },
      { q: "Peeled or unpeeled — which should I pick?", a: A.peeledVsUnpeeled },
    ],
  },

  "high-density-fine-3-6mm": {
    name: "High-density fine reed fence 3–6 mm",
    cardDesc: "Fine stems, refined surface — up to ≈ 80% privacy.",
    eyebrow: "Fine stems · Refined look",
    pill: "Natural reed · Ø 3–6 mm",
    lead: "Fine 3–6 mm peeled reed woven at high density — the smoothest, most refined screen in the range, up to ≈ 80% privacy.",
    desc: "Fine reed taken seriously: thin 3–6 mm peeled stems packed at high density. The result is the smoothest, most elegant surface of all our reed fences, with solid everyday privacy.",
    facts: [
      { k: "Privacy", v: "Up to ≈ 80%" },
      { k: "Reed diameter", v: "3–6 mm" },
      { k: "Surface", v: "Peeled — smoothest in range" },
      { k: "Price tier", v: "Mid" },
    ],
    why: "Choose it for the look: thin stems give the finest, most refined texture in the range — noticeably smoother than the thick grades — while the high-density weave still closes about 80% of the view.",
    spec: [
      { k: "Material", v: "100% natural peeled reed" },
      { k: "Stem diameter", v: "3–6 mm" },
      { k: "Density", v: "High density weave" },
      { k: "Privacy", v: "Up to ≈ 80%" },
      { k: "Lifespan outdoors", v: "3–5+ years" },
      { k: "Format", v: "Rolls · custom heights & lengths" },
      { k: "MOQ & OEM", v: "Negotiable · private label welcome" },
      { k: "Loading port", v: "Xiamen, China" },
    ],
    about: {
      eyebrow: "The product",
      title: "Fine reed with a polished character",
      body: [
        { p: "Our high-density fine reed fence blends strength and elegance. Each thin 3–6 mm stem is peeled for a smooth, polished look and tightly bound to its neighbours, creating a dense layer that shields your space while keeping a delicate, refined texture." },
        { p: "Despite the fine stems, the high-density weave is robust and hard-wearing, treated to prevent insect infestation and decay, and able to withstand harsh weather season after season." },
        { h3: "Quietly elegant" },
        { p: "Installation is stress-free — the fence unrolls and fixes to any existing fence or structure, and it can be tailored to fit any shape. Its natural straw colour blends seamlessly into the garden while keeping your space private and serene." },
      ],
    },
    faq: [
      { q: "Is fine reed less private than thick reed?", a: "Not necessarily — density matters more than stem size. This fine reed is woven at high density and closes up to about 80% of the view, far more than budget fine reed at around 50%." },
      { q: "Why choose fine reed over a thick grade?", a: "The look. Thin 3–6 mm stems create the smoothest, most refined surface of all our reed fences — a subtler, more elegant texture than the chunky thick grades." },
      { q: "How long does it last outdoors?", a: A.lifespan },
      { q: "Is it suitable for balconies?", a: "Very — fine reed is the lightest screen in the range, fixes to railings in minutes with wire ties, and its even texture looks good from both sides." },
    ],
  },

  "cheap-peeled-3-6mm": {
    name: "Budget peeled reed fence 3–6 mm",
    cardDesc: "Our cheapest peeled reed — light screening, ≈ 50% privacy.",
    eyebrow: "Budget choice · Peeled",
    pill: "Natural reed · Ø 3–6 mm",
    lead: "Our cheapest peeled reed fence — fine 3–6 mm stems with a smooth finish and about 50% privacy at an entry price.",
    desc: "A natural, budget-friendly screen: fine 3–6 mm reed stems peeled to a smooth finish at our lowest peeled-reed price. Around 50% privacy — ideal for light screening and natural texture.",
    facts: [
      { k: "Privacy", v: "≈ 50% — light screening" },
      { k: "Reed diameter", v: "3–6 mm" },
      { k: "Surface", v: "Peeled — smooth finish" },
      { k: "Price tier", v: "Budget" },
    ],
    why: "The lowest-priced peeled reed in the range — pick it where you want natural texture, dappled light and a soft boundary rather than a fully closed screen.",
    spec: [
      { k: "Material", v: "100% natural peeled reed" },
      { k: "Stem diameter", v: "3–6 mm" },
      { k: "Density", v: "Standard weave" },
      { k: "Privacy", v: "≈ 50%" },
      { k: "Lifespan outdoors", v: "3–5 years" },
      { k: "Format", v: "Rolls · custom heights & lengths" },
      { k: "MOQ & OEM", v: "Negotiable · private label welcome" },
      { k: "Loading port", v: "Xiamen, China" },
    ],
    about: {
      eyebrow: "The product",
      title: "Natural screening at an entry price",
      body: [
        { p: "Our budget peeled reed fence is the cost-effective way to bring natural reed into a garden. The thinner 3–6 mm stems are peeled to a smooth, polished finish and firmly bound into an appealing, rustic screen for fences, railings and structures." },
        { p: "Despite the economical price it does not compromise on the essentials: the reed is robust enough to endure varying weather conditions, and the roll format makes installation hassle-free — unroll, tie, done." },
        { h3: "Where it fits best" },
        { p: "At roughly 50% coverage this is a light screen rather than a privacy wall: it filters views and sunlight, adds texture to bare fences and walls, and marks boundaries naturally. For full privacy, step up to the high-density or extra-thick grades." },
      ],
    },
    faq: [
      { q: "Can you see through the budget 3–6 mm reed fence?", a: "Partially — it closes roughly 50% of the view. It filters sight-lines and sunlight rather than blocking them, which is exactly what many gardens want from a light natural screen." },
      { q: "What do I give up versus the dearer grades?", a: "Density. The stems are the same natural reed, but the weave is more open. High-density fine closes ≈ 80%, thick ≈ 90% and extra-thick up to 100% — each step up adds coverage and price." },
      { q: "How long does it last outdoors?", a: A.lifespan },
      { q: "How is it installed?", a: A.install },
    ],
  },

  "extra-thick-unpeeled-8-10mm": {
    name: "Extra-thick unpeeled reed fence 8–10 mm",
    cardDesc: "Our best seller — maximum privacy, rustic finish.",
    eyebrow: "Best seller · Maximum privacy",
    pill: "Natural reed · Ø 8–10 mm",
    lead: "Extra-thick unpeeled reed, 8–10 mm — our best-selling fence: near-total privacy with a bold rustic finish.",
    desc: "Our best seller. Extra-thick 8–10 mm reed stems with the natural skin left on, woven into a dense screen with unparalleled strength and privacy — the top grade at a friendlier price than its peeled twin.",
    facts: [
      { k: "Privacy", v: "Up to ≈ 100%" },
      { k: "Reed diameter", v: "8–10 mm" },
      { k: "Surface", v: "Unpeeled — skin on, rustic" },
      { k: "Price tier", v: "Premium — best-seller value" },
    ],
    why: "Top-grade density and privacy with the natural skin left on — bold rustic character at a better price than the peeled version. That combination makes it our best-selling reed fence.",
    spec: [
      { k: "Material", v: "100% natural unpeeled reed" },
      { k: "Stem diameter", v: "8–10 mm" },
      { k: "Density", v: "Extra-thick, high density" },
      { k: "Privacy", v: "Up to ≈ 100%" },
      { k: "Lifespan outdoors", v: "3–5+ years" },
      { k: "Format", v: "Rolls · custom heights & lengths" },
      { k: "MOQ & OEM", v: "Negotiable · private label welcome" },
      { k: "Loading port", v: "Xiamen, China" },
    ],
    about: {
      eyebrow: "The product",
      title: "Strength, privacy and rustic charm",
      body: [
        { p: "Embrace natural fencing at full strength: our extra-thick unpeeled reed fence uses superior 8–10 mm stems bound tightly together into a dense barrier. It delivers the privacy of our top grade with the warm, rustic look of reed that keeps its natural skin." },
        { p: "Unpeeled reed reads slightly rougher and a touch more golden than peeled — a rustic natural yellow that weathers gracefully. Lifespan is identical to peeled reed, with no smell and no added mould risk, and the price is a little friendlier." },
        { h3: "Built for real gardens" },
        { p: "The fence endures wind, rain and sun, is treated against insect infestation and decay, and rolls out for easy fixing to any existing fence or frame. Its flexibility lets it follow curved and angled boundaries without fuss." },
      ],
    },
    faq: [
      { q: "Why is this your best-selling reed fence?", a: "It combines the density and privacy of our top grade with the lower price of unpeeled reed. Most buyers find that rustic-but-closed combination hits the sweet spot." },
      { q: "How private is it?", a: "Effectively closed — the extra-thick stems woven at high density give up to ≈ 100% coverage, on par with the peeled top grade." },
      { q: "Does unpeeled reed age worse than peeled?", a: "No. Lifespan and mould resistance are the same, there is no smell, and the rustic natural-yellow colour changes very little over the years." },
      { q: "How long does it last outdoors?", a: A.lifespan },
      { q: "Is it safe near a swimming pool or on the coast?", a: A.pool },
    ],
  },

  "thick-unpeeled-5-8mm": {
    name: "Thick unpeeled reed fence 5–8 mm",
    cardDesc: "High-density rustic screen — up to ≈ 90% privacy.",
    eyebrow: "High density · Rustic natural",
    pill: "Natural reed · Ø 5–8 mm",
    lead: "High-density 5–8 mm reed with its natural skin left on — a warm rustic screen with up to ≈ 90% privacy.",
    desc: "All the density of our thick peeled fence, with the skin left on: a robust 5–8 mm reed screen with a warmer, more rustic tone — up to about 90% privacy at a slightly lower price.",
    facts: [
      { k: "Privacy", v: "Up to ≈ 90%" },
      { k: "Reed diameter", v: "5–8 mm" },
      { k: "Surface", v: "Unpeeled — skin on, rustic" },
      { k: "Price tier", v: "Mid — value pick" },
    ],
    why: "Same density and privacy as the thick peeled version, a touch cheaper, with a warmer rustic natural-yellow tone — the value pick for natural-look gardens.",
    spec: [
      { k: "Material", v: "100% natural unpeeled reed" },
      { k: "Stem diameter", v: "5–8 mm" },
      { k: "Density", v: "High density weave" },
      { k: "Privacy", v: "Up to ≈ 90%" },
      { k: "Lifespan outdoors", v: "3–5+ years" },
      { k: "Format", v: "Rolls · custom heights & lengths" },
      { k: "MOQ & OEM", v: "Negotiable · private label welcome" },
      { k: "Loading port", v: "Xiamen, China" },
    ],
    about: {
      eyebrow: "The product",
      title: "A testament of strength and natural charisma",
      body: [
        { p: "Our thick unpeeled reed fence keeps the reed exactly as nature grew it. The robust 5–8 mm stems are firmly knotted into a high-density screen that holds its own as a solid barrier while radiating warm, rustic charm." },
        { p: "Keeping the skin on changes the character, not the performance: the surface reads slightly rougher and a more golden natural yellow, while lifespan, weather resistance and mould resistance match the peeled version — at a slightly lower price." },
        { h3: "Easy to live with" },
        { p: "Treated against decay and insect damage, the fence rolls out for quick fixing to existing structures and flexes naturally around curves. Its straw tones sit beautifully next to planting, timber and stone." },
      ],
    },
    faq: [
      { q: "What is the difference between peeled and unpeeled reed?", a: A.peeledVsUnpeeled },
      { q: "How private is the thick unpeeled 5–8 mm fence?", a: "Woven at high density it closes up to about 90% of the view — the same coverage class as our thick peeled fence." },
      { q: "Does the skin cause mould or smell?", a: "No. Unpeeled reed has the same mould resistance as peeled, no smell, and the same 3–5+ year outdoor lifespan." },
      { q: "How is it installed?", a: A.install },
    ],
  },

  "cheap-unpeeled-3-6mm": {
    name: "Budget unpeeled reed fence 3–6 mm",
    cardDesc: "The lowest-priced reed fence we make — ≈ 50% privacy.",
    eyebrow: "Lowest price · Rustic",
    pill: "Natural reed · Ø 3–6 mm",
    lead: "The most economical fence in our reed range — fine unpeeled stems, raw natural charm and about 50% privacy.",
    desc: "Our entry point into natural fencing: fine 3–6 mm reed stems with the skin left on, skilfully bound into a light rustic screen. The lowest-priced reed fence we make.",
    facts: [
      { k: "Privacy", v: "≈ 50% — light screening" },
      { k: "Reed diameter", v: "3–6 mm" },
      { k: "Surface", v: "Unpeeled — raw natural" },
      { k: "Price tier", v: "Budget — lowest price" },
    ],
    why: "The cheapest fence in our reed range. Pick it for natural texture, light screening and boundary-marking on a tight budget — gardens, terraces and patios alike.",
    spec: [
      { k: "Material", v: "100% natural unpeeled reed" },
      { k: "Stem diameter", v: "3–6 mm" },
      { k: "Density", v: "Standard weave" },
      { k: "Privacy", v: "≈ 50%" },
      { k: "Lifespan outdoors", v: "3–5 years" },
      { k: "Format", v: "Rolls · custom heights & lengths" },
      { k: "MOQ & OEM", v: "Negotiable · private label welcome" },
      { k: "Loading port", v: "Xiamen, China" },
    ],
    about: {
      eyebrow: "The product",
      title: "Function and natural beauty, economically",
      body: [
        { p: "Our budget unpeeled reed fence is the perfect blend of functionality and natural beauty at the lowest price in the range. The thinner 3–6 mm stems keep their natural skin, showcasing the raw charm of reed in gardens, terraces and patios." },
        { p: "Affordable does not mean fragile: the canes withstand varying weather conditions, are treated to resist insect infestation and decay, and the versatile straw colour harmonises with nearly any setting." },
        { h3: "Light screening, easy install" },
        { p: "At around 50% coverage this is a light, breathable screen — it softens views, filters sun and defines boundaries rather than walling them off. It unrolls and ties to existing structures in minutes, and the reed flexes to fit different shapes and sizes." },
      ],
    },
    faq: [
      { q: "Is this really your cheapest reed fence?", a: "Yes — fine unpeeled 3–6 mm reed is the most economical fence in our whole reed range, which makes it a popular volume line for garden retail." },
      { q: "How much privacy does it give?", a: "About 50% — it filters views and light rather than blocking them. For more coverage, step up to high-density fine (≈ 80%), thick (≈ 90%) or extra-thick (up to 100%)." },
      { q: "How long does it last outdoors?", a: A.lifespan },
      { q: "Peeled or unpeeled at this size — what changes?", a: A.peeledVsUnpeeled },
    ],
  },

  "japanese-with-bamboo": {
    name: "Japanese-style reed fence with bamboo",
    cardDesc: "Reed bound with Li bamboo — the strongest in the range.",
    eyebrow: "Premium · Strongest in the range",
    pill: "Reed + natural Li bamboo",
    lead: "Thick peeled reed bound with natural Li bamboo — the strongest reed fence we make, with a traditional Japanese character.",
    desc: "Traditional aesthetics, remarkable strength: thick peeled reed bound with strips of natural Chinese Li bamboo. The bamboo binding makes this the strongest fence in our reed range — and the most premium.",
    facts: [
      { k: "Privacy", v: "Up to ≈ 90%" },
      { k: "Construction", v: "Thick reed + Li bamboo binding" },
      { k: "Surface", v: "Peeled reed, bamboo strips" },
      { k: "Price tier", v: "Premium — highest in range" },
    ],
    why: "Strength and style in one: the Li bamboo binding makes this the strongest, most durable reed fence we make, and the Japanese-style pattern turns a boundary into a design feature.",
    spec: [
      { k: "Material", v: "Natural peeled reed + Li bamboo" },
      { k: "Construction", v: "Reed bound with bamboo strips" },
      { k: "Privacy", v: "Up to ≈ 90%" },
      { k: "Strength", v: "Strongest in the reed range" },
      { k: "Lifespan outdoors", v: "3–5+ years" },
      { k: "Format", v: "Rolls / panels · custom sizes" },
      { k: "MOQ & OEM", v: "Negotiable · private label welcome" },
      { k: "Loading port", v: "Xiamen, China" },
    ],
    about: {
      eyebrow: "The product",
      title: "Traditional Japanese style, engineered to last",
      body: [
        { p: "Our Japanese-style reed fence combines thick peeled reed with bindings of natural Chinese Li bamboo — a bamboo prized for being strong and endurable. Together the two materials create an impressively dense, rigid structure with an elegance straight out of traditional Japanese garden architecture." },
        { p: "It is the strongest fence in our reed range, equally at home as a decorative feature and as a working privacy screen for gardens, terraces and balconies. Each fence is treated against insect infestation and decay to ensure its longevity." },
        { h3: "Simple to install, striking to look at" },
        { p: "Like the rest of the range it unrolls for easy fixing to any existing fence or structure, and its natural flexibility lets it be custom-fitted to different shapes and sizes. The warm straw hue with dark bamboo accents blends seamlessly into outdoor settings while making a quiet statement." },
      ],
    },
    faq: [
      { q: "What bamboo is used in this fence?", a: "Natural Chinese Li bamboo — a strong, endurable bamboo that is split into strips and used to bind the thick peeled reed. The binding is what makes this the strongest fence in our reed range." },
      { q: "Is it decorative or a real privacy screen?", a: "Both. The thick reed core closes up to about 90% of the view, while the bamboo-bound pattern gives it a distinctive Japanese-style look that works as a design feature in its own right." },
      { q: "Why is it the most expensive reed fence?", a: "The bamboo binding adds material and handwork, and the result is the strongest, most durable construction in the range — premium build, premium price." },
      { q: "How long does it last outdoors?", a: A.lifespan },
      { q: "Is it safe near a swimming pool or on the coast?", a: A.pool },
    ],
  },
};

// New linked variation cards for the reed-fencing overview page
const overviewVariations = {
  eyebrow: "The range",
  title: "Eight reed fences, one for every job",
  lead: "From budget fine reed to top-quality extra-thick — open any version for full specs, photos and answers to common questions.",
  items: [
    { img: "v/extra-thick-peeled-8-10mm-main.webp", href: "/products/reed-fencing/extra-thick-peeled-8-10mm" },
    { img: "v/thick-peeled-5-8mm-main.webp", href: "/products/reed-fencing/thick-peeled-5-8mm" },
    { img: "v/high-density-fine-3-6mm-main.webp", href: "/products/reed-fencing/high-density-fine-3-6mm" },
    { img: "v/cheap-peeled-3-6mm-main.webp", href: "/products/reed-fencing/cheap-peeled-3-6mm" },
    { img: "v/extra-thick-unpeeled-8-10mm-main.webp", href: "/products/reed-fencing/extra-thick-unpeeled-8-10mm" },
    { img: "v/thick-unpeeled-5-8mm-main.webp", href: "/products/reed-fencing/thick-unpeeled-5-8mm" },
    { img: "v/cheap-unpeeled-3-6mm-main.webp", href: "/products/reed-fencing/cheap-unpeeled-3-6mm" },
    { img: "v/japanese-with-bamboo-main.webp", href: "/products/reed-fencing/japanese-with-bamboo" },
  ].map((x) => {
    const id = x.href.split("/").pop();
    return { ...x, title: variants[id].name, desc: variants[id].cardDesc };
  }),
};

for (const loc of ["en", "nl", "de", "es", "it", "fr"]) {
  const p = `messages/${loc}.json`;
  const j = JSON.parse(fs.readFileSync(p, "utf8"));
  j.products.reed = { shared, variants };
  j.products.detail.items["reed-fencing"].variations = overviewVariations;
  fs.writeFileSync(p, JSON.stringify(j, null, 2) + "\n");
  console.log(loc, "injected (EN placeholder for non-EN)");
}
console.log("done");
