// src/components/sections/Contato.tsx
"use client";

import { useMemo, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FaScaleBalanced } from "react-icons/fa6";

export default function Contato() {
  const [nome, setNome] = useState("");
  const [celular, setCelular] = useState("");
  const [erroCel, setErroCel] = useState<string | null>(null);
  const [abrindo, setAbrindo] = useState(false);

  // telefone base do escritório (DDD+numero, sem + nem espaços)
  const whatsappBase = useMemo(() => "5599999999999", []);

  function limparSomenteDigitos(v: string) {
    return v.replace(/\D/g, "");
  }

  // máscara simples BR (ex.: (11) 98765-4321)
  function formatarCelularBR(v: string) {
    const d = limparSomenteDigitos(v).slice(0, 11);
    if (d.length <= 2) return d;
    if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length <= 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
    return d;
  }

  function validarCelularBR(v: string) {
    const d = limparSomenteDigitos(v);
    return d.length === 10 || d.length === 11;
  }

  function onChangeCelular(v: string) {
    const f = formatarCelularBR(v);
    setCelular(f);
    if (f.trim() === "") {
      setErroCel(null);
      return;
    }
    setErroCel(validarCelularBR(f) ? null : "Digite um celular válido (ex.: (11) 98888-7777).");
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validarCelularBR(celular)) {
      setErroCel("Digite um celular válido (ex.: (11) 98888-7777).");
      return;
    }
    setAbrindo(true);
    const msg = encodeURIComponent(
      `Oi, sou ${nome.trim() || "—"}. Meu celular é ${celular}. Gostaria de falar com um advogado agora.`
    );
    window.open(`https://wa.me/${whatsappBase}?text=${msg}`, "_blank");
    setTimeout(() => setAbrindo(false), 1200);
  }

  return (
    <section
      id="contato"
      className="relative w-full bg-blue text-brand-white"
      aria-label="Call to Action Final"
    >
      {/* vinheta leve para profundidade sem alterar o azul */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(900px 320px at 50% 0%, rgba(255,255,255,0.05), transparent 60%), radial-gradient(700px 260px at 50% 100%, rgba(0,0,0,0.25), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-24">
        {/* MOBILE-FIRST: card compacto no mobile, amplo no desktop */}
        <div
          className="
            mx-auto w-full max-w-md sm:max-w-lg md:max-w-2xl
            rounded-2xl md:rounded-3xl
            border border-white/15
            bg-white/10 backdrop-blur-md
            p-5 sm:p-8 md:p-10
            shadow-[0_14px_40px_rgba(0,0,0,0.35)]
          "
        >
          {/* marca d'água: some no mobile para não poluir */}
          <div className="pointer-events-none absolute inset-0 hidden sm:block">
            <FaScaleBalanced
              aria-hidden="true"
              className="absolute -right-6 -bottom-6 h-36 w-36 md:h-40 md:w-40 text-white/5"
            />
          </div>

          {/* título mais compacto e legível no mobile */}
          <h2
            className="
              mx-auto max-w-[22ch] sm:max-w-[26ch]
              text-center font-serif
              text-[22px] leading-[1.2]
              sm:text-[28px] sm:leading-tight
              md:text-[40px]
              font-bold tracking-tight
            "
          >
            Sua liberdade não pode esperar.
            <span className="block">Fale agora com um advogado especializado.</span>
          </h2>

          {/* divisor curto em 'sand' */}
          <div className="mx-auto mt-4 sm:mt-5 h-[3px] w-12 sm:w-16 rounded-full bg-sand/70" aria-hidden="true" />

          {/* FORM: inputs com 16px+ para evitar zoom no iOS */}
          <form
            onSubmit={handleSubmit}
            className="mt-6 sm:mt-8 grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2"
          >
            <div className="md:col-span-1">
              <label
                htmlFor="nome"
                className="mb-1 block text-[13px] sm:text-sm font-medium text-brand-white/90"
              >
                Nome
              </label>
              <input
                id="nome"
                name="nome"
                type="text"
                autoComplete="name"
                placeholder="Seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                className="
                  w-full rounded-xl
                  border border-white/20
                  bg-white/95 text-blue placeholder-blue/60
                  px-4 py-3 sm:py-3.5
                  text-[16px] sm:text-sm
                  shadow-inner
                  focus:outline-none focus:ring-2 focus:ring-sand/80
                "
              />
            </div>

            <div className="md:col-span-1">
              <label
                htmlFor="celular"
                className="mb-1 block text-[13px] sm:text-sm font-medium text-brand-white/90"
              >
                Celular
              </label>
              <input
                id="celular"
                name="celular"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="(11) 98888-7777"
                value={celular}
                onChange={(e) => onChangeCelular(e.target.value)}
                required
                aria-invalid={!!erroCel}
                aria-describedby={erroCel ? "celular-erro" : undefined}
                className="
                  w-full rounded-xl
                  border border-white/20
                  bg-white/95 text-blue placeholder-blue/60
                  px-4 py-3 sm:py-3.5
                  text-[16px] sm:text-sm
                  shadow-inner
                  focus:outline-none focus:ring-2 focus:ring-sand/80
                "
              />
              {erroCel && (
                <p id="celular-erro" className="mt-1 text-xs text-red-200">
                  {erroCel}
                </p>
              )}
            </div>

            <div className="md:col-span-2 pt-1">
              <button
                type="submit"
                disabled={abrindo}
                className="
                  group inline-flex w-full items-center justify-center gap-2
                  rounded-xl
                  bg-green-600
                  px-6 py-3.5
                  text-[16px] sm:text-base font-extrabold text-white
                  shadow-lg transition
                  hover:bg-green-700 hover:shadow-xl
                  active:translate-y-[1px]
                  focus:outline-none focus:ring-2 focus:ring-sand/80
                  disabled:opacity-70
                "
              >
                <FaWhatsapp aria-hidden="true" className="h-5 w-5" />
                {abrindo ? "Abrindo WhatsApp…" : "Falar com Advogado Agora"}
              </button>

              <p className="mt-3 text-center text-[12px] text-brand-white/70">
                resposta mais rápida ⚡ no WhatsApp
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
