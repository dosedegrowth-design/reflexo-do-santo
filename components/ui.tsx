"use client";

import { motion, type Variants } from "framer-motion";

/* Estrela de 4 pontas (sparkle) — elemento recorrente da marca */
export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 0c.9 6.3 4.8 10.2 12 12-7.2 1.8-11.1 5.7-12 12-.9-6.3-4.8-10.2-12-12C7.2 10.2 11.1 6.3 12 0Z" />
    </svg>
  );
}

/* Sol radiante — raios alternados como na arte aprovada */
export function SunRays({ className = "" }: { className?: string }) {
  const rays = Array.from({ length: 36 }, (_, i) => {
    const angle = (i * 360) / 36;
    const long = i % 2 === 0;
    return (
      <line
        key={i}
        x1="100"
        y1={long ? 8 : 26}
        x2="100"
        y2="54"
        stroke="currentColor"
        strokeWidth={long ? 2.4 : 1.4}
        transform={`rotate(${angle} 100 100)`}
      />
    );
  });
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      {rays}
      <circle cx="100" cy="100" r="14" fill="currentColor" />
    </svg>
  );
}

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* Wrapper de scroll-reveal */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={revealVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}

/* Faixa marquee com separador de sparkles */
export function Marquee({
  text,
  reverse = false,
  className = "",
  itemClassName = "",
}: {
  text: string;
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
}) {
  const items = Array.from({ length: 10 }, (_, i) => (
    <span key={i} className={`flex shrink-0 items-center gap-6 pr-6 ${itemClassName}`}>
      <span className="whitespace-nowrap">{text}</span>
      <Sparkle className="h-4 w-4 shrink-0" />
    </span>
  ));
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className={`marquee-track ${reverse ? "reverse" : ""}`}>{items}</div>
    </div>
  );
}

/* Selo/label pequeno em caps */
export function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] ${className}`}
    >
      {children}
    </span>
  );
}
