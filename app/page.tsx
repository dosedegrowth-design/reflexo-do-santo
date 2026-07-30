import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Tema } from "@/components/Tema";
import { Congresso } from "@/components/Congresso";
import { Loja } from "@/components/Loja";
import { Campanha } from "@/components/Campanha";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Tema />
      <Congresso />
      <Loja />
      <Campanha />
      <Faq />
      <Footer />
    </main>
  );
}
