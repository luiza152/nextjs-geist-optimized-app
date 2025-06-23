"use client";

import React, { useState, useEffect } from "react";
import { Media } from "@/types/media";

export default function DashboardPage() {
  const [recentlyWatched, setRecentlyWatched] = useState<Media[]>([]);
  const [favorites, setFavorites] = useState<Media[]>([]);
  const [watchlist, setWatchlist] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento de dados do usuário
    setTimeout(() => {
      setRecentlyWatched([
        {
          id: "recent-1",
          title: "Filme de Ação 2024",
          description: "Último filme assistido",
          type: "movie",
          cover: "https://picsum.photos/300/170",
          sources: ["https://example.com/movie1"],
          category: "Ação",
          year: 2024,
          rating: 4.5,
        },
      ]);
      setFavorites([
        {
          id: "fav-1",
          title: "Série Dramática",
          description: "Sua série favorita",
          type: "series",
          cover: "https://picsum.photos/300/170",
          sources: ["https://example.com/series1"],
          category: "Drama",
          year: 2024,
          rating: 4.7,
        },
      ]);
      setWatchlist([
        {
          id: "watch-1",
          title: "Anime de Aventura",
          description: "Para assistir depois",
          type: "anime",
          cover: "https://picsum.photos/300/170",
          sources: ["https://example.com/anime1"],
          category: "Aventura",
          year: 2024,
          rating: 4.9,
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const stats = [
    { label: "Filmes Assistidos", value: "127", icon: "🎬" },
    { label: "Séries Assistidas", value: "23", icon: "📺" },
    { label: "Horas de Streaming", value: "342h", icon: "⏱️" },
    { label: "Favoritos", value: "45", icon: "❤️" },
  ];

  const MediaCard = ({ item, showProgress = false }: { item: Media; showProgress?: boolean }) => (
    <div className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
      <div className="relative aspect-video">
        <img
          src={item.cover}
          alt={item.title}
          className="w-full h-full object-cover"
        />
        {showProgress && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
            <div className="w-full bg-gray-700 rounded-full h-1">
              <div className="bg-purple-600 h-1 rounded-full" style={{ width: "65%" }}></div>
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-1 line-clamp-1">{item.title}</h3>
        <p className="text-gray-400 text-sm mb-2">{item.category}</p>
        <div className="flex justify-between items-center">
          <span className="text-yellow-400 text-sm">★ {item.rating}</span>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-full text-sm transition-colors">
            Assistir
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Olá, João! 👋</h1>
          <p className="text-gray-400">Bem-vindo de volta ao seu dashboard</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-900 rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-purple-400">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Continue Watching */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Continue Assistindo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentlyWatched.map((item) => (
              <MediaCard key={item.id} item={item} showProgress={true} />
            ))}
          </div>
        </section>

        {/* My List */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Minha Lista</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {watchlist.map((item) => (
              <MediaCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* Favorites */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Favoritos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {favorites.map((item) => (
              <MediaCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="bg-gray-900 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-xl transition-colors">
              <div className="text-3xl mb-2">🔍</div>
              <div className="font-semibold">Explorar Catálogo</div>
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 text-white p-6 rounded-xl transition-colors">
              <div className="text-3xl mb-2">⚙️</div>
              <div className="font-semibold">Configurações</div>
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 text-white p-6 rounded-xl transition-colors">
              <div className="text-3xl mb-2">📞</div>
              <div className="font-semibold">Suporte</div>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
