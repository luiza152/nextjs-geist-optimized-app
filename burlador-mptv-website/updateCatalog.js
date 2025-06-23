/**
 * Script to update catalog.json daily by scraping free online databases or APIs.
 * - Replaces offline links
 * - Keeps catalog fresh
 * - Logs updates to console file
 * - Backs up old catalog before updating
 * 
 * Note: This is a basic example using node-fetch and fs.
 * You may need to adapt scraping logic to actual APIs or sources.
 */

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const CATALOG_PATH = path.join(__dirname, 'catalog.json');
const BACKUP_PATH = path.join(__dirname, `catalog_backup_${Date.now()}.json`);
const LOG_PATH = path.join(__dirname, 'update_log.txt');

// Example free APIs or sources (placeholders)
const IPTV_API = 'https://example.com/api/iptv';
const MOVIES_API = 'https://example.com/api/movies';
const MUSIC_API = 'https://example.com/api/music';

async function fetchData(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}`);
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function checkUrlOnline(url) {
  try {
    const res = await fetch(url, { method: 'HEAD', timeout: 5000 });
    return res.ok;
  } catch {
    return false;
  }
}

async function updateCatalog() {
  try {
    // Backup old catalog
    if (fs.existsSync(CATALOG_PATH)) {
      fs.copyFileSync(CATALOG_PATH, BACKUP_PATH);
      log(`Backup created at ${BACKUP_PATH}`);
    }

    // Load old catalog
    let oldCatalog = {};
    if (fs.existsSync(CATALOG_PATH)) {
      oldCatalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf-8'));
    }

    // Fetch new data
    const [iptv, movies, music] = await Promise.all([
      fetchData(IPTV_API),
      fetchData(MOVIES_API),
      fetchData(MUSIC_API),
    ]);

    // Replace offline links with new ones or keep old if online
    const newCatalog = {
      iptv: await refreshLinks(iptv, oldCatalog.iptv || []),
      movies: await refreshLinks(movies, oldCatalog.movies || []),
      music: await refreshLinks(music, oldCatalog.music || []),
      radio: oldCatalog.radio || [], // Assuming radio unchanged
      failover: oldCatalog.failover || [],
    };

    // Save new catalog
    fs.writeFileSync(CATALOG_PATH, JSON.stringify(newCatalog, null, 2));
    log('Catalog updated successfully.');

  } catch (error) {
    log(`Error updating catalog: ${error.message}`);
  }
}

async function refreshLinks(newItems, oldItems) {
  const refreshed = [];
  for (const newItem of newItems) {
    const oldItem = oldItems.find(o => o.name === newItem.name);
    if (oldItem) {
      const online = await checkUrlOnline(oldItem.url);
      if (online) {
        refreshed.push(oldItem);
        continue;
      }
    }
    refreshed.push(newItem);
  }
  return refreshed;
}

function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  console.log(logMessage);
  fs.appendFileSync(LOG_PATH, logMessage);
}

// Run update
updateCatalog();
