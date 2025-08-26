// src/components/sections/Sobre.tsx
"use client";

import Image from "next/image";

type Citacao = {
  texto: string;
  autor?: string;
};

type Props = {
  idSecao?: string;
  titulo?: string;
  nome: string;
  fotoUrl: string;
  paragrafos: string[];
  citacao?: Citacao;
};

export default function Sobre({
  idSecao = "sobre",
  titulo = "Sobre mim",
  nome,
  fotoUrl,
  paragrafos,
  citacao,
}: Props) {
  return (
    <section
      id={idSecao}
      className="relative w-full bg-blue text-brand-white overflow-hidden"
      aria-label={titulo}
    >
      <div className="pointer-events-none absolute inset-x-0 -top-1 h-1 bg-gradient-to-r from-sand/0 via-sand/40 to-sand/0 opacity-70" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:gap-14 md:py-18">
        <div className="relative mx-auto order-1 md:order-1 w-[80vw] max-w-[440px]">
          <div className="absolute -inset-3 -z-10 rounded-2xl bg-white/5 backdrop-blur-md ring-1 ring-white/15 shadow-[0_26px_70px_-20px_rgba(0,0,0,0.6)]" />
          <Image
            src={fotoUrl}
            alt={`Foto de ${nome}`}
            width={520}
            height={640}
            className="rounded-xl object-cover ring-1 ring-white/10"
            priority
          />
        </div>

        <div className="order-2 md:order-2">
          <h2 className="font-serif text-[clamp(1.9rem,5vw,2.6rem)] font-bold mb-3">
            {titulo}
          </h2>
          <p className="text-sand/90 font-semibold mb-4">{nome}</p>
          <div className="space-y-4 text-brand-white/90 leading-relaxed text-sm sm:text-base">
            {paragrafos.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {citacao?.texto && (
            <div className="mt-6 rounded-lg border border-white/10 bg-white/5 px-5 py-4 text-sm sm:text-base text-brand-white/90 italic">
              “{citacao.texto}”
              {citacao.autor ? (
                <span className="not-italic ml-2 text-brand-white/70">— {citacao.autor}</span>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
