// src/components/sections/Depoimentos.tsx
"use client";

type Props = {
  idSecao?: string;
  casosSucesso?: number;
  anosExperiencia?: number;
  reconhecimentoTexto?: string;
  titulo?: string;
};

const cardBase =
  "rounded-2xl border border-blue/10 bg-white p-5 sm:p-6 shadow-sm md:shadow-[0_10px_28px_-12px_rgba(0,0,0,.15)]";

export default function Depoimentos({
  idSecao = "confianca",
  titulo = "Confiança comprovada na defesa dos nossos clientes",
  casosSucesso = 120,
  anosExperiencia = 5,
  reconhecimentoTexto = "Advogado atuante e respeitado em tribunais e processos de grande relevância.",
}: Props) {
  const titleId = `${idSecao}-title`;

  return (
    <section
      id={idSecao}
      className="relative w-full bg-brand-white text-blue py-16 sm:py-20 px-4 sm:px-6 lg:px-8"
      aria-labelledby={titleId}
    >
      <div className="mx-auto max-w-7xl">
        {/* Título */}
        <h2
          id={titleId}
          className="text-center font-serif text-3xl sm:text-4xl font-bold leading-tight"
          style={{ textWrap: "balance" as any }}
        >
          {titulo}
        </h2>
        <div
          aria-hidden="true"
          className="mx-auto mt-4 h-1 w-20 sm:w-24 rounded-full bg-sand"
        />

        {/* Métricas */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Casos de sucesso */}
          <article className={cardBase}>
            <div className="flex items-start gap-3 sm:gap-4">
              <svg
                className="h-6 w-6 sm:h-7 sm:w-7 text-sand shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M7 11h10v2H7zM5 7h14v2H5zM9 15h6v2H9z" />
              </svg>
              <div>
                <div className="text-3xl sm:text-4xl font-bold leading-none tracking-tight tabular-nums">
                  +{casosSucesso}
                </div>
                <h3 className="mt-1 text-sm font-semibold text-blue">
                  Casos de Sucesso
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-blue/80">
                  Vitórias que representam histórias transformadas.
                </p>
              </div>
            </div>
          </article>

          {/* Anos de experiência */}
          <article className={cardBase}>
            <div className="flex items-start gap-3 sm:gap-4">
              <svg
                className="h-6 w-6 sm:h-7 sm:w-7 text-sand shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 7a5 5 0 100 10 5 5 0 000-10zm1-5h-2v3h2V2zm0 17h-2v3h2v-3zM2 11H5v2H2v-2zm17 0h3v2h-3v-2z" />
              </svg>
              <div>
                <div className="text-3xl sm:text-4xl font-bold leading-none tracking-tight tabular-nums">
                  +{anosExperiencia}
                </div>
                <h3 className="mt-1 text-sm font-semibold text-blue">
                  Anos de Experiência
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-blue/80">
                  Defendendo clientes em situações de urgência em todo o Brasil.
                </p>
              </div>
            </div>
          </article>

          {/* Reconhecimento */}
          <article className={cardBase}>
            <div className="flex items-start gap-3 sm:gap-4">
              <svg
                className="h-6 w-6 sm:h-7 sm:w-7 text-sand shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2l2.39 4.84L20 8l-4 3.9.94 5.48L12 15.77 7.06 17.38 8 11.9 4 8l5.61-1.16L12 2z" />
              </svg>
              <div>
                <div className="text-2xl sm:text-3xl font-bold leading-none tracking-tight">
                  Reconhecimento
                </div>
                <h3 className="mt-1 text-sm font-semibold text-blue">
                  Atuação respeitada
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-blue/80">
                  {reconhecimentoTexto}
                </p>
              </div>
            </div>
          </article>
        </div>

        {/* Depoimentos */}
        <div className="mt-12 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* João M. */}
          <article className={cardBase}>
            <div className="flex h-full flex-col md:flex-row md:items-start md:gap-4">
              <div className="shrink-0">
                <svg
                  className="h-7 w-7 sm:h-8 sm:w-8 text-sand"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M7 7h6v6H7zM13 7h6v6h-6zM7 13h6v6H7z" />
                </svg>
              </div>
              <blockquote className="mt-3 md:mt-0">
                <p className="italic text-blue/90 leading-relaxed">
                  “Fui atendido em plena madrugada e tive meu problema resolvido
                  rapidamente. Excelente profissional.”
                </p>
                <footer className="mt-4 font-semibold text-sand">João M.</footer>
              </blockquote>
            </div>
          </article>

          {/* Maria A. */}
          <article className={cardBase}>
            <div className="flex h-full flex-col md:flex-row md:items-start md:gap-4">
              <div className="shrink-0">
                <svg
                  className="h-7 w-7 sm:h-8 sm:w-8 text-sand"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M4 5h16v2H4zM4 11h10v2H4zM4 17h13v2H4z" />
                </svg>
              </div>
              <blockquote className="mt-3 md:mt-0">
                <p className="italic text-blue/90 leading-relaxed">
                  “Explicou cada detalhe do processo com clareza e me transmitiu
                  segurança do início ao fim.”
                </p>
                <footer className="mt-4 font-semibold text-sand">Maria A.</footer>
              </blockquote>
            </div>
          </article>

          {/* Pedro R. */}
          <article className={cardBase}>
            <div className="flex h-full flex-col md:flex-row md:items-start md:gap-4">
              <div className="shrink-0">
                <svg
                  className="h-7 w-7 sm:h-8 sm:w-8 text-sand"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M5 12l5 5L20 7l-1.41-1.41L10 14.17 6.41 10.6 5 12z" />
                </svg>
              </div>
              <blockquote className="mt-3 md:mt-0">
                <p className="italic text-blue/90 leading-relaxed">
                  “Graças à atuação firme e dedicada, consegui reverter uma
                  prisão injusta. Recomendo de olhos fechados.”
                </p>
                <footer className="mt-4 font-semibold text-sand">Pedro R.</footer>
              </blockquote>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
