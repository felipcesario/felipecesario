"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useCallback, useMemo } from "react";
import { loadPersistedUTMs } from "@/lib/utm";

declare global {
  interface Window { dataLayer?: Array<Record<string, unknown>>; }
}

const TARGET_ID = "consultoria_civil";

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
    pushDL({ event: "click_nav", target: "consultoria_civil", location: "header", utms: getUTMsSafe() });

    if (typeof window === "undefined") return;

    // 1) tente rolar NO DOCUMENTO ATUAL
    const el = document.getElementById(TARGET_ID);
    if (el) {
      e.preventDefault();
      const header = document.querySelector("header");
      const headerH = header ? (header as HTMLElement).offsetHeight : 0;
      const top = el.getBoundingClientRect().top + window.pageYOffset - (headerH + 12);
      window.scrollTo({ top, behavior: "smooth" });
      return;
    }

    // 2) fallback: se a seção não existe nesta página, navegue para a home com hash
    // (não previne o default; deixamos o Next/Link processar o href)
  }, [pushDL]);

  return (
    <header className="w-full bg-blue text-brand-white border-b border-white/10">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-6">
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
            <a
              href={telHref}
              onClick={() => handleCallClick("header_ligar")}
              className="
                inline-flex items-center justify-center gap-1.5
                rounded-md border border-sand/60
                px-3 py-2 text-[13px] sm:text-sm font-semibold
                text-sand hover:bg-white/10 transition
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/60
                whitespace-nowrap
              "
              aria-label={`ligar para ${emergencyPhone}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.11 4.18 2 2 0  1 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.88.33 1.73.63 2.54a2 2 0 0 1-.45 2.11L8.09 9.91a17.91 17.91 0 0 0 6 6l1.54-1.2a2 2 0 0 1 2.11-.45c.81.3 1.66.51 2.54.63A2 2 0 0 1 22 16.92Z" />
              </svg>
              <span>Ligar</span>
            </a>

            {/* IMPORTANTE: hash relativo para priorizar rolagem local */}
            <Link
              href={`#${TARGET_ID}`}
              prefetch={false}
              onClick={handleConsultoriaClick}
              className="
                inline-flex items-center justify-center
                rounded-md px-3 py-2 text-[13px] sm:text-sm font-semibold
                text-sand hover:text-white hover:bg-white/5 transition
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/60
                whitespace-nowrap
              "
              aria-label="ir para a seção de consultoria jurídica"
            >
              Consultoria Jurídica
            </Link>

            {/* opcional: se quiser fallback para home quando não existir na página atual,
                troque o href acima para `/#${TARGET_ID}` */}
          </div>
        </div>
      </div>
    </header>
  );
}
