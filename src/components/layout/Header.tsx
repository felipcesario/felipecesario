"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
// mantido: helper de utm (não quebra se não existir)
import { loadPersistedUTMs } from "@/lib/utm";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

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
  const telHref = `tel:${emergencyPhone.replace(/\D/g, "")}`;

  const getUTMsSafe = () => {
    try {
      return typeof loadPersistedUTMs === "function" ? loadPersistedUTMs() : null;
    } catch {
      return null;
    }
  };

  const pushDL = useCallback((data: Record<string, unknown>) => {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(data);
  }, []);

  const handleCallClick = useCallback((label: "header_ligar" | "header_cta") => {
    pushDL({
      event: "click_call",
      label,
      phone: emergencyPhone.replace(/\D/g, ""),
      location: "header",
      utms: getUTMsSafe(),
    });
  }, [pushDL]);

  const handleContatoClick = useCallback(() => {
    pushDL({
      event: "click_nav",
      target: "contato",
      location: "header",
      utms: getUTMsSafe(),
    });
  }, [pushDL]);

  return (
    <header className="w-full bg-blue text-brand-white shadow-md overflow-x-hidden">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
        <Link href="/" aria-label="início" className="shrink-0">
          <Image
            src="/img/logo.png"
            alt="felipe cesario — advogado"
            width={140}
            height={50}
            priority
            className="h-10 w-auto md:h-14"
          />
        </Link>

        {/* ações */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          {/* ligar — agora visível também no mobile, mantendo o visual quadrado */}
          <a
            href={telHref}
            onClick={() => handleCallClick("header_ligar")}
            className="inline-flex items-center gap-2 rounded-md border border-sand/60 px-3 md:px-4 py-2 text-xs md:text-sm font-semibold text-sand transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/60"
            aria-label={`ligar para emergência em ${emergencyPhone}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 md:h-5 md:w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.11 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.88.33 1.73.63 2.54a2 2 0 0 1-.45 2.11L8.09 9.91a17.91 17.91 0 0 0 6 6l1.54-1.2a2 2 0 0 1 2.11-.45c.81.3 1.66.51 2.54.63A2 2 0 0 1 22 16.92Z" />
            </svg>
            <span>ligar</span>
          </a>

          {/* contato — segue apenas no desktop, como antes */}
          <Link
            href="#contato"
            onClick={handleContatoClick}
            className="hidden md:inline font-medium text-sand/90 hover:text-white transition-colors"
            aria-label="ir para a seção de contato"
          >
            contato
          </Link>

          {/* consulta urgente — igual ao original */}
          <a
            href={telHref}
            onClick={() => handleCallClick("header_cta")}
            className="rounded-md bg-red-600 px-4 md:px-5 py-2 text-xs md:text-base font-bold text-white transition-transform duration-150 hover:bg-red-700 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            aria-label="consulta urgente por telefone"
          >
            consulta urgente
          </a>
        </div>
      </div>
    </header>
  );
}
