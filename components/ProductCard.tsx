"use client";

import { useState } from "react";
import Image from "next/image";
import { formatBRL, type Product } from "@/lib/products";
import { InteresseModal } from "./InteresseModal";
import { Sparkle } from "./ui";

export function ProductCard({ product }: { product: Product }) {
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const needsSize = Boolean(product.sizes?.length);

  async function comprar() {
    if (!product.available) return;
    if (needsSize && !size) {
      setNotice("Escolha o tamanho primeiro 😉");
      return;
    }
    setNotice(null);
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, size, quantity: qty }),
      });
      if (res.status === 503) {
        // Pagamento online ainda não ativo → pré-cadastro na lista
        setModalOpen(true);
        return;
      }
      if (!res.ok) {
        setNotice("Não conseguimos iniciar o pagamento. Tente de novo em instantes.");
        return;
      }
      const data = await res.json();
      window.location.href = data.init_point;
    } catch {
      setNotice("Não conseguimos iniciar o pagamento. Tente de novo em instantes.");
    } finally {
      setLoading(false);
    }
  }

  const featured = product.featured;

  return (
    <div
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border-2 transition-all duration-500 hover:-translate-y-1.5 ${
        featured
          ? "border-terracota/60 bg-pinho text-cru shadow-[0_28px_56px_-24px_rgba(46,58,44,0.55)]"
          : "border-pinho/10 bg-cru-claro text-preto hover:border-oliva/50 hover:shadow-[0_24px_48px_-20px_rgba(46,58,44,0.3)]"
      }`}
    >
      {product.badge && (
        <span
          className={`absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] ${
            featured ? "bg-terracota text-cru" : "bg-pinho text-cru"
          }`}
        >
          <Sparkle className="h-2.5 w-2.5" /> {product.badge}
        </span>
      )}

      {/* Imagem quadrada, sempre inteira nos itens de arte */}
      <div
        className={`relative aspect-square overflow-hidden ${
          featured ? "lg:aspect-auto lg:min-h-0 lg:flex-1" : ""
        } ${product.colorway === "oliva" ? "bg-oliva" : featured ? "bg-cru/10" : "bg-cru"}`}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={`transition-transform duration-700 group-hover:scale-[1.06] ${
            product.imageFit === "contain" ? "object-contain p-6" : "object-cover object-top"
          }`}
        />
      </div>

      <div className={`flex flex-col p-5 ${featured ? "lg:flex-none" : "flex-1"}`}>
        <h3 className="font-impact text-lg uppercase leading-tight tracking-wide">{product.shortName}</h3>
        <p className={`mt-1.5 line-clamp-2 text-[13px] leading-snug ${featured ? "text-cru/70" : "text-preto/60"}`}>
          {product.description}
        </p>

        {product.items && (
          <ul className={`mt-4 grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs ${featured ? "text-cru/80" : "text-preto/70"}`}>
            {product.items.map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <Sparkle className={`h-2 w-2 shrink-0 ${featured ? "text-terracota" : "text-oliva"}`} />
                {item}
              </li>
            ))}
          </ul>
        )}

        {/* Tamanhos */}
        {needsSize && (
          <div className="mt-3.5">
            <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${featured ? "text-cru/50" : "text-preto/45"}`}>
              Tamanho
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes!.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`h-8 min-w-8 rounded-lg border-2 px-2 text-xs font-bold transition-all ${
                    size === s
                      ? featured
                        ? "border-terracota bg-terracota text-cru"
                        : "border-oliva bg-oliva text-cru"
                      : featured
                        ? "border-cru/25 text-cru/80 hover:border-cru/60"
                        : "border-pinho/20 text-preto/70 hover:border-pinho/50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-auto pt-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${featured ? "text-cru/50" : "text-preto/45"}`}>
                Valor
              </p>
              <p className={`font-impact text-xl tracking-wide ${featured ? "text-cru" : "text-pinho"}`}>
                {formatBRL(product.price)}
              </p>
            </div>

            {/* Quantidade */}
            <div className={`flex items-center rounded-full border-2 ${featured ? "border-cru/25" : "border-pinho/15"}`}>
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="h-9 w-9 text-lg font-bold opacity-70 transition-opacity hover:opacity-100"
                aria-label="Diminuir quantidade"
              >
                −
              </button>
              <span className="w-6 text-center text-sm font-bold">{qty}</span>
              <button
                onClick={() => setQty(Math.min(10, qty + 1))}
                className="h-9 w-9 text-lg font-bold opacity-70 transition-opacity hover:opacity-100"
                aria-label="Aumentar quantidade"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={comprar}
            disabled={loading || !product.available}
            className={`btn-shine mt-3.5 w-full rounded-full py-3 text-[13px] font-bold uppercase tracking-[0.14em] transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 ${
              featured
                ? "bg-terracota text-cru hover:brightness-110"
                : "bg-pinho text-cru hover:bg-oliva"
            }`}
          >
            {loading ? "Abrindo pagamento…" : product.available ? "Comprar agora" : "Em breve"}
          </button>

          {notice && (
            <p className={`mt-3 text-center text-xs font-medium ${featured ? "text-cru/80" : "text-terracota"}`}>
              {notice}
            </p>
          )}
        </div>
      </div>

      <InteresseModal
        product={product}
        size={size}
        quantity={qty}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
