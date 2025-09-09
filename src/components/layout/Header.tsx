"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useCallback, useMemo } from "react";
import { loadPersistedUTMs } from "@/lib/utm";

declare global {
  interface Window { dataLayer?: Array<Record<string, unknown>>; }
}

// ⚠️ este ID TEM QUE bater com o sectionId passado pro <Urgency />
// no seu page.tsx está <Urgency sectionId="atuacao" />
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

  // Se já estiver na home, evita reload e dá scroll suave com offset do header.
  const handleConsultoriaClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    pushDL({ event: "click_nav", target: "consultoria_juridica", location: "header", utms: getUTMsSafe() });

    if (typeof window === "undefined") return;
    const isHome = window.location.pathname === "/" || window.location.pathname === "";

    if (!isHome) {
      // Deixa o <Link> navegar normalmente para "/#atuacao"
      return;
    }

    // Já na home: cancela a navegação e faz scroll suave para o ID
    e.preventDefault();
    const el = document.getElementById(TARGET_ID);
    if (el) {
      const header = document.querySelector("header");
      const headerH = header ? (header as HTMLElement).offsetHeight : 0;
      const top = el.getBoundingClientRect().top + window.pageYOffset - (headerH + 12);
      window.scrollTo({ top, behavior: "smooth" });
    } else {
      // fallback: ancora padrão
      window.location.hash = TARGET_ID;
    }
  }, [pushDL]);

  const handleWhatsappClick = useCallback(() => {
    pushDL({ event: "click_whatsapp", label: "header_cta_whatsapp", phone: phoneDigits, location: "header", utms: getUTMsSafe() });
  }, [pushDL, phoneDigits]);

  return (
    <header className="w-full bg-blue text-brand-white shadow-md overflow-x-hidden">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">
        <Link href="/" aria-label="início" className="shrink-0">
          <Image
            src="/img/logo.png"
            alt="felipe cesario — advogado"
            width={120}
            height={40}
            priority
            className="h-8 w-auto sm:h-10 md:h-12"
          />
        </Link>

        {/* ações */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-nowrap">
          {/* ligar */}
          <a
            href={telHref}
            onClick={() => handleCallClick("header_ligar")}
            className="inline-flex items-center gap-1.5 sm:gap-2 rounded-md border border-sand/60 px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 text-[11px] sm:text-xs md:text-sm font-semibold text-sand transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/60 shrink-0"
            aria-label={`ligar para emergência em ${emergencyPhone}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.11 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.88.33 1.73.63 2.54a2 2 0 0 1-.45 2.11L8.09 9.91a17.91 17.91 0 0 0 6 6l1.54-1.2a2 2 0 0 1 2.11-.45c.81.3 1.66.51 2.54.63A2 2 0 0 1 22 16.92Z" /></svg>
            <span>ligar</span>
          </a>

          {/* consultoria jurídica — usa Link para rota interna + hash */}
          <Link
            href={`/#${TARGET_ID}`}
            prefetch={false}
            onClick={handleConsultoriaClick}
            className="inline-flex items-center rounded-md px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 text-[11px] sm:text-xs md:text-sm font-semibold text-sand hover:text-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/60 shrink-0"
            aria-label="ir para a seção de consultoria jurídica"
          >
            consultoria jurídica
          </Link>

          {/* whatsapp CTA (externo) */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsappClick}
            className="rounded-md bg-red-600 px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 text-xs sm:text-sm md:text-base font-bold text-white transition-transform duration-150 hover:bg-red-700 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 shrink-0 whitespace-nowrap"
            aria-label="iniciar conversa de consulta urgente no WhatsApp"
          >
            atendimento urgente
          </a>
        </div>
      </div>
    </header>
  );
}
