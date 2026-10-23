import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { site } from "./src/site.config";

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ]!,
  );

export default defineConfig({
  plugins: [
    react(),
    {
      name: "metadata-from-site-config",
      transformIndexHtml(html) {
        let result = html
          .replace(
            /<title>.*?<\/title>/,
            `<title>${escapeHtml(site.seo.title)}</title>`,
          )
          .replace(
            /(<meta name="description" content=")[^"]*/,
            `$1${escapeHtml(site.seo.description)}`,
          )
          .replace(
            /(<meta property="og:title" content=")[^"]*/,
            `$1${escapeHtml(site.seo.title)}`,
          )
          .replace(
            /(<meta property="og:description" content=")[^"]*/,
            `$1${escapeHtml(site.seo.description)}`,
          )
          .replace(
            /(<meta name="robots" content=")[^"]*/,
            `$1${site.demo ? "noindex, nofollow" : "index, follow"}`,
          );
        if (site.seo.url) {
          const url = site.seo.url.replace(/\/$/, "");
          result = result
            .replace(
              "</head>",
              `<link rel="canonical" href="${escapeHtml(url)}" /><meta property="og:url" content="${escapeHtml(url)}" /></head>`,
            )
            .replace(
              /(<meta property="og:image" content=")[^"]*/,
              `$1${escapeHtml(url)}/images/hero-1600.webp`,
            );
        }
        return result;
      },
      generateBundle() {
        const url = site.seo.url.replace(/\/$/, "");
        this.emitFile({
          type: "asset",
          fileName: "robots.txt",
          source: site.demo
            ? "User-agent: *\nDisallow: /\n"
            : `User-agent: *\nAllow: /\n${url ? `Sitemap: ${url}/sitemap.xml\n` : ""}`,
        });
        if (!site.demo && url)
          this.emitFile({
            type: "asset",
            fileName: "sitemap.xml",
            source: `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escapeHtml(url)}/</loc></url></urlset>`,
          });
      },
    },
  ],
  build: { assetsInlineLimit: 0 },
});
