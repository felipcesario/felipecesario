// src/app/page.tsx
import Header from "@/components/layout/Header";
import Intro from "@/components/sections/Intro";
import Urgency from "@/components/sections/Urgency";
import Depoimentos from "@/components/sections/Depoimentos";
import Footer from "@/components/layout/Footer";
import Contato from "@/components/sections/Contato";
import Authority from "@/components/sections/Sobre";

export default function Home() {
  return (
    <>
      <Header />

      <Intro
        name="Felipe Cesario"
        photoUrl="/img/felipe2.jpg"
        cityTag="Atendimento em Curitiba"
      />

      <Authority
        sectionId="autoridade"
        years={1}
        lawyerName="Felipe Cesario"
        oab="OAB/SC N° 71.088"
        photoUrl="/img/felipe2.jpg"
      />

      <Urgency sectionId="atuacao" />

      <Depoimentos
        idSecao="confianca"
        casosSucesso={40}
        anosExperiencia={5}
      />

      <Contato />
      <Footer />
    </>
  );
}
