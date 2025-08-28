"use client";

import Image from "next/image";

type Props = {
  name: string;
  photoUrl: string;
  cityTag?: string;
};

export default function Intro({ name, photoUrl, cityTag }: Props) {
  return (
    <section
      id="inicio"
      className="relative w-full bg-blue text-brand-white overflow-hidden"
      aria-label="Seção de apresentação"
    >
      <div className="mx-auto grid max-w-7xl min-h-[88svh] grid-cols-1 md:grid-cols-2 gap-10 px-4 py-10 sm:px-6 sm:py-14 md:py-20">
        {/* Coluna Texto + Form (vem primeiro no mobile) */}
        <div className="order-1 md:order-1 flex flex-col justify-center md:pl-6 lg:pl-10">
          <h1 className="font-serif text-[clamp(1.4rem,5vw,2.4rem)] leading-snug font-bold text-white text-center md:text-left">
            Preso em flagrante? Precisa de um advogado AGORA?
          </h1>

          <p className="mt-3 max-w-lg text-sm/relaxed text-brand-white/90 sm:text-base/relaxed text-center md:text-left">
            Atendimento criminal 24h para prisões em flagrante, audiências de custódia e casos urgentes.
          </p>

          {/* Formulário destacado */}
          <div className="mt-6 w-full max-w-md mx-auto md:mx-0 rounded-lg bg-black/30 backdrop-blur-md border border-white/10 shadow-lg p-6 overflow-hidden">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <input
                type="text"
                placeholder="Seu nome"
                className="w-full rounded-md border border-white/15 bg-white/10 px-4 py-3 sm:py-4 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
              <input
                type="tel"
                placeholder="Seu celular"
                className="w-full rounded-md border border-white/15 bg-white/10 px-4 py-3 sm:py-4 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
              <button
                type="submit"
                className="w-full rounded-md bg-red-600 px-5 py-3 sm:py-4 font-bold text-white transition-transform hover:scale-[1.01] hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              >
                Quero ajuda agora
              </button>
            </form>
          </div>
        </div>

        {/* Coluna da imagem (vem depois no mobile) */}
        <div className="order-2 md:order-2 flex justify-center items-center">
          <div className="relative mx-auto aspect-square w-full max-w-[340px] sm:max-w-[400px] md:max-w-[460px] overflow-hidden">
            {/* glow / moldura */}
            <div className="pointer-events-none absolute -inset-2 sm:-inset-3 -z-10 rounded-2xl bg-white/5 backdrop-blur-md ring-1 ring-white/15 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]" />
            <Image
              src={photoUrl}
              alt={`Foto de ${name}`}
              fill
              sizes="(min-width: 1024px) 460px, (min-width: 640px) 400px, 90vw"
              className="rounded-xl object-cover ring-1 ring-white/10"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
