# REGRAS E LÓGICA — Reflexo do Santo (Site de Vendas)

> Site oficial do Congresso de Jovens "Reflexo do Santo" (2026): página de vendas
> dos produtos + proposta da campanha + detalhes do congresso.

## Objetivo

1. **Vender** camisetas, kit e acessórios oficiais com pagamento via **Mercado Pago**.
2. **Apresentar a campanha** (tema, versículo, conceito do espelho/reflexo).
3. **Divulgar o congresso** (3 noites, pregadores, lembranças, cronograma).

## Stack

- Next.js 15.5.19 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (tokens no `@theme` de `app/globals.css`)
- Framer Motion (reveals, hero, micro-interações)
- Fontes: **Fraunces** (display serif), **Anton** (impacto/estampa), **Instrument Sans** (corpo)
- Deploy: Vercel (build automático não configurado — deploy prebuilt via CLI)

## Identidade visual (FIXA — handoff da marca)

| Cor | HEX | Uso |
|---|---|---|
| Cru / Off-white | `#EFE7D6` | fundo base |
| Verde Oliva | `#5F6B3A` | cor principal |
| Verde Pinho | `#2E3A2C` | seções escuras |
| Sépia | `#6E4A2B` | acento gravura |
| Terracota | `#B4551F` | destaque/CTA |
| Preto suave | `#1C1A17` | tipografia |

**Restrições da marca (NUNCA violar):** sem cruz, sem imagem de Jesus, sem contexto
católico, sem pirâmide/triângulo, sem olho isolado, sempre dentro da paleta.

Elementos da marca no site: sol radiante (girando), estrela de 4 pontas (sparkle),
reflexo n'água (classe `.reflection` — wordmark espelhada com máscara + ondulação),
grão de serigrafia (classe `.grain`), marquees com o versículo.

## Onde editar conteúdo

| O quê | Arquivo |
|---|---|
| Datas, local, WhatsApp, pregadores, ensaios | `lib/config.ts` |
| Produtos, PREÇOS, tamanhos, disponibilidade | `lib/products.ts` |
| Versículo | `lib/config.ts` (`VERSICULO`) |
| Textos das seções | `components/*.tsx` |
| Cronograma da campanha | `components/Campanha.tsx` (`ETAPAS`) |
| FAQ | `components/Faq.tsx` (`FAQS`) |

**Preços são PROVISÓRIOS** — ajustar em `lib/products.ts` quando definidos.
`available: false` em um produto exibe "EM BREVE" e desativa a compra.

**Catálogo atual (definição Lucas 2026-07-30):** camiseta OFF-WHITE (única cor),
bag/bolsa, pulseira, chaveiro e caderneta. Sem boné, sem kit, sem combo — se
voltarem, recriar em `lib/products.ts` (o card `featured: true` ganha destaque
e a imagem preenche a altura no grid).

## Pré-cadastro (fase antes do Mercado Pago)

Enquanto `MP_ACCESS_TOKEN` não está setado, o botão **Comprar** abre um modal
de pré-cadastro (nome + WhatsApp + observação; tamanho/quantidade vêm do card):
`components/InteresseModal.tsx` → `POST /api/interesse` → tabela
`public.rds_interesses` no Supabase DDG (hkjukobqpjezhpxzplpj).
Quando o token do MP for configurado, o MESMO botão passa a abrir o checkout
real automaticamente (o modal é o fallback do 503).

- Tabela `rds_interesses`: RLS ligado SEM policies — todo acesso via
  service_role nas API routes (nada exposto ao browser).
- Status do pedido: novo → contatado → confirmado → entregue | cancelado.

### Painel admin — `/admin`
- Senha: env `ADMIN_PASSWORD` (compartilhar só com a equipe). Login guarda na
  sessionStorage; API usa header `x-admin-token`.
- Recursos: resumo de unidades por produto, filtros (status/produto/busca),
  mudar status, excluir, link direto de WhatsApp (wa.me com mensagem pronta),
  exportar CSV. Página com `robots: noindex`.
- APIs: `GET/PATCH/DELETE /api/admin/interesses`.

### Envs (Vercel: já setadas · local: `.env.local`)
- `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` (Supabase DDG)
- `ADMIN_PASSWORD` (senha do painel)

## Pagamento — Mercado Pago (Checkout Pro)

Fluxo: card do produto → `POST /api/checkout` → cria *preference* na API do MP →
redireciona pro `init_point` (checkout hospedado no MP: Pix, cartão, boleto) →
volta pra `/obrigado?status=aprovado|pendente|erro`.

- **Env obrigatória:** `MP_ACCESS_TOKEN` (Access Token de produção da aplicação MP).
  Sem token, `/api/checkout` responde **503** e o front mostra "As vendas abrem em breve"
  (site pode ir ao ar antes das credenciais).
- `NEXT_PUBLIC_SITE_URL` = URL pública (usada nos retornos e webhook).
- **Webhook** `/api/webhook`: recebe notificação de pagamento, consulta o pagamento
  na API do MP e loga `[PEDIDO] ...` (visível nos logs da Vercel). Futuro: gravar em
  banco (Supabase) e avisar equipe.
- Sem estoque/limite por tamanho no v1 — produção é sob encomenda.

## Decisões e motivos

- **Compra direta por produto (sem carrinho):** simplicidade; cada "Comprar" abre um
  checkout MP com aquele item+tamanho+quantidade. Carrinho pode vir depois.
- **Tamanho obrigatório** quando o produto tem `sizes` (validação no front e na API).
- **Quantidade limitada a 10** por compra (anti-abuso).
- **Placeholders visíveis** ("a confirmar") para data/local até definição — controlados
  por `SITE.dataConfirmada` em `lib/config.ts`.
- **Imagens de produto**: recortes do mockup oficial (`public/brand/`). Boné/ecobag/combo
  usam a logo até existirem fotos reais.

## Gotchas

- Porta do dev local: **3111** (`npm run dev -- -p 3111`); entry `reflexo-do-santo`
  no launch.json global do Claude.
- `back_urls`/`auto_return` do MP exigem URL pública https em produção — em localhost
  o retorno automático não funciona (normal).
- O grão (`.grain::after`) é `position: fixed` com z-60 — qualquer modal novo deve
  usar z < 60 ou o grão cobre por cima (efeito proposital de serigrafia).
- Fontes via `next/font/google` — build precisa de internet.
- **NUNCA rodar `next build` com o dev server aberto na mesma pasta** — o build
  sobrescreve o `.next` e o dev quebra ("Cannot find module './NNN.js'").
  Reiniciar o dev server resolve.

## Deploy

- Pasta: `/Users/lucascassiano/Antigravity/reflexo-do-santo`
- Vercel: projeto `reflexo-do-santo` (deploy prebuilt: `npx vercel build --prod` +
  `npx vercel deploy --prebuilt --prod`)
- Env vars na Vercel: `MP_ACCESS_TOKEN`, `NEXT_PUBLIC_SITE_URL`

## Pendências (aguardando Lucas)

- [ ] Access Token do Mercado Pago (produção) → ativar vendas
- [ ] Preços finais dos produtos + confirmação do catálogo
- [ ] Datas oficiais do congresso + local
- [ ] WhatsApp da equipe (botão de contato)
- [ ] Fotos reais dos produtos (boné, ecobag, pulseira, chaveiro, adesivo, modelos)
- [ ] Domínio próprio (hoje: reflexo-do-santo.vercel.app)
