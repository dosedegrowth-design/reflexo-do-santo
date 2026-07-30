"use client";

import Image from "next/image";
import { VERSICULO } from "@/lib/config";
import { Label, Reveal, Sparkle } from "./ui";

const PILARES = [
  {
    num: "01",
    titulo: "Olhar",
    texto:
      "Parar diante do espelho da Palavra e enxergar quem Deus diz que somos: separados, escolhidos, chamados para a santidade.",
  },
  {
    num: "02",
    titulo: "Refletir",
    texto:
      "Como a água parada devolve a imagem do céu, nossa vida devolve ao mundo a imagem de Cristo formada em nós.",
  },
  {
    num: "03",
    titulo: "Brilhar",
    texto:
      "Santidade não é distância — é luz. Um jovem transformado ilumina a casa, a escola, a rua e a igreja.",
  },
];

export function Tema() {
  return (
    <section id="tema" className="halftone relative overflow-hidden bg-pinho py-24 text-cru md:py-32">
      {/* marca d'água gigante */}
      <p
        aria-hidden
        className="font-impact pointer-events-none absolute -right-8 top-6 select-none text-[22vw] uppercase leading-none text-cru/[0.04]"
      >
        SANTO
      </p>

      <div className="relative mx-auto max-w-6xl px-5">
        <Reveal className="text-center md:text-left">
          <Label className="text-terracota">
            <Sparkle className="h-3 w-3" /> A proposta da campanha
          </Label>
        </Reveal>

        <div className="mt-6 grid items-start gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="text-center md:text-left">
            <Reveal delay={0.1}>
              <h2 className="font-impact text-balance text-4xl uppercase leading-[1.02] tracking-tight md:text-6xl">
                Quando você se olha no espelho,{" "}
                <span className="font-display font-semibold normal-case italic text-cru/60">quem aparece?</span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-cru/75 md:mx-0">
                <strong className="text-cru">Reflexo do Santo</strong> é um chamado para uma geração
                que não se contenta em parecer — quer <em>refletir</em>. Fomos criados à imagem e
                semelhança de Deus, e a santidade é isso: a luz de Cristo formada em nós, visível em
                cada escolha, cada palavra, cada atitude.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <blockquote className="mt-10 border-terracota md:border-l-4 md:pl-6">
                <p className="font-display text-xl italic leading-relaxed text-cru/90 md:text-2xl">
                  “{VERSICULO.completo}”
                </p>
                <cite className="mt-4 block text-xs font-bold uppercase not-italic tracking-[0.28em] text-terracota">
                  {VERSICULO.ref}-17
                </cite>
              </blockquote>
            </Reveal>
          </div>

          {/* Arte das costas como peça editorial */}
          <Reveal delay={0.25} className="relative mx-auto w-full max-w-sm lg:mt-4">
            <div className="rotate-2 rounded-2xl border border-cru/15 bg-cru p-6 shadow-[0_32px_64px_-24px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:rotate-0">
              <Image
                src="/brand/costas-oliva.png"
                alt="Arte oficial: Sede Santos, porque eu sou santo — 1 Pedro 1:16"
                width={640}
                height={853}
                className="w-full"
              />
            </div>
            <Sparkle className="absolute -left-4 -top-4 h-8 w-8 text-terracota" />
          </Reveal>
        </div>

        {/* Pilares */}
        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {PILARES.map((p, i) => (
            <Reveal key={p.num} delay={0.1 + i * 0.12}>
              <div className="group h-full rounded-2xl border border-cru/12 bg-cru/[0.04] p-8 text-center transition-colors duration-500 hover:border-terracota/60 hover:bg-cru/[0.07] md:text-left">
                <span className="font-impact text-4xl text-terracota/80 transition-colors group-hover:text-terracota">
                  {p.num}
                </span>
                <h3 className="font-impact mt-4 text-2xl uppercase tracking-wide">{p.titulo}</h3>
                <p className="mt-3 leading-relaxed text-cru/70">{p.texto}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
