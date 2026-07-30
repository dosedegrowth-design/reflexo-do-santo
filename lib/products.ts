// ————————————————————————————————————————————————
// PRODUTOS DA LOJA — PREÇOS PROVISÓRIOS (EDITAR AQUI)
// Catálogo definido (2026-07-30): camiseta, bag/bolsa,
// pulseira, chaveiro e caderneta.
// available: false → card aparece como "EM BREVE".
// ————————————————————————————————————————————————

export type Product = {
  id: string;
  name: string;
  shortName: string;
  description: string;
  price: number; // BRL
  image: string;
  imageFit?: "cover" | "contain";
  colorway?: "cru" | "oliva";
  sizes?: string[];
  items?: string[]; // conteúdo (para kits/combos)
  badge?: string;
  featured?: boolean;
  available: boolean;
};

export const PRODUCTS: Product[] = [
  {
    id: "camiseta-cru",
    name: "Camiseta Reflexo do Santo",
    shortName: "Camiseta",
    description:
      "Camiseta oversized off-white com estampa verde oliva. Logo no peito e arte completa “Sede Santos” nas costas.",
    price: 59.9,
    image: "/brand/produto-costas.jpg",
    colorway: "cru",
    sizes: ["P", "M", "G", "GG", "XG"],
    badge: "Oficial",
    available: true,
  },
  {
    id: "bag",
    name: "Bag Reflexo do Santo",
    shortName: "Bag / Bolsa",
    description: "Bolsa estampada com a marca do congresso, pra levar no dia a dia.",
    price: 29.9,
    image: "/brand/logo-card.png",
    imageFit: "contain",
    available: true,
  },
  {
    id: "pulseira",
    name: "Pulseira Reflexo do Santo",
    shortName: "Pulseira",
    description: "Pulseira exclusiva do congresso.",
    price: 9.9,
    image: "/brand/logo-card.png",
    imageFit: "contain",
    available: true,
  },
  {
    id: "chaveiro",
    name: "Chaveiro Reflexo do Santo",
    shortName: "Chaveiro",
    description: "Chaveiro exclusivo do congresso.",
    price: 14.9,
    image: "/brand/logo-card.png",
    imageFit: "contain",
    available: true,
  },
  {
    id: "caderneta",
    name: "Caderneta Reflexo do Santo",
    shortName: "Caderneta",
    description: "Caderneta pra anotações, devocionais e estudos.",
    price: 19.9,
    image: "/brand/logo-card.png",
    imageFit: "contain",
    available: true,
  },
];

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function formatBRL(v: number): string {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
