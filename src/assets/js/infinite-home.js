/* Progressive infinite scrolling for the homepage article list. */
(function () {
  const list = document.querySelector("[data-infinite-list]");
  if (!list) return;

  const statusEl = document.querySelector("[data-infinite-status]");
  const initial = parseInt(list.getAttribute("data-infinite-initial"), 10) || 8;
  const step = parseInt(list.getAttribute("data-infinite-step"), 10) || 4;
  const articles = Array.from(list.querySelectorAll("[data-article]"));

  if (articles.length <= initial) {
    if (statusEl) statusEl.remove();
    return;
  }

  const buffer = [];
  articles.slice(initial).forEach((node) => {
    buffer.push(node);
    node.parentNode.removeChild(node);
  });

  const sentinel = document.createElement("div");
  sentinel.className = "infinite-sentinel";
  sentinel.setAttribute("aria-hidden", "true");
  sentinel.textContent = "Scroll for more stories";
  list.appendChild(sentinel);

  let hideStatusTimeout = null;
  function announce(message, autoHide = true) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.hidden = false;
    if (hideStatusTimeout) window.clearTimeout(hideStatusTimeout);
    if (autoHide) {
      hideStatusTimeout = window.setTimeout(() => {
        statusEl.hidden = true;
      }, 1800);
    }
  }

  let observer = null;
  let loadMoreButton = null;

  function markComplete() {
    sentinel.classList.add("is-complete");
    sentinel.textContent = "You're all caught up.";
    if (statusEl) {
      announce("You're all caught up.", false);
      hideStatusTimeout = window.setTimeout(() => {
        statusEl.hidden = true;
      }, 2200);
    }
    if (observer) observer.disconnect();
    if (loadMoreButton) {
      loadMoreButton.disabled = true;
      loadMoreButton.textContent = "You're all caught up.";
    }
  }

  let loading = false;
  function reveal(count) {
    if (loading) return;
    if (buffer.length === 0) {
      markComplete();
      return;
    }
    loading = true;
    announce("Loading more stories…", false);

    const nextItems = buffer.splice(0, count);
    nextItems.forEach((node) => list.insertBefore(node, sentinel));

    loading = false;
    if (buffer.length === 0) {
      markComplete();
    } else if (nextItems.length > 0) {
      const plural = nextItems.length === 1 ? "story" : "stories";
      announce(`Added ${nextItems.length} more ${plural}.`);
      sentinel.textContent = "Scroll for more stories";
    }
  }

  if ("IntersectionObserver" in window) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) reveal(step);
        });
      },
      { rootMargin: "200px 0px" }
    );
    observer.observe(sentinel);
  } else {
    loadMoreButton = document.createElement("button");
    loadMoreButton.type = "button";
    loadMoreButton.className = "infinite-load-more";
    loadMoreButton.textContent = "Load more stories";
    loadMoreButton.addEventListener("click", () => reveal(step));

    if (statusEl && statusEl.parentNode) {
      statusEl.parentNode.insertBefore(loadMoreButton, statusEl);
    } else if (list.parentNode) {
      list.parentNode.appendChild(loadMoreButton);
    }
  }

  announce(`Showing the latest ${initial} stories.`, true);
})();
