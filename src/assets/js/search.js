/*
  Lightweight client-side search.
  - Loads /assets/generated-search-index.json (built at Eleventy build time)
  - Performs a simple case-insensitive substring search across title, author, tags, and excerpt
  - Renders basic results under the search input
*/
(async function () {
  const input = document.getElementById("site-search");
  const resultsBox = document.getElementById("search-results");
  if (!input || !resultsBox) return;

  let index = [];
  try {
    const res = await fetch("/assets/generated-search-index.json", { cache: "no-cache" });
    index = await res.json();
  } catch (e) {
    console.error("Search index load failed", e);
    return;
  }

  function renderResults(items) {
    if (!items || items.length === 0) {
      resultsBox.innerHTML = '<div class="search-empty">No results</div>';
      resultsBox.hidden = false;
      return;
    }
    const html = items
      .slice(0, 10)
      .map(
        (it) => `
      <a class="search-item" href="${it.url}">
        <div class="search-item-title">${it.title}</div>
        <div class="search-item-meta">${it.date} — ${it.author || "Staff Writer"}</div>
        <div class="search-item-excerpt">${it.excerpt}</div>
      </a>`
      )
      .join("");
    resultsBox.innerHTML = html;
    resultsBox.hidden = false;
  }

  function doSearch(q) {
    if (!q || q.trim().length < 2) {
      resultsBox.hidden = true;
      return;
    }
    const term = q.trim().toLowerCase();
    const matches = index
      .map((it) => {
        const hay =
          ((it.title || "") + " " + (it.author || "") + " " + (it.excerpt || "") + " " + ((it.tags || []) .join(" "))).toLowerCase();
        const score = hay.indexOf(term);
        return score === -1 ? null : { it, score };
      })
      .filter(Boolean)
      .sort((a, b) => a.score - b.score)
      .map((x) => x.it);
    renderResults(matches);
  }

  let timeout = null;
  input.addEventListener("input", (e) => {
    const q = e.target.value;
    clearTimeout(timeout);
    timeout = setTimeout(() => doSearch(q), 120);
  });

  // hide results when clicking outside
  document.addEventListener("click", (e) => {
    if (!resultsBox.contains(e.target) && e.target !== input) {
      resultsBox.hidden = true;
    }
  });

  // keyboard handling: Escape clears; Enter opens first result
  input.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      input.value = "";
      resultsBox.hidden = true;
      input.blur();
    }
    if (e.key === "Enter") {
      const first = resultsBox.querySelector(".search-item");
      if (first) {
        window.location = first.getAttribute("href");
      }
    }
  });

  // accessibility: show results on focus if there is a query
  input.addEventListener("focus", (e) => {
    if (input.value && input.value.trim().length >= 2) doSearch(input.value);
  });
})();