// ————————————————————————————————————————————————
// CONFIGURAÇÃO CENTRAL DO SITE — edite aqui e o site
// inteiro atualiza (datas, local, contato, links).
// Campos marcados como "A CONFIRMAR" aguardam definição.
// ————————————————————————————————————————————————

export const SITE = {
  nome: "Reflexo do Santo",
  descricao:
    "Congresso de Jovens Face a Face — Reflexo do Santo · 27, 28 e 29 de setembro. Sede santos, porque eu sou santo (1 Pedro 1:16). Garanta seus produtos oficiais.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://reflexo-do-santo.vercel.app",

  // ——— IDENTIDADE DA CAMPANHA ———
  kicker: "Face a Face",
  lema: "Ele em mim e eu nele",
  tagline: "Seja o reflexo de Cristo",

  // ——— DATAS DO CONGRESSO (CONFIRMADAS) ———
  dataLabel: "27, 28 e 29 de Setembro",
  dataConfirmada: true,

  // ——— LOCAL ———
  local: "Rua Caetano Nogueira da Costa, 359",
  referencia: "Ponto final do 1758",

  // ——— ASSINATURA ———
  igreja: "Assembleia de Deus · Ministério Face com Cristo",

  // ——— CONTATO (A CONFIRMAR — WhatsApp da equipe/loja) ———
  whatsapp: "", // ex.: "5511999999999" (só números). Vazio = botão não aparece.

  // ——— PROGRAMAÇÃO / CAMPANHA ———
  pregadores: ["Nerildo", "Procópio", "Nilson"],
  lembrancas: [
    { dia: "Domingo", data: "27/09", hora: "17h30", item: "Cabine de fotos", nota: "Noite de abertura, com ceia" },
    { dia: "Segunda", data: "28/09", hora: "19h30", item: "Pulseira exclusiva", nota: "Lembrança da noite" },
    { dia: "Terça", data: "29/09", hora: "19h30", item: "Pulseira exclusiva", nota: "Encerramento" },
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
