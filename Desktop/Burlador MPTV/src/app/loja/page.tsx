"use client";

import React from "react";

const products = [
  {
    id: "tvbox-4k",
    name: "TV Box 4K Pro",
    price: "R$ 399,90",
    description: "TV Box Android 11, 4GB RAM, 32GB ROM, WiFi 5G, Bluetooth 4.0",
    image: "https://picsum.photos/400/300",
    features: [
      "Android 11",
      "4GB RAM",
      "32GB Armazenamento",
      "WiFi 5G Dual Band",
      "Bluetooth 4.0",
      "4K Ultra HD",
    ],
  },
  {
    id: "fire-stick",
    name: "Fire Stick 4K",
    price: "R$ 299,90",
    description: "Fire TV Stick 4K com Alexa, streaming em 4K, WiFi 6",
    image: "https://picsum.photos/400/300",
    features: [
      "4K Ultra HD",
      "WiFi 6",
      "Alexa Voice Remote",
      "Dolby Vision",
      "HDR10+",
      "8GB Armazenamento",
    ],
  },
  {
    id: "adaptador-wifi",
    name: "Adaptador WiFi 5G",
    price: "R$ 149,90",
    description: "Adaptador WiFi USB 5G Dual Band para Smart TV e TV Box",
    image: "https://picsum.photos/400/300",
    features: [
      "WiFi 5G Dual Band",
      "USB 3.0",
      "Compatível com Smart TV",
      "Plug and Play",
      "Alta velocidade",
      "Antena externa",
    ],
  },
  {
    id: "controle-universal",
    name: "Controle Universal Smart",
    price: "R$ 89,90",
    description: "Controle remoto universal com função de aprendizagem",
    image: "https://picsum.photos/400/300",
    features: [
      "Função Learning",
      "Compatível com TV Box",
      "Alcance de 10m",
      "2 pilhas AAA",
      "Design ergonômico",
      "Configuração fácil",
    ],
  },
];

export default function LojaPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Loja BURLADOR MPTV</h1>
          <p className="text-xl text-gray-400">
            Equipamentos de alta qualidade para sua experiência de streaming
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-900 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative aspect-video">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{product.description}</p>
                
                <div className="space-y-4 mb-6">
                  <div className="text-2xl font-bold text-purple-500">
                    {product.price}
                  </div>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <svg
                          className="w-4 h-4 text-purple-500 mr-2"
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
                </div>

                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-200">
                  Comprar Agora
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400">
            Todos os produtos com garantia de 1 ano
            <br />
            Entrega para todo Brasil
          </p>
        </div>
      </div>
    </div>
  );
}
