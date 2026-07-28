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

async function readStaticPage(relativePath) {
  return readFile(path.join(staticRoot, relativePath), "utf8");
}

test("exports every public route as static HTML", async () => {
  const pages = [
    "index.html",
    path.join("privacy", "index.html"),
    path.join("consent", "index.html"),
    "404.html",
  ];

  await Promise.all(pages.map((page) => access(path.join(staticRoot, page))));

  const home = await readStaticPage("index.html");
  assert.match(home, /<html lang="ru">/);
  assert.match(home, /<title>Аренда спецтехники[^<]*ГРИНАВТО<\/title>/);
  assert.match(home, /https:\/\/greenavto\.onrender\.com\/og-green\.png/);
  assert.match(home, /<form class="request-form">/);
});

test("all local links and assets in exported HTML resolve", async () => {
  const pagePaths = [
    "index.html",
    path.join("privacy", "index.html"),
    path.join("consent", "index.html"),
    "404.html",
  ];
  const references = new Set();

  for (const pagePath of pagePaths) {
    const html = await readStaticPage(pagePath);
    for (const match of html.matchAll(/(?:src|href)="(\/[^"#?]*)/g)) {
      references.add(match[1]);
    }
  }

  for (const reference of references) {
    const relativePath = reference.slice(1);
    const candidate =
      path.extname(relativePath) === ""
        ? path.join(staticRoot, relativePath, "index.html")
        : path.join(staticRoot, relativePath);
    await access(candidate);
  }
});
