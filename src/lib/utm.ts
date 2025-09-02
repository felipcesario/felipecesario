export type UTM = {
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_term?: string | null;
  utm_content?: string | null;
  gclid?: string | null;
  fbclid?: string | null;
};

export function getUTMsFromLocation(): UTM {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);

  const read = (k: string) => {
    const v = p.get(k);
    return v && v.trim() !== "" ? v : null;
  };

  return {
    utm_source: read("utm_source"),
    utm_medium: read("utm_medium"),
    utm_campaign: read("utm_campaign"),
    utm_term: read("utm_term"),
    utm_content: read("utm_content"),
    gclid: read("gclid"),
    fbclid: read("fbclid"),
  };
}

export function persistUTMs(utms: UTM) {
  if (typeof window === "undefined") return;
  try {
    const existing = JSON.parse(localStorage.getItem("fc_utms") || "{}");
    const merged = { ...existing, ...utms };
    localStorage.setItem("fc_utms", JSON.stringify(merged));
  } catch {}
}

export function loadPersistedUTMs(): UTM {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem("fc_utms") || "{}");
  } catch {
    return {};
  }
}
