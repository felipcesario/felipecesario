"use client";

import { useEffect, useMemo, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { getUTMsFromLocation, persistUTMs, loadPersistedUTMs } from "@/lib/utm";
import { gtmPush } from "@/lib/gtm";

type LeadResponse = { ok?: boolean; error?: string };
function isLeadResponse(x: unknown): x is LeadResponse {
  return typeof x === "object" && x !== null && ("ok" in x || "error" in x);
}

export default function Contato() {
  const formId = "contato_form";
  const sectionPath = useMemo(() => {
    if (typeof window === "undefined") return "/#contato";
    return `${window.location.pathname}#contato`;
  }, []);

  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState<null | { type: "ok" | "err"; msg: string }>(null);
  const [utms, setUtms] = useState(loadPersistedUTMs());

  useEffect(() => {
    const fresh = getUTMsFromLocation();
    const merged = { ...fresh, ...loadPersistedUTMs() };
    setUtms(merged);
    persistUTMs(merged);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFeedback(null);
    setIsSending(true);

    gtmPush({
      event: "form_start",
      form_id: formId,
      section_path: sectionPath,
    });

    try {
      const payload = {
        form_id: formId,
        section_path: sectionPath,
        lead: { nome, whatsapp },
        utm: {
          utm_source: utms.utm_source || null,
          utm_medium: utms.utm_medium || null,
          utm_campaign: utms.utm_campaign || null,
          utm_term: utms.utm_term || null,
          utm_content: utms.utm_content || null,
          gclid: utms.gclid || null,
          fbclid: utms.fbclid || null,
        },
      };

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data: unknown = undefined;
      try {
        data = await res.json();
      } catch {
        // ignore json parse errors
      }

      if (!res.ok || !(isLeadResponse(data) && data.ok)) {
        const errMsg = isLeadResponse(data) && data.error ? data.error : "Falha ao enviar.";
        throw new Error(errMsg);
      }

      gtmPush({
        event: "form_submit",
        form_id: formId,
        section_path: sectionPath,
        lead_fields: ["nome", "whatsapp"],
        utm_present: !!(utms.utm_source || utms.gclid || utms.fbclid),
      });

      gtmPush({
        event: "click_whatsapp",
        source: formId,
        section_path: sectionPath,
        phone: "5548991447874",
      });

      // abre WhatsApp em nova guia
      window.open("https://wa.me/5548991447874", "_blank");

      setNome("");
      setWhatsapp("");
      setFeedback({ type: "ok", msg: "Enviado com sucesso!" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro ao enviar. Tente novamente.";
      setFeedback({ type: "err", msg });

      gtmPush({
        event: "form_error",
        form_id: formId,
        section_path: sectionPath,
        error_message: msg,
      });
    } finally {
      setIsSending(false);
    }
  }

  return (
    <section id="contato" className="relative w-full bg-blue text-brand-white" aria-label="Call to Action Final">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(900px 320px at 50% 0%, rgba(255,255,255,0.05), transparent 60%), radial-gradient(700px 260px at 50% 100%, rgba(0,0,0,0.25), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-24">
        <div className="mx-auto w-full max-w-md sm:max-w-lg md:max-w-2xl rounded-2xl md:rounded-3xl border border-white/15 bg-white/10 backdrop-blur-md p-5 sm:p-8 md:p-10 shadow-[0_14px_40px_rgba(0,0,0,0.35)]">
          <h2 className="mx-auto max-w-[22ch] sm:max-w-[26ch] text-center font-serif text-[22px] leading-[1.2] sm:text-[28px] sm:leading-tight md:text-[40px] font-bold tracking-tight">
            Sua liberdade não pode esperar.
            <span className="block">Fale agora com um advogado especializado.</span>
          </h2>

          <div className="mx-auto mt-4 sm:mt-5 h-[3px] w-12 sm:w-16 rounded-full bg-sand/70" aria-hidden="true" />

          <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
            <div className="md:col-span-1">
              <label htmlFor="nome" className="mb-1 block text-[13px] sm:text-sm font-medium text-brand-white/90">
                Nome
              </label>
              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome"
                required
                className="w-full rounded-xl border border-white/20 bg-white/95 text-blue placeholder-blue/60 px-4 py-3 sm:py-3.5 text-[16px] sm:text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-sand/80"
              />
            </div>

            <div className="md:col-span-1">
              <label htmlFor="whatsapp" className="mb-1 block text-[13px] sm:text-sm font-medium text-brand-white/90">
                WhatsApp
              </label>
              <input
                id="whatsapp"
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="Seu WhatsApp (DDD e número)"
                required
                className="w-full rounded-xl border border-white/20 bg-white/95 text-blue placeholder-blue/60 px-4 py-3 sm:py-3.5 text-[16px] sm:text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-sand/80"
              />
            </div>

            <div className="md:col-span-2 pt-1">
              <button
                type="submit"
                disabled={isSending}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 text-[16px] sm:text-base font-extrabold text-white shadow-lg transition hover:bg-green-700 hover:shadow-xl active:translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-sand/80 disabled:opacity-70"
              >
                <FaWhatsapp aria-hidden="true" className="h-5 w-5" />
                {isSending ? "Enviando…" : "Falar com Advogado Agora"}
              </button>

              {feedback && (
                <p className={`mt-3 text-center text-[12px] ${feedback.type === "ok" ? "text-green-300" : "text-red-300"}`}>
                  {feedback.msg}
                </p>
              )}

              <p className="mt-3 text-center text-[12px] text-brand-white/70">resposta mais rápida ⚡ no WhatsApp</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
