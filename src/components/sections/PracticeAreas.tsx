"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  {
    id: "criminal",
    title: "Criminal",
    image: "/img/criminal.jpg",
    description:
      "Atuação completa em defesa criminal, com acompanhamento em inquéritos, audiências e tribunais. Foco em estratégias eficazes e defesa humanizada.",
  },
  {
    id: "civil",
    title: "Civil",
    image: "/img/civil.jpg",
    description:
      "Atendimento em causas cíveis, indenizações, contratos e disputas patrimoniais. Cada caso tratado de forma técnica e personalizada.",
  },
  {
    id: "empresarial",
    title: "Empresarial",
    image: "/img/empresarial.jpg",
    description:
      "Assessoria jurídica para empresas, incluindo prevenção de riscos, compliance, contratos e litígios estratégicos.",
  },
];

export default function AreasDeAtuacao() {
  const [activeTab, setActiveTab] = useState("criminal");

  const activeContent = tabs.find((t) => t.id === activeTab)!;

  return (
    <section
      id="atuacao"
      className="relative w-full bg-brand-white text-blue py-14 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 text-center font-serif text-3xl font-bold text-blue sm:text-4xl">
          Áreas de Atuação
        </h2>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                activeTab === tab.id
                  ? "bg-sand text-white"
                  : "bg-blue/10 text-blue hover:bg-sand/20"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeContent.id + "-img"}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="relative mx-auto h-[220px] w-full max-w-[360px] sm:h-[280px] sm:max-w-[420px] rounded-xl overflow-hidden shadow-lg"
            >
              <Image
                src={activeContent.image}
                alt={activeContent.title}
                fill
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeContent.id + "-text"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="text-center md:text-left"
            >
              <h3 className="font-serif text-2xl font-bold mb-3">
                {activeContent.title}
              </h3>
              <p className="text-base text-blue/80 leading-relaxed max-w-md mx-auto md:mx-0">
                {activeContent.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
