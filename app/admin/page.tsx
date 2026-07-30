"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { PRODUCTS } from "@/lib/products";
import { Sparkle } from "@/components/ui";

type Interesse = {
  id: number;
  nome: string;
  whatsapp: string;
  produto_id: string;
  produto_nome: string;
  tamanho: string | null;
  quantidade: number;
  observacao: string | null;
  status: string;
  criado_em: string;
};

const STATUS = [
  { id: "novo", label: "Novo", cor: "bg-terracota text-cru" },
  { id: "contatado", label: "Contatado", cor: "bg-sepia text-cru" },
  { id: "confirmado", label: "Confirmado", cor: "bg-oliva text-cru" },
  { id: "entregue", label: "Entregue", cor: "bg-pinho text-cru" },
  { id: "cancelado", label: "Cancelado", cor: "bg-preto/30 text-cru" },
];

function statusInfo(id: string) {
  return STATUS.find((s) => s.id === id) ?? STATUS[0];
}

export default function Admin() {
  const [token, setToken] = useState<string | null>(null);
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [dados, setDados] = useState<Interesse[]>([]);
  const [loading, setLoading] = useState(false);
  const [fStatus, setFStatus] = useState<string>("todos");
  const [fProduto, setFProduto] = useState<string>("todos");
  const [busca, setBusca] = useState("");

  const carregar = useCallback(async (tk: string) => {
    setLoading(true);
    setErro(null);
    try {
      const res = await fetch("/api/admin/interesses", { headers: { "x-admin-token": tk } });
      if (res.status === 401) {
        setErro("Senha incorreta.");
        setToken(null);
        sessionStorage.removeItem("rds_admin");
        return;
      }
      if (!res.ok) {
        setErro("Erro ao carregar. Tente de novo.");
        return;
      }
      setDados(await res.json());
      setToken(tk);
      sessionStorage.setItem("rds_admin", tk);
    } catch {
      setErro("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const salvo = sessionStorage.getItem("rds_admin");
    if (salvo) carregar(salvo);
  }, [carregar]);

  async function mudarStatus(id: number, status: string) {
    if (!token) return;
    setDados((d) => d.map((i) => (i.id === id ? { ...i, status } : i)));
    await fetch("/api/admin/interesses", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-token": token },
      body: JSON.stringify({ id, status }),
    });
  }

  async function excluir(id: number) {
    if (!token) return;
    if (!confirm("Excluir esse registro? Não dá pra desfazer.")) return;
    setDados((d) => d.filter((i) => i.id !== id));
    await fetch(`/api/admin/interesses?id=${id}`, {
      method: "DELETE",
      headers: { "x-admin-token": token },
    });
  }

  const filtrados = useMemo(() => {
    return dados.filter((i) => {
      if (fStatus !== "todos" && i.status !== fStatus) return false;
      if (fProduto !== "todos" && i.produto_id !== fProduto) return false;
      if (busca && !`${i.nome} ${i.whatsapp}`.toLowerCase().includes(busca.toLowerCase()))
        return false;
      return true;
    });
  }, [dados, fStatus, fProduto, busca]);

  const resumoProdutos = useMemo(() => {
    const ativos = dados.filter((i) => i.status !== "cancelado");
    const m = new Map<string, number>();
    for (const i of ativos) m.set(i.produto_nome, (m.get(i.produto_nome) ?? 0) + i.quantidade);
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [dados]);

  function exportarCSV() {
    const linhas = [
      ["Data", "Nome", "WhatsApp", "Produto", "Tamanho", "Qtd", "Status", "Observação"],
      ...filtrados.map((i) => [
        new Date(i.criado_em).toLocaleString("pt-BR"),
        i.nome,
        i.whatsapp,
        i.produto_nome,
        i.tamanho ?? "",
        String(i.quantidade),
        i.status,
        i.observacao ?? "",
      ]),
    ];
    const csv = linhas.map((l) => l.map((c) => `"${c.replaceAll('"', '""')}"`).join(";")).join("\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `interesses-reflexo-do-santo-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  }

  // ——— TELA DE LOGIN ———
  if (!token) {
    return (
      <main className="flex min-h-svh flex-col items-center justify-center bg-pinho px-5">
        <Sparkle className="h-8 w-8 text-terracota" />
        <h1 className="font-impact mt-4 text-3xl uppercase text-cru">Painel da equipe</h1>
        <p className="mt-2 text-sm text-cru/60">Reflexo do Santo · pré-vendas</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (senha) carregar(senha);
          }}
          className="mt-8 flex w-full max-w-xs flex-col gap-3"
        >
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha da equipe"
            className="w-full rounded-xl border-2 border-cru/20 bg-cru/10 px-4 py-3 text-sm text-cru outline-none placeholder:text-cru/40 focus:border-terracota"
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-shine rounded-full bg-terracota py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-cru disabled:opacity-60"
          >
            {loading ? "Entrando…" : "Entrar"}
          </button>
          {erro && <p className="text-center text-xs text-terracota">{erro}</p>}
        </form>
      </main>
    );
  }

  // ——— PAINEL ———
  const totalPecas = filtrados.reduce((s, i) => s + i.quantidade, 0);

  return (
    <main className="min-h-svh bg-cru pb-16">
      <header className="bg-pinho px-5 py-6 text-cru">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-impact text-2xl uppercase">Pré-vendas · Reflexo do Santo</h1>
            <p className="text-xs text-cru/60">
              {dados.length} registro{dados.length === 1 ? "" : "s"} na lista
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => token && carregar(token)}
              className="rounded-full border border-cru/25 px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors hover:bg-cru/10"
            >
              {loading ? "Atualizando…" : "Atualizar"}
            </button>
            <button
              onClick={exportarCSV}
              className="rounded-full bg-terracota px-4 py-2 text-xs font-bold uppercase tracking-wide"
            >
              Exportar CSV
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5">
        {/* Resumo por produto */}
        <div className="mt-6 flex flex-wrap gap-2">
          {resumoProdutos.map(([nome, qtd]) => (
            <div key={nome} className="rounded-xl border-2 border-pinho/10 bg-cru-claro px-4 py-2.5">
              <p className="text-[10px] font-bold uppercase tracking-wide text-preto/45">{nome}</p>
              <p className="font-impact text-xl text-pinho">{qtd} un</p>
            </div>
          ))}
          {resumoProdutos.length === 0 && (
            <p className="py-2 text-sm text-preto/50">Nenhum interesse registrado ainda.</p>
          )}
        </div>

        {/* Filtros */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar nome ou WhatsApp…"
            className="w-full max-w-xs rounded-full border-2 border-pinho/15 bg-cru-claro px-4 py-2 text-sm outline-none focus:border-oliva"
          />
          <select
            value={fStatus}
            onChange={(e) => setFStatus(e.target.value)}
            className="rounded-full border-2 border-pinho/15 bg-cru-claro px-3 py-2 text-sm outline-none"
          >
            <option value="todos">Status: todos</option>
            {STATUS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
          <select
            value={fProduto}
            onChange={(e) => setFProduto(e.target.value)}
            className="rounded-full border-2 border-pinho/15 bg-cru-claro px-3 py-2 text-sm outline-none"
          >
            <option value="todos">Produto: todos</option>
            {PRODUCTS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.shortName}
              </option>
            ))}
          </select>
          <span className="ml-auto text-xs text-preto/50">
            {filtrados.length} registro{filtrados.length === 1 ? "" : "s"} · {totalPecas} peça
            {totalPecas === 1 ? "" : "s"}
          </span>
        </div>

        {/* Lista */}
        <div className="mt-4 space-y-3">
          {filtrados.map((i) => {
            const st = statusInfo(i.status);
            return (
              <div
                key={i.id}
                className="rounded-2xl border-2 border-pinho/10 bg-cru-claro p-5 transition-colors hover:border-oliva/40"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-bold text-pinho">{i.nome}</p>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${st.cor}`}
                      >
                        {st.label}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-preto/70">
                      {i.produto_nome}
                      {i.tamanho ? ` · Tam. ${i.tamanho}` : ""} · {i.quantidade}x
                    </p>
                    {i.observacao && (
                      <p className="mt-1 text-xs italic text-preto/50">“{i.observacao}”</p>
                    )}
                    <p className="mt-1 text-[11px] text-preto/40">
                      {new Date(i.criado_em).toLocaleString("pt-BR")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/${i.whatsapp.length <= 11 ? "55" + i.whatsapp : i.whatsapp}?text=${encodeURIComponent(`Oi ${i.nome.split(" ")[0]}! Aqui é da equipe do congresso Reflexo do Santo, sobre seu pedido de ${i.produto_nome} 😊`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-oliva px-4 py-2 text-xs font-bold uppercase tracking-wide text-cru"
                    >
                      WhatsApp
                    </a>
                    <button
                      onClick={() => excluir(i.id)}
                      className="rounded-full border-2 border-pinho/15 px-3 py-1.5 text-xs text-preto/50 transition-colors hover:border-terracota hover:text-terracota"
                      aria-label="Excluir"
                    >
                      ✕
                    </button>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {STATUS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => mudarStatus(i.id, s.id)}
                      className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide transition-all ${
                        i.status === s.id
                          ? s.cor
                          : "border border-pinho/15 text-preto/45 hover:border-pinho/40"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
          {filtrados.length === 0 && dados.length > 0 && (
            <p className="py-8 text-center text-sm text-preto/50">Nada com esses filtros.</p>
          )}
        </div>
      </div>
    </main>
  );
}
