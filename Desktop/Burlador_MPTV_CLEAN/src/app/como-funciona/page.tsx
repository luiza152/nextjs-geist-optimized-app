"use client";

import React from "react";

const features = [
  {
    title: "Streaming Ilimitado",
    description: "Assista a filmes, séries, animes e TV ao vivo sem limites",
    icon: "🎬",
  },
  {
    title: "Múltiplos Dispositivos",
    description: "Use em até 3 telas simultaneamente: Smart TV, celular, tablet ou PC",
    icon: "📱",
  },
  {
    title: "Qualidade HD/Full HD",
    description: "Aproveite seu conteúdo favorito com a melhor qualidade de imagem",
    icon: "📺",
  },
  {
    title: "Sem Travamentos",
    description: "Sistema inteligente com múltiplas fontes para streaming sem interrupções",
    icon: "⚡",
  },
];

const steps = [
  {
    number: "1",
    title: "Escolha seu Plano",
    description: "Selecione entre os planos Mensal, Trimestral ou Semestral",
  },
  {
    number: "2",
    title: "Faça o Pagamento",
    description: "Pague com Pix, cartão ou boleto de forma rápida e segura",
  },
  {
    number: "3",
    title: "Acesse Instantaneamente",
    description: "Receba suas credenciais por email e comece a assistir",
  },
];

export default function ComoFuncionaPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Como Funciona o BURLADOR MPTV
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Streaming digital de alta qualidade com o melhor conteúdo, sem complicações
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-2xl p-6 text-center hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Steps Section */}
        <div className="bg-gray-900 rounded-3xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Comece em 3 Passos Simples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-xl font-bold">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute w-full h-0.5 bg-purple-600 top-6 left-1/2" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-center mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-center">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">Perguntas Frequentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
            <div className="bg-gray-900 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">Preciso de equipamento especial?</h3>
              <p className="text-gray-400">
                Não, você pode assistir em qualquer dispositivo com acesso à internet. Para
                melhor experiência em TVs, recomendamos usar TV Box ou Fire Stick.
              </p>
            </div>
            <div className="bg-gray-900 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">Como funciona o período gratuito?</h3>
              <p className="text-gray-400">
                Você tem 7 dias grátis para testar a plataforma. Se não gostar, cancele
                sem compromisso.
              </p>
            </div>
            <div className="bg-gray-900 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">Posso cancelar quando quiser?</h3>
              <p className="text-gray-400">
                Sim, não há fidelidade. Cancele quando desejar sem multa ou taxas
                adicionais.
              </p>
            </div>
            <div className="bg-gray-900 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">O conteúdo é atualizado?</h3>
              <p className="text-gray-400">
                Sim, nosso catálogo é atualizado diariamente com novos filmes, séries,
                animes e canais.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <a
            href="/planos"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-colors duration-200"
          >
            Começar Agora
          </a>
          <p className="mt-4 text-gray-400">
            7 dias grátis • Cancele quando quiser • Suporte 24/7
          </p>
        </div>
      </div>
    </div>
  );
}
