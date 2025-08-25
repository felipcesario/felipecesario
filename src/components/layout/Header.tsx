"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const navItems = [
  { href: "#atuacao", label: "Áreas de Atuação" },
  { href: "#sobre", label: "Sobre" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#contato", label: "Contato" },
];

const navLink =
  "transition-transform duration-150 hover:text-sand hover:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/60";

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

  const waHref = "";

  return (
    <header className="w-full bg-blue text-brand-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" aria-label="Início" className="shrink-0">
          <Image src="/img/logo.png" alt="Felipe Cesario — Advogado" width={180} height={65} priority />
        </Link>

        <nav aria-label="Navegação principal" className="hidden items-center gap-8 font-sans text-base md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className={navLink}>
              {item.label}
            </a>
          ))}
          {waHref ? (
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-sand px-5 py-2 font-semibold text-blue transition-transform duration-150 hover:opacity-90 hover:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/60"
            >
              Agendar
            </a>
          ) : null}
        </nav>

        <button
          aria-label="Abrir menu"
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative inline-flex h-10 w-11 items-center justify-center rounded-md md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/60"
        >
          <span
            className={`absolute h-[2px] w-6 rounded bg-brand-white transition-all duration-300 ${
              open ? "translate-y-0 rotate-45" : "-translate-y-2 rotate-0"
            }`}
          />
          <span
            className={`absolute h-[2px] w-6 rounded bg-brand-white transition-all duration-300 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute h-[2px] w-6 rounded bg-brand-white transition-all duration-300 ${
              open ? "translate-y-0 -rotate-45" : "translate-y-2 rotate-0"
            }`}
          />
        </button>
      </div>

      <div
        className={`fixed inset-0 z-50 md:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        onClick={() => setOpen(false)}
      >
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <aside
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          className={`absolute right-0 top-0 h-full w-[82%] max-w-sm bg-blue/95 ring-1 ring-white/10 shadow-2xl transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-5 py-4">
            <Image src="/img/logo.png" alt="Felipe Cesario — Advogado" width={150} height={54} />
            <button
              aria-label="Fechar menu"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/60"
            >
              ✕
            </button>
          </div>
          <div className="px-5 pb-6">
            <ul className="space-y-2 pt-2">
              {navItems.map((item, i) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    style={{ transitionDelay: `${100 + i * 40}ms` }}
                    className={`block rounded-lg px-3 py-3 text-lg opacity-0 translate-x-2 bg-white/0 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/60 transition-all duration-300 ${
                      open ? "opacity-100 translate-x-0" : ""
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            {waHref ? (
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                style={{ transitionDelay: `${100 + navItems.length * 40}ms` }}
                className={`mt-5 block rounded-lg bg-sand px-4 py-3 text-center font-semibold text-blue transition-all duration-300 opacity-0 translate-y-2 ${
                  open ? "opacity-100 translate-y-0" : ""
                }`}
              >
                Agendar
              </a>
            ) : null}
          </div>
        </aside>
      </div>
    </header>
  );
}
