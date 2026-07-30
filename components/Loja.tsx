"use client";

import { useRef } from "react";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { Label, Marquee, Reveal, Sparkle } from "./ui";

function Seta({ direcao }: { direcao: "esq" | "dir" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-5 w-5" aria-hidden>
      {direcao === "esq" ? <path d="M15 5l-7 7 7 7" /> : <path d="M9 5l7 7-7 7" />}
    </svg>
  );
}

export function Loja() {
  const track = useRef<HTMLDivElement>(null);

  function rolar(dir: number) {
    track.current?.scrollBy({ left: dir * 314, behavior: "smooth" });
  }

  const btnSeta =
    "absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border-2 border-pinho/20 bg-cru text-pinho shadow-lg transition-all hover:border-pinho hover:bg-pinho hover:text-cru active:scale-90 md:flex";

  return (
    <section id="loja" className="relative overflow-hidden bg-cru py-16 md:py-20">
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
        <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <Reveal delay={0.1}>
            <h2 className="font-impact mx-auto max-w-2xl text-balance text-center text-3xl uppercase leading-[1.02] tracking-tight text-pinho md:mx-0 md:text-left md:text-4xl">
              Vista o tema.{" "}
              <span className="font-display font-semibold normal-case italic text-oliva">Leve o reflexo com você.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2} className="hidden md:block">
            <p className="max-w-xs text-sm leading-relaxed text-preto/60">
              <strong className="text-terracota">Pré-venda aberta:</strong> clique em comprar e
              entre na lista. A equipe confirma seu pedido e combina o pagamento com você.
            </p>
          </Reveal>
        </div>

        {/* Carrossel de produtos (setas sobrepostas pra economizar altura) */}
        <Reveal delay={0.15}>
          <div className="relative mt-6 md:mt-8">
            <button onClick={() => rolar(-1)} aria-label="Produtos anteriores" className={`${btnSeta} -left-3`}>
              <Seta direcao="esq" />
            </button>
            <button onClick={() => rolar(1)} aria-label="Próximos produtos" className={`${btnSeta} -right-3`}>
              <Seta direcao="dir" />
            </button>

            <div
              ref={track}
              className="no-scrollbar -mx-5 flex snap-x snap-mandatory items-stretch gap-6 overflow-x-auto px-5 pb-3"
            >
              {PRODUCTS.map((p) => (
                <div key={p.id} className="w-[68vw] max-w-[290px] shrink-0 snap-center sm:w-[290px] sm:snap-start">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>

            <p className="mt-2 text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-preto/40 md:hidden">
              Arraste pro lado pra ver mais
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-8 text-center text-xs leading-relaxed text-preto/45">
            Toda a renda dos produtos financia o congresso e as ações da juventude.
            <br className="hidden md:block" /> Dúvidas sobre pedidos? Fale com a equipe de mídia.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
