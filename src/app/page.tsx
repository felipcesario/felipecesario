// src/app/page.tsx
import Header from "@/components/layout/Header";
import Intro from "@/components/sections/Intro";
import Urgency from "@/components/sections/Urgency";
import Depoimentos from "@/components/sections/Depoimentos";
import Footer from "@/components/layout/Footer";
import Sobre from "@/components/sections/Sobre";
import Contato from "@/components/sections/Contato";

export default function Home() {
  return (
    <>
      <Header />

      <Intro
        name="Felipe Cesario"
        photoUrl="/img/felipe2.jpg"
        cityTag="Atendimento em Curitiba"
      />

      {/* Section 2 reestruturada (Urgency) */}
      <Urgency
        sectionId="atuacao"
        // você pode customizar:
        // title="Cada minuto conta em casos criminais"
        // subtitle="Se você ou alguém próximo está passando por uma dessas situações, entre em contato AGORA:"
        // ctaHref="#contato" // caso queira que o CTA pule pro form da seção Contato
      />

      <Sobre
        idSecao="sobre"
        titulo="Sobre mim"
        nome="Felipe Cesario"
        fotoUrl="/img/felipe2.jpg"
        paragrafos={[
          "Sou advogado especializado em Direito Criminal, com atuação em casos de grande complexidade. Meu compromisso é oferecer uma defesa estratégica, técnica e humanizada, sempre priorizando o respeito e a clareza na comunicação.",
          "Ao longo da minha trajetória, desenvolvi um trabalho focado em resultados e no cuidado com cada detalhe do processo, garantindo que cada cliente tenha sua voz ouvida e sua defesa construída com dedicação total.",
        ]}
        citacao={{
          texto:
            "A defesa não é apenas um direito: é um pilar da justiça. Cada caso representa uma vida e merece ser tratado com a máxima seriedade.",
        }}
      />

      <Depoimentos
        idSecao="depoimentos"
        titulo="Depoimentos"
        depoimentos={[
          {
            nome: "Mariana Silva",
            texto:
              "O Dr. Felipe me atendeu com muita atenção e profissionalismo. Sempre explicou cada detalhe do processo e me deixou segura em todas as etapas.",
          },
          {
            nome: "João Paulo",
            texto:
              "Excelente advogado, sempre disponível para tirar dúvidas e muito preparado. Recomendo fortemente para quem precisa de uma defesa séria.",
          },
          {
            nome: "Camila Guedes",
            texto:
              "O atendimento foi humanizado e transparente. Me senti acolhida desde a primeira reunião, com total dedicação ao meu caso.",
          },
          {
            nome: "Ricardo Mota",
            texto:
              "Estratégia clara e comunicação impecável. Conduziu meu caso com firmeza e ética do início ao fim.",
          },
          {
            nome: "Aline Rocha",
            texto:
              "Profissionalismo e empatia raros. Senti confiança em todas as fases do processo.",
          },
        ]}
      />

      <Contato />
      <Footer />
    </>
  );
}
