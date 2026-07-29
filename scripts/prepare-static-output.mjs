import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");
const staticRoot = path.join(projectRoot, "dist", "client");
const data = JSON.parse(
  await readFile(path.join(projectRoot, "app", "data", "source-pages.json"), "utf8"),
);

const publicPaths = [
  "/privacy",
  "/consent",
  ...data.pages.map((page) => page.path),
];

for (const route of publicPaths) {
  const relative = route.replace(/^\//, "");
  const htmlFile = path.join(staticRoot, `${relative}.html`);
  const cleanDirectory = path.join(staticRoot, relative);
  await mkdir(cleanDirectory, { recursive: true });
  await copyFile(htmlFile, path.join(cleanDirectory, "index.html"));
}

const urls = ["/", ...publicPaths]
  .map(
    (route) =>
      `  <url><loc>https://greenavto.onrender.com${route}</loc><changefreq>${
        route === "/" ? "weekly" : "monthly"
      }</changefreq><priority>${route === "/" ? "1.0" : "0.7"}</priority></url>`,
  )
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

await writeFile(path.join(projectRoot, "public", "sitemap.xml"), sitemap, "utf8");
await writeFile(path.join(staticRoot, "sitemap.xml"), sitemap, "utf8");

console.log(`prepared clean URLs=${publicPaths.length} sitemap URLs=${publicPaths.length + 1}`);
