// src/components/layout/Footer.tsx
"use client";

import Link from "next/link";
import { FaWhatsapp, FaInstagram, FaEnvelope } from "react-icons/fa6";
import { gtmPush } from "@/lib/gtm";

export default function Footer() {
  const year = new Date().getFullYear();

  // contatos oficiais
  const whatsappNumberDigits = "5548991447874";
  const whatsappHref = `https://wa.me/${whatsappNumberDigits}`;
  const telCel = "+55 (48) 99144-7874";
  const email = "felipercesario@gmail.com";
  const instagram = "https://instagram.com/adv.felipecesario";
  const oab = "OAB/SC 71.088";

  const onClickWhats = (source: string) => {
    gtmPush({
      event: "click_whatsapp",
      source,
      phone: whatsappNumberDigits, 
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
    <footer className="w-full bg-blue text-brand-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:items-start">
          <section
            aria-label="contatos"
            className="space-y-3 sm:justify-self-start sm:text-left"
          >
            <h4 className="text-xs uppercase tracking-wide text-brand-white/70">
              contatos
            </h4>

            <ul className="grid gap-2 text-sm text-brand-white/85">
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/20"
                  aria-label={`abrir whatsapp em ${telCel}`}
                  onClick={() => onClickWhats("footer_list")}
                >
                  <FaWhatsapp className="opacity-80" aria-hidden="true" />
                  <span className="leading-tight">{telCel}</span>
                </a>
              </li>

              <li>
                <Link
                  href={`mailto:${email}`}
                  className="group inline-flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/20"
                  aria-label="enviar e-mail"
                  onClick={() => onClickEmail("footer_list")}
                >
                  <FaEnvelope className="opacity-80" aria-hidden="true" />
                  <span className="leading-tight">{email}</span>
                </Link>
              </li>
            </ul>
          </section>

          {/* DIREITA — Informações */}
          <section
            aria-label="informações"
            className="space-y-3 sm:justify-self-end sm:text-right"
          >
            <h4 className="text-xs uppercase tracking-wide text-brand-white/70">
              informações
            </h4>

            <p className="text-sm text-brand-white/80">{oab}</p>

            <div className="flex items-center gap-2 pt-1 sm:justify-end">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="whatsapp"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/90 text-white hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                onClick={() => onClickWhats("footer_icon")}
              >
                <FaWhatsapp aria-hidden="true" />
              </a>

              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="instagram"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-brand-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/20"
              >
                <FaInstagram aria-hidden="true" />
                <span className="sr-only">@adv.felipecesario</span>
              </a>

              <Link
                href={`mailto:${email}`}
                aria-label="enviar e-mail"
                className="inline-flex h-9 items-center justify-center rounded-lg border border-white/15 px-2 text-xs text-brand-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/20"
                onClick={() => onClickEmail("footer_button")}
              >
                <FaEnvelope aria-hidden="true" />
                <span className="sr-only">e-mail</span>
              </Link>
            </div>
          </section>
        </div>
      </div>

      <div className="h-px w-full bg-white/10" />

      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex flex-col items-center justify-between gap-2 text-[11px] text-brand-white/70 sm:flex-row">
          <p className="text-center sm:text-left">
            © {year} felipe cesario. todos os direitos reservados.
          </p>
          <p>
            desenvolvido por{" "}
            <a
              href="https://leandrofaria.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sand hover:underline underline-offset-4"
            >
              LFG tech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
