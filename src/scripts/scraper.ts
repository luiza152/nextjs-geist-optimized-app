import fs from 'fs';
import path from 'path';
import { MediaDatabase, Media } from '../types/media';

// Função para ler o banco de dados atual
function readDatabase(): MediaDatabase {
  const dbPath = path.join(process.cwd(), 'src/data/media.json');
  const rawData = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(rawData);
}

// Função para salvar no banco de dados
function saveDatabase(db: MediaDatabase) {
  const dbPath = path.join(process.cwd(), 'src/data/media.json');
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}

// Função para verificar se um link está ativo
async function checkLinkStatus(url: string): Promise<boolean> {
  try {
    const response = await fetch(url);
    return response.ok;
  } catch {
    return false;
  }
}

// Função para buscar fontes alternativas quando um link quebra
async function findAlternativeSource(title: string, type: string): Promise<string[]> {
  // Aqui você implementaria a lógica para buscar em diferentes fontes
  // Por exemplo: IPTV, Torrent, Open Directory, APIs públicas
  
  // Exemplo de fontes alternativas (mock)
  const alternativeSources = [
    `https://backup1.com/${type}/${encodeURIComponent(title)}`,
    `https://backup2.com/${type}/${encodeURIComponent(title)}`,
    `https://backup3.com/${type}/${encodeURIComponent(title)}`
  ];
  
  return alternativeSources;
}

// Função principal do scraper
async function runScraper() {
  console.log('Iniciando scraper...');
  
  try {
    const db = readDatabase();
    let updated = false;

    // Verifica cada categoria
    for (const category of Object.keys(db) as Array<keyof MediaDatabase>) {
      console.log(`Verificando categoria: ${category}`);
      
      // Verifica cada item na categoria
      for (const item of db[category]) {
        console.log(`Verificando: ${item.title}`);
        
        // Verifica cada fonte do item
        for (let i = 0; i < item.sources.length; i++) {
          const isActive = await checkLinkStatus(item.sources[i]);
          
          if (!isActive) {
            console.log(`Link quebrado encontrado: ${item.sources[i]}`);
            
            // Busca fontes alternativas
            const newSources = await findAlternativeSource(item.title, item.type);
            
            // Atualiza as fontes do item
            item.sources = [...new Set([...item.sources, ...newSources])];
            updated = true;
            
            console.log('Fontes atualizadas:', item.sources);
          }
        }
      }
    }

    // Se houve atualizações, salva o banco de dados
    if (updated) {
      saveDatabase(db);
      console.log('Banco de dados atualizado com sucesso!');
    } else {
      console.log('Nenhuma atualização necessária.');
    }

  } catch (error) {
    console.error('Erro durante o scraping:', error);
  }
}

// Executa o scraper a cada 6 horas
setInterval(runScraper, 6 * 60 * 60 * 1000);

// Executa imediatamente na primeira vez
runScraper();

export { runScraper };
