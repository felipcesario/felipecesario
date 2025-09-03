"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { getUTMsFromLocation, persistUTMs, loadPersistedUTMs } from "@/lib/utm";
import { gtmPush } from "@/lib/gtm";

type Props = {
  name: string;
  photoUrl: string;
  cityTag?: string;
};

type LeadResponse = { ok?: boolean; error?: string };
function isLeadResponse(x: unknown): x is LeadResponse {
  return typeof x === "object" && x !== null && ("ok" in x || "error" in x);
}

// --- helpers locais (apenas visual no input) ---
function onlyDigits(v: string) {
  return v.replace(/\D+/g, "");
}

// Formata parcialmente conforme digita (XX) XXXXX-XXXX
function formatPhoneBR(digits: string) {
  const dd = digits.slice(0, 11); // limita a 11 (DDD + 9 dígitos)
  const len = dd.length;

  if (len === 0) return "";
  if (len <= 2) return `(${dd}`;
  if (len <= 7) return `(${dd.slice(0, 2)}) ${dd.slice(2)}`;
  // 8..11
  return `(${dd.slice(0, 2)}) ${dd.slice(2, 7)}-${dd.slice(7)}`;
}

export default function Intro({ name, photoUrl, cityTag }: Props) {
  // evitar warning de variável não usada sem alterar UI
  void cityTag;

  const formId = "intro_form";
  const sectionPath = useMemo(() => {
    if (typeof window === "undefined") return "/#inicio";
    return `${window.location.pathname}#inicio`;
  }, []);

  const [nome, setNome] = useState("");
  // armazena o valor "cru" (apenas dígitos) para o webhook
  const [whatsappRaw, setWhatsappRaw] = useState("");
  // valor formatado apenas para exibir no input
  const [whatsappDisplay, setWhatsappDisplay] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState<null | { type: "ok" | "err"; msg: string }>(null);
  const [utms, setUtms] = useState(loadPersistedUTMs());

  useEffect(() => {
    const fresh = getUTMsFromLocation();
    const merged = { ...fresh, ...loadPersistedUTMs() };
    setUtms(merged);
    persistUTMs(merged);
  }, []);

  function onChangeWhatsapp(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = onlyDigits(e.target.value);
    setWhatsappRaw(digits);                 // mantém cru para o envio
    setWhatsappDisplay(formatPhoneBR(digits)); // mostra formatado no input
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFeedback(null);
    setIsSending(true);

    // início do envio
    gtmPush({
      event: "form_start",
      form_id: formId,
      section_path: sectionPath,
    });

    try {
      const payload = {
        form_id: formId,
        section_path: sectionPath,
        // 👇 mantém o mesmo shape e envia SEM máscara (apenas dígitos)
        lead: { nome, whatsapp: whatsappRaw },
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
        // body vazio ou não-json
      }

      if (!res.ok || !(isLeadResponse(data) && data.ok)) {
        const errMsg = isLeadResponse(data) && data.error ? data.error : "Falha ao enviar.";
        throw new Error(errMsg);
      }

      // sucesso
      gtmPush({
        event: "form_submit",
        form_id: formId,
        section_path: sectionPath,
        lead_fields: ["nome", "whatsapp"],
        utm_present: !!(utms.utm_source || utms.gclid || utms.fbclid),
      });

      // clique/abertura do whatsapp
      gtmPush({
        event: "click_whatsapp",
        source: formId,
        section_path: sectionPath,
        phone: "5548991447874",
      });

      window.open("https://wa.me/5548991447874", "_blank");
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
    <section
      id="inicio"
      className="relative w-full bg-blue text-brand-white overflow-hidden"
      aria-label="Seção de apresentação"
    >
      <div className="mx-auto grid max-w-7xl min-h-[88svh] grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 px-4 py-10 sm:px-6 sm:py-14 md:py-20">
        <div className="order-1 md:order-1 flex flex-col justify-center md:pl-4 lg:pl-10">
          <h1 className="font-serif text-[clamp(1.4rem,5vw,2.4rem)] leading-snug font-bold text-white text-center md:text-left">
            Preso em flagrante? Precisa de um advogado AGORA?
          </h1>

          <p className="mt-3 max-w-lg text-sm/relaxed text-brand-white/90 sm:text-base/relaxed text-center md:text-left">
            Atendimento para prisões em flagrante, audiências de custódia e casos urgentes.
          </p>

          <div className="mt-6 w-full max-w-md sm:max-w-md md:max-w-lg mx-auto md:mx-0 rounded-lg bg-black/30 backdrop-blur-md border border-white/10 shadow-lg p-6 overflow-hidden">
            <form onSubmit={onSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full rounded-md border border-white/15 bg-white/10 px-4 py-3 sm:py-4 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
                autoComplete="name"
              />

              <input
                type="tel"
                placeholder="Seu WhatsApp (DDD e número)"
                value={whatsappDisplay}
                onChange={onChangeWhatsapp}
                className="w-full rounded-md border border-white/15 bg-white/10 px-4 py-3 sm:py-4 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
                inputMode="numeric"
                autoComplete="tel"
                aria-label="Seu WhatsApp (DDD e número)"
              />

              <button
                type="submit"
                disabled={isSending}
                className="w-full rounded-md bg-red-600 px-5 py-3 sm:py-4 font-bold text-white transition-transform hover:scale-[1.01] hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 disabled:opacity-60"
              >
                {isSending ? "Enviando..." : "Falar com Advogado"}
              </button>

              {feedback && (
                <p className={`text-sm mt-2 ${feedback.type === "ok" ? "text-green-300" : "text-red-300"}`}>
                  {feedback.msg}
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="order-2 md:order-2 flex justify-center items-center">
          <div className="relative mx-auto aspect-square w-full max-w-[340px] sm:max-w-[400px] md:max-w-[440px] overflow-hidden">
            <div className="pointer-events-none absolute -inset-2 sm:-inset-3 -z-10 rounded-2xl bg-white/5 backdrop-blur-md ring-1 ring-white/15 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]" />
            <Image
              src={photoUrl}
              alt={`Foto de ${name}`}
              fill
              sizes="(min-width: 1024px) 440px, (min-width: 640px) 400px, 90vw"
              className="rounded-xl object-cover ring-1 ring-white/10"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
