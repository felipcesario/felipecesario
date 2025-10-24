"use client";

import { useEffect, useMemo, useState } from "react";
import { getUTMsFromLocation, persistUTMs, loadPersistedUTMs } from "@/lib/utm";
import { gtmPush } from "@/lib/gtm";

type NavigatorWithBeacon = Navigator & { sendBeacon?: (url: string | URL, data?: BodyInit) => boolean; };

function onlyDigits(s: string) { return s.replace(/\D/g, ""); }
function formatBRPhone(digits: string) {
  const d = onlyDigits(digits).slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

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
    fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), keepalive: true }).catch(() => {});
  } catch {}
}

export default function Formulario() {
  const sectionId = "consultoria_civil";
  const title = "Consultoria e Atendimento Jurídico em Direito Criminal, Civil e Família";
  const subtitle = "Análise processual, contratual, elaboração de pareceres, acompanhamento processual do início ao fim e consultoria jurídica estratégica para pessoas e empresas.";

  const formId = "civil_empresarial_form";
  const sectionPath = useMemo(() => {
    if (typeof window === "undefined") return `/#${sectionId}`;
    return `${window.location.pathname}#${sectionId}`;
  }, []);

  const [nome, setNome] = useState("");
  const [whatsappRaw, setWhatsappRaw] = useState("");
  const [assunto, setAssunto] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState<null | { type: "ok" | "err"; msg: string }>(null);
  const [utms, setUtms] = useState(loadPersistedUTMs());
  const [triedSubmit, setTriedSubmit] = useState(false);

  useEffect(() => {
    const fresh = getUTMsFromLocation();
    const merged = { ...fresh, ...loadPersistedUTMs() };
    setUtms(merged);
    persistUTMs(merged);
  }, []);

  // ---- Validações leves (não quebram o fluxo atual) ----
  const isValidPhone = (d: string) => d.length >= 10; // aceita 10 ou 11 dígitos (fixo/celular)
  const canSubmit = nome.trim().length > 0 && isValidPhone(whatsappRaw);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTriedSubmit(true);
    setFeedback(null);

    // Guard: só prossegue se estiver tudo preenchido/ok
    if (!canSubmit) {
      setFeedback({ type: "err", msg: "Preencha seu nome e um WhatsApp válido (com DDD) para continuar." });
      return;
    }

    setIsSending(true);

    gtmPush({ event: "form_start", form_id: formId, section_path: sectionPath });

    const payload = {
      form_id: formId,
      section_path: sectionPath,
      lead: {
        nome,
        whatsapp: whatsappRaw,
        assunto: assunto?.trim() || null,
      },
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
      sendLeadBeacon("/api/lead", payload);

      gtmPush({
        event: "form_submit",
        form_id: formId,
        section_path: sectionPath,
        lead_fields: ["nome", "whatsapp", assunto.trim() ? "assunto_opt" : "assunto_empty"],
        utm_present: !!(utms.utm_source || utms.gclid || utms.fbclid),
      });

      gtmPush({ event: "click_whatsapp", source: formId, section_path: sectionPath, phone: WHATSAPP_NUMBER });

      // Mensagem para o WhatsApp
      const nomeSafe = (nome || "").trim() || "Visitante";
      const resumo = (assunto || "").trim().slice(0, 500);
      const linhas = [
        `Olá, sou ${nomeSafe}.`,
        resumo ? `Preciso de orientação sobre: ${resumo}` : `Gostaria de agendar uma consultoria jurídica.`,
        `Vim pelo site.`,
      ];
      const msg = linhas.join("\n");

      window.location.href = buildWaLink(msg);

      setNome("");
      setWhatsappRaw("");
      setAssunto("");
      setFeedback({ type: "ok", msg: "Enviado com sucesso! Redirecionando para o WhatsApp…" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro ao enviar. Tente novamente.";
      setFeedback({ type: "err", msg });
      gtmPush({ event: "form_error", form_id: formId, section_path: sectionPath, error_message: msg });
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
      className="relative w-full overflow-x-hidden bg-blue text-brand-white scroll-mt-[88px] sm:scroll-mt-[100px]"
      aria-label="Consultoria civil e empresarial"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(52%_42%_at_14%_8%,rgba(255,255,255,0.02),transparent_70%)]" />

      <div className="relative mx-auto max-w-screen-xl px-4 md:px-6 py-12 sm:py-14">
        <div className="grid grid-cols-12 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-start">
          {/* Texto + chips */}
          <div className="order-2 lg:order-1 col-span-12 lg:col-span-6">
            <h2 className="font-serif font-bold text-2xl sm:text-4xl lg:text-5xl leading-tight tracking-tight">
              {title}
              <span className="block h-1 w-16 bg-sand rounded-full mt-3" aria-hidden="true" />
            </h2>

            <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-brand-white/85 max-w-2xl">
              {subtitle}
            </p>
          </div>

          {/* Formulário */}
          <div className="order-1 lg:order-2 col-span-12 lg:col-span-6 lg:pl-2 xl:pl-4">
            <div
              className="rounded-2xl border border-blue/10 bg-brand-white text-blue shadow-[0_16px_40px_rgba(0,0,0,0.28)] p-5 sm:p-6 md:p-7 max-w-xl md:mx-auto lg:ml-0"
              aria-labelledby={`${formId}-title`}
            >
              <h3 id={`${formId}-title`} className="font-serif text-xl sm:text-2xl font-bold text-blue">
                Solicite uma consultoria
              </h3>

              <form onSubmit={onSubmit} className="mt-3 sm:mt-4" noValidate>
                <div>
                  <label htmlFor={`${formId}-nome`} className="text-sm font-semibold">Nome</label>
                  <input
                    id={`${formId}-nome`}
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                    placeholder="Seu nome"
                    className="mt-2 w-full rounded-xl border border-blue/20 bg-brand-white px-4 py-3 text-blue placeholder:text-blue/40 outline-none focus:border-sand focus:ring-2 focus:ring-sand/40"
                    autoComplete="name"
                    name="nome"
                    aria-label="Seu nome"
                    aria-invalid={triedSubmit && nome.trim().length === 0 ? "true" : "false"}
                  />
                  {triedSubmit && nome.trim().length === 0 && (
                    <p className="mt-1 text-xs text-red-600">Informe seu nome.</p>
                  )}
                </div>

                <div className="mt-4">
                  <label htmlFor={`${formId}-cel`} className="text-sm font-semibold">WhatsApp</label>
                  <input
                    id={`${formId}-cel`}
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    value={formatBRPhone(whatsappRaw)}
                    onChange={(e) => setWhatsappRaw(onlyDigits(e.target.value).slice(0, 11))}
                    onPaste={(e) => {
                      e.preventDefault();
                      const digits = onlyDigits((e.clipboardData.getData("text") || "").toString()).slice(0, 11);
                      setWhatsappRaw(digits);
                    }}
                    required
                    placeholder="Seu WhatsApp (DDD e número)"
                    className="mt-2 w-full rounded-xl border border-blue/20 bg-brand-white px-4 py-3 text-blue placeholder:text-blue/40 outline-none focus:border-sand focus:ring-2 focus:ring-sand/40"
                    name="whatsapp"
                    aria-label="Seu WhatsApp (DDD e número)"
                    aria-invalid={triedSubmit && !isValidPhone(whatsappRaw) ? "true" : "false"}
                  />
                  {triedSubmit && !isValidPhone(whatsappRaw) && (
                    <p className="mt-1 text-xs text-red-600">Digite um WhatsApp válido com DDD (mín. 10 dígitos).</p>
                  )}
                </div>

                <div className="mt-4">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <label htmlFor={`${formId}-assunto`} className="text-sm font-semibold">
                      Conte o que você precisa <span className="text-blue/50 font-normal">(opcional)</span>
                    </label>
                    <span className="text-xs text-blue/70">
                      A consultoria jurídica é um serviço <strong>pago</strong>.
                    </span>
                  </div>
                  <textarea
                    id={`${formId}-assunto`}
                    name="assunto"
                    value={assunto}
                    onChange={(e) => setAssunto(e.target.value)}
                    placeholder="Ex.: revisão/negociação de contrato, cobrança, dano material/moral, etc."
                    rows={4}
                    className="mt-2 w-full rounded-xl border border-blue/20 bg-brand-white px-4 py-3 text-blue placeholder:text-blue/40 outline-none focus:border-sand focus:ring-2 focus:ring-sand/40 resize-y min-h-[112px]"
                    aria-label="Descreva seu assunto (opcional). Aviso: a consultoria jurídica é paga."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending || !canSubmit}
                  className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-green-600 px-5 py-3 text-base font-bold text-white shadow-[0_10px_24px_rgba(185,162,119,0.35)] transition hover:brightness-95 active:scale-[.99] focus:outline-none focus:ring-2 focus:ring-sand/60 focus:ring-offset-2 focus:ring-offset-brand-white disabled:opacity-60"
                  aria-live="polite"
                >
                  {isSending ? "Enviando…" : "Falar no WhatsApp"}
                </button>

                {feedback && (
                  <div
                    role="status"
                    aria-live="polite"
                    className={`mt-3 text-sm ${feedback.type === "ok" ? "text-green-600" : "text-red-600"}`}
                  >
                    {feedback.msg}
                  </div>
                )}
              </form>
            </div>

            <p className="mt-3 text-xs sm:text-sm text-brand-white/75">
              Observação: a consultoria jurídica é um serviço <strong>pago</strong>. O valor é combinado no atendimento.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
