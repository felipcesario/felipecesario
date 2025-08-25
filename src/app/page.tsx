import Header from "@/components/layout/Header";
import Intro from "@/components/sections/Intro";
import AreasDeAtuacao from "@/components/sections/PracticeAreas";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact"; // 👈 importa a seção de contato

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

      <AreasDeAtuacao />
      <About />
      <Testimonials />
      <Contact /> 
    </>
  );
}
