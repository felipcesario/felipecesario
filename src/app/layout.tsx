import type { Metadata } from "next";
import { PT_Serif, Montserrat } from "next/font/google"; 
import "./globals.css";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${ptSerif.variable} ${montserrat.variable}`}>
      <body className="min-h-dvh bg-brand-black text-brand-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
