"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

export default function Apresentacao() {
  const name = "Felipe Cesario";
  const headline = "Defesa Criminal estratégica e humanizada";
  const subheadline =
    "Prestação de serviço de advocacia responsável e eficiente.";
  const photoUrl = "/img/felipe2.jpg";
  const whatsapp = "5599999999999"; 
  const ctaLabel = "Entrar em Contato";
  const secondaryCtaHref = "#atuacao";
  const secondaryCtaLabel = "Áreas de atuação";
  const cityTag = "Atendimento em Curitiba";

  const waHref = useMemo(() => {
    if (!whatsapp) return undefined;
    const base = whatsapp.startsWith("+")
      ? whatsapp.replace(/\D/g, "")
      : `55${whatsapp.replace(/\D/g, "")}`;
    const msg = encodeURIComponent(`Oi, sou ${name.split(" ")[0]}. Quero uma consulta.`);
    return `https://wa.me/${base}?text=${msg}`;
  }, []);

  return (
    <section
      id="inicio"
      className="relative w-full bg-blue text-brand-white overflow-hidden"
      aria-label="Seção de apresentação"
    >
      <div className="pointer-events-none absolute inset-x-0 -top-1 h-1 bg-gradient-to-r from-sand/0 via-sand/40 to-sand/0 opacity-70" />

      {/* correção: h-[120vh] */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-15%] top-0 hidden h-[120vh] w-[60vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(205,176,112,0.20),rgba(205,176,112,0)_60%)] md:block"
      />

      <div className="mx-auto grid max-w-7xl min-h-[88svh] grid-cols-1 items-center gap-8 px-4 py-14 sm:px-6 md:min-h-[88vh] md:grid-cols-2 md:gap-8 lg:gap-10 md:py-20">
        {/* coluna de texto */}
        <div className="order-1 md:order-1 md:pl-6 lg:pl-10">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] sm:text-xs tracking-wide">
            <span className="inline-block h-2 w-2 rounded-full bg-sand" />
            {cityTag ?? "Consultas presenciais e online"}
          </p>

          <h1 className="font-serif text-[clamp(2rem,6vw,3.5rem)] leading-[1.1]">
            {headline}
          </h1>

          <p className="mt-4 max-w-xl text-sm/relaxed text-brand-white/90 sm:text-base/relaxed">
            {subheadline}
          </p>

          <div className="mt-8 flex w-full flex-wrap items-center gap-3">
            {waHref && (
              <Link
                href={waHref}
                target="_blank"
                aria-label={`${ctaLabel} pelo WhatsApp`}
                className="group w-full rounded-lg bg-sand px-5 py-3 text-center font-bold text-blue transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/60 sm:w-auto"
              >
                {ctaLabel}
              </Link>
            )}

            <Link
              href={secondaryCtaHref}
              className="w-full rounded-lg border border-white/15 bg-white/0 px-5 py-3 text-center font-medium text-brand-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/60 sm:w-auto"
            >
              {secondaryCtaLabel}
            </Link>
          </div>
        </div>

        {/* coluna da foto */}
        <div className="order-2 md:order-2">
          <div className="relative mx-auto aspect-square w-[78vw] max-w-[360px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[460px]">
            <div className="absolute -inset-3 -z-10 rounded-2xl bg-white/5 backdrop-blur-md ring-1 ring-white/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]" />
            <div className="absolute -inset-[2px] -z-10 rounded-[18px] ring-1 ring-white/10" />
            <Image
              src={photoUrl}
              alt={`Foto de ${name}`}
              fill
              sizes="(min-width: 1024px) 460px, (min-width: 768px) 420px, (min-width: 640px) 380px, 78vw"
              className="rounded-xl object-cover ring-1 ring-white/10"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
