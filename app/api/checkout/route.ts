import { NextResponse } from "next/server";
import { getProduct } from "@/lib/products";

// Cria uma preferência de pagamento no Mercado Pago (Checkout Pro).
// Requer MP_ACCESS_TOKEN no ambiente. Sem token → 503 (front mostra "em breve").
export async function POST(req: Request) {
  const token = process.env.MP_ACCESS_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "payments_disabled" }, { status: 503 });
  }

  let body: { productId?: string; size?: string | null; quantity?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const product = getProduct(body.productId ?? "");
  if (!product || !product.available) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const size = body.size && product.sizes?.includes(body.size) ? body.size : null;
  if (product.sizes?.length && !size) {
    return NextResponse.json({ error: "size_required" }, { status: 400 });
  }

  const quantity = Math.min(Math.max(1, Math.floor(Number(body.quantity) || 1)), 10);
  const site = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
  const title = product.name + (size ? ` — Tam. ${size}` : "");

  const res = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [
        {
          id: product.id,
          title,
          quantity,
          currency_id: "BRL",
          unit_price: product.price,
        },
      ],
      metadata: { product_id: product.id, size },
      back_urls: {
        success: `${site}/obrigado?status=aprovado`,
        pending: `${site}/obrigado?status=pendente`,
        failure: `${site}/obrigado?status=erro`,
      },
      auto_return: "approved",
      statement_descriptor: "REFLEXO DO SANTO",
      notification_url: `${site}/api/webhook`,
    }),
  });

  if (!res.ok) {
    console.error("Mercado Pago error:", res.status, await res.text());
    return NextResponse.json({ error: "mp_error" }, { status: 502 });
  }

  const pref = await res.json();
  return NextResponse.json({ init_point: pref.init_point });
}
