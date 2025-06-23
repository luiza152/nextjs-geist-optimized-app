"use client";

import React, { useState } from "react";

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulação do envio de email
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Recuperar Senha</h1>
          <p className="text-gray-400">
            Digite seu email para receber instruções de recuperação
          </p>
        </div>

        <div className="bg-gray-900 rounded-2xl p-8">
          {!isSent ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-white"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
                  isLoading
                    ? "bg-purple-700 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Enviando...
                  </div>
                ) : (
                  "Enviar Instruções"
                )}
              </button>
            </form>
          ) : (
            <div className="text-center">
              <div className="mb-4 text-5xl">✉️</div>
              <h2 className="text-xl font-bold mb-2">Email Enviado!</h2>
              <p className="text-gray-400 mb-6">
                Verifique sua caixa de entrada e siga as instruções para
                recuperar sua senha.
              </p>
              <a
                href="/login"
                className="text-purple-500 hover:text-purple-400 font-semibold"
              >
                Voltar para o Login
              </a>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-gray-800 text-center">
            <a
              href="/login"
              className="text-purple-500 hover:text-purple-400 font-semibold"
            >
              Voltar para o Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
