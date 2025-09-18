// src/components/sections/Authority.tsx
"use client";

import Image from "next/image";
import { FaHandcuffs, FaGavel, FaScaleBalanced } from "react-icons/fa6";
import { HiOutlineDocumentText } from "react-icons/hi";
import React from "react";

type Service = {
  id: string;
  title: string;
  icon: React.ReactNode;
  description?: string;
};

type Props = {
  sectionId?: string;
  lawyerName: string;
  oab: string;             // ex: "OAB/PR 123456"
  photoUrl: string;
};

export default function Authority({
  sectionId = "autoridade",
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
      description: "Atuação técnica e especializada em todas as fases do processo.",
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
      <div className="pointer-events-none absolute inset-x-0 -top-1 h-1 bg-gradient-to-r from-sand/0 via-sand/50 to-sand/0 opacity-80" />

      {/* container responsivo com melhores paddings e grid em md */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 md:items-center md:gap-10 md:px-8 lg:gap-14 lg:py-18">
        {/* texto */}
        <div className="order-1 md:order-2">
          {/* título com leitura melhor em md */}
          <h2 className="font-serif font-bold text-[clamp(1.8rem,4.2vw,2.4rem)] leading-tight tracking-tight md:leading-snug">
            Advogado criminalista com uma década de formação, experiente em defesas de urgência e defesas processuais técnicas.
          </h2>

          <p className="mt-3 text-sand font-semibold md:text-[0.98rem] md:leading-relaxed">
            Sou Felipe Cesario, especializado em Direito Penal e Processo Penal, atuando em casos de alta complexidade. Integro a AACRIMESC, a ABRACRIM e a Comissão de Política de Drogas da OAB/SC, reforçando meu compromisso com atualização constante e aprofundamento técnico. Minha atuação é guiada por estratégias sólidas, defesa humanizada e comunicação clara, com dedicação integral a cada detalhe do processo, garantindo uma defesa técnica, ética e eficaz.
          </p>

          <div className="mt-4 h-px w-full bg-blue/10 md:hidden" />

          {/* grid de serviços: 2 colunas em md para evitar esmagar texto/ícones */}
          <div className="mt-6 grid grid-cols-1 gap-3 min-[380px]:grid-cols-2 sm:gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-4">
            {services.map((s) => (
              <article
                key={s.id}
                className="group relative flex h-full flex-col rounded-xl bg-white p-4 ring-1 ring-blue/10 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md hover:ring-sand/40 focus-within:ring-sand/50 touch-manipulation sm:p-5"
                aria-label={s.title}
                role="article"
              >
                <div className="mb-3 inline-flex items-center justify-center rounded-lg p-3 ring-1 ring-blue/10">
                  <span className="text-blue">{s.icon}</span>
                </div>

                <h3 className="text-[0.98rem] font-semibold text-blue">{s.title}</h3>
                {s.description && (
                  <p className="mt-1 text-sm leading-relaxed text-blue/80">
                    {s.description}
                  </p>
                )}

                <span className="absolute inset-0 rounded-xl ring-2 ring-transparent focus:rounded-xl focus:outline-none focus:ring-sand/50" />
              </article>
            ))}
          </div>
        </div>

        {/* foto + identificação */}
        <div className="order-2 md:order-1">
          <div className="relative mx-auto w-full max-w-[460px] md:max-w-[400px] lg:max-w-[440px]">
            <div className="absolute -inset-3 -z-10 rounded-2xl bg-white shadow-[0_26px_70px_-30px_rgba(0,0,0,0.25)] ring-1 ring-sand/20" />
            <Image
              src={photoUrl}
              alt={`Foto profissional de ${lawyerName}`}
              width={520}
              height={640}
              priority
              sizes="(min-width: 1280px) 520px, (min-width: 1024px) 480px, (min-width: 768px) 400px, 90vw"
              className="rounded-xl object-cover ring-1 ring-sand/20"
            />
          </div>

          <div className="mx-auto mt-4 w-full max-w-[460px] md:max-w-[400px] lg:max-w-[440px] text-center">
            <p className="text-lg font-semibold text-blue">{lawyerName}</p>
            <p className="text-sm text-blue/75">{oab}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
