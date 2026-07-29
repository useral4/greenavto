import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const staticRoot = path.join(projectRoot, "dist", "client");
const sourceData = JSON.parse(
  await readFile(
    path.join(projectRoot, "app", "data", "source-pages.json"),
    "utf8",
  ),
);

const sourcePagePaths = sourceData.pages.map(
  (page) => `${page.path.replace(/^\//, "")}/index.html`,
);

const serviceRoutes = [
  "/services/razrabotka-kotlovana-shpuntovanie",
  "/services/planirovka-zemli",
  "/services/burenie",
  "/services/vyvoz-grunta",
  "/services/vyvoz-spila",
  "/services/vyvoz-stroitelnogo-musora",
  "/services/arenda-avtovyshek",
  "/services/perevozka-sypuchih-materilov",
];

const publicPagePaths = [
  "index.html",
  "privacy/index.html",
  "consent/index.html",
  "404.html",
  ...sourcePagePaths,
];

async function readStaticPage(relativePath) {
  return readFile(path.join(staticRoot, relativePath), "utf8");
}

test("exports every public route as static HTML", async () => {
  await Promise.all(
    publicPagePaths.map((page) => access(path.join(staticRoot, page))),
  );

  const home = await readStaticPage("index.html");
  assert.match(home, /<html lang="ru">/);
  assert.match(home, /<title>Аренда спецтехники[^<]*ГРИНАВТО<\/title>/);
  assert.match(home, /https:\/\/greenavto\.onrender\.com\/og-green\.png/);
  assert.match(home, /<form class="request-form">/);

  const catalog = await readStaticPage("katalog-tekhniki/index.html");
  assert.match(catalog, /Каталог спецтехники/);
  assert.match(catalog, /class="source-page"/);
  assert.match(catalog, /\/source\/[a-f0-9]+\.webp/);

  const article = await readStaticPage(
    sourcePagePaths.find((page) => page.includes("/stati-i-sovety/")) ?? "",
  );
  assert.match(article, /class="source-article"/);

  const services = await readStaticPage("services/index.html");
  assert.match(services, /class="source-services-grid"/);
  assert.match(services, /class="services-menu-panel"/);
  assert.match(services, /\/source\/c30ee07abb879cef\.webp/);
  for (const route of serviceRoutes) {
    assert.match(services, new RegExp(`href="${route}"`));
  }

  const serviceDetail = await readStaticPage(
    "services/razrabotka-kotlovana-shpuntovanie/index.html",
  );
  assert.match(serviceDetail, /\/source\/c30ee07abb879cef\.webp/);
});

test("all local links and assets in exported HTML resolve", async () => {
  const references = new Set();

  for (const pagePath of publicPagePaths) {
    const html = await readStaticPage(pagePath);
    for (const match of html.matchAll(/(?:src|href)="(\/[^"#?]*)/g)) {
      references.add(match[1]);
    }
  }

  for (const reference of references) {
    const relativePath = reference.slice(1);
    const candidate =
      relativePath === ""
        ? path.join(staticRoot, "index.html")
        : path.extname(relativePath) === ""
          ? path.join(staticRoot, relativePath, "index.html")
        : path.join(staticRoot, relativePath);
    await access(candidate);
  }
});
