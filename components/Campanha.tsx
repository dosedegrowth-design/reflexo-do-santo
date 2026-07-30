"use client";

import { SITE } from "@/lib/config";
import { Label, Reveal, Sparkle } from "./ui";

const ETAPAS = [
  {
    periodo: "26 de Julho",
    titulo: "Lançamento da campanha",
    texto: "Revelação do tema na ceia de domingo. A identidade Reflexo do Santo chega para toda a igreja.",
    done: true,
  },
  {
    periodo: "Agosto",
    titulo: "Vendas abertas",
    texto: "Produtos oficiais à venda aqui no site. Garanta o seu antes de fechar a produção.",
    done: false,
  },
  {
    periodo: `${SITE.ensaios.periodo}`,
    titulo: "Ensaios gerais",
    texto: `${SITE.ensaios.quantidade} ensaios do conjunto com ${SITE.ensaios.responsaveis.slice(0, -1).join(", ")} e ${SITE.ensaios.responsaveis.at(-1)}. Preparação para as três noites.`,
    done: false,
  },
  {
    periodo: SITE.dataLabel,
    titulo: "O Congresso",
    texto: "Três noites de palavra, adoração e comunhão. Uma geração diante do espelho do Santo.",
    done: false,
    destaque: true,
  },
];

export function Campanha() {
  return (
    <section id="campanha" className="halftone relative overflow-hidden bg-pinho-escuro py-24 text-cru md:py-32">
      <div className="relative mx-auto max-w-6xl px-5">
        <Reveal className="text-center md:text-left">
          <Label className="text-terracota">
            <Sparkle className="h-3 w-3" /> A campanha
          </Label>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-impact mx-auto mt-6 max-w-3xl text-balance text-center text-4xl uppercase leading-[1.02] tracking-tight md:mx-0 md:text-left md:text-6xl">
            Do lançamento ao grande dia.
          </h2>
        </Reveal>

        {/* Timeline */}
        <div className="relative mt-16 space-y-0">
          <div className="absolute bottom-6 left-[7px] top-2 w-0.5 bg-cru/15 md:left-1/2 md:-translate-x-1/2" />
          {ETAPAS.map((e, i) => (
            <Reveal key={e.titulo} delay={0.08 * i}>
              <div
                className={`relative flex gap-6 pb-12 last:pb-0 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-10 ${
                  i % 2 === 1 ? "md:text-left" : "md:text-right"
                }`}
              >
                {/* data (desktop alterna lados) */}
                <div className={`hidden md:block ${i % 2 === 1 ? "order-3" : ""}`}>
                  <p className={`font-impact text-2xl uppercase tracking-wide ${e.destaque ? "text-terracota" : "text-cru/40"}`}>
                    {e.periodo}
                  </p>
                </div>

                {/* ponto */}
                <div className="relative z-10 order-2 mt-1.5 shrink-0">
                  <span
                    className={`block h-4 w-4 rounded-full border-2 ${
                      e.done
                        ? "border-oliva bg-oliva"
                        : e.destaque
                          ? "border-terracota bg-terracota shadow-[0_0_24px_rgba(180,85,31,0.8)]"
                          : "border-cru/40 bg-pinho-escuro"
                    }`}
                  />
                </div>

                {/* conteúdo */}
                <div className={`flex-1 text-left ${i % 2 === 1 ? "md:order-1 md:text-right" : "md:order-3"}`}>
                  <p className="font-impact text-lg uppercase tracking-wide text-terracota md:hidden">
                    {e.periodo}
                  </p>
                  <h3 className={`font-impact text-2xl uppercase tracking-wide ${e.destaque ? "text-terracota" : ""}`}>
                    {e.titulo}
                    {e.done && (
                      <span className="ml-2 align-middle text-[10px] font-bold uppercase tracking-[0.2em] text-oliva">
                        ✓ feito
                      </span>
                    )}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-cru/65 md:inline-block">
                    {e.texto}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA final */}
        <Reveal delay={0.2}>
          <div className="mt-20 overflow-hidden rounded-3xl bg-oliva">
            <div className="relative px-8 py-14 text-center md:py-20">
              <Sparkle className="float-slow absolute left-[12%] top-8 h-5 w-5 text-cru/40" />
              <Sparkle className="float-slow absolute right-[14%] bottom-10 h-4 w-4 text-cru/30 [animation-delay:-4s]" />
              <h3 className="font-impact mx-auto max-w-2xl text-balance text-3xl uppercase leading-tight md:text-5xl">
                {SITE.tagline}
              </h3>
              <p className="mx-auto mt-4 max-w-md text-cru/80">
                Garanta sua camiseta, convide um amigo e viva o Reflexo do Santo com a gente nos dias{" "}
                {SITE.dataLabel.toLowerCase()}.
              </p>
              <a
                href="#loja"
                className="btn-shine mt-8 inline-block rounded-full bg-cru px-10 py-4 text-sm font-bold uppercase tracking-[0.16em] text-pinho transition-transform hover:scale-[1.05] active:scale-95"
              >
                Quero minha camiseta
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
