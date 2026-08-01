"use client";

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
  const dd = digits.slice(0, 11);
  const len = dd.length;

  if (len === 0) return "";
  if (len <= 2) return `(${dd}`;
  if (len <= 7) return `(${dd.slice(0, 2)}) ${dd.slice(2)}`;
  return `(${dd.slice(0, 2)}) ${dd.slice(2, 7)}-${dd.slice(7)}`;
}

type NavigatorWithBeacon = Navigator & {
  sendBeacon?: (url: string | URL, data?: BodyInit) => boolean;
};

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

function isValidName(value: string) {
  const v = value.trim();
  return v.length >= 2 && /^[A-Za-zÀ-ÿ' -]+$/.test(v);
}

function isValidPhoneBR(rawDigits: string) {
  const d = onlyDigits(rawDigits);
  return d.length === 10 || d.length === 11;
}

export default function Intro({ name, photoUrl, cityTag }: Props) {
  void cityTag;

  const formId = "intro_form";
  const sectionPath = useMemo(() => {
    if (typeof window === "undefined") return "/#inicio";
    return `${window.location.pathname}#inicio`;
  }, []);

  const [nome, setNome] = useState("");
  const [whatsappRaw, setWhatsappRaw] = useState("");
  const [whatsappDisplay, setWhatsappDisplay] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState<null | { type: "ok" | "err"; msg: string }>(null);
  const [utms, setUtms] = useState(loadPersistedUTMs());
  const [errors, setErrors] = useState<{ nome?: string; whatsapp?: string }>({});

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

    if (digits === "" || isValidPhoneBR(digits)) {
      setErrors((prev) => ({ ...prev, whatsapp: undefined }));
    } else {
      setErrors((prev) => ({ ...prev, whatsapp: "Informe um WhatsApp válido (DDD + número)." }));
    }
  }

  function onChangeNome(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setNome(value);

    if (value === "" || isValidName(value)) {
      setErrors((prev) => ({ ...prev, nome: undefined }));
    } else {
      setErrors((prev) => ({ ...prev, nome: "Informe seu nome completo (mín. 2 letras)." }));
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFeedback(null);

    const nextErrors: { nome?: string; whatsapp?: string } = {};
    if (!isValidName(nome)) nextErrors.nome = "Informe seu nome completo (mín. 2 letras).";
    if (!isValidPhoneBR(whatsappRaw)) nextErrors.whatsapp = "Informe um WhatsApp válido (DDD + número).";

    if (nextErrors.nome || nextErrors.whatsapp) {
      setErrors(nextErrors);
      return;
    }

    setIsSending(true);

    gtmPush({
      event: "form_start",
      form_id: formId,
      section_path: sectionPath,
    });

    const payload = {
      form_id: formId,
      section_path: sectionPath,
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

    try {
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
              />

              <input
                type="tel"
                placeholder="Seu WhatsApp (DDD e número)"
                value={whatsappDisplay}
                onChange={onChangeWhatsapp}
                className="w-full rounded-md border border-white/15 bg-white/10 px-4 py-3 sm:py-4 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />

              <button
                type="submit"
                disabled={isSending}
                className="w-full rounded-md bg-green-600 px-5 py-3 sm:py-4 font-bold text-white transition-transform hover:scale-[1.01] hover:bg-green-700 disabled:opacity-60"
              >
                {isSending ? "Enviando..." : "Falar com Advogado"}
              </button>
            </form>
          </div>
        </div>

        <div className="order-2 md:order-2 flex justify-center items-center">
          <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[370px] md:max-w-[400px] lg:max-w-[420px]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/15 shadow-xl">
              <img
                src={photoUrl}
                alt={`Foto de ${name}`}
                className="h-full w-full object-cover object-center"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}