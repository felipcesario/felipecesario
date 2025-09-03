export type GtmEvent = {
  event: string;
  [key: string]: unknown;
};

type DataLayerItem = Record<string, unknown>;
type WindowWithDataLayer = Window & {
  dataLayer?: DataLayerItem[];
  google_tag_manager?: Record<string, unknown>;
};

function getDataLayer(): DataLayerItem[] {
  const w = window as WindowWithDataLayer;
  if (!w.dataLayer) w.dataLayer = [];
  return w.dataLayer;
}

export function gtmPush(evt: GtmEvent) {
  if (typeof window === "undefined") return;
  getDataLayer().push(evt);
}

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
