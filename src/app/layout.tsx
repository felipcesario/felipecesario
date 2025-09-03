// src/app/layout.tsx
import type { Metadata } from "next";
import { PT_Serif, Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import GtmPageView from "@/components/analytics/GtmPageView";
import GtmSectionViews from "@/components/analytics/GtmSectionViews";

const ptSerif = PT_Serif({
  variable: "--font-pt-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Felipe Cesario - Advogado",
  description: "Landing page do escritório Felipe Cesario",
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-PVTVSP4N";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${ptSerif.variable} ${montserrat.variable}`}>
      <head>
        {/* dataLayer + loader */}
        <Script id="gtm-loader" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
          `}
        </Script>
        <Script
          id="gtm-src"
          src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
          strategy="afterInteractive"
        />
      </head>

      <body className="min-h-dvh overflow-x-hidden bg-brand-black text-brand-white font-sans antialiased">
        {/* noscript iframe */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* page_view por rota + view_section por interseção */}
        <GtmPageView />
        <GtmSectionViews sectionIds={["inicio", "ajuda-urgente", "contato"]} />

        {children}
      </body>
    </html>
  );
}
