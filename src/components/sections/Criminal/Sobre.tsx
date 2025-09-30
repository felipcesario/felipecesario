// src/components/sections/Authority.tsx
"use client";

import Image from "next/image";
import {
  FaHandcuffs,
  FaGavel,
  FaScaleBalanced,
  FaPeopleGroup,
  FaLeaf,
  FaBuilding,
  FaFileInvoiceDollar,
} from "react-icons/fa6";
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
  oab: string; // ex: "OAB/PR 123456"
  photoUrl: string;
};

export default function Authority({
  sectionId = "autoridade",
  lawyerName,
  oab,
  photoUrl,
}: Props) {
  const services: Service[] = [
    { id: "prisao", title: "Flagrante e Prisões", icon: <FaHandcuffs className="size-7" aria-hidden="true" />, description: "Atuação imediata em delegacias e audiências." },
    { id: "habeas", title: "Habeas Corpus", icon: <HiOutlineDocumentText className="size-7" aria-hidden="true" />, description: "Medidas urgentes para garantir a liberdade." },
    { id: "defesa", title: "Defesa Criminal", icon: <FaScaleBalanced className="size-7" aria-hidden="true" />, description: "Atuação técnica e especializada em todas as fases do processo." },
    { id: "recursos", title: "Recursos e Apelações", icon: <FaGavel className="size-7" aria-hidden="true" />, description: "Atuação em instâncias superiores com precisão." },

    { id: "lei-drogas", title: "Lei de Drogas", icon: <FaPeopleGroup className="size-7" aria-hidden="true" />, description: "Casos envolvendo a Lei de Drogas com foco nas garantias individuais." },
    { id: "hc-cultivo-medicinal", title: "HC p/ Cultivo Medicinal", icon: <FaLeaf className="size-7" aria-hidden="true" />, description: "Habeas Corpus preventivo para cultivo de cannab!s Medicinal." },
    { id: "associacoes-cultivo", title: "Associações p/ Cultivo", icon: <FaBuilding className="size-7" aria-hidden="true" />, description: "Criação e regularização de associações sem fins lucrativos para pacientes." },
    { id: "empresas-sementes", title: "Empresas & Bancos de Sementes", icon: <FaFileInvoiceDollar className="size-7" aria-hidden="true" />, description: "Compliance, contratos e regularização para empresas do setor." },
  ];

  return (
    <section
      id={sectionId}
      className="relative w-full bg-brand-white text-blue"
      aria-label="Autoridade e disponibilidade"
    >
      <div className="pointer-events-none absolute inset-x-0 -top-1 h-1 bg-gradient-to-r from-sand/0 via-sand/50 to-sand/0 opacity-80" />

      {/* TOP: foto | texto */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 md:gap-10 md:px-8 lg:gap-14 lg:py-18">
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

        {/* texto */}
        <div className="order-1 md:order-2">
          <h2 className="font-serif font-bold text-[clamp(1.8rem,4.2vw,2.4rem)] leading-tight tracking-tight md:leading-snug">
            Advogado criminalista com uma década de formação, experiente em
            defesas de urgência e defesas processuais técnicas.
          </h2>

          <p className="mt-3 text-sand font-semibold md:text-[0.98rem] md:leading-relaxed">
            Sou Felipe Cesario, especializado em Direito Penal e Processo Penal,
            atuando em casos de alta complexidade. Integro a AACRIMESC, a
            ABRACRIM e a Comissão de Política de Drogas da OAB/SC. Atuação
            guiada por estratégia sólida, defesa humanizada e comunicação clara,
            com dedicação a cada detalhe para uma defesa técnica, ética e eficaz.
          </p>
        </div>
      </div>

      {/* BOTTOM: grade de serviços (abaixo de tudo) */}
      <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <article
              key={s.id}
              className="group relative flex h-full flex-col justify-start rounded-2xl bg-white p-5 ring-1 ring-blue/10 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md hover:ring-sand/40 focus-within:ring-sand/50 touch-manipulation"
              aria-label={s.title}
              role="article"
            >
              <div className="mb-3 inline-flex size-12 items-center justify-center rounded-full bg-blue/5 ring-1 ring-blue/10">
                <span className="text-blue">{s.icon}</span>
              </div>

              <h3 className="text-base font-semibold text-blue">{s.title}</h3>

              {s.description && (
                <p className="mt-1 text-sm leading-relaxed text-blue/80">
                  {s.description}
                </p>
              )}

              <span className="absolute inset-0 rounded-2xl ring-2 ring-transparent focus:outline-none focus:ring-sand/50" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
