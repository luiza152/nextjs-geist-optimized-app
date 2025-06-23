import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import MobileMenu from "@/components/MobileMenu";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "BURLADOR MPTV - Streaming Digital",
  description: "Plataforma de streaming digital de mídia BURLADOR MPTV",
};

const menuItems = [
  { label: "Como Funciona", href: "/como-funciona" },
  { label: "Acessar", href: "/login" },
  { label: "Assinar", href: "/planos" },
  { label: "Loja", href: "/loja" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="pt-BR" className="bg-black text-white">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${inter.variable} font-sans bg-black text-white`}>
        <div className="min-h-screen flex flex-col">
          <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-900 to-purple-700 shadow-lg">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <div className="text-3xl font-bold text-white">B</div>

                {/* Desktop Navigation */}
                <nav className="hidden md:block">
                  <ul className="flex space-x-8">
                    {menuItems.map((item) => (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          className="text-white hover:text-purple-200 transition-colors duration-200 font-medium"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Mobile Menu */}
                <MobileMenu items={menuItems} />
              </div>
            </div>
          </header>

          <main className="flex-grow container mx-auto px-4 py-6">
            {children}
          </main>

          <footer className="bg-gray-900">
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">BURLADOR MPTV</h3>
                  <p className="text-gray-400">
                    Sua plataforma de streaming digital com o melhor conteúdo.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Links Úteis</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        Termos de Uso
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        Política de Privacidade
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        Suporte
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Contato</h3>
                  <ul className="space-y-2">
                    <li className="text-gray-400">
                      Email: suporte@burlador-mptv.com
                    </li>
                    <li className="text-gray-400">
                      Telegram: @burlador_mptv
                    </li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                © 2024 BURLADOR MPTV. Todos os direitos reservados.
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
