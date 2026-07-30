import type { Metadata } from "next";
import { Fraunces, Anton, Instrument_Sans } from "next/font/google";
import { SITE } from "@/lib/config";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  title: "Reflexo do Santo · Congresso de Jovens 2026",
  description: SITE.descricao,
  metadataBase: new URL(SITE.url),
  openGraph: {
    title: "Reflexo do Santo · Congresso de Jovens 2026",
    description: SITE.descricao,
    images: ["/brand/mockup-frente-verso.png"],
    locale: "pt_BR",
    type: "website",
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${fraunces.variable} ${anton.variable} ${instrument.variable} grain antialiased`}>
        {children}
      </body>
    </html>
  );
}
