"use client";

import Image from "next/image";

type Props = {
  name: string;
  photoUrl: string;
  cityTag?: string;
};

export default function Intro({
  name,
  photoUrl,
  cityTag,
}: Props) {
  return (
    <section
      id="inicio"
      className="relative w-full bg-blue text-brand-white overflow-hidden"
      aria-label="Seção de apresentação"
    >
      <div className="mx-auto grid max-w-7xl min-h-[88svh] grid-cols-1 md:grid-cols-2 gap-10 px-4 py-14 sm:px-6 md:py-20">
        
        <div className="flex flex-col justify-center md:pl-6 lg:pl-10">
          

          <h1 className="font-serif text-[clamp(1.6rem,4.5vw,2.4rem)] leading-snug font-bold text-white">
            Preso em flagrante? Precisa de um advogado AGORA?
          </h1>

          <p className="mt-2 max-w-md text-sm/relaxed text-brand-white/90 sm:text-base/relaxed">
            Atendimento criminal 24h para prisões em flagrante, audiências de custódia e casos urgentes.
          </p>

          <div className="mt-5 w-full max-w-md rounded-lg bg-black/30 backdrop-blur-md border border-white/10 shadow-lg p-6">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <input
                type="text"
                placeholder="Seu nome"
                className="w-full rounded-md border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
              <input
                type="tel"
                placeholder="Seu celular"
                className="w-full rounded-md border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
              <button
                type="submit"
                className="w-full rounded-md bg-red-600 px-5 py-3 font-bold text-white transition-transform hover:scale-[1.02] hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              >
                Quero ajuda agora
              </button>
            </form>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div className="relative mx-auto aspect-square w-[78vw] max-w-[400px] sm:max-w-[420px] md:max-w-[460px]">
            <div className="absolute -inset-3 -z-10 rounded-2xl bg-white/5 backdrop-blur-md ring-1 ring-white/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]" />
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
