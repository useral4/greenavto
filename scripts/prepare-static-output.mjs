import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");
const staticRoot = path.join(projectRoot, "dist", "client");
const data = JSON.parse(
  await readFile(path.join(projectRoot, "app", "data", "source-pages.json"), "utf8"),
);

const excludedArticlePaths = new Set([
  "/o-kompanii/stati-i-sovety/burenie",
  "/o-kompanii/stati-i-sovety/burenie-skvazhin",
  "/o-kompanii/stati-i-sovety/burovye-vyshki-montazh-i-ih-obsluzhivanie",
  "/o-kompanii/stati-i-sovety/ekologicheskie-aspekty-ispolzovaniya",
  "/o-kompanii/stati-i-sovety/innovatwii-i-rost",
  "/o-kompanii/stati-i-sovety/musor",
  "/o-kompanii/stati-i-sovety/planirovka",
  "/o-kompanii/stati-i-sovety/podemniki-dlya-parkovok",
  "/o-kompanii/stati-i-sovety/podymnik-na-sklade",
  "/o-kompanii/stati-i-sovety/rol-professionalnogo-obucheniya",
  "/o-kompanii/stati-i-sovety/snos-zdanei-ekskavatorom",
  "/o-kompanii/stati-i-sovety/vidy-podemnoj-tekhniki",
]);

function isVisibleLiftPath(route) {
  if (route.startsWith("/katalog-tekhniki/")) {
    return (
      route === "/katalog-tekhniki/avtovyshki" ||
      route.startsWith("/katalog-tekhniki/avtovyshki/")
    );
  }
  if (route.startsWith("/services/")) return route.includes("avtovysh");
  if (route.startsWith("/tpost/")) return false;
  if (route === "/populyarnye-modeli-specztekhniki") return false;
  return !excludedArticlePaths.has(route);
}

const publicPaths = [
  "/privacy",
  "/consent",
  ...data.pages
    .filter((page) => isVisibleLiftPath(page.path))
    .map((page) => page.path),
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
