"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

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

  const emergencyPhone = "(48) 9144-7874";

  return (
    <header className="w-full bg-blue text-brand-white shadow-md overflow-x-hidden">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
        <Link href="/" aria-label="Início" className="shrink-0">
          <Image
            src="/img/logo.png"
            alt="Felipe Cesario — Advogado"
            width={140}
            height={50}
            priority
            className="h-10 w-auto md:h-14"
          />
        </Link>

        <div className="flex items-center gap-3 md:gap-4">
          <span className="hidden md:inline font-semibold text-base text-sand">
            Emergência: {emergencyPhone}
          </span>

          <a
            href={`tel:${emergencyPhone.replace(/\D/g, "")}`}
            className="rounded-md bg-red-600 px-4 md:px-5 py-2 text-xs md:text-base font-bold text-white transition-transform duration-150 hover:bg-red-700 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >
            CONSULTA URGENTE
          </a>
        </div>
      </div>
    </header>
  );
}
