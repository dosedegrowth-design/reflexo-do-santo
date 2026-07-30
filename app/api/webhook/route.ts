import { NextResponse } from "next/server";

// Webhook de notificações do Mercado Pago.
// Hoje: consulta o pagamento e registra no log (visível na Vercel).
// Futuro: gravar pedido em banco / avisar equipe no WhatsApp.
export async function POST(req: Request) {
  const token = process.env.MP_ACCESS_TOKEN;
  const url = new URL(req.url);

  let body: { type?: string; data?: { id?: string } } = {};
  try {
    body = await req.json();
  } catch {
    // Mercado Pago também envia via query params (topic/id)
  }

  const type = body.type ?? url.searchParams.get("topic");
  const paymentId = body.data?.id ?? url.searchParams.get("id");

  if (token && type === "payment" && paymentId) {
    try {
      const res = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const p = await res.json();
        console.log(
          `[PEDIDO] pagamento=${p.id} status=${p.status} valor=${p.transaction_amount} ` +
            `produto=${p.metadata?.product_id ?? "?"} tam=${p.metadata?.size ?? "-"} ` +
            `comprador=${p.payer?.email ?? "?"}`
        );
      }
    } catch (e) {
      console.error("[WEBHOOK] erro ao consultar pagamento", e);
    }
  }

  return NextResponse.json({ ok: true });
}
