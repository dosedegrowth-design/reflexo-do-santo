import { NextResponse } from "next/server";
import { getProduct } from "@/lib/products";
import { sbFetch, supabaseConfigured } from "@/lib/supabase";

// Pré-cadastro de interesse: entra na lista enquanto o pagamento
// online não está ativo. Gerenciado no /admin.
export async function POST(req: Request) {
  if (!supabaseConfigured()) {
    return NextResponse.json({ error: "storage_disabled" }, { status: 503 });
  }

  let body: {
    nome?: string;
    whatsapp?: string;
    productId?: string;
    size?: string | null;
    quantity?: number;
    observacao?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const nome = (body.nome ?? "").trim().slice(0, 120);
  const whatsapp = (body.whatsapp ?? "").replace(/\D/g, "");
  const product = getProduct(body.productId ?? "");
  const observacao = (body.observacao ?? "").trim().slice(0, 500) || null;

  if (nome.length < 2) {
    return NextResponse.json({ error: "nome_invalido" }, { status: 400 });
  }
  if (whatsapp.length < 10 || whatsapp.length > 13) {
    return NextResponse.json({ error: "whatsapp_invalido" }, { status: 400 });
  }
  if (!product || !product.available) {
    return NextResponse.json({ error: "produto_invalido" }, { status: 404 });
  }

  const tamanho = body.size && product.sizes?.includes(body.size) ? body.size : null;
  if (product.sizes?.length && !tamanho) {
    return NextResponse.json({ error: "tamanho_obrigatorio" }, { status: 400 });
  }

  const quantidade = Math.min(Math.max(1, Math.floor(Number(body.quantity) || 1)), 10);

  const res = await sbFetch("rds_interesses", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({
      nome,
      whatsapp,
      produto_id: product.id,
      produto_nome: product.shortName,
      tamanho,
      quantidade,
      observacao,
    }),
  });

  if (!res.ok) {
    console.error("[INTERESSE] insert falhou:", res.status, await res.text());
    return NextResponse.json({ error: "storage_error" }, { status: 502 });
  }

  console.log(`[INTERESSE] ${nome} (${whatsapp}) → ${product.shortName} x${quantidade}${tamanho ? " tam " + tamanho : ""}`);
  return NextResponse.json({ ok: true });
}
