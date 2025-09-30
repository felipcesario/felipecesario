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
  id: "civil" | "familiar" | "criminal";
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
        "Atuação técnica, personalizada e estratégica em demandas cíveis, sempre com foco em soluções seguras, eficazes e alinhadas aos interesses do cliente. Nosso objetivo é proteger seus direitos, prevenir litígios e buscar a reparação devida, com eficiência e clareza.",
      temas: [
        {
          id: "contratos",
          title: "Revisão e Elaboração de Contratos",
          image: "/img/atuacao.png",
          description:
            "Contratos sob medida, redigidos de forma clara e segura, evitando riscos e protegendo seus interesses em relações pessoais e empresariais.",
        },
        {
          id: "reparacao",
          title: "Indenizações e Reparação de Danos",
          image: "/img/reparacao.png",
          description:
            "Atuação em ações de danos materiais, morais e estéticos, com estratégias jurídicas sólidas para garantir a compensação justa.",
        },
        {
          id: "recuperacao",
          title: "Cobranças e Recuperação de Créditos",
          image: "/img/credito.jpg",
          description:
            "Ações judiciais e extrajudiciais para recuperação de valores, priorizando agilidade e eficácia no retorno financeiro.",
        },
        {
          id: "responsabilidade",
          title: "Responsabilidade Civil e Seguros",
          image: "/img/responsabilidade.jpg",
          description:
            "Defesa em casos de acidentes, contratos de seguro e responsabilidade profissional, buscando indenizações justas e proteção patrimonial.",
        },
      ],
    },
    {
      id: "familiar",
      title: "Familia",
      image: "/img/direitofamiliar.png",
      description:
        "Questões familiares exigem mais do que conhecimento jurídico: pedem sensibilidade, estratégia e segurança. Atuamos para transformar momentos delicados em soluções justas e eficazes, protegendo seu patrimônio, seus vínculos e seus direitos. Nosso compromisso é trazer tranquilidade em situações que, muitas vezes, envolvem grandes decisões e valores relevantes para o futuro da sua família.",
      temas: [
        {
          id: "inventario",
          title: "Inventário e Planejamento Sucessório",
          image: "/img/inventario.png",
          description:
            "Agilidade e segurança na condução de inventários judiciais e extrajudiciais, com atuação estratégica na partilha de bens e elaboração de testamentos. Nosso foco é reduzir custos e evitar conflitos familiares, garantindo proteção patrimonial e tranquilidade em todas as etapas do processo.",
        },
        {
          id: "sucessao",
          title: "Divórcio e Dissolução de União Estável",
          image: "/img/sucessao.png",
          description:
            "Atuação firme em divórcios consensuais ou litigiosos, com foco na divisão justa dos bens, guarda dos filhos e pensão alimentícia. Nosso objetivo é resolver com rapidez, proteção patrimonial e o mínimo de desgaste emocional.",
        },
        {
          id: "guarda",
          title: "Guarda, Convivência e Regulamentação de Visitas",
          image: "/img/guarda.jpg",
          description:
            "Defesa técnica e humanizada para garantir o melhor interesse da criança. Atuamos em pedidos de guarda compartilhada, unilateral e regulamentação de visitas, sempre priorizando estabilidade e proteção familiar.",
        },
        {
          id: "pensao",
          title: "Pensão Alimentícia",
          image: "/img/pensao.jpg",
          description:
            "Fixação, revisão ou exoneração de pensão alimentícia, com argumentos sólidos e visão equilibrada entre necessidade e possibilidade. Buscamos valores justos e sustentáveis para ambas as partes.",
        },
        {
          id: "partilha",
          title: "Partilha de Bens",
          image: "/img/partilha.jpg",
          description:
            "Divisão patrimonial em divórcios, uniões estáveis ou falecimentos. Trabalhamos para que a partilha seja justa, equilibrada e realizada com rapidez, garantindo a preservação e valorização do patrimônio.",
        },
      ],
    },
    {
      id: "criminal",
      title: "Criminal",
      image: "/img/direitocriminal.png",
      description:
        "Defesa técnica em todas as fases do processo penal, desde o inquérito policial até o Tribunal do Júri. Atuação ágil e estratégica para garantir direitos, liberdade e minimizar impactos pessoais e profissionais.",
      temas: [
        {
          id: "flagrante",
          title: "Flagrante e Prisões",
          image: "/img/flagrante.jpg",
          description:
            "Atuação imediata em delegacias e audiências de custódia, buscando liberdade provisória, fiança ou medidas alternativas à prisão.",
        },
        {
          id: "habeascorpus",
          title: "Habeas Corpus",
          image: "/img/hc.jpg",
          description:
            "Medidas urgentes para garantir a liberdade em casos de prisão ilegal ou abuso de autoridade, com fundamentação rápida e precisa.",
        },
        {
          id: "defesa",
          title: "Defesa Criminal",
          image: "/img/defesa.jpg",
          description:
            "Atuação especializada em crimes patrimoniais, contra a vida e outros, com estratégias voltadas à absolvição ou redução de penas.",
        },
        {
          id: "recursos",
          title: "Recursos e Apelações",
          image: "/img/recursos.jpg",
          description:
            "Elaboração e acompanhamento de recursos em instâncias superiores, buscando reverter decisões ou reduzir penalidades.",
        },
        {
          id: "leidrogas",
          title: "Lei de Drogas",
          image: "/img/leidedrogas.jpg",
          description:
            "Casos envolvendo a Lei de Drogas com foco nas garantias individuais.",
        },
        {
          id: "cultivo",
          title: "Cultivo Medicinal",
          image: "/img/cultivo.jpg",
          description:
            "Habeas corpus preventivo para cultivo medicinal regular.",
        },
        {
          id: "associacoes",
          title: "Associações p/ Cultivo",
          image: "/img/associacoes.jpg",
          description:
            "Criação e regularização de associações sem fins lucrativos para pacientes.",
        },
        {
          id: "empresas",
          title: "Empresas & Bancos de Sementes",
          image: "/img/empresas.jpg",
          description:
            "Compliance, contratos e regularização para empresas do setor.",
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
            className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4"
          >
            {active.temas.map((t) => (
              <article
                key={t.id}
                className="group rounded-xl border border-blue/10 bg-white/60 backdrop-blur-sm p-4 md:p-3 hover:shadow-lg transition-shadow"
              >
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
                {/* Aumentei o limite das descrições para evitar corte “na metade” */}
                <p className="text-sm md:text-[13px] text-blue/80 leading-relaxed line-clamp-6 md:line-clamp-7 lg:line-clamp-none">
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
