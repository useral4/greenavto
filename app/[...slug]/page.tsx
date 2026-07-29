import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CatalogCalculator } from "../components/catalog-calculator";
import { SiteNavigationLinks } from "../components/services-menu";
import { categories, equipment } from "../data/lifts";
import { serviceItems } from "../data/services";
import sourceData from "../data/source-pages.json";
import {
  structuredPages,
  type StructuredPageContent,
} from "../data/structured-pages";

type ContentBlock = {
  kind: "heading" | "paragraph" | "list";
  text: string;
};

type SourceImage = {
  src: string;
  alt: string;
};

type SourcePage = {
  path: string;
  slug: string[];
  type: "catalog" | "service" | "article" | "info";
  title: string;
  description: string;
  blocks: ContentBlock[];
  images: SourceImage[];
};

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

function isVisibleLiftPath(path: string) {
  if (path.startsWith("/katalog-tekhniki/")) {
    return (
      path === "/katalog-tekhniki/avtovyshki" ||
      path.startsWith("/katalog-tekhniki/avtovyshki/")
    );
  }

  if (path.startsWith("/services/")) {
    return path.includes("avtovysh");
  }

  if (path.startsWith("/tpost/")) return false;
  if (path === "/populyarnye-modeli-specztekhniki") return false;
  return !excludedArticlePaths.has(path);
}

const pages = (sourceData.pages as SourcePage[]).filter((page) =>
  isVisibleLiftPath(page.path),
);
const phoneDisplay = "+7 (999) 008-88-84";
const phoneHref = "tel:+79990088884";
const whatsappHref = "https://wa.me/79990088884";
const telegramHref = "https://t.me/generalsite";
const email = "greenavtospb@mail.ru";

const utilityImages = new Set([
  "/source/09119685ade63ac1.webp",
  "/source/87a5d859adfc2cbe.webp",
  "/source/f5cc784db2f31f42.webp",
  "/source/256702deb12d0928.webp",
  "/source/d21f4f7c3b04c2c0.webp",
  "/source/d0836625a5bd04a0.webp",
]);

const fallbackImages: Record<SourcePage["type"], SourceImage> = {
  catalog: {
    src: "/catalog/category-lift.webp",
    alt: "Автовышка ГРИНАВТО",
  },
  service: {
    src: "/catalog/lift-28-hq.jpg",
    alt: "Автовышка на объекте",
  },
  article: {
    src: "/catalog/lift-45-work-hq.webp",
    alt: "Автовышка для высотных работ",
  },
  info: {
    src: "/catalog/lift-28-hq.jpg",
    alt: "Автовышка ГРИНАВТО",
  },
};

const priceRows = [
  ["12 м", "1 375 ₽", "11 000 ₽", "50 ₽"],
  ["15 м", "1 450 ₽", "11 600 ₽", "50 ₽"],
  ["18 м", "1 500 ₽", "12 000 ₽", "50 ₽"],
  ["22 м", "1 750 ₽", "14 000 ₽", "50 ₽"],
  ["24 м", "1 875 ₽", "15 000 ₽", "50 ₽"],
  ["25 м", "1 875 ₽", "15 000 ₽", "50 ₽"],
  ["28 м", "2 000 ₽", "16 000 ₽", "50 ₽"],
  ["30 м", "2 000 ₽", "18 000 ₽", "50 ₽"],
  ["32 м", "2 125 ₽", "19 500 ₽", "50 ₽"],
  ["35 м", "2 250 ₽", "20 000 ₽", "50 ₽"],
  ["40 м", "2 750 ₽", "24 000 ₽", "50 ₽"],
  ["45 м", "3 000 ₽", "26 000 ₽", "50 ₽"],
  ["50 м", "4 000 ₽", "40 000 ₽", "50 ₽"],
] as const;

function sanitizeText(text: string) {
  return text
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

function mentionsRemovedDirection(text: string) {
  return /автокран|гусеничн(?:ый|ые) кран|экскаватор|погрузчик|разработк[аи] котлован|планировк[аи] земл|бурени[ея]|вывоз (?:грунта|спила|строительного мусора)|земляные работы|сыпучих материал/i.test(
    text,
  );
}

function findPage(slug: string[]) {
  const path = `/${slug.join("/")}`;
  return pages.find((page) => page.path === path);
}

function cleanTitle(title: string) {
  return sanitizeText(title)
    .split("|")[0]
    .replace(/\s+[–—-]\s+(Грин ?Авто|ГРИНАВТО).*$/i, "")
    .trim();
}

function getDisplayTitle(page: SourcePage) {
  if (page.path === "/services") return "Аренда автовышек";

  const matchedService = serviceItems.find(
    (service) => service.href === page.path,
  );
  if (matchedService) return matchedService.title;

  const heading = page.blocks.find(
    (block) => block.kind === "heading" && block.text.length > 5,
  );
  return sanitizeText(heading?.text ?? cleanTitle(page.title));
}

function isBreadcrumb(block: ContentBlock) {
  if (block.kind !== "list") return false;
  const text = block.text.replace(/\s+/g, " ").trim();
  return (
    text === "Главная /" ||
    text === "Главная" ||
    text.endsWith(" /") ||
    text === "Каталог техники" ||
    text === "Статьи и советы"
  );
}

function contentFor(page: SourcePage, displayTitle: string) {
  let skippedTitle = false;
  return page.blocks
    .map((block) => ({ ...block, text: sanitizeText(block.text) }))
    .filter((block) => {
    if (isBreadcrumb(block)) return false;
    if (mentionsRemovedDirection(block.text)) return false;
    if (
      !skippedTitle &&
      block.kind === "heading" &&
      block.text.trim() === displayTitle.trim()
    ) {
      skippedTitle = true;
      return false;
    }
    return block.text.trim().length > 2;
  });
}

function imagesFor(page: SourcePage) {
  if (page.path === "/o-kompanii/otzyvy-o-nas") {
    return [fallbackImages.info];
  }

  const seen = new Set<string>();
  const images = page.images.filter((image) => {
    if (utilityImages.has(image.src) || seen.has(image.src)) return false;
    seen.add(image.src);
    return true;
  });

  if (page.path === "/services") {
    return [
      ...serviceItems.map((service) => ({
        src: service.image,
        alt: service.alt,
      })),
      ...images.filter(
        (image) =>
          !serviceItems.some((service) => service.image === image.src),
      ),
    ];
  }

  const matchedService = serviceItems.find(
    (service) => service.href === page.path,
  );
  if (matchedService) {
    return [
      { src: matchedService.image, alt: matchedService.alt },
      ...images.filter((image) => image.src !== matchedService.image),
    ];
  }

  return images.length ? images : [fallbackImages[page.type]];
}

function getRelated(page: SourcePage) {
  const children = pages.filter(
    (candidate) =>
      candidate.path !== page.path &&
      candidate.path.split("/").slice(0, -1).join("/") === page.path,
  );
  if (children.length > 0) {
    if (page.path === "/o-kompanii/stati-i-sovety") {
      const detachedArticles = pages.filter(
        (candidate) =>
          candidate.type === "article" &&
          candidate.path !== page.path &&
          !children.some((child) => child.path === candidate.path),
      );
      return [...children, ...detachedArticles];
    }
    return children;
  }

  const parent = page.path.split("/").slice(0, -1).join("/") || "/";
  const sameParent = pages.filter(
    (candidate) =>
      candidate.path !== page.path &&
      candidate.path.split("/").slice(0, -1).join("/") === parent,
  );
  const sameType = pages.filter(
    (candidate) =>
      candidate.path !== page.path &&
      candidate.type === page.type &&
      !sameParent.some((item) => item.path === candidate.path),
  );
  return [...sameParent, ...sameType].slice(0, 6);
}

function InlineMedia({
  images,
  title,
}: {
  images: SourceImage[];
  title: string;
}) {
  if (images.length === 0) return null;

  return (
    <div className={`source-inline-media${images.length === 1 ? " source-inline-media--single" : ""}`}>
      {images.map((image, index) => (
        <figure key={image.src}>
          <img
            src={image.src}
            alt={image.alt || `${title} — пример ${index + 1}`}
            loading="lazy"
            decoding="async"
          />
        </figure>
      ))}
    </div>
  );
}

function StructuredContent({
  content,
  images,
  title,
}: {
  content: StructuredPageContent;
  images: SourceImage[];
  title: string;
}) {
  return (
    <div className="source-structured">
      <div className="source-structured-intro">
        {content.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {content.highlights && (
        <dl className="source-highlights">
          {content.highlights.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      )}

      {!content.models && <InlineMedia images={images} title={title} />}

      {content.models && (
        <div className="source-models">
          {content.models.map((model) => (
            <article className="source-model-card" key={model.name}>
              <figure>
                <img
                  src={model.image}
                  alt={model.alt}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <div className="source-model-card-copy">
                <h2>{model.name}</h2>
                <dl>
                  {model.specs.map(([label, value]) => (
                    <div key={`${model.name}-${label}`}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
                {model.equipment && (
                  <div className="source-model-equipment">
                    {model.equipment.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                )}
                <div className="source-model-footer">
                  <strong>{model.price}</strong>
                  <a href={phoneHref}>Заказать</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {content.links && (
        <section className="source-height-links" aria-labelledby="height-links-title">
          <h2 id="height-links-title">
            {content.linksTitle ?? "Автовышки по высоте"}
          </h2>
          <div>
            {content.links.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </section>
      )}

      {content.sections.map((section) => (
        <section className="source-structured-section" key={section.title}>
          <h2>{section.title}</h2>
          {section.paragraphs?.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {section.items && (
            <ul>
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}

const catalogCategoryOrder = [
  "aerial-lifts",
];

const catalogFeaturedOrder = [
  "lift-12",
  "lift-18",
  "lift-28",
  "lift-45",
  "lift-50",
];

function CatalogIndex() {
  const orderedCategories = catalogCategoryOrder
    .map((id) => categories.find((category) => category.id === id))
    .filter((category) => category !== undefined);
  const featuredEquipment = catalogFeaturedOrder
    .map((id) => equipment.find((item) => item.id === id))
    .filter((item) => item !== undefined);

  return (
    <div className="catalog-index">
      <section className="catalog-index-intro">
        <p>Аренда автовышек · Санкт-Петербург и Ленинградская область</p>
        <h1>Каталог автовышек</h1>
        <div>
          <p>
            Автовышки высотой от 12 до 60 метров для монтажных, фасадных,
            коммунальных и других высотных работ.
          </p>
          <a href={phoneHref}>Подобрать автовышку ↗︎</a>
        </div>
      </section>

      <section
        className="catalog-index-categories"
        aria-labelledby="catalog-categories-title"
      >
        <div className="catalog-index-heading">
          <h2 id="catalog-categories-title">Автовышки</h2>
          <p>Выберите модель по рабочей высоте и условиям объекта.</p>
        </div>
        <div className="catalog-index-category-grid catalog-index-category-grid--single">
          {orderedCategories.map((category) => (
            <Link
              className="catalog-index-category-card"
              href={category.href}
              key={category.id}
            >
              <figure>
                <img
                  src={category.image}
                  alt={category.alt}
                  width="720"
                  height="520"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <div>
                <h3>{category.name}</h3>
                <p>
                  от {category.pricePerHour.toLocaleString("ru-RU")} ₽/ч
                </p>
                <span>Подробнее ↗︎</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section
        className="catalog-index-featured"
        aria-labelledby="catalog-featured-title"
      >
        <div className="catalog-index-heading">
          <h2 id="catalog-featured-title">Популярные автовышки</h2>
          <p>Характеристики и стоимость востребованных моделей.</p>
        </div>
        <div className="catalog-index-product-grid">
          {featuredEquipment.map((item) => (
            <article className="catalog-index-product-card" key={item.id}>
              <Link href={item.href} aria-label={`Открыть: ${item.name}`}>
                <figure>
                  <img
                    src={item.image}
                    alt={item.alt}
                    width="720"
                    height="520"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              </Link>
              <div>
                <h3>{item.name}</h3>
                <dl>
                  {item.specs.map(([label, value]) => (
                    <div key={`${item.id}-${label}`}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
                <footer>
                  <strong>от {item.price.toLocaleString("ru-RU")} ₽</strong>
                  <Link href={item.href}>Заказать ↗︎</Link>
                </footer>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="catalog-index-calculator-section">
        <CatalogCalculator />
      </section>

      <section className="catalog-index-about">
        <div>
          <span>О каталоге</span>
          <h2>Автовышка под задачу и условия объекта</h2>
        </div>
        <div>
          <p>
            В каталоге собраны модели с разной рабочей высотой,
            грузоподъёмностью люльки и рабочим вылетом стрелы. Это позволяет
            подобрать автовышку для фасадных, монтажных, коммунальных и
            рекламных работ.
          </p>
          <p>
            Автовышка предоставляется с опытным оператором. До подачи
            согласовываем характеристики модели, график, стоимость, условия
            подъезда и требования рабочей площадки.
          </p>
        </div>
      </section>

      <section
        className="catalog-index-benefits"
        aria-label="Преимущества аренды в ГРИНАВТО"
      >
        <article>
          <strong>01</strong>
          <h3>Соблюдаем сроки</h3>
          <p>Согласовываем время подачи и фиксируем договорённости.</p>
        </article>
        <article>
          <strong>02</strong>
          <h3>Быстрая подача</h3>
          <p>Подбираем ближайшую подходящую автовышку под ваш объект.</p>
        </article>
        <article>
          <strong>03</strong>
          <h3>Широкий выбор</h3>
          <p>Автовышки с рабочей высотой от 12 до 60 метров.</p>
        </article>
        <article>
          <strong>04</strong>
          <h3>Работа по договору</h3>
          <p>Заранее согласовываем стоимость и условия аренды.</p>
        </article>
      </section>
    </div>
  );
}

export function generateStaticParams() {
  return pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = findPage(slug);
  if (!page) return {};

  const structuredContent = structuredPages[page.path];
  const firstModel = structuredContent?.models?.[0];
  const metadataTitle = structuredContent?.title ?? cleanTitle(page.title);
  const metadataDescription =
    structuredContent?.intro[0] ?? sanitizeText(page.description);
  const image =
    structuredContent?.media?.hero ??
    (firstModel
      ? { src: firstModel.image, alt: firstModel.alt }
      : imagesFor(page)[0]);
  return {
    title: `${metadataTitle} | ГРИНАВТО`,
    description: metadataDescription,
    alternates: { canonical: page.path },
    openGraph: {
      title: metadataTitle,
      description: metadataDescription,
      type: page.type === "article" ? "article" : "website",
      images: [{ url: image.src, alt: image.alt || metadataTitle }],
    },
  };
}

export default async function ImportedSourcePage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const page = findPage(slug);
  if (!page) notFound();

  const structuredContent = structuredPages[page.path];
  const displayTitle = structuredContent?.title ?? getDisplayTitle(page);
  const content = contentFor(page, displayTitle);
  const images = imagesFor(page);
  const firstModel = structuredContent?.models?.[0];
  const heroImage =
    structuredContent?.media?.hero ??
    (firstModel
      ? { src: firstModel.image, alt: firstModel.alt }
      : images[0]);
  const inlineImages = structuredContent?.media?.inline ?? images.slice(1, 3);
  const structuredImages = inlineImages.length > 0 ? inlineImages : [heroImage];
  const related = getRelated(page);
  const isCatalogIndex = page.path === "/katalog-tekhniki";
  const isServicesIndex = page.path === "/services";
  const isPricePage = page.path === "/price";
  const visibleRelated = isServicesIndex
    ? related.filter(
        (item) => !serviceItems.some((service) => service.href === item.path),
      )
    : related;

  return (
    <div className="source-page">
      <header className="source-header">
        <Link className="brand source-brand" href="/" aria-label="ГРИНАВТО — на главную">
          <img
            className="brand-logo"
            src="/brand-clover.webp"
            width="48"
            height="48"
            alt=""
            aria-hidden="true"
          />
          <span className="brand-copy">
            <strong>ГРИНАВТО</strong>
            <small>Своевременная подача · Ведущие марки</small>
          </span>
        </Link>

        <nav className="source-nav" aria-label="Основная навигация">
          <SiteNavigationLinks />
        </nav>

        <a className="source-header-phone" href={phoneHref}>
          {phoneDisplay}
        </a>
      </header>

      <main>
        {isCatalogIndex ? (
          <CatalogIndex />
        ) : (
          <>
        <section className={`source-hero${displayTitle.length > 55 ? " source-hero--long" : ""}`}>
          <div className="source-hero-copy">
            <h1>{displayTitle}</h1>
            <p className="source-hero-lead">
              {structuredContent?.intro[0] ?? sanitizeText(page.description)}
            </p>
            <div className="source-actions">
              <a className="button button--green" href={phoneHref}>
                Позвонить <span aria-hidden="true">↗︎</span>
              </a>
              <a
                className="button source-button-outline"
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
              >
                Написать в WhatsApp <span aria-hidden="true">↗︎</span>
              </a>
            </div>
          </div>

          <figure
            className={`source-hero-media${
              page.path.startsWith("/katalog-tekhniki")
                ? " source-hero-media--contain"
                : ""
            }`}
          >
            <img
              src={heroImage.src}
              alt={heroImage.alt || displayTitle}
              width="1200"
              height="900"
              fetchPriority="high"
            />
          </figure>
        </section>

        <div className="source-facts" aria-label="Условия работы">
          <span><strong>24/7</strong> принимаем заявки</span>
          <span><strong>СПб + ЛО</strong> география работы</span>
          <span><strong>1 звонок</strong> для подбора автовышки</span>
        </div>

        {isServicesIndex && (
          <section className="source-services-index" aria-labelledby="services-index-title">
            <div className="source-services-heading">
              <div>
                <h2 id="services-index-title">Работы на вашем объекте</h2>
                <p>Подберём автовышку и рабочую высоту под задачу в Санкт-Петербурге и Ленинградской области.</p>
              </div>
            </div>
            <div className="source-services-grid source-services-grid--single">
              {serviceItems.map((service) => (
                <Link href={service.href} key={service.href}>
                  <figure>
                    <img
                      src={service.image}
                      alt={service.alt}
                      width="1000"
                      height="700"
                      loading="lazy"
                    />
                  </figure>
                  <div>
                    <h2>{service.title}</h2>
                    <p>{service.description}</p>
                    <i aria-hidden="true">↗︎</i>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="source-content">
          <article className="source-article">
            {isPricePage ? (
              <div className="source-price">
                <h2>Прайс-лист аренды автовышек</h2>
                <p>
                  Стоимость указана без НДС. Минимальный заказ — одна смена.
                </p>
                <div className="source-price-table-wrap">
                  <table className="source-price-table">
                    <thead>
                      <tr>
                        <th scope="col">Высота подъёма</th>
                        <th scope="col">После смены, за час</th>
                        <th scope="col">За смену</th>
                        <th scope="col">За КАД, 1 км</th>
                      </tr>
                    </thead>
                    <tbody>
                      {priceRows.map((row) => (
                        <tr key={row[0]}>
                          {row.map((cell, index) =>
                            index === 0 ? (
                              <th scope="row" key={cell}>{cell}</th>
                            ) : (
                              <td key={cell}>{cell}</td>
                            ),
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="source-price-note">
                  Точная стоимость зависит от адреса объекта, срока аренды и
                  выбранной модели. Уточните расчёт по телефону.
                </p>
              </div>
            ) : structuredContent ? (
              <StructuredContent
                content={structuredContent}
                images={structuredImages}
                title={displayTitle}
              />
            ) : (
              <>
                {content.map((block, index) => {
                  if (block.kind === "heading") {
                    return <h2 key={`${block.text}-${index}`}>{block.text}</h2>;
                  }
                  if (block.kind === "list") {
                    return (
                      <div className="source-list-item" key={`${block.text}-${index}`}>
                        <span aria-hidden="true" />
                        <p>{block.text}</p>
                      </div>
                    );
                  }
                  return <p key={`${block.text}-${index}`}>{block.text}</p>;
                })}
                <InlineMedia images={inlineImages} title={displayTitle} />
              </>
            )}
          </article>
        </section>

        {visibleRelated.length > 0 && (
          <section className="source-related" aria-labelledby="source-related-title">
            <div className="source-section-heading">
              <h2 id="source-related-title">Смотрите также</h2>
            </div>
            <div className="source-related-grid">
              {visibleRelated.map((item) => (
                <Link href={item.path} key={item.path}>
                  <strong>{cleanTitle(item.title)}</strong>
                  <i aria-hidden="true">↗︎</i>
                </Link>
              ))}
            </div>
          </section>
        )}
          </>
        )}

        <section className="source-cta">
          <div>
            <span>Подберём автовышку под объект</span>
            <h2>Один звонок —<br />и машина в работе</h2>
          </div>
          <div className="source-cta-contact">
            <a href={phoneHref}>{phoneDisplay}</a>
            <p>Позвоните или напишите — уточним задачу, подберём модель и рассчитаем стоимость.</p>
            <div className="source-actions">
              <a className="button button--green" href={whatsappHref} target="_blank" rel="noreferrer">
                WhatsApp ↗︎
              </a>
              <a className="button source-button-outline" href={telegramHref} target="_blank" rel="noreferrer">
                Telegram ↗︎
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="source-footer">
        <div className="source-footer-brand">
          <Link className="brand" href="/">
            <img
              className="brand-logo"
              src="/brand-clover.webp"
              width="48"
              height="48"
              alt=""
              aria-hidden="true"
            />
            <span className="brand-copy">
              <strong>ГРИНАВТО</strong>
              <small>Своевременная подача · Ведущие марки</small>
            </span>
          </Link>
          <p>Аренда автовышек в Санкт-Петербурге и Ленинградской области.</p>
        </div>
        <div>
          <strong>Разделы</strong>
          <Link href="/katalog-tekhniki">Каталог автовышек</Link>
          <Link href="/services/arenda-avtovyshek">Аренда автовышек</Link>
          <Link href="/price">Цены</Link>
          <Link href="/dostavka">Доставка</Link>
        </div>
        <div>
          <strong>Компания</strong>
          <Link href="/o-kompanii">О компании</Link>
          <Link href="/portfolio">Наши работы</Link>
          <Link href="/o-kompanii/otzyvy-o-nas">Отзывы</Link>
          <Link href="/kontakty">Контакты</Link>
        </div>
        <div>
          <strong>Контакты</strong>
          <a href={phoneHref}>{phoneDisplay}</a>
          <a href={`mailto:${email}`}>{email}</a>
          <Link href="/privacy">Политика конфиденциальности</Link>
          <Link href="/consent">Согласие на обработку данных</Link>
        </div>
        <div className="source-footer-bottom">
          <span>© 2026 ГРИНАВТО</span>
          <Link href="/">На главную ↑</Link>
        </div>
      </footer>
    </div>
  );
}
