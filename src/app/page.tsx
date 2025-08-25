import Header from "@/components/layout/Header";
import Intro from "@/components/sections/Intro";

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
    </>
  );
}
