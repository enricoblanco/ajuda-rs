import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";
import { Navbar } from "@/components/navbar";

import "./globals.css";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AjudaRS",
  description:
    "Site de ajuda para pessoas em situação de vulnerabilidade após enchentes no RS",
  icons: {
    icon: [
      {
        url: "/images/rsflag.png",
        href: "/images/rsflag.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="pt-br">
        <body className={inter.className}>
          <div className="flex flex-col min-h-screen text-center items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50  to-slate-200">
            <Navbar />
            {children}
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
