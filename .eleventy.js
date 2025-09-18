/**
 * Eleventy configuration for "the-plausible-post"
 *
 * - Input directory: src
 * - Output directory: _site
 * - Passthrough copy for assets
 * - Collection "articles" from src/articles/*.md sorted by date desc
 * - Useful date filters
 */
const { DateTime } = require("luxon");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
  // RSS plugin
  eleventyConfig.addPlugin(pluginRss);
 
  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
 
  // Passthrough copy for Decap CMS admin UI
  eleventyConfig.addPassthroughCopy("admin");
 
  // Watch the assets folder so we reload during --serve
  eleventyConfig.addWatchTarget("src/assets/");
 
  // Filters
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toLocaleString(
      DateTime.DATE_MED
    );
  });
 
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toISODate();
  });
 
  // Simple date formatting filter (compatible with templates using `| date("yyyy")`)
  eleventyConfig.addFilter("date", (dateObj, format = "yyyy") => {
    if (!dateObj) return "";
    let dt;
    if (dateObj === "now") {
      dt = DateTime.utc();
    } else if (dateObj instanceof Date) {
      dt = DateTime.fromJSDate(dateObj, { zone: "utc" });
    } else {
      dt = DateTime.fromISO(String(dateObj), { zone: "utc" });
    }
    return dt.isValid ? dt.toFormat(format) : "";
  });
 
  // Custom filter to decode HTML entities
  eleventyConfig.addFilter("decodeHtmlEntities", (str) => {
    if (!str) return "";
    // Use a DOMParser to safely decode HTML entities
    const parser = new (require('jsdom').JSDOM)().window.DOMParser;
    const doc = new parser().parseFromString(str, 'text/html');
    return doc.documentElement.textContent;
  });
 
  // Custom filter to find an item in a collection based on a key-value pair
  eleventyConfig.addFilter("find", (collection, query) => {
    if (!collection || !Array.isArray(collection) || !query || typeof query !== 'object') {
      return null;
    }
    const key = Object.keys(query)[0];
    const value = query[key];
 
    return collection.find(item => {
      // Handle nested properties like { data: { isBreaking: true } }
      let current = item;
      const pathParts = key.split('.');
      for (let i = 0; i < pathParts.length; i++) {
        if (current === undefined || current === null) return false;
        current = current[pathParts[i]];
      }
      return current === value;
    });
  });
 
  // Collection: articles from src/articles/*.md, newest first
  // Only include items that are not explicitly marked as unpublished (published: false).
  // New posts can set `published: false` to keep them as drafts.
  eleventyConfig.addCollection("articles", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/articles/*.md")
      .filter((item) => {
        // Treat missing `published` as published by default; only exclude when explicitly false.
        return item.data && item.data.published !== false;
      })
      .sort((a, b) => b.date - a.date);
  });
 
  // Collection: tag list (unique tags across articles)
  // Normalize tags by slug before deduping so tags that slugify to the same path don't collide
  eleventyConfig.addCollection("tagList", (collectionApi) => {
    const tagMap = new Map(); // slug -> display name

    const slugify = (str) =>
      String(str)
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "");

    collectionApi.getFilteredByGlob("src/articles/*.md").forEach((item) => {
      const tags = item.data.tags || [];
      tags.forEach((t) => {
        const s = slugify(t);
        if (!tagMap.has(s)) tagMap.set(s, t);
      });
    });
    // Return the display names (one per unique slug), sorted for predictable output
    return [...tagMap.values()].sort((a, b) => a.localeCompare(b));
  });
 
  // Allow Nunjucks, Markdown, and 11ty JS templates
  return {
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
      output: "_site",
    },
    templateFormats: ["njk", "md", "11ty.js"],
    passthroughFileCopy: true,
  };
};