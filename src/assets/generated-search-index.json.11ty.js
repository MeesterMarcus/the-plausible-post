module.exports = {
  // Output will be available at /assets/generated-search-index.json
  permalink: "/assets/generated-search-index.json",
  eleventyExcludeFromCollections: true,
  // render() receives the global data object; use data.collections.articles
  render: function (data) {
    const articles = (data.collections && data.collections.articles) || [];
    const list = articles.map((item) => {
      const title = item.data.title || "";
      const url = item.url || "";
      const date = item.date ? item.date.toISOString().slice(0, 10) : "";
      const author = item.data.author || "";
      const tags = item.data.tags || [];
      // Build a short excerpt from the templateContent (strip newlines)
      const raw = (item.templateContent || "").replace(/[\r\n]+/g, " ").trim();
      const excerpt = raw.length > 300 ? raw.slice(0, 300) + "…" : raw;
      return { title, url, date, author, tags, excerpt };
    });
    return JSON.stringify(list, null, 2);
  },
};