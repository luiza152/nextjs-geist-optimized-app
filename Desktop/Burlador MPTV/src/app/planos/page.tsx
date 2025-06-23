"use client";

import React from "react";

const plans = [
  {
    id: "mensal",
    name: "Mensal",
    price: "R$ 29,90",
    period: "/mês",
    features: [
      "Acesso a todo conteúdo",
      "3 telas simultâneas",
      "Qualidade Full HD",
      "Sem fidelidade",
    ],
    popular: false,
  },
  {
    id: "trimestral",
    name: "Trimestral",
    price: "R$ 79,90",
    period: "/3 meses",
    features: [
      "Acesso a todo conteúdo",
      "3 telas simultâneas",
      "Qualidade Full HD",
      "Economia de R$ 9,80/mês",
      "Sem fidelidade",
    ],
    popular: true,
  },
  {
    id: "semestral",
    name: "Semestral",
    price: "R$ 149,90",
    period: "/6 meses",
    features: [
      "Acesso a todo conteúdo",
      "3 telas simultâneas",
      "Qualidade Full HD",
      "Economia de R$ 14,90/mês",
      "Sem fidelidade",
      "1 mês grátis",
    ],
    popular: false,
  },
];

export default function PlanosPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Escolha seu Plano</h1>
          <p className="text-xl text-gray-400">
            Assine agora e tenha acesso ao melhor conteúdo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-8 ${
                plan.popular
                  ? "bg-gradient-to-b from-purple-900 to-purple-800 transform scale-105"
                  : "bg-gray-900"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Mais Popular
                  </span>
                </div>
              )}

              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center mb-6">
                  <span className="text-5xl font-extrabold">{plan.price}</span>
                  <span className="text-gray-400 ml-1">{plan.period}</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-purple-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 px-6 rounded-full font-semibold transition-all duration-200 ${
                    plan.popular
                      ? "bg-white text-purple-900 hover:bg-gray-100"
                      : "bg-purple-600 text-white hover:bg-purple-700"
                  }`}
                >
                  Assinar Agora
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400">
            Todos os planos incluem 7 dias grátis.
            <br />
            Cancele quando quiser, sem multa.
          </p>
        </div>
      </div>
    </div>
  );
}
