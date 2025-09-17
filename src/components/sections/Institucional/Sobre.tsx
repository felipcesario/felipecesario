// src/components/sections/Sobre.tsx
"use client";

import Image from "next/image";

export default function Sobre() {
  return (
    <section
      id="sobre"
      className="relative w-full bg-blue text-brand-white overflow-hidden"
      aria-label="Sobre mim"
    >
      <div className="pointer-events-none absolute inset-x-0 -top-1 h-1 bg-gradient-to-r from-sand/0 via-sand/40 to-sand/0 opacity-70" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:gap-14 md:py-18">
        {/* coluna da foto */}
        <div className="relative mx-auto order-1 md:order-1 w-[80vw] max-w-[440px]">
          <div className="absolute -inset-3 -z-10 rounded-2xl bg-white/5 backdrop-blur-md ring-1 ring-white/15 shadow-[0_26px_70px_-20px_rgba(0,0,0,0.6)]" />
          <Image
            src="/img/felipe2.jpg"
            alt="Foto de Felipe Cesario"
            width={520}
            height={640}
            className="rounded-xl object-cover ring-1 ring-white/10"
            priority
          />
        </div>

        {/* coluna de texto */}
        <div className="order-2 md:order-2">
          <h2 className="font-serif text-[clamp(1.9rem,5vw,2.6rem)] font-bold mb-3">
            Sobre mim
          </h2>
          <p className="text-sand/90 font-semibold mb-4">Felipe Cesario</p>
          <div className="space-y-4 text-brand-white/90 leading-relaxed text-sm sm:text-base">
            <p>
              Advogado formado há dez anos pelo renomado Centro Universitário Antonio Eufrásio de Toledo, em Presidente Prudente/SP. Ao longo da minha trajetória, mantive constante atualização na área da advocacia criminal, atuando em casos que vão desde situações mais simples até processos de maior complexidade.
            </p>
            <p>
              Sou especialista em Direito Penal e Processo Penal, com foco na Lei de Drogas e no Direito Penal Estratégico, áreas em que defendo a ideia de que a atuação da defesa vai além de um direito constitucional, sendo um pilar essencial da justiça. Atuo em todo o Brasil, com sede em Florianópolis/SC, e integro a ABRACRIM, a AACRIMESC e as Comissões da OAB/SC de Política de Drogas e Assuntos Prisionais. Para mim, cada caso representa uma vida e uma história única, que exige seriedade, técnica e dedicação absoluta.
            </p>
          </div>
          <div className="mt-6 rounded-lg border border-white/10 bg-white/5 px-5 py-4 text-sm sm:text-base text-brand-white/90 italic">
            “A defesa não é apenas um direito: é um pilar da justiça. Cada caso
            representa uma vida e merece ser tratado com a máxima seriedade.”
          </div>
        </div>
      </div>
    </section>
  );
}
