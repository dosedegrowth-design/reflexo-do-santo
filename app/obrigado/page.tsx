import Link from "next/link";
import { Sparkle } from "@/components/ui";

const MSGS: Record<string, { titulo: string; texto: string; cor: string }> = {
  aprovado: {
    titulo: "Pedido confirmado!",
    texto:
      "Seu pagamento foi aprovado. A equipe de mídia vai entrar em contato para combinar a entrega do seu pedido. Deus abençoe!",
    cor: "text-oliva",
  },
  pendente: {
    titulo: "Quase lá…",
    texto:
      "Seu pagamento está em processamento (isso é normal no boleto e em alguns Pix). Assim que for confirmado, a equipe entra em contato.",
    cor: "text-terracota",
  },
  erro: {
    titulo: "Ops, não deu certo",
    texto:
      "O pagamento não foi concluído. Nenhum valor foi cobrado — você pode tentar de novo quando quiser.",
    cor: "text-terracota",
  },
};

export default async function Obrigado({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const msg = MSGS[status ?? "aprovado"] ?? MSGS.aprovado;

  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-cru px-5 text-center">
      <Sparkle className="h-8 w-8 text-terracota" />
      <h1 className={`font-impact mt-6 text-4xl uppercase tracking-tight md:text-5xl ${msg.cor}`}>
        {msg.titulo}
      </h1>
      <p className="mt-4 max-w-md leading-relaxed text-preto/65">{msg.texto}</p>
      <Link
        href="/"
        className="btn-shine mt-10 rounded-full bg-pinho px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-cru transition-transform hover:scale-[1.04]"
      >
        Voltar ao site
      </Link>
      <p className="mt-10 text-[11px] uppercase tracking-[0.24em] text-preto/35">
        Reflexo do Santo · 1 Pedro 1:16
      </p>
    </main>
  );
}
