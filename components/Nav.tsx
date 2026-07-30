"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkle } from "./ui";

const LINKS = [
  { href: "#tema", label: "O Tema" },
  { href: "#congresso", label: "O Congresso" },
  { href: "#loja", label: "Loja" },
  { href: "#campanha", label: "Campanha" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-cru/85 shadow-[0_1px_0_rgba(28,26,23,0.08)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#topo" className="flex items-center gap-2 text-preto">
          <Sparkle className="h-4 w-4 text-terracota" />
          <span className="font-impact text-lg uppercase tracking-wide">
            Reflexo <span className="text-oliva">do Santo</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] font-semibold uppercase tracking-[0.18em] text-preto/70 transition-colors hover:text-terracota"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#loja"
            className="btn-shine rounded-full bg-pinho px-5 py-2.5 text-[13px] font-bold uppercase tracking-[0.14em] text-cru transition-transform hover:scale-[1.04] active:scale-95"
          >
            Garantir meu kit
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Menu"
        >
          <span className={`h-0.5 w-6 bg-preto transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-preto transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-preto transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-preto/10 bg-cru/95 px-5 py-6 backdrop-blur-md md:hidden"
        >
          <div className="flex flex-col gap-5">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm font-semibold uppercase tracking-[0.2em] text-preto/80"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#loja"
              onClick={() => setOpen(false)}
              className="rounded-full bg-pinho px-5 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-cru"
            >
              Garantir meu kit
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
