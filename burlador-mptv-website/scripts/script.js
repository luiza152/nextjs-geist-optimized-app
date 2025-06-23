document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const loginBtn = document.getElementById("loginBtn");
  const loginModal = document.getElementById("loginModal");
  const cancelLogin = document.getElementById("cancelLogin");
  const loginForm = document.getElementById("loginForm");

  const iptvCards = document.getElementById("iptvCards");
  const moviesCards = document.getElementById("moviesCards");
  const musicCards = document.getElementById("musicCards");
  const radioCards = document.getElementById("radioCards");

  let catalog = null;
  const failoverServers = [];

  // Check if URL is online, else fallback to failover
  async function checkUrl(url) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      const response = await fetch(url, { method: "HEAD", signal: controller.signal });
      clearTimeout(timeoutId);
      if (!response.ok) throw new Error("Response not OK");
      return url;
    } catch (error) {
      console.warn(`URL down: ${url}, trying failover...`);
      for (const backupUrl of failoverServers) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000);
          const response = await fetch(backupUrl, { method: "HEAD", signal: controller.signal });
          clearTimeout(timeoutId);
          if (response.ok) {
            console.log(`Failover to backup URL: ${backupUrl}`);
            return backupUrl;
          }
        } catch {}
      }
      console.error("All failover URLs are down.");
      return url; // fallback to original if all failovers fail
    }
  }

  // Load catalog.json and render cards
  fetch("catalog.json")
    .then((res) => res.json())
    .then(async (data) => {
      catalog = data;
      failoverServers.push(...(catalog.failover || []));
      await renderCards(catalog);
    })
    .catch((err) => {
      console.error("Erro ao carregar catálogo:", err);
    });

  async function renderCards(data) {
    await renderSection(data.iptv, iptvCards);
    await renderSection(data.movies, moviesCards);
    await renderSection(data.music, musicCards);
    await renderSection(data.radio, radioCards);
  }

  async function renderSection(items, container) {
    container.innerHTML = "";
    for (const item of items) {
      const card = document.createElement("div");
      card.className = "card";
      card.tabIndex = 0;
      const checkedUrl = await checkUrl(item.url);
      card.innerHTML = `
        <img src="${item.image || item.thumb || ''}" alt="${item.title || item.name}" />
        <div class="p-4">
          <h3 class="card-title">${item.title || item.name}</h3>
          <p class="card-description">${item.description || ''}</p>
        </div>
      `;
      card.addEventListener("click", () => {
        window.open(checkedUrl, "_blank");
      });
      container.appendChild(card);
    }
  }

  // Search functionality
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    if (!catalog) return;

    const filtered = {
      iptv: filterItems(catalog.iptv, query),
      movies: filterItems(catalog.movies, query),
      music: filterItems(catalog.music, query),
      radio: filterItems(catalog.radio, query),
    };
    renderCards(filtered);
  });

  function filterItems(items, query) {
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );
  }

  // Login modal open/close
  loginBtn.addEventListener("click", () => {
    loginModal.classList.remove("hidden");
  });

  cancelLogin.addEventListener("click", () => {
    loginModal.classList.add("hidden");
  });

  // Login form submit
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = loginForm.email.value.trim();
    const password = loginForm.password.value.trim();

    if (!email || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // Simulate login success
    alert("Login realizado com sucesso!");
    loginModal.classList.add("hidden");
    loginForm.reset();
  });

  // Close modal on outside click
  loginModal.addEventListener("click", (e) => {
    if (e.target === loginModal) {
      loginModal.classList.add("hidden");
    }
  });

  // Accessibility: close modal on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !loginModal.classList.contains("hidden")) {
      loginModal.classList.add("hidden");
    }
  });
});
