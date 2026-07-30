"use client";

import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { Label, Marquee, Reveal, Sparkle } from "./ui";

export function Loja() {
  const produtos = PRODUCTS;

  return (
    <section id="loja" className="relative overflow-hidden bg-cru py-24 md:py-32">
      {/* Marquee de abertura da loja */}
      <div className="absolute inset-x-0 top-0 border-y-2 border-oliva/15 py-2.5 text-oliva/60">
        <Marquee
          text="LOJA OFICIAL · REFLEXO DO SANTO"
          reverse
          itemClassName="font-impact text-sm uppercase tracking-[0.18em]"
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 pt-10">
        <Reveal className="text-center md:text-left">
          <Label className="text-terracota">
            <Sparkle className="h-3 w-3" /> Loja oficial
          </Label>
        </Reveal>
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal delay={0.1}>
            <h2 className="font-impact mx-auto max-w-2xl text-balance text-center text-4xl uppercase leading-[1.02] tracking-tight text-pinho md:mx-0 md:text-left md:text-6xl">
              Vista o tema.{" "}
              <span className="font-display font-semibold normal-case italic text-oliva">Leve o reflexo com você.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto max-w-xs text-center text-sm leading-relaxed text-preto/60 md:mx-0 md:text-left">
              <strong className="text-terracota">Pré-venda aberta:</strong> clique em comprar e
              entre na lista. A equipe confirma seu pedido e combina o pagamento com você.
            </p>
          </Reveal>
        </div>

        {/* Produtos */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {produtos.map((p, i) => (
            <Reveal key={p.id} delay={0.1 + i * 0.08}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 text-center text-xs leading-relaxed text-preto/45">
            Toda a renda dos produtos financia o congresso e as ações da juventude.
            <br className="hidden md:block" /> Dúvidas sobre pedidos? Fale com a equipe de mídia.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
