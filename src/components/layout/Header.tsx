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
    <header className="w-full bg-blue text-brand-white shadow-md">
      <div className="mx-auto flex max-w-7xl flex-col md:flex-row md:items-center md:justify-between px-6 py-4 gap-4 md:gap-0">
        
        {/* Logo */}
        <Link href="/" aria-label="Início" className="shrink-0">
          <Image
            src="/img/logo.png"
            alt="Felipe Cesario — Advogado"
            width={180}
            height={65}
            priority
          />
        </Link>

        {/* Telefone + Botão */}
        <div className="flex items-center gap-4">
          <span className="font-semibold text-lg text-sand">
            Emergência: {emergencyPhone}
          </span>
          <a
            href={`tel:${emergencyPhone.replace(/\D/g, "")}`}
            className="rounded-md bg-red-600 px-5 py-2 font-semibold text-white transition-transform duration-150 hover:bg-red-700 hover:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >
            CONSULTA URGENTE
          </a>
        </div>
      </div>
    </header>
  );
}
