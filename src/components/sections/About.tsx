"use client";

import Image from "next/image";

export default function About() {
  return (
    <section
      id="sobre"
      className="relative w-full bg-blue text-brand-white overflow-hidden"
      aria-label="Seção sobre"
    >
      <div className="pointer-events-none absolute inset-x-0 -top-1 h-1 bg-gradient-to-r from-sand/0 via-sand/40 to-sand/0 opacity-70" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:gap-16 md:py-24">
        <div className="relative mx-auto order-1 md:order-1 w-[80vw] max-w-[420px]">
          <div className="absolute -inset-3 -z-10 rounded-2xl bg-white/5 backdrop-blur-md ring-1 ring-white/15 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)]" />
          <Image
            src="/img/felipe-sobre.jpg"
            alt="Foto de Felipe Cesario"
            width={500}
            height={600}
            className="rounded-xl object-cover ring-1 ring-white/10"
          />
        </div>

        <div className="order-2 md:order-2">
          <h2 className="font-serif text-[clamp(1.8rem,5vw,2.5rem)] font-bold mb-4">
            Sobre mim
          </h2>
          <p className="text-brand-white/90 leading-relaxed mb-4 text-sm sm:text-base">
            Sou <span className="font-semibold">Felipe Cesario</span>, advogado
            especializado em Direito Criminal, com atuação em casos de grande
            complexidade. Meu compromisso é oferecer uma defesa estratégica,
            técnica e humanizada, sempre priorizando o respeito e a clareza na
            comunicação com meus clientes.
          </p>
          <p className="text-brand-white/90 leading-relaxed text-sm sm:text-base">
            Ao longo da minha trajetória, desenvolvi um trabalho focado em
            resultados e no cuidado com cada detalhe do processo, garantindo que
            cada cliente tenha sua voz ouvida e sua defesa construída com
            dedicação total.
          </p>

          <div className="mt-6 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm sm:text-base text-brand-white/90 italic">
            “A defesa não é apenas um direito: é um pilar da justiça. Cada caso
            representa uma vida e merece ser tratado com a máxima seriedade.”
          </div>
        </div>
      </div>
    </section>
  );
}
