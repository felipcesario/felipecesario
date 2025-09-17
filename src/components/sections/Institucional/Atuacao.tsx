"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Atuacao() {
  const areas = [
    {
      id: "civil",
      title: "Civil",
      image: "/img/direitocivil.png",
      description:
        "Atendimento em causas cíveis, indenizações, contratos e disputas patrimoniais. Cada caso tratado de forma técnica e personalizada.",
    },
    {
      id: "empresarial",
      title: "Empresarial",
      image: "/img/direitoempresarial.png",
      description:
        "Assessoria jurídica para empresas, incluindo prevenção de riscos, compliance, contratos e litígios estratégicos.",
    },
  ];

  const [activeId, setActiveId] = useState<string>(areas[0].id);
  const active = areas.find((a) => a.id === activeId) ?? areas[0];

  return (
    <section
      id="atuacao"
      className="relative w-full bg-brand-white text-blue py-10 px-4 sm:px-6 lg:px-8"
      aria-label="Áreas de Atuação"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-6 text-center font-serif text-3xl font-bold text-blue sm:text-4xl">
          Áreas de Atuação
        </h2>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {areas.map((tab) => {
            const isActive = tab.id === activeId;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveId(tab.id)}
                className={[
                  "rounded-full px-5 py-2 text-sm font-semibold transition-all",
                  isActive
                    ? "bg-sand text-white shadow-[0_6px_20px_-8px_rgba(185,162,119,.7)]"
                    : "bg-blue/5 text-blue hover:bg-sand/20",
                ].join(" ")}
                aria-pressed={isActive}
              >
                {tab.title}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-8 min-h-[320px] sm:min-h-[360px] md:min-h-[380px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id + "-img"}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="relative mx-auto md:mx-0 md:justify-self-end"
            >
              <div className="relative w-[70vw] max-w-[320px] sm:max-w-[360px] md:max-w-[400px] lg:max-w-[420px]">
                <Image
                  src={active.image}
                  alt={active.title}
                  width={900}
                  height={600}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id + "-text"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
              className="text-center md:text-left md:pl-2"
            >
              <h3 className="font-serif text-2xl font-bold mb-2">
                {active.title}
              </h3>
              <p className="text-base text-blue/80 leading-relaxed max-w-md mx-auto md:mx-0">
                {active.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
