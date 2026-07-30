import { NextResponse } from "next/server";
import { sbFetch, supabaseConfigured } from "@/lib/supabase";

// API do painel admin (lista de interesses do pré-cadastro).
// Auth simples: header x-admin-token == ADMIN_PASSWORD (env).

function authorized(req: Request): boolean {
  const senha = process.env.ADMIN_PASSWORD;
  if (!senha) return false;
  return req.headers.get("x-admin-token") === senha;
}

export async function GET(req: Request) {
  if (!supabaseConfigured()) return NextResponse.json({ error: "storage_disabled" }, { status: 503 });
  if (!authorized(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const res = await sbFetch(
    "rds_interesses?select=*&order=criado_em.desc&limit=2000"
  );
  if (!res.ok) {
    console.error("[ADMIN] list falhou:", res.status, await res.text());
    return NextResponse.json({ error: "storage_error" }, { status: 502 });
  }
  return NextResponse.json(await res.json());
}

export async function PATCH(req: Request) {
  if (!supabaseConfigured()) return NextResponse.json({ error: "storage_disabled" }, { status: 503 });
  if (!authorized(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let body: { id?: number; status?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const STATUS = ["novo", "contatado", "confirmado", "entregue", "cancelado"];
  if (!body.id || !STATUS.includes(body.status ?? "")) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const res = await sbFetch(`rds_interesses?id=eq.${body.id}`, {
    method: "PATCH",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({ status: body.status }),
  });
  if (!res.ok) {
    console.error("[ADMIN] update falhou:", res.status, await res.text());
    return NextResponse.json({ error: "storage_error" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  if (!supabaseConfigured()) return NextResponse.json({ error: "storage_disabled" }, { status: 503 });
  if (!authorized(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const id = Number(new URL(req.url).searchParams.get("id"));
  if (!id) return NextResponse.json({ error: "bad_request" }, { status: 400 });

  const res = await sbFetch(`rds_interesses?id=eq.${id}`, {
    method: "DELETE",
    headers: { Prefer: "return=minimal" },
  });
  if (!res.ok) {
    console.error("[ADMIN] delete falhou:", res.status, await res.text());
    return NextResponse.json({ error: "storage_error" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
