"use client";

import { useEffect, useMemo, useState } from "react";
import { getUTMsFromLocation, persistUTMs, loadPersistedUTMs } from "@/lib/utm";
import { gtmPush } from "@/lib/gtm";

type Props = {
  sectionId?: string;
  title?: string;
  subtitle?: string;
};

type LeadResponse = { ok?: boolean; error?: string };
function isLeadResponse(x: unknown): x is LeadResponse {
  return typeof x === "object" && x !== null && ("ok" in x || "error" in x);
}

/** helpers para máscara visual do telefone */
function onlyDigits(s: string) {
  return s.replace(/\D/g, "");
}
function formatBRPhone(digits: string) {
  const d = onlyDigits(digits).slice(0, 11); // limita a 11 dígitos (DDD + 9)
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) {
    // 10 dígitos -> (XX) XXXX-XXXX
    return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  }
  // 11 dígitos -> (XX) XXXXX-XXXX
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export default function Urgency({
  sectionId = "ajuda-urgente",
  title = "Cada minuto conta em casos criminais",
  subtitle = "Se você ou alguém próximo está precisando de atendimento, entre em contato AGORA",
}: Props) {
  const formId = "urgency_form";
  const sectionPath = useMemo(() => {
    if (typeof window === "undefined") return `/#${sectionId}`;
    return `${window.location.pathname}#${sectionId}`;
  }, [sectionId]);

  const bullets = [
    "Prisão em flagrante",
    "Audiência de custódia",
    "Acompanhamento Processual",
    "Busca e Apreensão",
    "Consultoria Jurídica Especializada",
  ];

  const [nome, setNome] = useState("");
  const [whatsappRaw, setWhatsappRaw] = useState(""); // só dígitos para enviar ao webhook
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState<null | { type: "ok" | "err"; msg: string }>(null);
  const [utms, setUtms] = useState(loadPersistedUTMs());

  useEffect(() => {
    const fresh = getUTMsFromLocation();
    const merged = { ...fresh, ...loadPersistedUTMs() };
    setUtms(merged);
    persistUTMs(merged);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSending(true);
    setFeedback(null);

    gtmPush({
      event: "form_start",
      form_id: formId,
      section_path: sectionPath,
    });

    try {
      const payload = {
        form_id: formId,
        section_path: sectionPath,
        lead: { nome, whatsapp: whatsappRaw }, // envia SEM máscara
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

      window.open("https://wa.me/5548991447874", "_blank");

      setNome("");
      setWhatsappRaw("");
      setFeedback({ type: "ok", msg: "Enviado com sucesso! Você será redirecionado." });
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

  const tileClass =
    "inline-flex w-full items-center gap-3 rounded-xl border border-sand/70 " +
    "bg-gradient-to-br from-sand/95 to-sand/85 text-blue font-semibold " +
    "px-4 py-3 sm:px-5 sm:py-4 text-sm sm:text-base " +
    "shadow-[inset_0_1px_2px_rgba(255,255,255,0.38),0_6px_14px_rgba(185,162,119,0.22)] " +
    "transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-sand/60 " +
    "min-h-[56px] sm:min-h-[64px]";

  return (
    <section
      id={sectionId}
      className="relative w-full overflow-x-hidden bg-blue text-brand-white"
      aria-label="Atendimento urgente / criminal 24h"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(52%_42%_at_14%_8%,rgba(255,255,255,0.02),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-screen-xl px-4 md:px-6 py-14">
        {/* md volta a ser 1 coluna; duas colunas só no lg */}
        <div className="grid grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
          <div className="order-1 col-span-12 lg:col-span-6">
            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight">
              {title}
              <span className="block h-1 w-16 bg-sand rounded-full mt-3" aria-hidden="true" />
            </h2>

            <p className="mt-4 text-base sm:text-lg text-brand-white/85 max-w-2xl">
              {subtitle}
            </p>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {bullets.map((label) => (
                <li key={label}>
                  <button type="button" className={tileClass}>
                    <span className="h-2 w-2 rounded-full bg-blue/70 shrink-0" aria-hidden="true" />
                    <span className="leading-snug text-left">{label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="order-2 col-span-12 lg:col-span-6 lg:pl-2 xl:pl-4">
            <div
              className="rounded-2xl border border-blue/10 bg-brand-white text-blue shadow-[0_16px_40px_rgba(0,0,0,0.28)] p-6 md:p-7 max-w-xl md:mx-auto lg:ml-0"
              aria-labelledby={`${formId}-title`}
            >
              <h3 id={`${formId}-title`} className="font-serif text-2xl font-bold text-blue">
                Fale com um advogado agora
              </h3>

              <form onSubmit={onSubmit} className="mt-4" noValidate>
                <div>
                  <label htmlFor={`${formId}-nome`} className="text-sm font-semibold">
                    Nome
                  </label>
                  <input
                    id={`${formId}-nome`}
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                    placeholder="Seu nome"
                    className="mt-2 w-full rounded-xl border border-blue/20 bg-brand-white px-4 py-3 text-blue placeholder:text-blue/40 outline-none focus:border-sand focus:ring-2 focus:ring-sand/40"
                  />
                </div>

                <div className="mt-4">
                  <label htmlFor={`${formId}-cel`} className="text-sm font-semibold">
                    WhatsApp
                  </label>
                  <input
                    id={`${formId}-cel`}
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    value={formatBRPhone(whatsappRaw)} // máscara só visual
                    onChange={(e) => {
                      const digits = onlyDigits(e.target.value).slice(0, 11);
                      setWhatsappRaw(digits);
                    }}
                    onPaste={(e) => {
                      // cola qualquer coisa e mantém só dígitos
                      e.preventDefault();
                      const pasted = (e.clipboardData.getData("text") || "").toString();
                      const digits = onlyDigits(pasted).slice(0, 11);
                      setWhatsappRaw(digits);
                    }}
                    required
                    placeholder="Seu WhatsApp (DDD e número)"
                    className="mt-2 w-full rounded-xl border border-blue/20 bg-brand-white px-4 py-3 text-blue placeholder:text-blue/40 outline-none focus:border-sand focus:ring-2 focus:ring-sand/40"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-red-600 px-5 py-3 text-base font-bold text-white shadow-[0_10px_24px_rgba(220,38,38,0.35)] transition hover:bg-red-700 active:scale-[.99] focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-brand-white disabled:opacity-60"
                >
                  {isSending ? "Enviando…" : "Preciso de atendimento agora"}
                </button>

                {feedback && (
                  <div
                    role="status"
                    aria-live="polite"
                    className={`mt-3 text-sm ${
                      feedback.type === "ok" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {feedback.msg}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
