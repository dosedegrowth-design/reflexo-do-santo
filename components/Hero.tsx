"use client";

import { motion } from "framer-motion";
import { SITE, VERSICULO } from "@/lib/config";
import { Label, Marquee, Sparkle, SunRays } from "./ui";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section id="topo" className="relative flex min-h-svh flex-col overflow-hidden bg-cru">
      {/* Sol radiante gigante ao fundo */}
      <div className="pointer-events-none absolute left-1/2 top-[8%] -translate-x-1/2">
        <div className="sun-pulse">
          <SunRays className="sun-spin h-[min(120vw,780px)] w-[min(120vw,780px)] text-oliva/25" />
        </div>
      </div>

      {/* Sparkles flutuando */}
      <Sparkle className="float-slow absolute left-[8%] top-[22%] h-5 w-5 text-terracota/70" />
      <Sparkle className="float-slow absolute right-[10%] top-[30%] h-4 w-4 text-oliva/60 [animation-delay:-3s]" />
      <Sparkle className="float-slow absolute left-[16%] top-[62%] h-3 w-3 text-sepia/50 [animation-delay:-5s]" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-5 pb-24 pt-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
        >
          <Label className="rounded-full border border-preto/15 bg-cru-claro/70 px-4 py-2 text-preto/70 backdrop-blur-sm">
            <Sparkle className="h-3 w-3 text-terracota" />
            Congresso de Jovens · 2026
            <Sparkle className="h-3 w-3 text-terracota" />
          </Label>
        </motion.div>

        {/* Wordmark + reflexo n'água */}
        <div className="mt-8 select-none">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease }}
            className="font-display text-[clamp(3.4rem,14vw,9.5rem)] font-black leading-[0.9] tracking-tight text-pinho"
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40' }}
          >
            REFLEXO
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
            className="font-display mt-1 text-[clamp(1.4rem,5.4vw,3.4rem)] font-semibold uppercase tracking-[0.3em] text-oliva"
          >
            do Santo
          </motion.p>

          {/* Reflexo espelhado animado */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.8 }}
          >
            <p className="reflection font-display text-[clamp(1.4rem,5.4vw,3.4rem)] font-semibold uppercase tracking-[0.3em] text-oliva">
              do Santo
            </p>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease }}
          className="mt-6 max-w-xl text-balance font-display text-lg italic text-preto/75 md:text-xl"
        >
          “{VERSICULO.curto}” <span className="not-italic text-terracota">— {VERSICULO.ref}</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95, ease }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="#loja"
            className="btn-shine group rounded-full bg-terracota px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-cru shadow-[0_12px_32px_-12px_rgba(180,85,31,0.65)] transition-transform hover:scale-[1.05] active:scale-95"
          >
            Garantir minha camiseta
          </a>
          <a
            href="#tema"
            className="rounded-full border-2 border-pinho/25 px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-pinho transition-colors hover:border-pinho hover:bg-pinho hover:text-cru"
          >
            Conhecer o tema
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-8 text-[11px] font-semibold uppercase tracking-[0.3em] text-preto/45"
        >
          {SITE.dataLabel} · {SITE.local}
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="absolute bottom-20 left-1/2 hidden -translate-x-1/2 md:block"
        >
          <div className="flex h-12 w-7 items-start justify-center rounded-full border-2 border-preto/20 p-1.5">
            <div className="scroll-dot h-2 w-2 rounded-full bg-terracota" />
          </div>
        </motion.div>
      </div>

      {/* Marquee rodapé do hero */}
      <div className="relative z-10 border-y-2 border-pinho bg-pinho py-3 text-cru">
        <Marquee
          text="SEDE SANTOS, PORQUE EU SOU SANTO"
          itemClassName="font-impact text-lg uppercase tracking-[0.12em]"
        />
      </div>
    </section>
  );
}
