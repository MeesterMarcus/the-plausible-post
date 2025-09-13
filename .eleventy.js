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

  // Collection: articles from src/articles/*.md, newest first
  eleventyConfig.addCollection("articles", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/articles/*.md")
      .sort((a, b) => b.date - a.date);
  });

  // Collection: tag list (unique tags across articles)
  eleventyConfig.addCollection("tagList", (collectionApi) => {
    const tagSet = new Set();
    collectionApi.getFilteredByGlob("src/articles/*.md").forEach((item) => {
      const tags = item.data.tags || [];
      tags.forEach((t) => tagSet.add(t));
    });
    return [...tagSet].sort();
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