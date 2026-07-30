# Checklist Mercado Pago — Loja Reflexo do Santo

> Lista do que precisamos de quem é responsável pela conta Mercado Pago
> (quem vai RECEBER o dinheiro das vendas). O site já está pronto —
> falta só isso pra ativar as vendas.

## O que precisamos (em ordem)

### 1. Definir a conta que recebe ⭐ obrigatório
Uma conta Mercado Pago (pode ser da igreja/PJ ou de um responsável/PF).
**Por quê:** todo pagamento do site (Pix, cartão, boleto) cai direto nessa conta.
Se a conta for nova, precisa estar com identidade verificada e dados
bancários/chave Pix cadastrados pra poder sacar.

### 2. Access Token de PRODUÇÃO ⭐ obrigatório
Uma credencial secreta que começa com `APP_USR-...`.
**Por quê:** é ela que autoriza o site a gerar as cobranças dentro da conta.
Sem ela o botão "Comprar" fica em modo "vendas em breve".

**Passo a passo pro dono da conta (5 minutos):**
1. Entrar em **mercadopago.com.br** com a conta que vai receber
2. Acessar **mercadopago.com.br/developers/panel/app**
3. Clicar em **"Criar aplicação"** → nome: `Loja Reflexo do Santo` →
   produto: **CheckoutPro** → criar
4. No menu da aplicação, abrir **"Credenciais de produção"**
5. Copiar o **Access Token** (`APP_USR-...`) e enviar pro Lucas
   **por canal seguro** (mensagem direta, não em grupo)

### 3. Acesso de colaborador pro Lucas 🔑 recomendado
Na conta MP: **Configurações → Colaboradores → convidar** o e-mail
`dosedegrowth@gmail.com` com permissão de **desenvolvedor/gestão de vendas**.
**Justificativa:** o Lucas não tem acesso à conta. Como colaborador ele consegue
(a) gerenciar/renovar as credenciais se expirar ou vazar, (b) acompanhar os
pagamentos pra conferir os pedidos da loja, (c) fazer estorno em caso de erro
de compra — tudo SEM precisar da senha do dono e sem mexer no dinheiro
(colaborador não saca; saque continua só com o titular).

### 4. Decisão: prazo de recebimento 💰 (1 escolha)
O Mercado Pago pergunta como quer receber o dinheiro do cartão:
- **Na hora / D+2** → taxa maior
- **D+14 ou D+30** → taxa menor
**Por quê:** afeta a taxa descontada de cada venda. Pix tem taxa menor
independente. Escolha do responsável financeiro (dá pra mudar no painel em
Custos de venda).

### 5. Decisão: parcelamento 💳 (1 escolha)
Até quantas parcelas aceitar no cartão (ex.: 3x). Se quiser, dá pra definir
quem paga os juros (comprador paga = padrão, sem custo pra loja).

## O que NÃO precisamos (nunca enviar)
- ❌ Senha da conta Mercado Pago
- ❌ Dados de cartão de ninguém
- ❌ Dados bancários (só cadastrar na própria conta MP pro saque)

## Depois que o token chegar (fazemos aqui)
- [ ] Configurar `MP_ACCESS_TOKEN` na Vercel → vendas ativam na hora
- [ ] Compra-teste real de valor baixo (R$ 1) + estorno, pra validar o fluxo
- [ ] Conferir webhook de pedidos nos logs (aviso de cada venda)
