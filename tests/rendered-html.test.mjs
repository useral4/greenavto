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
const homeArchiveMedia = JSON.parse(
  await readFile(
    path.join(projectRoot, "app", "data", "home-archive-media.json"),
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

const catalogMenuRoutes = [
  "/katalog-tekhniki/avtokrany",
  "/katalog-tekhniki/avtovyshki",
  "/katalog-tekhniki/gusenichnye-krany",
  "/katalog-tekhniki/gusenichnye-ekskavatory",
  "/katalog-tekhniki/kolesnyj-ekskavator",
  "/katalog-tekhniki/ekskavatory-pogruzchiki",
  "/katalog-tekhniki/mini-pogruzchiki",
  "/katalog-tekhniki/vilochnye-pogruzchiki",
  "/katalog-tekhniki/frontalnye-pogruzchiki",
];

const utilityImages = new Set([
  "/source/09119685ade63ac1.webp",
  "/source/87a5d859adfc2cbe.webp",
  "/source/f5cc784db2f31f42.webp",
  "/source/256702deb12d0928.webp",
  "/source/d21f4f7c3b04c2c0.webp",
  "/source/d0836625a5bd04a0.webp",
]);

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
  assert.match(home, /Популярные модели/);
  assert.ok(homeArchiveMedia.images.length >= 60);
  for (const image of homeArchiveMedia.images) {
    assert.ok(home.includes(`src="${image.src}"`));
  }
  for (const route of [...catalogMenuRoutes, ...serviceRoutes]) {
    assert.match(home, new RegExp(`href="${route}"`));
  }

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

function decodeHtml(value) {
  return value
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)));
}

function plainText(html) {
  return decodeHtml(
    html
      .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

test("every imported text block and content image is rendered", async () => {
  for (const page of sourceData.pages) {
    const relativePath = `${page.path.replace(/^\//, "")}/index.html`;
    const html = await readStaticPage(relativePath);
    const text = plainText(html);

    for (const block of page.blocks) {
      if (
        block.kind === "list" &&
        (
          block.text.replace(/\s+/g, " ").trim().startsWith("Главная") ||
          block.text.replace(/\s+/g, " ").trim().endsWith("/") ||
          block.text.replace(/\s+/g, " ").trim() === "Каталог техники" ||
          block.text.replace(/\s+/g, " ").trim() === "Статьи и советы"
        )
      ) {
        continue;
      }
      const expected = block.text.replace(/\s+/g, " ").trim();
      assert.ok(
        text.includes(expected),
        `Missing text on ${page.path}: ${expected.slice(0, 80)}`,
      );
    }

    for (const image of page.images) {
      if (utilityImages.has(image.src)) continue;
      assert.ok(
        html.includes(`src="${image.src}"`),
        `Missing image on ${page.path}: ${image.src}`,
      );
    }
  }
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
