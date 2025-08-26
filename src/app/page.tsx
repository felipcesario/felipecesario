// src/app/page.tsx
import Header from "@/components/layout/Header";
import Intro from "@/components/sections/Intro";
import PracticeAreas from "@/components/sections/PracticeAreas";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <Intro
        name="Felipe Cesario"
        photoUrl="/img/felipe.jpg"
        whatsapp="5599999999999"
        cityTag="Atendimento em Curitiba"
        headline="Defesa Criminal estratégica e humanizada"
        subheadline="Prestação de serviço de advocacia responsável e eficiente."
        ctaLabel="Entrar em Contato"
        secondaryCtaHref="#atuacao"
        secondaryCtaLabel="Áreas de atuação"
      />

      <PracticeAreas
        sectionId="atuacao"
        title="Áreas de Atuação"
        initiallyActiveId="criminal"
        areas={[
          {
            id: "criminal",
            title: "Criminal",
            image: "/img/direitocriminal.png",
            description:
              "Atuação completa em defesa criminal, com acompanhamento em inquéritos, audiências e tribunais. Foco em estratégias eficazes e defesa humanizada.",
          },
          {
            id: "civil",
            title: "Civil",
            image: "/img/direitocivil.png",
            description:
              "Atendimento em causas cíveis, indenizações, contratos e disputas patrimoniais. Cada caso tratado de forma técnica e personalizada.",
          },
          {
            id: "empresarial",
            title: "Empresarial",
            image: "/img/direitoempresarial.png",
            description:
              "Assessoria jurídica para empresas, incluindo prevenção de riscos, compliance, contratos e litígios estratégicos.",
          },
        ]}
      />

      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
