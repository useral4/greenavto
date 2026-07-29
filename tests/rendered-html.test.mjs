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

const visibleSourcePages = sourceData.pages.filter((page) =>
  isVisibleLiftPath(page.path),
);
const sourcePagePaths = visibleSourcePages.map(
  (page) => `${page.path.replace(/^\//, "")}/index.html`,
);

const serviceRoutes = [
  "/services/arenda-avtovyshek",
];

const catalogMenuRoutes = [
  "/katalog-tekhniki/avtovyshki",
];

const structuredPagePaths = new Set([
  "/katalog-tekhniki",
  "/services",
  ...serviceRoutes,
  ...catalogMenuRoutes,
  "/katalog-tekhniki/avtovyshki/arenda-avtovyshki-12m",
  "/katalog-tekhniki/avtovyshki/arenda-avtovyshki-45m",
  "/o-kompanii/stati-i-sovety",
  "/o-kompanii/kak-opredelit-neobhodimuyu-vysotu-avtovyshki",
]);

const utilityImages = new Set([
  "/source/09119685ade63ac1.webp",
  "/source/87a5d859adfc2cbe.webp",
  "/source/f5cc784db2f31f42.webp",
  "/source/256702deb12d0928.webp",
  "/source/d21f4f7c3b04c2c0.webp",
  "/source/d0836625a5bd04a0.webp",
  "/source/13d0266a29b30ab9.webp",
  "/source/5dfa1575e220882c.webp",
  "/source/a0763f24b291e1a6.webp",
  "/source/aa1095c4c14de397.webp",
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
  for (const pagePath of publicPagePaths) {
    const html = await readStaticPage(pagePath);
    assert.doesNotMatch(
      html,
      /\u2197(?!\uFE0E)/u,
      `Emoji-style diagonal arrow on ${pagePath}`,
    );
  }

  const home = await readStaticPage("index.html");
  assert.match(home, /<html lang="ru">/);
  assert.match(home, /<title>Аренда автовышек[^<]*ГРИНАВТО<\/title>/);
  assert.match(home, /https:\/\/greenavto\.onrender\.com\/og-green\.png/);
  assert.match(home, /<form class="request-form">/);
  assert.match(home, /Популярные модели/);
  assert.doesNotMatch(home, /На связи круглосуточно/);
  assert.doesNotMatch(home, /Все изображения|из архива|Материалы исходного сайта/);
  for (const route of [...catalogMenuRoutes, ...serviceRoutes]) {
    assert.match(home, new RegExp(`href="${route}"`));
  }
  assert.doesNotMatch(home, /href="\/katalog-tekhniki\/avtokrany"/);
  assert.doesNotMatch(home, /href="\/services\/burenie"/);

  const catalog = await readStaticPage("katalog-tekhniki/index.html");
  assert.match(catalog, /Каталог автовышек/);
  assert.match(catalog, /class="source-page"/);
  assert.match(catalog, /class="catalog-index"/);
  assert.match(catalog, /Популярные автовышки/);
  assert.match(catalog, /Примерная стоимость аренды/);
  assert.match(catalog, /\/catalog\/category-lift\.webp/);
  assert.doesNotMatch(catalog, /\/catalog\/category-crane\.webp/);

  const article = await readStaticPage(
    sourcePagePaths.find((page) => page.includes("/stati-i-sovety/")) ?? "",
  );
  assert.match(article, /class="source-article"/);
  assert.doesNotMatch(article, /class="source-gallery"/);

  const services = await readStaticPage("services/index.html");
  assert.match(services, /class="source-services-grid(?: |")/);
  assert.match(services, /class="services-menu-panel"/);
  assert.match(services, /\/catalog\/lift-28-hq\.jpg/);
  assert.doesNotMatch(services, /href="\/services\/vyvoz-grunta"/);
  for (const route of serviceRoutes) {
    assert.match(services, new RegExp(`href="${route}"`));
  }

  const serviceDetail = await readStaticPage(
    "services/arenda-avtovyshek/index.html",
  );
  assert.match(serviceDetail, /\/catalog\/lift-28-hq\.jpg/);

  const price = await readStaticPage("price/index.html");
  assert.match(price, /class="source-price-table"/);
  assert.match(price, /12 м/);
  assert.match(price, /50 м/);
  assert.doesNotMatch(
    price,
    /Введите ваш номер, чтобы мы отправили вам каталог в Whatsapp/i,
  );

  const reviews = await readStaticPage(
    "o-kompanii/otzyvy-o-nas/index.html",
  );
  assert.doesNotMatch(reviews, /class="source-gallery"/);

  for (const route of [...structuredPagePaths].filter(
    (item) => item !== "/katalog-tekhniki",
  )) {
    const html = await readStaticPage(`${route.slice(1)}/index.html`);
    assert.match(html, /class="source-structured"/);
    assert.doesNotMatch(
      html,
      /сео специалист|р\/ч р\.|Введите ваш номер, чтобы мы отправили вам каталог/i,
    );
  }

  for (const route of catalogMenuRoutes) {
    const html = await readStaticPage(`${route.slice(1)}/index.html`);
    assert.match(html, /class="source-models"/);
    assert.match(html, /class="source-model-footer"/);
  }

  const lift12 = await readStaticPage(
    "katalog-tekhniki/avtovyshki/arenda-avtovyshki-12m/index.html",
  );
  assert.match(lift12, /class="source-highlights"/);
  assert.match(lift12, /class="source-inline-media/);

  const lift45 = await readStaticPage(
    "katalog-tekhniki/avtovyshki/arenda-avtovyshki-45m/index.html",
  );
  assert.match(lift45, /\/catalog\/lift-45-hero-hq\.webp/);
  assert.match(lift45, /\/catalog\/lift-45-work-hq\.webp/);
  assert.doesNotMatch(
    lift45,
    /\/source\/(?:13d0266a29b30ab9|5dfa1575e220882c)\.webp/,
  );

  for (const pagePath of sourcePagePaths.filter((page) =>
    page.startsWith("katalog-tekhniki/avtovyshki/arenda-avtovyshki-"),
  )) {
    const html = await readStaticPage(pagePath);
    assert.doesNotMatch(
      html,
      /\/source\/(?:13d0266a29b30ab9|5dfa1575e220882c|a0763f24b291e1a6|aa1095c4c14de397)\.webp/,
      `Unexpected promotional image on ${pagePath}`,
    );
  }

  await assert.rejects(
    access(path.join(staticRoot, "katalog-tekhniki/avtokrany/index.html")),
  );
  await assert.rejects(
    access(path.join(staticRoot, "services/burenie/index.html")),
  );
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

function sanitizeImportedText(value) {
  return value
    .replace(/[█▀▄▌▐░▒▓▬]+/g, " ")
    .replace(/\b(КАЧЕСТВО|СТОИМОСТЬ|ГРУНТА)\b/g, (word) =>
      word.toLocaleLowerCase("ru"),
    )
    .replace(/\bHundai\b/g, "Hyundai")
    .replace(/\bэскаватор\b/gi, "экскаватор")
    .replace(/различной спецтехники/gi, "автовышек разных моделей")
    .replace(/аренды нашей спецтехники/gi, "аренды автовышек")
    .replace(/аренд[аеуы] спецтехники/gi, "аренда автовышек")
    .replace(/единиц спецтехники/gi, "автовышек в парке")
    .replace(/качественной спецтехники/gi, "исправных автовышек")
    .replace(/широкий выбор спецтехники/gi, "широкий выбор автовышек")
    .replace(/спецтехникой/gi, "автовышкой")
    .replace(/спецтехнику/gi, "автовышку")
    .replace(/спецтехники/gi, "автовышек")
    .replace(/спецтехника/gi, "автовышка")
    .replace(/\bм\s*3\b/gi, "м³")
    .replace(/(\d)\s*р\/ч\s*р\.?/gi, "$1 ₽/ч")
    .replace(/(\d)\s*р\.(?=\s|$)/gi, "$1 ₽")
    .replace(/\s+:/g, ":")
    .replace(/\s+/g, " ")
    .trim();
}

function mentionsRemovedDirection(value) {
  return /автокран|гусеничн(?:ый|ые) кран|экскаватор|погрузчик|разработк[аи] котлован|планировк[аи] земл|бурени[ея]|вывоз (?:грунта|спила|строительного мусора)|земляные работы|сыпучих материал/i.test(
    value,
  );
}

test("every imported text block and content image is rendered", async () => {
  for (const page of visibleSourcePages) {
    const relativePath = `${page.path.replace(/^\//, "")}/index.html`;
    const html = await readStaticPage(relativePath);
    const text = plainText(html);

    for (const block of page.path === "/price" || structuredPagePaths.has(page.path) ? [] : page.blocks) {
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
      if (mentionsRemovedDirection(block.text)) continue;
      const expected = sanitizeImportedText(block.text);
      if (!expected) continue;
      assert.ok(
        text.includes(expected),
        `Missing text on ${page.path}: ${expected.slice(0, 80)}`,
      );
    }

    const contentImages = page.images.filter(
      (image) => !utilityImages.has(image.src),
    );
    if (contentImages.length > 0 && page.path !== "/katalog-tekhniki") {
      assert.match(
        html,
        /<figure class="source-hero-media(?: [^"]*)?"><img[^>]+src="\/[^"]+"/,
        `Missing primary image on ${page.path}`,
      );
    }
    assert.doesNotMatch(
      html,
      /class="source-gallery"/,
      `Unexpected gallery on ${page.path}`,
    );
    assert.doesNotMatch(
      html,
      /class="source-breadcrumbs"|class="source-content-aside"/,
      `Unexpected imported navigation labels on ${page.path}`,
    );
    assert.doesNotMatch(
      html,
      /[█▀▄▌▐░▒▓▬]/,
      `Unexpected source symbols on ${page.path}`,
    );
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
