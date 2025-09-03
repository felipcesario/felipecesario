// src/components/analytics/GtmSectionViews.tsx
"use client";

import { useEffect } from "react";
import { gtmPush } from "@/lib/gtm";

type Props = { sectionIds: string[] };

export default function GtmSectionViews({ sectionIds }: Props) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            const id = el.id || "unknown_section";
            gtmPush({ event: "view_section", section_id: id });
          }
        }
      },
      { threshold: 0.4 }
    );

    const els: HTMLElement[] = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  return null;
}
