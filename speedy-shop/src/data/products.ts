// Product data store - all products defined here
// This acts as our "database" for the static MVP

export interface Product {
  id: string;
  name: string;
  price: number; // USD
  image: string;
  description: string;
  category: string;
}

export const products: Product[] = [
  // --- Vibrators ---
  {
    id: "magic-wand-rech",
    name: "Magic Wand Rechargeable",
    price: 119.95,
    image: "/products/magic-wand-rech.jpg",
    description: "The legendary Magic Wand, now rechargeable. Delivers deep, rumbly vibrations for the ultimate massage experience.",
    category: "Massagers"
  },
  {
    id: "rose-vibe-2",
    name: "PinkCherry Rose Vibrator 2.0",
    price: 24.95,
    image: "/products/rose-vibe-new.jpg",
    description: "A beautiful rose-shaped suction vibrator offering intense air-pulse clitoral stimulation.",
    category: "Vibrators"
  },
  {
    id: "bunny-vibe-show",
    name: "Show Me the Bunny Vibe",
    price: 39.95,
    image: "/products/bunny-vibe-new.jpg",
    description: "Dual-action rabbit vibrator targeting both internal spots and the clitoris simultaneously.",
    category: "Vibrators"
  },
  {
    id: "edeny-panty",
    name: "Edeny Panty Vibe with App Control",
    price: 49.95,
    image: "/products/edeny-panty.jpg",
    description: "Discreet panty vibrator controlled via app. Perfect for solo fun or partner play anywhere.",
    category: "Vibrators"
  },
  {
    id: "bullet-vibe",
    name: "PinkCherry Bullet Vibe",
    price: 11.90,
    image: "/products/bullet-vibe.jpg",
    description: "Compact yet powerful bullet vibrator. Waterproof and perfect for pinpoint stimulation.",
    category: "Vibrators"
  },
  {
    id: "tulip-vibe",
    name: "G-Spot Tulip Vibrator",
    price: 9.95,
    image: "/products/tulip-vibe.jpg",
    description: "Elegant tulip-shaped vibrator curved specifically for precise G-spot stimulation.",
    category: "Vibrators"
  },

  // --- Male Toys ---
  {
    id: "gluck-stroker",
    name: "Gluck Gluck 9000 Stroker",
    price: 59.95,
    image: "/products/gluck-stroker.jpg",
    description: "Advanced thrusting stroker designed to take male pleasure to the next level with varied speeds.",
    category: "Male Toys"
  },
  {
    id: "sasha-stroker",
    name: "Sasha Grey's Auto Stroker",
    price: 69.95,
    image: "/products/sasha-stroker.jpg",
    description: "Realistic automated stroker designed by Sasha Grey for an immersive experience.",
    category: "Male Toys"
  },
  {
    id: "moto-bator",
    name: "PDX Elite Moto Bator 2",
    price: 79.95,
    image: "/products/moto-bator.jpg",
    description: "Next-gen masturbator with powerful rumbling motor and textured internal sleeve.",
    category: "Male Toys"
  },

  // --- Dildos & Strap-ons ---
  {
    id: "strapon-set",
    name: "New Comers Strap-On Set",
    price: 29.95,
    image: "/products/strapon-set.jpg",
    description: "Complete strap-on harness and dildo set. Comfortable, adjustable, and perfect for beginners.",
    category: "Dildos"
  },

  // --- Massagers ---
  {
    id: "magic-wand-orig",
    name: "The Original Magic Wand",
    price: 69.95,
    image: "/products/magic-wand-orig.jpg",
    description: "The classic plug-in power source for deep muscle relief and intense pleasure.",
    category: "Massagers"
  },
  {
    id: "magic-wand-plus",
    name: "Magic Wand Plus",
    price: 79.95,
    image: "/products/magic-wand-plus.jpg",
    description: "The versatile Magic Wand Plus with variable speed control and removable power cord.",
    category: "Massagers"
  },

  // --- Bondage & Couples ---
  {
    id: "cuffs-furry",
    name: "Black Furry Hand Cuffs",
    price: 6.95,
    image: "/products/cuffs.jpg",
    description: "Soft, comfortable faux-fur handcuffs for light bondage and exploring new fantasies.",
    category: "Bondage"
  },
  {
    id: "twig-cring",
    name: "Twig & Berries C-Ring",
    price: 6.95,
    image: "/products/twig-cring.jpg",
    description: "Stretchy, durable cock ring designed to enhance endurance and sensitivity for couples.",
    category: "Couple's Play"
  },

  // --- Lubricants (New) ---
  {
    id: "pc-lube-2oz",
    name: "PinkCherry Water Based Lube (2oz)",
    price: 3.95,
    image: "/products/pc-lube-2oz.jpg",
    description: "Silky smooth water-based lubricant. Non-sticky, body-safe, and easy to clean.",
    category: "Lubricants"
  },
  {
    id: "jelle-anal",
    name: "Jelle Plus Anal Lubricant",
    price: 11.97,
    image: "/products/jelle-anal-lube.jpg",
    description: "Thicker, cushiony formula designed specifically for anal play comfort and longevity.",
    category: "Lubricants"
  },
  {
    id: "coconut-lube",
    name: "PinkCherry Coconut Oil Lube",
    price: 11.99,
    image: "/products/coconut-lube.jpg",
    description: "Natural organic coconut oil lubricant. Moisturizing, edible, and delicious.",
    category: "Lubricants"
  },
  {
    id: "on-insane",
    name: "ON Insane Arousal Lube",
    price: 14.99,
    image: "/products/on-insane-lube.jpg",
    description: "Intense tingling sensation lubricant for heightened arousal and sensitivity.",
    category: "Lubricants"
  },

  // --- Essentials & Bundles ---
  {
    id: "bj-blast",
    name: "BJ Blast Cherry (18g)",
    price: 2.39,
    image: "/products/bj-blast.jpg",
    description: "Fun and flavorful popping crystals to add a sparkling sensation to oral play.",
    category: "Essentials"
  },
  {
    id: "rose-bundle",
    name: "Rose Vibe + Lube Bundle",
    price: 28.50,
    image: "/products/rose-vibe-new.jpg",
    description: "The perfect starter kit: Our best-selling Rose Vibrator paired with a travel-size water-based lube.",
    category: "Bundles"
  }
];

// Helper to get a product by ID
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

// Helper to get products by category
export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

// Get all unique categories
export const getCategories = (): string[] => {
  return [...new Set(products.map(product => product.category))];
};
