"use client";

import { useEffect, useMemo, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { getUTMsFromLocation, persistUTMs, loadPersistedUTMs } from "@/lib/utm";
import { gtmPush } from "@/lib/gtm";

// helpers: máscara / dígitos
function onlyDigits(v: string) {
  return v.replace(/\D+/g, "");
}
function formatBRPhone(digits: string) {
  const d = digits.slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

// tipagem segura para sendBeacon
type NavigatorWithBeacon = Navigator & {
  sendBeacon?: (url: string | URL, data?: BodyInit) => boolean;
};

// novo: abrir whatsapp na MESMA aba + envio em background
const WHATSAPP_NUMBER = "5548991447874";

function buildWaLink(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

function sendLeadBeacon(url: string, payload: unknown) {
  try {
    if (typeof navigator !== "undefined") {
      const nav = navigator as NavigatorWithBeacon;
      if (typeof nav.sendBeacon === "function") {
        const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
        nav.sendBeacon(url, blob);
        return;
      }
    }
  } catch {}
  try {
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  } catch {}
}

export default function Contato() {
  const formId = "contato_form";
  const sectionPath = useMemo(() => {
    if (typeof window === "undefined") return "/#contato";
    return `${window.location.pathname}#contato`;
  }, []);

  const [nome, setNome] = useState("");
  // guarda SOMENTE DÍGITOS (payload)
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

    try {
      // envia em background
      sendLeadBeacon("/api/lead", payload);

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
        phone: WHATSAPP_NUMBER,
      });

      const msg = `Olá, Felipe! Sou ${nome}. Vim pelo site.`;
      window.location.href = buildWaLink(msg);

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

          <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2" noValidate>
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
                autoComplete="name"
                name="nome"
                aria-label="Seu nome"
              />
            </div>

            <div className="md:col-span-1">
              <label htmlFor="whatsapp" className="mb-1 block text-[13px] sm:text-sm font-medium text-brand-white/90">
                WhatsApp
              </label>
              <input
                id="whatsapp"
                type="tel"
                value={formatBRPhone(onlyDigits(whatsapp))} // exibe formatado
                onChange={(e) => setWhatsapp(onlyDigits(e.target.value))} // guarda dígitos
                placeholder="Seu WhatsApp (DDD e número)"
                required
                inputMode="tel"
                maxLength={16}
                className="w-full rounded-xl border border-white/20 bg-white/95 text-blue placeholder-blue/60 px-4 py-3 sm:py-3.5 text-[16px] sm:text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-sand/80"
                title="Use o formato (DD) 99999-9999"
                autoComplete="tel"
                name="whatsapp"
                aria-label="Seu WhatsApp (DDD e número)"
              />
            </div>

            <div className="md:col-span-2 pt-1">
              <button
                type="submit"
                disabled={isSending}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 text-[16px] sm:text-base font-extrabold text-white shadow-lg transition hover:bg-green-700 hover:shadow-xl active:translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-sand/80 disabled:opacity-70"
                aria-live="polite"
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
