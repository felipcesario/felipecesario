"use client";

import { useState } from "react";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

export default function Contato() {
  const [nome, setNome] = useState("");
  const [assunto, setAssunto] = useState("");

  const handleWhatsApp = () => {
    const base = "5599999999999"; 
    const msg = encodeURIComponent(`Oi, sou ${nome}. Assunto: ${assunto}`);
    window.open(`https://wa.me/${base}?text=${msg}`, "_blank");
  };

  return (
    <section
      id="contato"
      className="relative w-full bg-blue text-brand-white py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center font-serif text-3xl font-bold sm:text-4xl">
          Entre em Contato
        </h2>
        <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-sand/60" />

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="relative rounded-2xl bg-white text-blue p-8 shadow-lg hover:shadow-xl transition">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-green-100">
                  <FaWhatsapp className="text-green-600" />
                </span>
                <h3 className="font-serif text-2xl font-bold">WhatsApp</h3>
              </div>
              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 border border-green-200">
                resposta mais rápida ⚡
              </span>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleWhatsApp();
              }}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full rounded-lg border border-blue/20 px-4 py-3 text-sm text-blue placeholder-blue/50 focus:outline-none focus:ring-2 focus:ring-blue"
                required
              />
              <input
                type="text"
                placeholder="Assunto"
                value={assunto}
                onChange={(e) => setAssunto(e.target.value)}
                className="w-full rounded-lg border border-blue/20 px-4 py-3 text-sm text-blue placeholder-blue/50 focus:outline-none focus:ring-2 focus:ring-blue"
                required
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-blue px-5 py-3 font-bold text-white hover:bg-blue/90 transition"
              >
                Iniciar conversa
              </button>
            </form>
          </div>

          <div className="rounded-2xl bg-white text-blue p-8 shadow-lg hover:shadow-xl transition">
            <div className="mb-6 flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue/10">
                <FaEnvelope className="text-blue" />
              </span>
              <h3 className="font-serif text-2xl font-bold">E-mail</h3>
            </div>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Seu nome"
                className="w-full rounded-lg border border-blue/20 px-4 py-3 text-sm text-blue placeholder-blue/50 focus:outline-none focus:ring-2 focus:ring-blue"
                required
              />
              <input
                type="email"
                placeholder="Seu e-mail"
                className="w-full rounded-lg border border-blue/20 px-4 py-3 text-sm text-blue placeholder-blue/50 focus:outline-none focus:ring-2 focus:ring-blue"
                required
              />
              <input
                type="text"
                placeholder="Assunto"
                className="w-full rounded-lg border border-blue/20 px-4 py-3 text-sm text-blue placeholder-blue/50 focus:outline-none focus:ring-2 focus:ring-blue"
              />
              <textarea
                placeholder="Mensagem"
                rows={4}
                className="w-full rounded-lg border border-blue/20 px-4 py-3 text-sm text-blue placeholder-blue/50 focus:outline-none focus:ring-2 focus:ring-blue"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-blue px-5 py-3 font-bold text-white hover:bg-blue/90 transition"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
