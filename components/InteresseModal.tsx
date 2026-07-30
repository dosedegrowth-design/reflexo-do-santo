"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { formatBRL, type Product } from "@/lib/products";
import { Sparkle } from "./ui";

export function InteresseModal({
  product,
  size,
  quantity,
  open,
  onClose,
}: {
  product: Product;
  size: string | null;
  quantity: number;
  open: boolean;
  onClose: () => void;
}) {
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [observacao, setObservacao] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  async function enviar() {
    setErro(null);
    if (nome.trim().length < 2) {
      setErro("Escreve seu nome completo 😉");
      return;
    }
    const fone = whatsapp.replace(/\D/g, "");
    if (fone.length < 10 || fone.length > 13) {
      setErro("WhatsApp com DDD, ex.: 11 91234-5678");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/interesse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          whatsapp: fone,
          productId: product.id,
          size,
          quantity,
          observacao,
        }),
      });
      if (!res.ok) {
        setErro("Não deu pra salvar agora. Tenta de novo em instantes!");
        return;
      }
      setDone(true);
    } catch {
      setErro("Não deu pra salvar agora. Tenta de novo em instantes!");
    } finally {
      setLoading(false);
    }
  }

  function fechar() {
    onClose();
    // reseta depois da animação de saída
    setTimeout(() => {
      setDone(false);
      setErro(null);
    }, 300);
  }

  if (!mounted) return null;

  // Portal: o card tem transform no hover, o que quebraria position:fixed
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[55] flex items-end justify-center bg-preto/60 p-0 backdrop-blur-sm sm:items-center sm:p-5"
          onClick={fechar}
        >
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-t-3xl bg-cru p-7 shadow-2xl sm:rounded-3xl"
          >
            {done ? (
              <div className="py-6 text-center">
                <Sparkle className="mx-auto h-10 w-10 text-terracota" />
                <h3 className="font-impact mt-5 text-3xl uppercase text-oliva">Você está na lista!</h3>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-preto/70">
                  Reservamos seu interesse em <strong>{product.shortName}</strong>
                  {size ? ` (tam. ${size})` : ""} x{quantity}. A equipe do congresso vai te chamar
                  no WhatsApp pra confirmar o pedido e combinar o pagamento.
                </p>
                <button
                  onClick={fechar}
                  className="btn-shine mt-7 rounded-full bg-pinho px-8 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-cru"
                >
                  Fechar
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-terracota">
                      Pré-venda · entre na lista
                    </p>
                    <h3 className="font-impact mt-1 text-2xl uppercase text-pinho">
                      {product.shortName}
                    </h3>
                    <p className="mt-1 text-sm text-preto/60">
                      {size ? `Tam. ${size} · ` : ""}
                      {quantity}x · {formatBRL(product.price * quantity)}
                    </p>
                  </div>
                  <button
                    onClick={fechar}
                    aria-label="Fechar"
                    className="text-2xl leading-none text-preto/40 transition-colors hover:text-preto"
                  >
                    ×
                  </button>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-preto/65">
                  O pagamento online abre em breve. Deixa seu contato que a equipe{" "}
                  <strong>garante o seu</strong> e confirma tudo com você. 🙌
                </p>

                <div className="mt-5 space-y-3">
                  <input
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Seu nome completo"
                    className="w-full rounded-xl border-2 border-pinho/15 bg-cru-claro px-4 py-3 text-sm outline-none transition-colors placeholder:text-preto/35 focus:border-oliva"
                  />
                  <input
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="WhatsApp com DDD (11 91234-5678)"
                    inputMode="tel"
                    className="w-full rounded-xl border-2 border-pinho/15 bg-cru-claro px-4 py-3 text-sm outline-none transition-colors placeholder:text-preto/35 focus:border-oliva"
                  />
                  <textarea
                    value={observacao}
                    onChange={(e) => setObservacao(e.target.value)}
                    placeholder="Observação (opcional)"
                    rows={2}
                    className="w-full resize-none rounded-xl border-2 border-pinho/15 bg-cru-claro px-4 py-3 text-sm outline-none transition-colors placeholder:text-preto/35 focus:border-oliva"
                  />
                </div>

                {erro && <p className="mt-3 text-center text-xs font-medium text-terracota">{erro}</p>}

                <button
                  onClick={enviar}
                  disabled={loading}
                  className="btn-shine mt-5 w-full rounded-full bg-terracota py-4 text-sm font-bold uppercase tracking-[0.14em] text-cru transition-transform active:scale-95 disabled:opacity-60"
                >
                  {loading ? "Enviando…" : "Entrar na lista"}
                </button>
                <p className="mt-3 text-center text-[11px] text-preto/40">
                  Sem pagamento agora, é só a reserva do seu pedido.
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
