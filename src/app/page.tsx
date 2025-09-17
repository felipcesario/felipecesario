// src/app/page.tsx
import Header from "@/components/sections/Criminal/Header";
import Intro from "@/components/sections/Criminal/Intro";
import Urgency from "@/components/sections/Criminal/Urgency";
import Depoimentos from "@/components/sections/Criminal/Depoimentos";
import Footer from "@/components/layout/Footer";
import Contato from "@/components/sections/Criminal/Contato";
import Authority from "@/components/sections/Criminal/Sobre";

export default function Home() {
  return (
    <>
      <Header />

      <Intro
        name="Felipe Cesario"
        photoUrl="/img/felipe2.jpg"
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
