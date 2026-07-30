"use client";

import { useState } from "react";
import { Label, Reveal, Sparkle } from "./ui";

const FAQS = [
  {
    q: "Como funciona o pagamento?",
    a: "Todo o pagamento é processado pelo Mercado Pago, com total segurança. Você pode pagar com Pix, cartão de crédito (parcelado) ou boleto.",
  },
  {
    q: "Como recebo minha camiseta ou kit?",
    a: "A entrega é feita presencialmente com a equipe do congresso, na igreja. Assim que o pedido for confirmado, a equipe de mídia entra em contato para combinar a retirada.",
  },
  {
    q: "Posso trocar o tamanho?",
    a: "Sim! Se o tamanho não servir, fale com a equipe na retirada e faremos a troca conforme a disponibilidade do estoque.",
  },
  {
    q: "Até quando posso comprar?",
    a: "As vendas ficam abertas até fecharmos o lote de produção. Compre cedo para garantir seu tamanho — a produção é feita sob encomenda.",
  },
  {
    q: "Para onde vai o dinheiro?",
    a: "Toda a renda financia o congresso: estrutura, decoração, lembranças e as ações da juventude. Comprando, você abençoa o evento inteiro.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-cru py-24 md:py-28">
      <div className="mx-auto max-w-3xl px-5">
        <Reveal>
          <Label className="text-terracota">
            <Sparkle className="h-3 w-3" /> Dúvidas frequentes
          </Label>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display mt-6 text-balance text-4xl font-bold tracking-tight text-pinho md:text-5xl">
            Ficou com alguma dúvida?
          </h2>
        </Reveal>

        <div className="mt-10 space-y-3">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={0.06 * i}>
              <div className="overflow-hidden rounded-2xl border-2 border-pinho/10 bg-cru-claro transition-colors hover:border-oliva/40">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display text-lg font-bold text-pinho">{f.q}</span>
                  <span
                    className={`shrink-0 text-2xl font-light text-terracota transition-transform duration-300 ${
                      open === i ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-sm leading-relaxed text-preto/65">{f.a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
