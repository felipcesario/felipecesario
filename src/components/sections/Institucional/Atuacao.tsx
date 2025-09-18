"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type Tema = {
  id: string;
  title: string;
  image: string;
  description: string;
};

type Area = {
  id: "civil" | "familiar";
  title: string;
  image: string;
  description: string;
  temas: Tema[];
};

export default function Atuacao() {
  const areas: Area[] = [
    {
      id: "civil",
      title: "Civil",
      image: "/img/direitocivil.png",
      description:
        "Atuação técnica e personalizada em demandas cíveis: contratos, responsabilidade civil e disputas patrimoniais — com foco em solução eficiente e segura.",
      temas: [
        {
          id: "contratos",
          title: "Revisão e Elaboração de Contratos",
          image: "/img/atuacao.png",
          description:
            "Análise de cláusulas, mitigação de riscos e redação sob medida para proteger seus interesses.",
        },
        {
          id: "reparacao",
          title: "Reparação de Danos",
          image: "/img/reparacao.png",
          description:
            "Ações de indenização por danos materiais e morais, com estratégia probatória clara.",
        },
        {
          id: "servico3",
          title: "Serviço 3",
          image: "/img/atuacao/civil-servico3.png",
          description:
            "Outro serviço civil relevante (personalizável) alinhado ao seu caso concreto.",
        },
      ],
    },
    {
      id: "familiar",
      title: "Familiar",
      image: "/img/direitofamiliar.png",
      description:
        "Apoio humano e estratégico em questões familiares: sucessões, partilhas e organização patrimonial com máxima sensibilidade e segurança jurídica.",
      temas: [
        {
          id: "inventario",
          title: "Inventário",
          image: "/img/inventario.png",
          description:
            "Condução de inventário judicial ou extrajudicial, com celeridade e regularidade fiscal.",
        },
        {
          id: "sucessao",
          title: "Sucessão / Partilha de Bens",
          image: "/img/sucessao.png",
          description:
            "Planejamento sucessório e partilha equilibrada, prevenindo conflitos entre herdeiros.",
        },
        {
          id: "servico3",
          title: "Serviço 3",
          image: "/img/atuacao/fam-servico3.png",
          description:
            "Outro serviço de família (personalizável) para necessidades específicas do seu caso.",
        },
      ],
    },
  ];

  const [activeId, setActiveId] = useState<Area["id"]>(areas[0].id);
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

        {/* Tabs */}
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

        {/* Hero (imagem + texto) */}
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id + "-img"}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="relative mx-auto md:mx-0 md:justify-self-end"
            >
              {/* imagens um pouco menores no md para sobrar espaço visual */}
              <div className="relative w-[78vw] max-w-[320px] sm:max-w-[380px] md:max-w-[360px] lg:max-w-[420px]">
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
              <h3 className="font-serif text-2xl md:text-xl lg:text-2xl font-bold mb-2">
                {active.title}
              </h3>
              <p className="text-base md:text-sm lg:text-base text-blue/80 leading-relaxed max-w-md mx-auto md:mx-0">
                {active.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Temas do tab ativo (cards responsivos) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id + "-temas"}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25 }}
            // 1 coluna no mobile; 3 colunas no md (lado a lado); mantém 3 no lg
            className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4"
          >
            {active.temas.map((t) => (
              <article
                key={t.id}
                className="group rounded-xl border border-blue/10 bg-white/60 backdrop-blur-sm p-4 md:p-3 hover:shadow-lg transition-shadow"
              >
                {/* altura controlada por breakpoint p/ caber confortavelmente no md */}
                <div className="relative w-full aspect-[4/3] md:aspect-[3/2] overflow-hidden rounded-lg mb-4 md:mb-3">
                  <Image
                    src={t.image}
                    alt={t.title}
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 33vw, 33vw"
                    className="object-cover group-hover:scale-[1.02] transition-transform"
                    priority={false}
                  />
                </div>
                <h4 className="font-serif text-lg md:text-base font-bold mb-1 text-blue line-clamp-2">
                  {t.title}
                </h4>
                <p className="text-sm md:text-[13px] text-blue/80 leading-relaxed line-clamp-3">
                  {t.description}
                </p>
              </article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
