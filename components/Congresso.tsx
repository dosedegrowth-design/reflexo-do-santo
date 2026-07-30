"use client";

import { SITE } from "@/lib/config";
import { Label, Reveal, Sparkle, SunRays } from "./ui";

export function Congresso() {
  return (
    <section id="congresso" className="relative overflow-hidden bg-cru py-24 md:py-32">
      <SunRays className="sun-spin pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] text-oliva/10" />

      <div className="relative mx-auto max-w-6xl px-5">
        <Reveal className="text-center md:text-left">
          <Label className="text-terracota">
            <Sparkle className="h-3 w-3" /> Detalhes do congresso
          </Label>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-impact mx-auto mt-6 max-w-3xl text-balance text-center text-4xl uppercase leading-[1.02] tracking-tight text-pinho md:mx-0 md:text-left md:text-6xl">
            Três noites pra marcar uma geração.
          </h2>
        </Reveal>

        {/* Info rápida */}
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap justify-center gap-3 md:justify-start">
            {[
              { k: "Quando", v: SITE.dataLabel + (SITE.dataConfirmada ? "" : " · a confirmar") },
              { k: "Onde", v: SITE.local },
              { k: "Referência", v: SITE.referencia },
            ].map((i) => (
              <div
                key={i.k}
                className="rounded-full border border-pinho/15 bg-cru-claro px-5 py-2.5 text-sm"
              >
                <span className="font-bold uppercase tracking-[0.14em] text-terracota">{i.k}:</span>{" "}
                <span className="font-medium text-pinho">{i.v}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* As 3 noites */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {SITE.lembrancas.map((noite, i) => (
            <Reveal key={noite.dia} delay={0.1 + i * 0.12}>
              <div className="group relative h-full overflow-hidden rounded-2xl border-2 border-pinho/10 bg-cru-claro p-8 text-center transition-all duration-500 hover:-translate-y-1.5 hover:border-oliva/50 hover:shadow-[0_24px_48px_-20px_rgba(46,58,44,0.35)] md:text-left">
                <span className="font-impact absolute -right-3 -top-5 text-8xl text-oliva/[0.08] transition-colors duration-500 group-hover:text-oliva/[0.14]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-oliva">
                  {i === 0 ? "Abertura" : i === 2 ? "Encerramento" : "Noite " + (i + 1)}
                </p>
                <h3 className="font-impact mt-2 text-3xl uppercase tracking-wide text-pinho">{noite.dia}</h3>
                <p className="font-impact mt-1 text-lg uppercase tracking-wide text-terracota">
                  {noite.data} · {noite.hora}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-preto/70">{noite.nota}</p>
                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-oliva/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-oliva">
                  <Sparkle className="h-3 w-3" /> Lembrança: {noite.item}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Pregadores */}
        <Reveal delay={0.15}>
          <div className="mt-16 rounded-3xl bg-oliva p-8 text-cru md:p-12">
            <div className="flex flex-col gap-8 text-center md:flex-row md:items-center md:justify-between md:text-left">
              <div>
                <Label className="text-cru/70">Palavra ministrada por</Label>
                <div className="mt-4 flex flex-wrap justify-center gap-x-10 gap-y-3 md:justify-start">
                  {SITE.pregadores.map((p) => (
                    <p key={p} className="font-impact text-3xl uppercase tracking-wide md:text-4xl">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
              <div className="shrink-0 border-l-0 border-cru/20 md:border-l md:pl-10">
                <p className="mx-auto max-w-[220px] text-sm leading-relaxed text-cru/80 md:mx-0">
                  Uma noite com cada ministério, um só tema: o reflexo do Santo em nós.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
