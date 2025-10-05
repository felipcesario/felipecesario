// src/components/sections/Institucional/QuandoContatar.tsx
"use client";

import {
  FaScaleBalanced,
  FaGavel,
  FaFileContract,
  FaHouseChimney,
  FaShieldHalved,
  FaUsers,
  FaHandshake,
  FaFileSignature,
} from "react-icons/fa6";

type NodeItem = {
  id: string;
  title: string;
  description: string;
  image?: string; // compat
};

type Parent = NodeItem & { children?: NodeItem[] };

type Props = {
  sectionId?: string;
  heading?: string;
  subheading?: string;
  parents?: Parent[];
};

const defaultData: Parent[] = [
  {
    id: "tema1",
    title: "Conflitos de Família",
    description: "Atuação preventiva e orientação antes de litígios.",
    children: [
      {
        id: "familia-sub",
        title: "Consultoria & Acordos",
        description: "Divórcio, guarda de filhos e pensão alimentícia.",
      },
    ],
  },
  {
    id: "tema2",
    title: "Questões Patrimoniais e Contratuais",
    description: "Atuação em contratos e obrigações.",
    children: [
      {
        id: "contratos",
        title: "Contratos & Dívidas",
        description:
          "Compra e venda, locação, prestação de serviços e cobranças.",
      },
      {
        id: "propriedade-posse",
        title: "Propriedade & Posse",
        description:
          "Usucapião, vizinhança, desapropriação e partilha de bens.",
      },
    ],
  },
  {
    id: "tema3",
    title: "Responsabilidade Civil",
    description: "Indenizações por danos materiais e morais.",
    children: [
      {
        id: "indenizacao",
        title: "Danos & Reparações",
        description:
          "Acidentes, ofensas e prejuízos nas relações civis (danos materiais e morais).",
      },
    ],
  },
];

/** Lineariza: pai -> filhos -> próximo pai */
function toSequence(parents: Parent[]): NodeItem[] {
  const seq: NodeItem[] = [];
  parents.forEach((p) => {
    seq.push({ id: p.id, title: p.title, description: p.description ?? "" });
    (p.children ?? []).forEach((c) =>
      seq.push({
        id: c.id,
        title: c.title ?? "",
        description: c.description,
      })
    );
  });
  return seq;
}

/** Ícones únicos por tema (sem repetição) */
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  // pais
  "conflitos de família": FaUsers,
  "questões patrimoniais e contratuais": FaScaleBalanced,
  "responsabilidade civil": FaShieldHalved,
  // filhos
  "consultoria & acordos": FaHandshake,
  "contratos & dívidas": FaFileContract,
  "propriedade & posse": FaHouseChimney,
  "danos & reparações": FaGavel,
};

function getIconFor(text: string) {
  const key = text.trim().toLowerCase();
  return iconMap[key] || FaFileSignature; // fallback diferente para não repetir
}

export default function QuandoContatar({
  sectionId = "quando-contatar",
  heading = "Quando contatar um advogado?",
  subheading,
  parents = defaultData,
}: Props) {
  const items = toSequence(parents);

  return (
    <section
      id={sectionId}
      className="relative w-full bg-brand-white text-blue"
      aria-label={heading}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-1 h-1 bg-gradient-to-r from-sand/0 via-sand/40 to-sand/0 opacity-80"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-10 sm:py-12 lg:py-14">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="font-serif text-[clamp(1.55rem,4vw,2.1rem)] leading-tight">
            {heading}
          </h2>
          {subheading ? (
            <p className="mt-2 text-blue/80 text-[14.5px]">{subheading}</p>
          ) : null}
        </div>

        <div className="relative">
          {/* linha central */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-sand/70"
          />

          {/* nós */}
          <ul className="relative grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-6 lg:gap-7">
            {items.map((item, idx) => {
              const isTop = idx % 2 === 0;
              const Icon = getIconFor(item.title || item.id);
              return (
                <li key={item.id} className="relative flex flex-col items-center">
                  {/* card topo */}
                  {isTop && (
                    <Card
                      title={item.title}
                      description={item.description}
                      position="top"
                    />
                  )}

                  {/* conector */}
                  {isTop && (
                    <span aria-hidden className="h-4 w-[2px] bg-sand/80 -mb-0.5" />
                  )}

                  {/* círculo fixo; só o ícone muda de tamanho */}
                  <div className="relative grid place-items-center h-16 w-16 sm:h-[66px] sm:w-[66px] lg:h-[70px] lg:w-[70px] rounded-full bg-blue/95 ring-1 ring-white/15 shadow-[0_16px_36px_-16px_rgba(0,0,0,0.45)]">
                    <div className="absolute inset-[3px] rounded-full bg-blue/90 ring-1 ring-white/10" />
                    {/* Ícone FA — **menor** para dar mais respiro */}
                    <Icon className="relative h-[36px] w-[36px] sm:h-[38px] sm:w-[38px] lg:h-[42px] lg:w-[42px] text-brand-white" />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-sand/40"
                    />
                  </div>

                  {/* conector */}
                  {!isTop && (
                    <span aria-hidden className="h-4 w-[2px] bg-sand/80 mt-0.5" />
                  )}

                  {/* card base */}
                  {!isTop && (
                    <Card
                      title={item.title}
                      description={item.description}
                      position="bottom"
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ======================= UI PARTS ======================= */

function Card({
  title,
  description,
  position,
}: {
  title?: string;
  description?: string;
  position: "top" | "bottom";
}) {
  return (
    <div
      className={[
        "w-full max-w-[236px] sm:max-w-[252px] lg:max-w-[272px]",
        "rounded-xl border border-blue/10 bg-white/80 backdrop-blur-[2px]",
        "shadow-[0_18px_50px_-30px_rgba(0,0,0,0.33)]",
        "px-4 py-3 sm:px-5 sm:py-4 text-center",
        position === "top" ? "mb-2 sm:mb-3" : "mt-2 sm:mt-3",
      ].join(" ")}
    >
      {title ? (
        <h3
          className="mx-auto font-serif text-[0.95rem] sm:text-[1rem] leading-[1.22] text-sand text-balance max-w-[16ch]"
          title={title}
        >
          {title}
        </h3>
      ) : null}
      {description ? (
        <p className="mt-1.5 text-[13.5px] sm:text-[13.8px] leading-[1.5] text-blue/80 text-pretty">
          {description}
        </p>
      ) : null}
    </div>
  );
}
