// src/components/sections/Depoimentos.tsx
"use client";

import { useMemo, useState } from "react";

export type Depoimento = {
  nome: string;
  texto: string;
};

type Props = {
  idSecao?: string;
  titulo?: string;
  depoimentos: Depoimento[];
};

export default function Depoimentos({
  idSecao = "depoimentos",
  titulo = "Depoimentos",
  depoimentos,
}: Props) {
  const porPagina = 3;
  const totalPaginas = useMemo(
    () => Math.max(1, Math.ceil(depoimentos.length / porPagina)),
    [depoimentos.length]
  );
  const [pagina, setPagina] = useState(0);

  const inicio = pagina * porPagina;
  const visiveis = depoimentos.slice(inicio, inicio + porPagina);

  const podeVoltar = pagina > 0;
  const podeAvancar = pagina < totalPaginas - 1;

  return (
    <section
      id={idSecao}
      className="relative w-full bg-brand-white text-blue py-20 sm:py-24 px-4 sm:px-6 lg:px-8"
      aria-label={titulo}
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center font-serif text-3xl font-bold mb-12 sm:text-4xl">
          {titulo}
        </h2>

        <div className="relative">
          <button
            onClick={() => podeVoltar && setPagina((p) => p - 1)}
            disabled={!podeVoltar}
            aria-label="Anterior"
            className={[
              "hidden md:flex items-center justify-center absolute -left-20 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full",
              "bg-blue text-brand-white shadow-[0_10px_25px_-10px_rgba(0,0,0,.45)] transition",
              "hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed",
            ].join(" ")}
          >
            ‹
          </button>

          <button
            onClick={() => podeAvancar && setPagina((p) => p + 1)}
            disabled={!podeAvancar}
            aria-label="Próximo"
            className={[
              "hidden md:flex items-center justify-center absolute -right-20 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full",
              "bg-blue text-brand-white shadow-[0_10px_25px_-10px_rgba(0,0,0,.45)] transition",
              "hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed",
            ].join(" ")}
          >
            ›
          </button>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {visiveis.map((dep, i) => (
              <article
                key={`${dep.nome}-${i}`}
                className="rounded-2xl border border-blue/10 bg-white p-6 shadow-[0_10px_28px_-12px_rgba(0,0,0,.2)] h-full"
              >
                <div className="flex h-full flex-col">
                  <p className="text-base leading-relaxed text-blue/90 italic">
                    “{dep.texto}”
                  </p>
                  <div className="mt-auto pt-5">
                    <div className="font-semibold text-sand">{dep.nome}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-center gap-2">
            {Array.from({ length: totalPaginas }).map((_, i) => (
              <button
                key={i}
                aria-label={`Ir para página ${i + 1}`}
                onClick={() => setPagina(i)}
                className={[
                  "h-2 rounded-full transition-all",
                  i === pagina ? "bg-sand w-8" : "bg-blue/20 w-2",
                ].join(" ")}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
