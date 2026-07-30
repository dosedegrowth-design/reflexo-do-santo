// ————————————————————————————————————————————————
// CONFIGURAÇÃO CENTRAL DO SITE — edite aqui e o site
// inteiro atualiza (datas, local, contato, links).
// Campos marcados como "A CONFIRMAR" aguardam definição.
// ————————————————————————————————————————————————

export const SITE = {
  nome: "Reflexo do Santo",
  descricao:
    "Congresso de Jovens 2026 — Reflexo do Santo. Sede santos, porque eu sou santo (1 Pedro 1:16). Garanta sua camiseta oficial e o kit do congresso.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://reflexo-do-santo.vercel.app",

  // ——— DATAS DO CONGRESSO (A CONFIRMAR) ———
  dataLabel: "Novembro de 2026", // ex.: "14, 15 e 16 de novembro"
  dataConfirmada: false,

  // ——— LOCAL (A CONFIRMAR) ———
  local: "Na igreja",
  cidade: "",

  // ——— CONTATO (A CONFIRMAR — WhatsApp da equipe/loja) ———
  whatsapp: "", // ex.: "5511999999999" (só números). Vazio = botão não aparece.

  // ——— PROGRAMAÇÃO / CAMPANHA ———
  pregadores: ["Nerildo", "Procópio", "Nilson"],
  lembrancas: [
    { dia: "Domingo", item: "Cabine de fotos", nota: "Noite de abertura, com ceia" },
    { dia: "Segunda", item: "Pulseira exclusiva", nota: "Lembrança da noite" },
    { dia: "Terça", item: "Pulseira exclusiva", nota: "Encerramento" },
  ],
  ensaios: {
    periodo: "Setembro",
    responsaveis: ["Kauã", "Vanessa", "Brito"],
    quantidade: 3,
  },
};

export const VERSICULO = {
  ref: "1 Pedro 1:16",
  curto: "Sede santos, porque eu sou santo.",
  completo:
    "Porque está escrito: sede santos, porque eu sou santo. E, se invocais como Pai aquele que, sem respeito de pessoas, julga segundo a obra de cada um, passai o vosso tempo neste exílio com temor;",
};
