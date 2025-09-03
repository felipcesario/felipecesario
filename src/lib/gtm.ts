// src/lib/gtm.ts
export type GtmEvent = {
  event: string;
  [key: string]: unknown;
};

export function gtmPush(evt: GtmEvent) {
  if (typeof window === "undefined") return;
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push(evt);
}

// opcional: captura simples de utms da url atual
export function currentUTMs() {
  if (typeof window === "undefined") return {};
  const sp = new URLSearchParams(window.location.search);
  return {
    utm_source: sp.get("utm_source"),
    utm_medium: sp.get("utm_medium"),
    utm_campaign: sp.get("utm_campaign"),
    utm_term: sp.get("utm_term"),
    utm_content: sp.get("utm_content"),
    gclid: sp.get("gclid"),
    fbclid: sp.get("fbclid"),
  };
}
