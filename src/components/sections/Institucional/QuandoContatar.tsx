// src/components/sections/QuandoContatar.tsx
"use client";

import Image from "next/image";

type NodeItem = {
  id: string;
  title: string;
  description: string;
  image: string;
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
    description: "",
    image: "/img/logo5.png",
    children: [
      {
        id: "familia-sub",
        title: "",
        description: "Divórcio, guarda de filhos e pensão alimentícia.",
        image: "/img/logo6.png",
      },
    ],
  },
  {
    id: "tema2",
    title: "Questões Patrimoniais e Contratuais",
    description: "",
    image: "/img/logo2.png",
    children: [
      {
        id: "contratos",
        title: "",
        description:
          "Contratos de compra e venda, locação, prestação de serviços, dívidas.",
        image: "/img/logo3.png",
      },
      {
        id: "propriedade-posse",
        title: "",
        description:
          "Propriedade e Posse (usucapião, vizinhança, desapropriação, partilha de bens).",
        image: "/img/logo4.png",
      },
    ],
  },
  {
    id: "tema3",
    title: "Responsabilidade Civil",
    description: "",
    image: "/img/logo7.png",
    children: [
      {
        id: "indenizacao",
        title: "",
        description:
          "Acidentes, ofensas, prejuízos em relações civis (danos materiais e morais).",
        image: "/img/logo8.png",
      },
    ],
  },
];

export default function QuandoContatar({
  sectionId = "quando-contatar",
  heading = "Quando contatar um advogado?",
  subheading,
  parents = defaultData,
}: Props) {
  return (
    <section
      id={sectionId}
      className="relative w-full bg-brand-white text-blue"
      aria-label={heading}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-10 sm:py-12 md:py-14 lg:py-18">
        {/* Título */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h2 className="font-serif text-[clamp(1.7rem,5vw,2.6rem)] font-bold">
            {heading}
          </h2>
          {subheading ? (
            <p className="mt-2 text-blue/80">{subheading}</p>
          ) : null}
        </div>

        {/* ===== MOBILE/TABLET (lg:hidden): tema + conectores + subtemas ===== */}
        <div className="lg:hidden space-y-10 sm:space-y-12">
          {parents.map((p) => (
            <article key={p.id} className="text-center">
              <ParentNode item={p} />
              {/* conector vertical + losango (mobile/tablet) */}
              {p.children?.length ? (
                <>
                  <div
                    aria-hidden
                    className="mx-auto mt-2 h-6 sm:h-7 w-px bg-sand"
                  />
                  <div
                    aria-hidden
                    className="mx-auto my-2 w-3 h-3 rotate-45 bg-sand"
                  />
                </>
              ) : null}

              <div
                className={`mt-2 grid justify-items-center gap-6 ${
                  (p.children?.length || 0) > 1
                    ? "grid-cols-1 sm:grid-cols-2"
                    : "grid-cols-1"
                }`}
              >
                {p.children?.map((c) => (
                  <ChildNode key={c.id} item={c} />
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* ===== DESKTOP (lg+): árvore em duas linhas alinhadas por colunas ===== */}
        <div className="hidden lg:block">
          {/* Linha superior: Temas */}
          <div className="grid grid-cols-3 gap-10">
            {parents.map((p) => (
              <div key={p.id} className="relative flex flex-col items-center">
                <ParentNode item={p} />
                {p.children?.length ? (
                  <div aria-hidden className="relative h-8 w-px bg-sand mt-4" />
                ) : null}
              </div>
            ))}
          </div>

          {/* Linha inferior: Subtemas alinhados */}
          <div className="mt-10 grid grid-cols-3 gap-10">
            {parents.map((p) => (
              <div key={`${p.id}-children`} className="relative pt-4">
                {p.children?.length ? (
                  <div
                    aria-hidden
                    className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-sand"
                  />
                ) : null}
                <div
                  className={`grid justify-items-center gap-6 ${
                    (p.children?.length || 0) > 1 ? "grid-cols-2" : "grid-cols-1"
                  }`}
                >
                  {p.children?.map((c) => (
                    <ChildNode key={c.id} item={c} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* ===== /DESKTOP ===== */}
      </div>
    </section>
  );
}

/* ====== Nós (UI) ====== */

function ParentNode({ item }: { item: NodeItem }) {
  return (
    <article className="w-full max-w-[520px] mx-auto text-center">
      {/* ícone do tema: 64px (xs), 80px (sm+), 96px (lg+) */}
      <div className="relative mx-auto mb-4 sm:mb-5 h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 rounded-full overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(min-width:1024px) 96px, (min-width:640px) 80px, 64px"
          className="object-cover"
        />
      </div>
      <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold leading-tight">
        {item.title}
      </h3>
    </article>
  );
}

function ChildNode({ item }: { item: NodeItem }) {
  return (
    <article className="w-full max-w-[380px] sm:max-w-[340px] text-center">
      {/* conector acima do subtema (apenas mobile/tablet) */}
      <div aria-hidden className="block lg:hidden mx-auto mb-2 h-5 w-px bg-sand" />
      {/* ícone do subtema: 64px (xs), 80px (lg) */}
      <div className="relative mx-auto mb-2.5 sm:mb-3 h-16 w-16 lg:h-20 lg:w-20 rounded-full overflow-hidden">
        <Image
          src={item.image}
          alt="" // decorativo
          fill
          sizes="(min-width:1024px) 80px, 64px"
          className="object-cover"
        />
      </div>
      <p
        className="mx-auto text-[15px] sm:text-[15.5px] md:text-base leading-[1.6] text-blue/80 text-center text-balance max-w-[26ch] sm:max-w-[28ch] md:max-w-[30ch]"
        style={{ textWrap: "pretty", hyphens: "auto" as any }}
      >
        {item.description}
      </p>
    </article>
  );
}
