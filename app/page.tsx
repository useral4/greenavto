"use client";

import Link from "next/link";
import { FormEvent, MouseEvent, useEffect, useState } from "react";
import { SiteNavigationLinks } from "./components/services-menu";
import { equipment, liftPriceList } from "./data/lifts";
import { serviceItems } from "./data/services";

const phoneDisplay = "+7 (999) 008-88-84";
const phoneHref = "tel:+79990088884";
const whatsappHref = "https://wa.me/79990088884";
const telegramHref = "https://t.me/generalsite";
const email = "greenavtospb@mail.ru";

const liftEquipment = equipment.filter((item) => item.kind === "lift");
const featuredLiftIds = new Set([
  "lift-18",
  "lift-22",
  "lift-24",
  "lift-28",
  "lift-45",
]);
const featuredLiftEquipment = liftEquipment.filter((item) =>
  featuredLiftIds.has(item.id),
);

const offers = [
  {
    number: "01",
    title: "Одна смена в подарок",
    text: "При заказе двух автовышек на 10 смен и более.",
  },
  {
    number: "02",
    title: "Скидка 10%",
    text: "При заказе техники на срок от 20 смен.",
  },
  {
    number: "03",
    title: "Два набора пиццы",
    text: "При заказе автовышки в аренду на сумму от 50 000 ₽.",
  },
  {
    number: "04",
    title: "Первый заказ −10%",
    text: "Специальное предложение для новых клиентов.",
  },
];

const companyFacts = [
  ["12–60 м", "рабочая высота"],
  ["100%", "техника проходит обслуживание"],
  ["1 988", "довольных клиентов"],
  ["15", "лет опыта"],
];

const testimonials = [
  {
    text: "Я арендовал автовышку у них и был очень доволен. Сотрудники были очень дружелюбны и помогли выбрать подходящую модель. Работа была выполнена без проблем.",
    name: "Кирилл Яковлев",
  },
  {
    text: "Это надёжная компания, у них я арендовала автовышку для ремонта моего дома. Сотрудники быстро оформили все документы, и автовышка была в идеальном состоянии.",
    name: "Александра Сомова",
  },
  {
    text: "Они предоставляют отличный сервис! Я арендовала у них автовышку для обрезки деревьев в моём саду. Всё прошло гладко, автовышка была доставлена вовремя, а сотрудники — профессионалы своего дела.",
    name: "Агата Ягудина",
  },
];

const marqueeItems = [
  "АРЕНДА АВТОВЫШЕК",
  "САНКТ-ПЕТЕРБУРГ И ЛО",
  "СВОЕВРЕМЕННАЯ ПОДАЧА",
  "ВЫСОТА ОТ 12 ДО 60 М",
  "ШОССЕЙНЫЕ И ВЕЗДЕХОДНЫЕ",
];

const featuredArticles = [
  {
    href: "/o-kompanii/stati-i-sovety/kak-pravilno-zakazat-avtovyshku",
    number: "01",
    title: "Как правильно заказать автовышку",
    text: "Какие параметры объекта сообщить менеджеру, чтобы техника подошла с первого раза.",
  },
  {
    href: "/o-kompanii/stati-i-sovety/kak-vybrat-podkhodyashhuyu-avtovyshku",
    number: "02",
    title: "Как выбрать подходящую автовышку",
    text: "Разбираемся в рабочей высоте, вылете стрелы, грузоподъёмности и подъезде.",
  },
  {
    href: "/o-kompanii/stati-i-sovety/osobennosti-ekspluataczii-v-temnoe-vremya-sutok",
    number: "03",
    title: "Работа автовышки ночью",
    text: "Особенности безопасной эксплуатации техники в тёмное время суток.",
  },
];

const benefits = [
  {
    number: "01",
    title: "Соблюдаем сроки",
    text: "Несём ответственность за выполнение согласованных сроков и договорённостей.",
  },
  {
    number: "02",
    title: "Быстрая подача",
    text: "Автопарки в разных районах города помогают быстрее поставить технику на объект.",
  },
  {
    number: "03",
    title: "Широкий выбор",
    text: "Подбираем автовышку по рабочей высоте, вылету стрелы и условиям площадки.",
  },
  {
    number: "04",
    title: "Документы и договор",
    text: "Помогаем с необходимой документацией и фиксируем условия в договоре.",
  },
];

const process = [
  ["01", "Заявка", "Расскажите, где и что нужно сделать."],
  ["02", "Подбор", "Уточним рабочую высоту, вылет стрелы и условия площадки."],
  ["03", "Расчёт", "Подтвердим подходящую машину, дату и стоимость."],
  ["04", "Подача", "Доставим согласованную автовышку на объект."],
];

const works = [
  ["01 / 04", "Фасадные работы", "Монтаж и обслуживание", "/catalog/lift-28-hq.jpg", "Автовышка для фасадных работ"],
  ["02 / 04", "Уличное освещение", "Монтаж и ремонт", "/catalog/lift-18-hq.webp", "Автовышка для обслуживания уличного освещения"],
  ["03 / 04", "Обрезка деревьев", "Безопасная работа на высоте", "/catalog/lift-45-work-hq.webp", "Автовышка для обрезки деревьев"],
  ["04 / 04", "Реклама и вывески", "Монтаж конструкций", "/catalog/lift-45-hero-hq.webp", "Автовышка для монтажа рекламы"],
];

const faqs = [
  {
    question: "Как подобрать подходящую автовышку?",
    answer:
      "Сообщите вид работ, требуемую высоту и условия подъезда. Если точных данных нет, опишите задачу — менеджер поможет определить подходящую модель.",
  },
  {
    question: "Можно заказать автовышку на сегодня?",
    answer:
      "Срочная подача зависит от свободных автовышек и адреса объекта. Позвоните или отправьте заявку — оперативно проверим доступность.",
  },
  {
    question: "Что входит в стоимость?",
    answer:
      "Состав услуги, длительность смены, доставка и дополнительные условия подтверждаются при расчёте конкретной модели.",
  },
  {
    question: "Выезжаете в Ленинградскую область?",
    answer:
      "Да. Стоимость и время подачи зависят от удалённости объекта и выбранной автовышки.",
  },
  {
    question: "Можно работать ночью и в выходные?",
    answer:
      "Заявки принимаются круглосуточно. Возможность работ в конкретное время согласовывается с учётом автовышки, объекта и местных ограничений.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "ГРИНАВТО",
  description:
    "Аренда автовышек в Санкт-Петербурге и Ленинградской области.",
  telephone: "+7-999-008-88-84",
  email,
  areaServed: ["Санкт-Петербург", "Ленинградская область"],
  openingHours: "Mo-Su 00:00-23:59",
  serviceType: "Аренда автовышек",
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [cookieOpen, setCookieOpen] = useState(false);

  useEffect(() => {
    setCookieOpen(localStorage.getItem("greenauto-cookie-choice") === null);
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  function saveCookieChoice(choice: "necessary" | "all") {
    localStorage.setItem("greenauto-cookie-choice", choice);
    setCookieOpen(false);
  }

  function scrollToRequest(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const requestSection = document.getElementById("request");
    if (!requestSection) return;

    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    requestSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <header className="site-header">
        <Link className="brand brand--header" href="/" aria-label="ГРИНАВТО — на главную">
          <img
            className="brand-logo"
            src="/brand-clover-transparent.png"
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

        <nav className={menuOpen ? "main-nav main-nav--open" : "main-nav"} aria-label="Основная навигация">
          <SiteNavigationLinks />
          <a className="nav-phone" href={phoneHref}>{phoneDisplay}</a>
        </nav>

        <a className="header-cta" href="#request" onClick={scrollToRequest}>
          Рассчитать стоимость <span aria-hidden="true">↗︎</span>
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-photo" aria-hidden="true" />
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-rail" aria-hidden="true">
            <span>24/7</span>
          </div>

          <div className="hero-content">
            <p className="eyebrow eyebrow--light">Санкт-Петербург / Ленинградская область</p>
            <h1 id="hero-title">
              Аренда
              <br />
              автовышек
              <br />
              <em>без задержек</em>
            </h1>
            <p className="hero-lead">
              Автовышки высотой от 12 до 60 метров для объектов
              Санкт-Петербурга и Ленинградской области.
            </p>
            <div className="hero-actions">
              <a className="button button--green" href="#request" onClick={scrollToRequest}>
                Подобрать автовышку <span aria-hidden="true">↗︎</span>
              </a>
              <a className="text-link text-link--light" href={phoneHref}>
                Позвонить <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div className="hero-stats" aria-label="Ключевая информация">
            <div>
              <strong>24/7</strong>
              <span>приём заявок</span>
            </div>
            <div>
              <strong>СПб + ЛО</strong>
              <span>география работы</span>
            </div>
            <div>
              <strong>1 звонок</strong>
              <span>для подбора автовышки</span>
            </div>
          </div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[0, 1].map((group) => (
              <div className="marquee-group" key={group}>
                {marqueeItems.map((item) => (
                  <span key={`${group}-${item}`}>{item}<i>↗︎</i></span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section className="request-section" id="request">
          <div className="request-copy">
            <p className="eyebrow">Быстрый подбор</p>
            <h2>Опишите объект.<br />Остальное — <em>на нас.</em></h2>
            <p className="section-intro">
              Не обязательно знать конкретную модель. Нам достаточно задачи,
              адреса объекта и основных параметров работ.
            </p>
            <a className="big-phone" href={phoneHref}>{phoneDisplay}</a>
          </div>

          <form className="request-form" onSubmit={handleSubmit}>
            <label>
              <span>Ваш телефон *</span>
              <input type="tel" name="phone" placeholder="+7 (___) ___-__-__" required />
            </label>
            <label>
              <span>Адрес или район</span>
              <input type="text" name="address" placeholder="Например, Московский район" />
            </label>
            <label className="form-wide">
              <span>Что нужно сделать?</span>
              <textarea name="task" rows={2} placeholder="Высота, дата, описание работ" />
            </label>
            <label className="consent">
              <input type="checkbox" required />
              <span>
                Согласен на обработку персональных данных и принимаю{" "}
                <Link href="/consent">условия согласия</Link>
              </span>
            </label>
            <button className="button button--dark form-wide" type="submit">
              Отправить заявку <span aria-hidden="true">↗︎</span>
            </button>
            {submitted && (
              <p className="form-status form-wide" role="status">
                Заявка подготовлена. В локальной версии отправка не подключена —
                пожалуйста, позвоните или напишите нам.
              </p>
            )}
          </form>
        </section>

        <section className="catalog-section" id="catalog">
          <div className="section-head">
            <div>
              <p className="eyebrow">Каталог автовышек</p>
              <h2>Весь парк<br /><em>в одном месте</em></h2>
            </div>
            <p className="section-intro">
              Модели высотой от 12 до 60 метров. Подберём автовышку
              под вид работ, характеристики и условия объекта.
            </p>
          </div>

          <div className="fleet-grid" aria-label="Автопарк автовышек">
            {liftEquipment.map((item, index) => (
              <Link
                className="fleet-card"
                href={item.href}
                key={item.id}
                aria-label={`Открыть: ${item.name}`}
              >
                <figure>
                  <img
                    src={item.image}
                    width="720"
                    height="520"
                    loading="lazy"
                    decoding="async"
                    alt={item.alt}
                  />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </figure>
                <div>
                  <p>{item.shortSpec}</p>
                  <h3>{item.name}</h3>
                  <strong>
                    {item.price
                      ? `от ${item.price.toLocaleString("ru-RU")} ₽/смена`
                      : "Цена по запросу"}
                  </strong>
                  <i aria-hidden="true">↗︎</i>
                </div>
              </Link>
            ))}
          </div>

          <div className="models-head">
            <p className="eyebrow">Популярные модели</p>
            <h3>Характеристики<br /><em>и стоимость</em></h3>
          </div>

          <div className="catalog-grid">
            {featuredLiftEquipment.map((item, index) => (
              <article className={`lift-card lift-card--${item.kind}`} key={item.id}>
                <div className="lift-visual">
                  <img
                    className="lift-photo"
                    src={item.image}
                    width="720"
                    height="792"
                    loading="lazy"
                    decoding="async"
                    alt={item.alt}
                    title={item.name}
                  />
                  <span className="lift-index">0{index + 1}</span>
                  <div className="lift-height">{item.shortSpec}</div>
                </div>
                <div className="lift-info">
                  <p>Автовышка</p>
                  <h3>{item.name}</h3>
                  <dl>
                    {item.specs.map(([label, value]) => (
                      <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
                    ))}
                    <div><dt>Доставка</dt><dd>договорная</dd></div>
                  </dl>
                  <p className="model-price">
                    {item.price
                      ? `от ${item.price.toLocaleString("ru-RU")} ₽/смена`
                      : "Цена по запросу"}
                  </p>
                  <Link className="card-link" href={item.href}>Подробнее <span>↗︎</span></Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="offers-section" aria-labelledby="offers-title">
          <div className="offers-heading">
            <p className="eyebrow eyebrow--light">Акции и специальные условия</p>
            <h2 id="offers-title">Выгодное<br /><em>предложение</em></h2>
            <p>
              Условия акций подтверждаем при расчёте заказа. Предложения могут
              суммироваться только после согласования с менеджером.
            </p>
          </div>
          <div className="offers-grid">
            {offers.map((offer) => (
              <article key={offer.number}>
                <span>{offer.number}</span>
                <h3>{offer.title}</h3>
                <p>{offer.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="services-section" id="services">
          <div className="section-number">02</div>
          <div className="section-head section-head--compact">
            <div>
              <p className="eyebrow">Решаем задачи</p>
              <h2>Техника<br />под <em>задачу</em></h2>
            </div>
          </div>
          <div className="services-grid services-grid--single">
            {serviceItems.map((service, index) => (
              <Link className={`service-card service-card--${index + 1}`} href={service.href} key={service.href}>
                <span>{service.number}</span>
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
                <i aria-hidden="true">↗︎</i>
              </Link>
            ))}
          </div>
        </section>

        <section className="benefits-section">
          <div className="benefits-lead">
            <p className="eyebrow eyebrow--green">Почему ГРИНАВТО</p>
            <h2>Держим<br /><em>слово.</em></h2>
            <div className="twenty-four" aria-label="24 часа 7 дней">
              <strong>24</strong>
              <span>/ 7</span>
            </div>
            <p>Принимаем заявки в любое время — без обещаний, которые нельзя подтвердить.</p>
          </div>
          <div className="benefits-list">
            {benefits.map((benefit) => (
              <article key={benefit.number}>
                <span>{benefit.number}</span>
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="facts-section" aria-label="ГРИНАВТО в цифрах">
          {companyFacts.map(([value, label], index) => (
            <article key={label}>
              <span>0{index + 1}</span>
              <strong>{value}</strong>
              <p>{label}</p>
            </article>
          ))}
        </section>

        <section className="process-section" id="process">
          <div className="section-head">
            <div>
              <p className="eyebrow">Четыре шага</p>
              <h2>От заявки<br /><em>до подачи</em></h2>
            </div>
            <p className="section-intro">
              Простой сценарий без лишней бюрократии. Все параметры подтверждаем
              до выезда техники.
            </p>
          </div>
          <div className="process-grid">
            {process.map(([number, title, text]) => (
              <article key={number}>
                <strong>{number}</strong>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="works-section" id="works">
          <div className="works-title">
            <p className="eyebrow eyebrow--light">Направления</p>
            <h2>Техника<br />в деле</h2>
            <p>
              Автовышки для фасадных, монтажных, коммунальных
              и рекламных работ на высоте.
            </p>
          </div>
          <div className="works-grid">
            {works.map(([number, title, place, image, alt], index) => (
              <article className={`work-card work-card--${index + 1}`} key={number}>
                <div className="work-placeholder">
                  <span>{number}</span>
                  <img
                    src={image}
                    width="560"
                    height="560"
                    loading="lazy"
                    decoding="async"
                    alt={alt}
                    title={title}
                  />
                </div>
                <h3>{title}</h3>
                <p>{place}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="reviews-section" aria-labelledby="reviews-title">
          <div className="reviews-head">
            <p className="eyebrow">Отзывы клиентов</p>
            <h2 id="reviews-title">Что говорят<br /><em>наши клиенты</em></h2>
            <Link className="text-link" href="/o-kompanii/otzyvy-o-nas">
              Все отзывы <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="reviews-grid">
            {testimonials.map((review, index) => (
              <article key={review.name}>
                <span className="review-index">0{index + 1}</span>
                <div className="review-copy">
                  <p className="review-mark" aria-hidden="true">“</p>
                  <blockquote>{review.text}</blockquote>
                  <strong>{review.name}</strong>
                  <small>Клиент ГРИНАВТО</small>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="prices-section" id="prices">
          <div className="section-head">
            <div>
              <p className="eyebrow">Стоимость</p>
              <h2>Честный расчёт<br /><em>под объект</em></h2>
            </div>
            <p className="section-intro">
              Смена 7+1, цены указаны с НДС 22%. Стоимость пробега за КАД
              зависит от типа автовышки.
            </p>
          </div>
          <div className="price-table price-table--current">
            <div className="price-row price-row--head" aria-hidden="true">
              <span>Высота</span>
              <h3>Шоссейная / смена</h3>
              <p>Вездеход / смена</p>
              <strong>За КАД</strong>
              <i />
            </div>
            {liftPriceList.map((item) => (
              <div className="price-row" key={item.height}>
                <span>{item.height}</span>
                <h3>{item.roadShift.toLocaleString("ru-RU")} ₽</h3>
                <p>{item.allTerrainShift.toLocaleString("ru-RU")} ₽</p>
                <strong>{item.roadOutsideKad}–{item.allTerrainOutsideKad} ₽/км</strong>
                <a href="#request" onClick={scrollToRequest} aria-label={`Узнать стоимость: автовышка ${item.height}`}>↗︎</a>
              </div>
            ))}
          </div>
          <p className="price-note">
            Шоссейные автовышки — от 20 000 ₽ за смену, вездеходные — от 24 000 ₽.
            Точный расчёт зависит от адреса, типа шасси и условий подъезда.
          </p>
        </section>

        <section className="articles-section" aria-labelledby="articles-title">
          <div className="section-head">
            <div>
              <p className="eyebrow">Статьи и советы</p>
              <h2 id="articles-title">Полезно знать<br /><em>до заказа</em></h2>
            </div>
            <p className="section-intro">
              Практические материалы по выбору, подготовке площадки и безопасной
              эксплуатации автовышек.
            </p>
          </div>
          <div className="articles-grid">
            {featuredArticles.map((article) => (
              <Link href={article.href} key={article.href}>
                <span>{article.number}</span>
                <h3>{article.title}</h3>
                <p>{article.text}</p>
                <i aria-hidden="true">↗︎</i>
              </Link>
            ))}
          </div>
          <Link className="button button--dark articles-all" href="/o-kompanii/stati-i-sovety">
            Все статьи <span aria-hidden="true">↗︎</span>
          </Link>
        </section>

        <section className="faq-section" id="faq">
          <div className="faq-heading">
            <p className="eyebrow">Вопросы и ответы</p>
            <h2>Коротко<br /><em>о главном</em></h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <details key={faq.question}>
                <summary>
                  <span>0{index + 1}</span>
                  <strong>{faq.question}</strong>
                  <i aria-hidden="true">+</i>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="contacts-section" id="contacts">
          <div className="contact-kicker">
            <p className="eyebrow eyebrow--green">Обсудим задачу?</p>
            <span>Санкт-Петербург / ЛО</span>
          </div>
          <h2>Подадим<br /><em>вовремя.</em></h2>
          <a className="contact-phone" href={phoneHref}>{phoneDisplay}</a>
          <div className="contact-bottom">
            <p>
              Напишите или позвоните — уточним параметры и предложим подходящий
               вариант автовышки.
            </p>
            <div className="contact-actions">
              <a className="button button--green" href={whatsappHref} target="_blank" rel="noreferrer">WhatsApp ↗︎</a>
              <a className="button button--outline" href={telegramHref} target="_blank" rel="noreferrer">Telegram ↗︎</a>
            </div>
          </div>
          <div className="contact-art" aria-hidden="true">
            <span>↑</span>
            <i />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <Link className="brand" href="/">
            <img
              className="brand-logo"
              src="/brand-clover-transparent.png"
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
          <p>Аренда автовышек<br />в Санкт-Петербурге и Ленинградской области.</p>
        </div>
        <div className="footer-column">
          <strong>Навигация</strong>
          <Link href="/katalog-tekhniki">Каталог автовышек</Link>
          <Link href="/services/arenda-avtovyshek">Аренда автовышек</Link>
          <Link href="/o-kompanii">О компании</Link>
          <Link href="/price">Цены</Link>
        </div>
        <div className="footer-column">
          <strong>Контакты</strong>
          <a href={phoneHref}>{phoneDisplay}</a>
          <a href={`mailto:${email}`}>{email}</a>
          <a href={telegramHref} target="_blank" rel="noreferrer">Telegram</a>
        </div>
        <div className="footer-column">
          <strong>Документы</strong>
          <Link href="/privacy">Политика конфиденциальности</Link>
          <Link href="/consent">Согласие на обработку данных</Link>
        </div>
        <div className="footer-bottom">
          <span>© 2026 ГРИНАВТО</span>
          <span>Для запуска необходимо добавить реквизиты оператора данных</span>
          <a href="#top">Наверх ↑</a>
        </div>
      </footer>

      <div className="mobile-actions" aria-label="Быстрые действия">
        <a href={phoneHref}>Позвонить</a>
        <a href={whatsappHref} target="_blank" rel="noreferrer">WhatsApp</a>
        <a href="#request">Расчёт</a>
      </div>

      {cookieOpen && (
        <aside className="cookie-banner" aria-label="Настройки cookie">
          <div>
            <strong>Cookie и приватность</strong>
            <p>
              Используем необходимые настройки для работы сайта. Необязательная
              аналитика в этой версии не подключена.
            </p>
          </div>
          <div className="cookie-actions">
            <button type="button" onClick={() => saveCookieChoice("necessary")}>Только необходимые</button>
            <button type="button" onClick={() => saveCookieChoice("all")}>Принять</button>
          </div>
        </aside>
      )}
    </>
  );
}
