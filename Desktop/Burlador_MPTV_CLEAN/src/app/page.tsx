"use client";

import React, { useState, useEffect } from "react";
import { Media } from "@/types/media";
import { MediaPlayer } from "@/components/MediaPlayer";
import { MediaPlayerSource } from "@/lib/distributed-db";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedQuality, setSelectedQuality] = useState("all");
  const [content, setContent] = useState<{[key: string]: Media[]}>({});
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [systemStatus, setSystemStatus] = useState<any>(null);

  const categories = [
    { id: "all", name: "Todos", icon: "🎬" },
    { id: "movies", name: "Filmes", icon: "🎥" },
    { id: "series", name: "Séries", icon: "📺" },
    { id: "animes", name: "Animes", icon: "🎌" },
    { id: "music", name: "Música", icon: "🎵" },
    { id: "live", name: "TV ao Vivo", icon: "📡" },
    { id: "documentaries", name: "Documentários", icon: "📚" }
  ];

  const qualities = [
    { id: "all", name: "Todas as Qualidades" },
    { id: "4K", name: "4K Ultra HD" },
    { id: "1080p", name: "Full HD" },
    { id: "720p", name: "HD" },
    { id: "SD", name: "SD" }
  ];

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/media?refresh=true");
      const data = await response.json();
      setContent(data);
      setSystemStatus(data._metadata);
    } catch (error) {
      console.error("Erro ao carregar conteúdo:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchContent = async () => {
    try {
      setSearchLoading(true);
      const response = await fetch(`/api/media?search=${searchTerm}`);
      const data = await response.json();
      setContent(data);
      setSystemStatus(data._metadata);
    } catch (error) {
      console.error("Erro na busca:", error);
    } finally {
      setSearchLoading(false);
    }
  };

  const filterByCategory = async (category: string) => {
    try {
      setLoading(true);
      setSelectedCategory(category);
      if (category === "all") {
        await fetchContent();
      } else {
        const response = await fetch(`/api/media?type=${category}`);
        const data = await response.json();
        setContent(data);
        setSystemStatus(data._metadata);
      }
    } catch (error) {
      console.error("Erro ao filtrar categoria:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      searchContent();
    } else {
      fetchContent();
    }
  };

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-64">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-purple-200 rounded-full animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-purple-600 rounded-full animate-spin border-t-transparent"></div>
      </div>
    </div>
  );

  const MediaCard = ({ item }: { item: Media }) => {
    const sources = item.sources?.map((url, index) => ({
      id: `source-${index}`,
      url,
      quality: 'HD',
      type: 'stream',
      provider: 'Default',
      status: 'active',
      lastChecked: new Date()
    } as MediaPlayerSource));

    return (
      <div className="group relative bg-gray-900 rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <div className="relative aspect-video">
          <img
            src={item.cover}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Quality Badge */}
          <div className="absolute top-2 right-2 px-2 py-1 bg-purple-600 text-white text-sm rounded-full">
            {sources[0]?.quality || 'HD'}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold mb-2 line-clamp-1">{item.title}</h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {item.description}
          </p>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-purple-400 text-sm">{item.year}</span>
              {item.rating && (
                <span className="text-yellow-400 text-sm">★ {item.rating}</span>
              )}
            </div>
            <button
              onClick={() => setSelectedMedia(item)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition-colors duration-200 transform hover:scale-105"
            >
              Assistir
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="text-white min-h-screen">
      {/* Status do Sistema */}
      {systemStatus && (
        <div className="mb-8 p-4 bg-gray-900/50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-3 h-3 rounded-full ${
                systemStatus.systemHealth === 'operational' ? 'bg-green-500' : 'bg-yellow-500'
              }`}></div>
              <span className="text-sm">
                Sistema {systemStatus.systemHealth === 'operational' ? 'Operacional' : 'Em Manutenção'}
              </span>
            </div>
            <div className="text-sm text-gray-400">
              {systemStatus.totalItems} itens disponíveis
            </div>
          </div>
        </div>
      )}

      {/* Busca */}
      <section className="mb-8">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Buscar filmes, séries, músicas..."
            className="w-full p-4 pl-6 rounded-full bg-gray-900/80 backdrop-blur text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            disabled={searchLoading}
            className={`absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-full font-semibold transition-all duration-300 ${
              searchLoading ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {searchLoading ? "Buscando..." : "Buscar"}
          </button>
        </form>
      </section>

      {/* Categorias */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Categorias</h2>
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => filterByCategory(cat.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full whitespace-nowrap transition-all duration-300 ${
                selectedCategory === cat.id
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Filtro de Qualidade */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Qualidade</h2>
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
          {qualities.map((quality) => (
            <button
              key={quality.id}
              onClick={() => setSelectedQuality(quality.id)}
              className={`px-6 py-3 rounded-full whitespace-nowrap transition-all duration-300 ${
                selectedQuality === quality.id
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white"
              }`}
            >
              {quality.name}
            </button>
          ))}
        </div>
      </section>

      {/* Conteúdo */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        Object.entries(content).map(([category, items]) => {
          if (!items || !Array.isArray(items) || items.length === 0) return null;
          if (category === '_metadata') return null;

          // Filtrar apenas conteúdos dublados PT-BR
          const filteredItems = items.filter((item: any) => item.metadata?.language === 'pt-br-dublado');

          if (filteredItems.length === 0) return null;

          return (
            <section key={category} className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="mr-2">
                  {categories.find(cat => cat.id === category)?.icon}
                </span>
                <span className="capitalize">
                  {categories.find(cat => cat.id === category)?.name || category}
                </span>
                <span className="ml-2 text-sm text-gray-400">
                  ({filteredItems.length} itens)
                </span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems
                  .filter(item => selectedQuality === 'all' || item.sources?.some(s => s.includes(selectedQuality)))
                  .map((item: Media) => (
                    <MediaCard key={item.id} item={item} />
                  ))}
              </div>
            </section>
          );
        })
      )}

      {/* Player Modal */}
      {selectedMedia && (
        <MediaPlayer
          sources={selectedMedia.sources?.map((url, index) => ({
            id: `source-${index}`,
            url,
            quality: 'HD',
            type: 'stream',
            provider: 'Default',
            status: 'active',
            lastChecked: new Date()
          }))}
          title={selectedMedia.title}
          onClose={() => setSelectedMedia(null)}
        />
      )}
    </div>
  );
}
