// src/components/layout/Footer.tsx
"use client";

import Link from "next/link";
import { FaWhatsapp, FaInstagram, FaEnvelope } from "react-icons/fa6";
import { gtmPush } from "@/lib/gtm";

export default function Footer() {
  const year = new Date().getFullYear();

  const whatsappHref = "https://wa.me/5599999999999";
  const telCel = "+55 (48) 99144-7874";
  const email = "contato@felipacesario.adv.br";
  const oab = "OAB/SC 71.088";

  const onClickWhats = (source: string) => {
    gtmPush({
      event: "click_whatsapp",
      source,
      phone: "5548999999999", // alinhe com o número real que será usado no footer
      location: "footer",
    });
  };

  const onClickEmail = (source: string) => {
    gtmPush({
      event: "click_email",
      source,
      email,
      location: "footer",
    });
  };

  return (
    <footer className="relative w-full bg-blue text-brand-white">
      <div className="pointer-events-none h-1 w-full bg-gradient-to-r from-sand/0 via-sand/40 to-sand/0 opacity-70" />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          <section aria-label="Contatos" className="space-y-4 border-white/10 sm:border-0 sm:pb-0 sm:pt-0">
            <h4 className="font-serif text-xl font-bold sm:text-lg">Contatos</h4>

            <ul className="grid gap-3 text-[15px] md:text-sm text-brand-white/85">
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  className="group inline-flex w-full items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/30"
                  aria-label="Abrir conversa no WhatsApp"
                  onClick={() => onClickWhats("footer_list")}
                >
                  <FaWhatsapp className="opacity-80" aria-hidden="true" />
                  <span className="leading-tight">{telCel}</span>
                </a>
              </li>

              <li>
                <Link
                  href={`mailto:${email}`}
                  className="group inline-flex w-full items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/30"
                  aria-label="Enviar e-mail"
                  onClick={() => onClickEmail("footer_list")}
                >
                  <FaEnvelope className="opacity-80" aria-hidden="true" />
                  <span className="leading-tight">{email}</span>
                </Link>
              </li>
            </ul>
          </section>

          <section aria-label="Informações" className="space-y-4">
            <h4 className="font-serif text-xl font-bold sm:text-lg">Informações</h4>
            <p className="text-[15px] md:text-sm text-brand-white/85">{oab}</p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                aria-label="WhatsApp"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-white transition hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-white/30"
                onClick={() => onClickWhats("footer_icon")}
              >
                <FaWhatsapp aria-hidden="true" />
              </a>
              <Link
                href="#"
                aria-label="Instagram"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 text-brand-white transition hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                <FaInstagram aria-hidden="true" />
              </Link>
              <Link
                href={`mailto:${email}`}
                aria-label="Enviar e-mail"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-white/15 px-3 text-sm text-brand-white transition hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/30"
                onClick={() => onClickEmail("footer_button")}
              >
                <FaEnvelope aria-hidden="true" />
                <span className="sr-only">E-mail</span>
              </Link>
            </div>
          </section>
        </div>

        <div className="mt-10 h-px w-full bg-white/10" />

        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs sm:flex-row">
          <p className="text-center text-brand-white/70 sm:text-left">
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
