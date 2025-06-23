"use client";

import React, { useState } from "react";

export default function ConfiguracoesPage() {
  const [profile, setProfile] = useState({
    name: "João Silva",
    email: "joao@email.com",
    phone: "(11) 99999-9999",
  });

  const [preferences, setPreferences] = useState({
    autoplay: true,
    notifications: true,
    quality: "auto",
    language: "pt-BR",
    parentalControl: false,
  });

  const [subscription, setSubscription] = useState({
    plan: "Trimestral",
    nextBilling: "15/02/2024",
    amount: "R$ 79,90",
    status: "Ativo",
  });

  const handleProfileChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handlePreferenceChange = (field: string, value: any) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
  };

  const saveChanges = () => {
    // Simular salvamento
    alert("Configurações salvas com sucesso!");
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Configurações</h1>
          <p className="text-gray-400">Gerencie sua conta e preferências</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-2xl p-6 sticky top-8">
              <nav className="space-y-2">
                <a href="#perfil" className="block px-4 py-2 bg-purple-600 text-white rounded-lg">
                  👤 Perfil
                </a>
                <a href="#preferencias" className="block px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                  ⚙️ Preferências
                </a>
                <a href="#assinatura" className="block px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                  💳 Assinatura
                </a>
                <a href="#dispositivos" className="block px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                  📱 Dispositivos
                </a>
                <a href="#privacidade" className="block px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                  🔒 Privacidade
                </a>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Section */}
            <section id="perfil" className="bg-gray-900 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-6">Informações do Perfil</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nome Completo</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => handleProfileChange("name", e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleProfileChange("email", e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Telefone</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => handleProfileChange("phone", e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-white"
                  />
                </div>
              </div>
            </section>

            {/* Preferences Section */}
            <section id="preferencias" className="bg-gray-900 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-6">Preferências de Reprodução</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Reprodução Automática</h3>
                    <p className="text-sm text-gray-400">Reproduzir automaticamente o próximo episódio</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.autoplay}
                      onChange={(e) => handlePreferenceChange("autoplay", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Notificações</h3>
                    <p className="text-sm text-gray-400">Receber notificações sobre novos conteúdos</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.notifications}
                      onChange={(e) => handlePreferenceChange("notifications", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Qualidade de Vídeo</label>
                  <select
                    value={preferences.quality}
                    onChange={(e) => handlePreferenceChange("quality", e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-white"
                  >
                    <option value="auto">Automática</option>
                    <option value="720p">720p HD</option>
                    <option value="1080p">1080p Full HD</option>
                    <option value="4k">4K Ultra HD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Idioma</label>
                  <select
                    value={preferences.language}
                    onChange={(e) => handlePreferenceChange("language", e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-white"
                  >
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en-US">English (US)</option>
                    <option value="es-ES">Español</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Subscription Section */}
            <section id="assinatura" className="bg-gray-900 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-6">Assinatura</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-purple-400">Plano Atual</h3>
                    <p className="text-2xl font-bold">{subscription.plan}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-400">Status</h3>
                    <span className="inline-block px-3 py-1 bg-green-600 text-white rounded-full text-sm">
                      {subscription.status}
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-400">Próxima Cobrança</h3>
                    <p className="text-lg">{subscription.nextBilling}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-400">Valor</h3>
                    <p className="text-lg font-bold text-purple-400">{subscription.amount}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex space-x-4">
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors">
                  Alterar Plano
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors">
                  Cancelar Assinatura
                </button>
              </div>
            </section>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                onClick={saveChanges}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
