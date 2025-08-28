// src/components/sections/Authority.tsx
"use client";

import Image from "next/image";
import { FaHandcuffs, FaGavel, FaScaleBalanced } from "react-icons/fa6";
import { HiOutlineDocumentText } from "react-icons/hi";

type Service = {
  id: string;
  title: string;
  icon: React.ReactNode;
  description?: string;
};

type Props = {
  sectionId?: string;
  years?: number | string; // "X" anos
  lawyerName: string;
  oab: string;             // ex: "OAB/PR 123456"
  photoUrl: string;
};

export default function Authority({
  sectionId = "autoridade",
  years = "X",
  lawyerName,
  oab,
  photoUrl,
}: Props) {
  const services: Service[] = [
    {
      id: "prisao",
      title: "Flagrante e Prisões",
      icon: <FaHandcuffs className="size-7" aria-hidden="true" />,
      description: "Atuação imediata em delegacias e audiências.",
    },
    {
      id: "habeas",
      title: "Habeas Corpus",
      icon: <HiOutlineDocumentText className="size-7" aria-hidden="true" />,
      description: "Medidas urgentes para garantir a liberdade.",
    },
    {
      id: "defesa",
      title: "Defesa Criminal",
      icon: <FaScaleBalanced className="size-7" aria-hidden="true" />,
      description: "Estratégia técnica e humanizada em todas as fases.",
    },
    {
      id: "recursos",
      title: "Recursos e Apelações",
      icon: <FaGavel className="size-7" aria-hidden="true" />,
      description: "Atuação em instâncias superiores com precisão.",
    },
  ];

  return (
    <section
      id={sectionId}
      className="relative w-full bg-brand-white text-blue"
      aria-label="Autoridade e disponibilidade"
    >
      {/* filete superior suave (coerente com a identidade) */}
      <div className="pointer-events-none absolute inset-x-0 -top-1 h-1 bg-gradient-to-r from-sand/0 via-sand/50 to-sand/0 opacity-80" />

      {/* MOBILE FIRST: texto (ordem 1) + foto (ordem 2). No desktop, foto à esquerda. */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 px-4 py-12 sm:px-6 md:grid-cols-[minmax(280px,420px)_1fr] md:gap-14 md:py-18">
        {/* Coluna TEXTO (no mobile vem primeiro; no desktop vai para a direita) */}
        <div className="order-1 md:order-2">
          <h2 className="font-serif font-bold text-[clamp(1.8rem,5vw,2.6rem)] leading-tight tracking-tight">
            Advogado criminalista com {years} anos de experiência em defesa de urgência
          </h2>

          <p className="mt-2 text-sand font-semibold">
            Atendimento criminal 24h em todo o Brasil
          </p>

          {/* divisor delicado para respiração no mobile */}
          <div className="mt-4 h-px w-full bg-blue/10 md:hidden" />

          {/* grade de serviços: 1 col, 2 col em telas um pouco maiores, 4 col no desktop */}
          <div className="mt-6 grid grid-cols-1 gap-3 min-[380px]:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {services.map((s) => (
              <div
                key={s.id}
                className="group relative rounded-xl bg-white ring-1 ring-blue/10 p-4 sm:p-5 shadow-sm transition
                           hover:-translate-y-0.5 hover:shadow-md hover:ring-sand/40 focus-within:ring-sand/50 touch-manipulation"
                aria-label={s.title}
                role="article"
              >
                <div className="mb-3 inline-flex items-center justify-center rounded-lg ring-1 ring-blue/10 p-3">
                  <span className="text-blue">{s.icon}</span>
                </div>

                <h3 className="text-[0.98rem] font-semibold text-blue">{s.title}</h3>
                {s.description && (
                  <p className="mt-1 text-sm text-blue/80 leading-relaxed">
                    {s.description}
                  </p>
                )}

                {/* foco visível para teclado */}
                <span className="absolute inset-0 rounded-xl ring-2 ring-transparent focus:outline-none focus:rounded-xl focus:ring-sand/50" />
              </div>
            ))}
          </div>
        </div>

        {/* Coluna FOTO (no mobile vem depois; no desktop fica à esquerda) */}
        <div className="order-2 md:order-1">
          <div className="relative mx-auto w-full max-w-[440px]">
            <div className="absolute -inset-3 -z-10 rounded-2xl bg-white ring-1 ring-sand/20 shadow-[0_26px_70px_-30px_rgba(0,0,0,0.25)]" />
            <Image
              src={photoUrl}
              alt={`Foto profissional de ${lawyerName}`}
              width={520}
              height={640}
              priority
              sizes="(min-width: 768px) 520px, 90vw"
              className="rounded-xl object-cover ring-1 ring-sand/20"
            />
          </div>

          <div className="mx-auto mt-4 w-full max-w-[440px] text-center">
            <p className="text-lg font-semibold text-blue">{lawyerName}</p>
            <p className="text-sm text-blue/75">{oab}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
