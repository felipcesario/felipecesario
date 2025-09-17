import Footer from "@/components/layout/Footer";
import Apresentacao from "@/components/sections/Institucional/Apresentação";
import Atuacao from "@/components/sections/Institucional/Atuacao";
import Formulario from "@/components/sections/Institucional/Formulario";
import Header from "@/components/sections/Institucional/Header";
import QuandoContatar from "@/components/sections/Institucional/QuandoContatar";
import Sobre from "@/components/sections/Institucional/Sobre";


export default function Home() {
  return (
    <>
      <Header />
      <Apresentacao />
      <Atuacao />
      <Sobre />
      <QuandoContatar />
      <Formulario />
      <Footer />
    </>
  );
}
