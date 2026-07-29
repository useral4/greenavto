import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteNavigationLinks } from "../components/services-menu";
import { serviceItems } from "../data/services";
import sourceData from "../data/source-pages.json";

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

const pages = sourceData.pages as SourcePage[];
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

const typeLabels: Record<SourcePage["type"], string> = {
  catalog: "Каталог техники",
  service: "Услуги спецтехники",
  article: "Статьи и советы",
  info: "ГРИНАВТО",
};

const fallbackImages: Record<SourcePage["type"], SourceImage> = {
  catalog: {
    src: "/catalog/category-lift.webp",
    alt: "Спецтехника ГРИНАВТО",
  },
  service: {
    src: "/catalog/lift-28-hq.jpg",
    alt: "Автовышка на объекте",
  },
  article: {
    src: "/catalog/category-crane.webp",
    alt: "Спецтехника для строительных работ",
  },
  info: {
    src: "/catalog/lift-28-hq.jpg",
    alt: "Автовышка ГРИНАВТО",
  },
};

function findPage(slug: string[]) {
  const path = `/${slug.join("/")}`;
  return pages.find((page) => page.path === path);
}

function cleanTitle(title: string) {
  return title
    .split("|")[0]
    .replace(/\s+[–—-]\s+(Грин ?Авто|ГРИНАВТО).*$/i, "")
    .trim();
}

function getDisplayTitle(page: SourcePage) {
  if (page.path === "/services") return "Услуги спецтехники";

  const matchedService = serviceItems.find(
    (service) => service.href === page.path,
  );
  if (matchedService) return matchedService.title;

  const heading = page.blocks.find(
    (block) => block.kind === "heading" && block.text.length > 5,
  );
  return heading?.text ?? cleanTitle(page.title);
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
  return page.blocks.filter((block) => {
    if (isBreadcrumb(block)) return false;
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

function getBreadcrumbs(page: SourcePage) {
  const segments = page.path.split("/").filter(Boolean);
  return segments.map((_, index) => {
    const path = `/${segments.slice(0, index + 1).join("/")}`;
    const linkedPage = pages.find((candidate) => candidate.path === path);
    return {
      href: path,
      linked: Boolean(linkedPage) && index < segments.length - 1,
      label:
        linkedPage && index < segments.length - 1
          ? cleanTitle(linkedPage.title)
          : index === segments.length - 1
            ? cleanTitle(page.title)
            : segments[index].replaceAll("-", " "),
    };
  });
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

  const image = imagesFor(page)[0];
  return {
    title: `${cleanTitle(page.title)} | ГРИНАВТО`,
    description: page.description,
    alternates: { canonical: page.path },
    openGraph: {
      title: cleanTitle(page.title),
      description: page.description,
      type: page.type === "article" ? "article" : "website",
      images: [{ url: image.src, alt: image.alt || cleanTitle(page.title) }],
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

  const displayTitle = getDisplayTitle(page);
  const content = contentFor(page, displayTitle);
  const images = imagesFor(page);
  const heroImage = images[0];
  const gallery = images.slice(1);
  const breadcrumbs = getBreadcrumbs(page);
  const related = getRelated(page);
  const isServicesIndex = page.path === "/services";
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
            <small>Своевременная подача · Техника ведущих марок</small>
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
        <section className="source-hero">
          <div className="source-hero-copy">
            <p className="source-kicker">{typeLabels[page.type]} · СПб и ЛО</p>
            <nav className="source-breadcrumbs" aria-label="Хлебные крошки">
              <Link href="/">Главная</Link>
              {breadcrumbs.map((crumb) => (
                <span key={crumb.href}>
                  <i aria-hidden="true">/</i>
                  {crumb.linked ? (
                    <Link href={crumb.href}>{crumb.label}</Link>
                  ) : (
                    <span>{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
            <h1>{displayTitle}</h1>
            <p className="source-hero-lead">{page.description}</p>
            <div className="source-actions">
              <a className="button button--green" href={phoneHref}>
                Позвонить <span aria-hidden="true">↗</span>
              </a>
              <a
                className="button source-button-outline"
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
              >
                Написать в WhatsApp <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <figure className="source-hero-media">
            <img
              src={heroImage.src}
              alt={heroImage.alt || displayTitle}
              width="1200"
              height="900"
              fetchPriority="high"
            />
            <figcaption>
              <span>01</span>
              Техника для вашей задачи
            </figcaption>
          </figure>
        </section>

        <div className="source-facts" aria-label="Условия работы">
          <span><strong>24/7</strong> принимаем заявки</span>
          <span><strong>СПб + ЛО</strong> география работы</span>
          <span><strong>1 звонок</strong> для подбора техники</span>
        </div>

        {isServicesIndex && (
          <section className="source-services-index" aria-labelledby="services-index-title">
            <div className="source-services-heading">
              <span>02 / Все услуги</span>
              <div>
                <h2 id="services-index-title">Работы на вашем объекте</h2>
                <p>Подберём технику, экипаж и состав работ под задачу в Санкт-Петербурге и Ленинградской области.</p>
              </div>
            </div>
            <div className="source-services-grid">
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
                    <span>{service.number}</span>
                  </figure>
                  <div>
                    <h2>{service.title}</h2>
                    <p>{service.description}</p>
                    <i aria-hidden="true">↗</i>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="source-content">
          <aside className="source-content-aside">
            <span className="source-index">{isServicesIndex ? "03" : "02"}</span>
            <p>{typeLabels[page.type]}</p>
            <a href={phoneHref}>{phoneDisplay}</a>
          </aside>

          <article className="source-article">
            {content.map((block, index) => {
              if (block.kind === "heading") {
                return <h2 key={`${block.text}-${index}`}>{block.text}</h2>;
              }
              if (block.kind === "list") {
                return (
                  <div className="source-list-item" key={`${block.text}-${index}`}>
                    <span aria-hidden="true">↗</span>
                    <p>{block.text}</p>
                  </div>
                );
              }
              return <p key={`${block.text}-${index}`}>{block.text}</p>;
            })}
          </article>
        </section>

        {gallery.length > 0 && (
          <section className="source-gallery" aria-labelledby="source-gallery-title">
            <div className="source-section-heading">
              <span>03 / Фотографии</span>
              <h2 id="source-gallery-title">Техника и выполненные работы</h2>
            </div>
            <div className="source-gallery-grid">
              {gallery.map((image, index) => (
                <figure key={image.src} className={index % 5 === 0 ? "source-gallery-wide" : ""}>
                  <img
                    src={image.src}
                    alt={image.alt || `${displayTitle} — фото ${index + 2}`}
                    loading="lazy"
                  />
                  <figcaption>
                    <span>{String(index + 2).padStart(2, "0")}</span>
                    {image.alt || displayTitle}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {visibleRelated.length > 0 && (
          <section className="source-related" aria-labelledby="source-related-title">
            <div className="source-section-heading">
              <span>04 / Продолжить</span>
              <h2 id="source-related-title">Смотрите также</h2>
            </div>
            <div className="source-related-grid">
              {visibleRelated.map((item, index) => (
                <Link href={item.path} key={item.path}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{cleanTitle(item.title)}</strong>
                  <i aria-hidden="true">↗</i>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="source-cta">
          <div>
            <span>Подберём технику под объект</span>
            <h2>Один звонок —<br />и машина в работе</h2>
          </div>
          <div className="source-cta-contact">
            <a href={phoneHref}>{phoneDisplay}</a>
            <p>Позвоните или напишите — уточним задачу, подберём модель и рассчитаем стоимость.</p>
            <div className="source-actions">
              <a className="button button--green" href={whatsappHref} target="_blank" rel="noreferrer">
                WhatsApp ↗
              </a>
              <a className="button source-button-outline" href={telegramHref} target="_blank" rel="noreferrer">
                Telegram ↗
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
              <small>Своевременная подача · Техника ведущих марок</small>
            </span>
          </Link>
          <p>Аренда спецтехники в Санкт-Петербурге и Ленинградской области.</p>
        </div>
        <div>
          <strong>Разделы</strong>
          <Link href="/katalog-tekhniki">Каталог техники</Link>
          <Link href="/services">Услуги</Link>
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
