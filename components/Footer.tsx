"use client";

import { VERSICULO } from "@/lib/config";
import { Marquee, Sparkle } from "./ui";

export function Footer() {
  return (
    <footer className="halftone relative overflow-hidden bg-preto pb-10 pt-16 text-cru">
      <div className="border-y border-cru/10 py-3 text-cru/50">
        <Marquee
          text="REFLEXO DO SANTO · 1 PEDRO 1:16"
          itemClassName="font-impact text-sm uppercase tracking-[0.2em]"
        />
      </div>

      <div className="mx-auto max-w-6xl px-5 pt-14 text-center">
        <div className="select-none">
          <p className="font-display text-4xl font-black tracking-tight md:text-6xl">REFLEXO</p>
          <p className="font-display text-lg font-semibold uppercase tracking-[0.3em] text-oliva md:text-2xl">
            do Santo
          </p>
          <p
            aria-hidden
            className="reflection font-display text-lg font-semibold uppercase tracking-[0.3em] text-oliva/70 md:text-2xl"
          >
            do Santo
          </p>
        </div>

        <p className="mx-auto mt-6 max-w-md text-sm italic leading-relaxed text-cru/50">
          “{VERSICULO.curto}” — {VERSICULO.ref}
        </p>

        <div className="mt-10 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.24em] text-cru/35">
          <Sparkle className="h-3 w-3" />
          Congresso de Jovens · 2026 · Feito com amor pela equipe de mídia
          <Sparkle className="h-3 w-3" />
        </div>
      </div>
    </footer>
  );
}
