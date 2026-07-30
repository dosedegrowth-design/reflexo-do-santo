// ————————————————————————————————————————————————
// PRODUTOS DA LOJA — PREÇOS PROVISÓRIOS (EDITAR AQUI)
// Ajuste price / sizes / available conforme a produção.
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
    name: "Camiseta Reflexo do Santo — Off-White",
    shortName: "Camiseta Off-White",
    description:
      "Camiseta oversized na cor cru com estampa verde oliva. Logo no peito e arte completa “Sede Santos” nas costas.",
    price: 59.9,
    image: "/brand/produto-costas.jpg",
    colorway: "cru",
    sizes: ["P", "M", "G", "GG", "XG"],
    badge: "Oficial",
    available: true,
  },
  {
    id: "camiseta-oliva",
    name: "Camiseta Reflexo do Santo — Verde Oliva",
    shortName: "Camiseta Verde Oliva",
    description:
      "Camiseta oversized verde oliva com estampa off-white. Logo no peito e arte completa “Sede Santos” nas costas.",
    price: 59.9,
    image: "/brand/costas-offwhite.png",
    imageFit: "contain",
    colorway: "oliva",
    sizes: ["P", "M", "G", "GG", "XG"],
    badge: "Oficial",
    available: true,
  },
  {
    id: "bone",
    name: "Boné Reflexo do Santo",
    shortName: "Boné",
    description: "Boné bordado com a marca do congresso.",
    price: 39.9,
    image: "/brand/logo-oliva.png",
    imageFit: "contain",
    available: true,
  },
  {
    id: "ecobag",
    name: "Ecobag Reflexo do Santo",
    shortName: "Ecobag",
    description: "Ecobag estampada para levar no dia a dia.",
    price: 29.9,
    image: "/brand/logo-oliva.png",
    imageFit: "contain",
    available: true,
  },
  {
    id: "combo-acessorios",
    name: "Combo Acessórios",
    shortName: "Combo Acessórios",
    description: "Pulseira + chaveiro + adesivo do congresso.",
    price: 24.9,
    image: "/brand/logo-oliva.png",
    imageFit: "contain",
    items: ["Pulseira", "Chaveiro", "Adesivo"],
    available: true,
  },
  {
    id: "kit-completo",
    name: "Kit Completo Reflexo do Santo",
    shortName: "Kit Completo",
    description:
      "O kit oficial do congresso: camiseta + boné + ecobag + pulseira + chaveiro + adesivo. Tudo na identidade Reflexo do Santo.",
    price: 129.9,
    image: "/brand/produto-frente.jpg",
    sizes: ["P", "M", "G", "GG", "XG"],
    items: ["Camiseta (cru ou oliva)", "Boné", "Ecobag", "Pulseira", "Chaveiro", "Adesivo"],
    badge: "Mais completo",
    featured: true,
    available: true,
  },
];

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function formatBRL(v: number): string {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
