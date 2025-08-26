"use client";

import Link from "next/link";
import { FaWhatsapp, FaInstagram, FaEnvelope, FaLocationDot } from "react-icons/fa6";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-blue text-brand-white">
      {/* filete superior */}
      <div className="pointer-events-none h-1 w-full bg-gradient-to-r from-sand/0 via-sand/40 to-sand/0 opacity-70" />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-serif text-2xl font-bold">Felipe Cesario</h3>
            <p className="mt-3 max-w-md text-sm text-brand-white/85">
              Defesa criminal estratégica e humanizada, com comunicação clara e atuação técnica,
              priorizando cada etapa do seu caso.
            </p>

            <div className="mt-6 flex items-center gap-3 text-sm text-brand-white/85">
              <FaLocationDot className="opacity-80" />
              <span>Curitiba • PR — Atendimentos presenciais e online</span>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <Link
                href="https://wa.me/5599999999999"
                target="_blank"
                aria-label="WhatsApp"
                className="inline-flex items-center gap-2 rounded-lg bg-sand px-4 py-2 font-semibold text-blue hover:opacity-95"
              >
                <FaWhatsapp />
                WhatsApp
              </Link>
              <Link
                href="mailto:contato@felipacesario.adv.br"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/0 px-4 py-2 font-medium text-brand-white hover:bg-white/5"
                aria-label="Enviar e-mail"
              >
                <FaEnvelope />
                E-mail
              </Link>
              <Link
                href="#"
                aria-label="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 hover:bg-white/5"
              >
                <FaInstagram />
              </Link>
            </div>
          </div>

          <nav aria-label="Rodapé — navegação" className="grid gap-3 text-sm">
            <h4 className="mb-2 font-serif text-lg font-bold">Navegação</h4>
            <Link href="#inicio" className="text-brand-white/85 hover:text-brand-white">
              Início
            </Link>
            <Link href="#atuacao" className="text-brand-white/85 hover:text-brand-white">
              Áreas de atuação
            </Link>
            <Link href="#sobre" className="text-brand-white/85 hover:text-brand-white">
              Sobre
            </Link>
            <Link href="#depoimentos" className="text-brand-white/85 hover:text-brand-white">
              Depoimentos
            </Link>
            <Link href="#contato" className="text-brand-white/85 hover:text-brand-white">
              Contato
            </Link>
          </nav>

          <div className="grid gap-3 text-sm">
            <h4 className="mb-2 font-serif text-lg font-bold">Contato</h4>
            <p className="text-brand-white/85">contato@felipacesario.adv.br</p>
            <p className="text-brand-white/85">+55 (99) 99999-9999</p>
            <p className="text-brand-white/70 text-xs">
              Atendimento com hora marcada.
            </p>
          </div>
        </div>

        <div className="mt-12 h-px w-full bg-white/10" />

        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs sm:flex-row">
          <p className="text-brand-white/70">
            © {year} Felipe Cesario. Todos os direitos reservados.
          </p>
          <p className="text-brand-white/70">
            desenvolvido por:{" "}
            <Link
              href="https://leandrofaria.vercel.app/"
              target="_blank"
              className="font-semibold text-sand hover:underline underline-offset-4"
            >
              LFG Tech
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
