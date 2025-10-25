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

function onlyDigits(v: string) {
  return v.replace(/\D+/g, "");
}

function formatPhoneBR(digits: string) {
  const dd = digits.slice(0, 11); // limita a 11 (DDD + 9)
  const len = dd.length;

  if (len === 0) return "";
  if (len <= 2) return `(${dd}`;
  if (len <= 7) return `(${dd.slice(0, 2)}) ${dd.slice(2)}`;
  return `(${dd.slice(0, 2)}) ${dd.slice(2, 7)}-${dd.slice(7)}`;
}

type NavigatorWithBeacon = Navigator & {
  sendBeacon?: (url: string | URL, data?: BodyInit) => boolean;
};

// abrir whatsapp na mesma aba + envio em background
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
  } catch {
    // ignora erro do sendBeacon
  }
  // fallback se não houver sendBeacon
  try {
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true, // importante para a navegação imediata
    }).catch(() => {});
  } catch {
    // ignora erro do fallback
  }
}

/* ======== VALIDAÇÕES (adicionadas) ======== */
function isValidName(value: string) {
  const v = value.trim();
  // letras (com acentos), espaços, apóstrofo e hífen; pelo menos 2 caracteres
  return v.length >= 2 && /^[A-Za-zÀ-ÿ' -]+$/.test(v);
}

function isValidPhoneBR(rawDigits: string) {
  // aceita 10 (fixo) ou 11 (celular) dígitos
  const d = onlyDigits(rawDigits);
  return d.length === 10 || d.length === 11;
}
/* ========================================= */

export default function Intro({ name, photoUrl, cityTag }: Props) {
  void cityTag; // evitar warning

  const formId = "intro_form";
  const sectionPath = useMemo(() => {
    if (typeof window === "undefined") return "/#inicio";
    return `${window.location.pathname}#inicio`;
  }, []);

  const [nome, setNome] = useState("");
  // valor cru (só dígitos) para o envio
  const [whatsappRaw, setWhatsappRaw] = useState("");
  // valor formatado apenas para exibição no input
  const [whatsappDisplay, setWhatsappDisplay] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState<null | { type: "ok" | "err"; msg: string }>(null);
  const [utms, setUtms] = useState(loadPersistedUTMs());

  /* ======== ESTADO DE ERROS (adicionado) ======== */
  const [errors, setErrors] = useState<{ nome?: string; whatsapp?: string }>({});
  /* ============================================= */

  useEffect(() => {
    const fresh = getUTMsFromLocation();
    const merged = { ...fresh, ...loadPersistedUTMs() };
    setUtms(merged);
    persistUTMs(merged);
  }, []);

  function onChangeWhatsapp(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = onlyDigits(e.target.value);
    setWhatsappRaw(digits);
    setWhatsappDisplay(formatPhoneBR(digits));

    // validação em tempo real (telefone)
    if (digits === "" || isValidPhoneBR(digits)) {
      setErrors((prev) => ({ ...prev, whatsapp: undefined }));
    } else {
      setErrors((prev) => ({ ...prev, whatsapp: "Informe um WhatsApp válido (DDD + número)." }));
    }
  }

  function onChangeNome(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setNome(value);

    // validação em tempo real (nome)
    if (value === "" || isValidName(value)) {
      setErrors((prev) => ({ ...prev, nome: undefined }));
    } else {
      setErrors((prev) => ({ ...prev, nome: "Informe seu nome completo (mín. 2 letras)." }));
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFeedback(null);

    // validação no submit (não altera fluxos existentes)
    const nextErrors: { nome?: string; whatsapp?: string } = {};
    if (!isValidName(nome)) nextErrors.nome = "Informe seu nome completo (mín. 2 letras).";
    if (!isValidPhoneBR(whatsappRaw)) nextErrors.whatsapp = "Informe um WhatsApp válido (DDD + número).";

    if (nextErrors.nome || nextErrors.whatsapp) {
      setErrors(nextErrors);
      return; // impede envio se inválido, sem quebrar o resto
    }

    setIsSending(true);

    // início do envio
    gtmPush({
      event: "form_start",
      form_id: formId,
      section_path: sectionPath,
    });

    const payload = {
      form_id: formId,
      section_path: sectionPath,
      lead: { nome, whatsapp: whatsappRaw }, // sem máscara
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
      // dispara o webhook em background (não bloqueia a navegação)
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

      // mensagem inicial no whatsapp (opcional)
      const msg = `Olá, Felipe! Sou ${nome}. Vim pelo site.`;
      // abrir NA MESMA ABA evita bloqueio de pop-up
      window.location.href = buildWaLink(msg);

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
            Precisa de um advogado criminalista agora? Atendimento 24h
          </h1>

          <p className="mt-3 max-w-lg text-sm/relaxed text-brand-white/90 sm:text-base/relaxed text-center md:text-left">
            Atuação imediata em casos de prisão em flagrante, audiências de custódia, habeas corpus liberatório e urgências criminais.
          </p>

          <div className="mt-6 w-full max-w-md sm:max-w-md md:max-w-lg mx-auto md:mx-0 rounded-lg bg-black/30 backdrop-blur-md border border-white/10 shadow-lg p-6 overflow-hidden">
            <form onSubmit={onSubmit} className="space-y-4" noValidate>
              <input
                type="text"
                placeholder="Seu nome"
                value={nome}
                onChange={onChangeNome}
                className="w-full rounded-md border border-white/15 bg-white/10 px-4 py-3 sm:py-4 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
                autoComplete="name"
                name="nome"
                aria-label="Seu nome"
                aria-invalid={!!errors.nome}
                aria-describedby={errors.nome ? "erro-nome" : undefined}
              />
              {errors.nome && (
                <p id="erro-nome" className="text-xs mt-1 text-red-300">
                  {errors.nome}
                </p>
              )}

              <input
                type="tel"
                placeholder="Seu WhatsApp (DDD e número)"
                value={whatsappDisplay}
                onChange={onChangeWhatsapp}
                className="w-full rounded-md border border-white/15 bg-white/10 px-4 py-3 sm:py-4 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
                inputMode="numeric"
                autoComplete="tel"
                name="whatsapp"
                aria-label="Seu WhatsApp (DDD e número)"
                aria-invalid={!!errors.whatsapp}
                aria-describedby={errors.whatsapp ? "erro-whatsapp" : undefined}
              />
              {errors.whatsapp && (
                <p id="erro-whatsapp" className="text-xs mt-1 text-red-300">
                  {errors.whatsapp}
                </p>
              )}

              <button
                type="submit"
                disabled={isSending}
                className="w-full rounded-md bg-green-600 px-5 py-3 sm:py-4 font-bold text-white transition-transform hover:scale-[1.01] hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 disabled:opacity-60"
                aria-live="polite"
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
