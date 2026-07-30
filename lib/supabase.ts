// Acesso server-side ao Supabase (service role) — NUNCA importar em client component.
const SUPABASE_URL = process.env.SUPABASE_URL || "https://hkjukobqpjezhpxzplpj.supabase.co";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export function supabaseConfigured(): boolean {
  return Boolean(SERVICE_KEY);
}

export async function sbFetch(path: string, init: RequestInit = {}): Promise<Response> {
  return fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    cache: "no-store",
  });
}
