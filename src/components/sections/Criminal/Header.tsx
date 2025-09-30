"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useCallback, useMemo } from "react";
import { loadPersistedUTMs } from "@/lib/utm";

declare global {
  interface Window { dataLayer?: Array<Record<string, unknown>>; }
}

const TARGET_ID = "atuacao";

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onEsc);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
    };
  }, [open]);

  const emergencyPhone = "(48) 99144-7874";
  const phoneDigits = useMemo(() => emergencyPhone.replace(/\D/g, ""), [emergencyPhone]);
  const telHref = `tel:${phoneDigits}`;

  const whatsappMessage = "Olá, preciso de atendimento urgente. Poderia me ajudar?";
  const whatsappHref = useMemo(
    () => `https://wa.me/${phoneDigits}?text=${encodeURIComponent(whatsappMessage)}`,
    [phoneDigits]
  );

  const getUTMsSafe = () => {
    try { return typeof loadPersistedUTMs === "function" ? loadPersistedUTMs() : null; }
    catch { return null; }
  };

  const pushDL = useCallback((data: Record<string, unknown>) => {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(data);
  }, []);

  const handleCallClick = useCallback((label: "header_ligar" | "header_cta") => {
    pushDL({ event: "click_call", label, phone: phoneDigits, location: "header", utms: getUTMsSafe() });
  }, [pushDL, phoneDigits]);

  const handleConsultoriaClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    pushDL({ event: "click_nav", target: "consultoria_juridica", location: "header", utms: getUTMsSafe() });

    if (typeof window === "undefined") return;
    const isHome = window.location.pathname === "/" || window.location.pathname === "";
    if (!isHome) return;

    e.preventDefault();
    const el = document.getElementById(TARGET_ID);
    if (el) {
      const header = document.querySelector("header");
      const headerH = header ? (header as HTMLElement).offsetHeight : 0;
      const top = el.getBoundingClientRect().top + window.pageYOffset - (headerH + 12);
      window.scrollTo({ top, behavior: "smooth" });
    } else {
      window.location.hash = TARGET_ID;
    }
  }, [pushDL]);

  const handleWhatsappClick = useCallback(() => {
    pushDL({ event: "click_whatsapp", label: "header_cta_whatsapp", phone: phoneDigits, location: "header", utms: getUTMsSafe() });
  }, [pushDL, phoneDigits]);

  return (
    <header className="w-full bg-blue text-brand-white border-b border-white/10">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-6">
        {/* linha 1: logo à esquerda / ações à direita */}
        <div className="flex items-center justify-between gap-3">
          <Link href="/" aria-label="início" className="shrink-0">
            <Image
              src="/img/logo.png"
              alt="felipe cesario — advogado"
              width={140}
              height={44}
              priority
              className="h-9 w-auto sm:h-10"
            />
          </Link>

          <div className="flex items-center gap-2">
            {/* Ligar — agora botão vermelho */}
            <a
              href={telHref}
              onClick={() => handleCallClick("header_ligar")}
              className="
                inline-flex items-center justify-center gap-1.5
                rounded-md
                px-3 py-2 text-[13px] sm:text-sm font-semibold
                bg-red-600 text-white hover:bg-red-700 transition
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500
                whitespace-nowrap
              "
              aria-label={`ligar para emergência em ${emergencyPhone}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.11 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.88.33 1.73.63 2.54a2 2 0 0 1-.45 2.11L8.09 9.91a17.91 17.91 0 0 0 6 6l1.54-1.2a2 2 0 0 1 2.11-.45c.81.3 1.66.51 2.54.63A2 2 0 0 1 22 16.92Z" />
              </svg>
              <span>Ligar</span>
            </a>

            {/* Consultoria Jurídica — visual de botão (outline) */}
            <Link
              href={`/#${TARGET_ID}`}
              prefetch={false}
              onClick={handleConsultoriaClick}
              className="
                inline-flex items-center justify-center gap-1.5
                rounded-md border border-sand/60
                px-3 py-2 text-[13px] sm:text-sm font-semibold
                text-sand hover:text-white hover:bg-white/10 transition
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/60
                whitespace-nowrap
              "
              aria-label="ir para a seção de consultoria jurídica"
            >
              Consultoria Jurídica
            </Link>

            {/* botão vermelho inline (apenas md+) — com ícone do WhatsApp e texto solicitado */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsappClick}
              className="
                hidden md:inline-flex items-center justify-center gap-1.5
                rounded-md px-3 py-2 text-[13px] sm:text-sm font-semibold
                bg-red-600 text-white hover:bg-red-700 transition
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500
                whitespace-nowrap
              "
              aria-label="iniciar conversa de consulta urgente no WhatsApp"
            >
              {/* ícone WhatsApp */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.52 3.48A11.94 11.94 0 0 0 12.01 0C5.39 0 .03 5.36.03 11.98c0 2.11.55 4.17 1.6 6L0 24l6.17-1.6a12 12 0 0 0 5.84 1.49h.01c6.62 0 11.98-5.36 11.98-11.98a11.94 11.94 0 0 0-3.48-8.43Zm-8.51 19.03h-.01a9.97 9.97 0 0 1-5.08-1.39l-.36-.21-3.66.95.98-3.56-.24-.37a10 10 0 1 1 8.37 4.58Zm5.5-7.49c-.3-.15-1.77-.87-2.04-.96-.27-.1-.47-.15-.67.15-.2.3-.77.95-.94 1.15-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.47-.88-.79-1.47-1.76-1.64-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.38s-1.04 1.02-1.04 2.48 1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.48.71.31 1.26.5 1.69.64.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"/>
              </svg>
              <span>atendimento ugente</span>
            </a>
          </div>
        </div>

        {/* linha 2: CTA cheio abaixo (apenas mobile) */}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsappClick}
          className="
            mt-2.5 block w-full rounded-md bg-red-600
            px-4 py-2.5 text-sm sm:text-base font-bold text-white text-center
            hover:bg-red-700 transition
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500
            md:hidden
          "
          aria-label="iniciar conversa de consulta urgente no WhatsApp"
        >
          <span className="inline-flex items-center justify-center gap-1.5">
            {/* ícone WhatsApp (mobile) */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.52 3.48A11.94 11.94 0 0 0 12.01 0C5.39 0 .03 5.36.03 11.98c0 2.11.55 4.17 1.6 6L0 24l6.17-1.6a12 12 0 0 0 5.84 1.49h.01c6.62 0 11.98-5.36 11.98-11.98a11.94 11.94 0 0 0-3.48-8.43Zm-8.51 19.03h-.01a9.97 9.97 0 0 1-5.08-1.39l-.36-.21-3.66.95.98-3.56-.24-.37a10 10 0 1 1 8.37 4.58Zm5.5-7.49c-.3-.15-1.77-.87-2.04-.96-.27-.1-.47-.15-.67.15-.2.3-.77.95-.94 1.15-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.47-.88-.79-1.47-1.76-1.64-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.38s-1.04 1.02-1.04 2.48 1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.48.71.31 1.26.5 1.69.64.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"/>
            </svg>
            <span>atendimento ugente</span>
          </span>
        </a>
      </div>
    </header>
  );
}
