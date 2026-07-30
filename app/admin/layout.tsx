import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Painel · Reflexo do Santo",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
