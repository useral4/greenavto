"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { SiteNavigationLinks } from "./components/services-menu";
import { categories, equipment } from "./data/lifts";
import { serviceItems } from "./data/services";

const phoneDisplay = "+7 (999) 008-88-84";
const phoneHref = "tel:+79990088884";
const whatsappHref = "https://wa.me/79990088884";
const telegramHref = "https://t.me/generalsite";
const email = "greenavtospb@mail.ru";

const equipmentFilters = [
  { id: "all", label: "Все модели" },
  { id: "lift", label: "Автовышки" },
  { id: "crane", label: "Автокраны" },
];

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
  ["145+", "единиц спецтехники"],
  ["100%", "техника проходит обслуживание"],
  ["1 988", "довольных клиентов"],
  ["15", "лет опыта"],
];

const testimonials = [
  {
    image: "/content/review-alpha.webp",
    alt: "Егоров Семен, директор ООО «Альфа Групп»",
    title: "Высокий уровень профессионализма",
    text: "Компания «Альфа Групп» выражает искреннюю благодарность «ГринАвто» за длительное и взаимовыгодное сотрудничество. Благодарим за индивидуальный подход, высокий уровень профессионализма и оперативность.",
    name: "Егоров Семен",
    role: "Директор ООО «Альфа Групп»",
  },
  {
    image: "/content/review-antarkt.webp",
    alt: "Желяев Андрей, директор ООО «Антаркт»",
    title: "Всё сделали раньше срока",
    text: "Хотелось бы поблагодарить команду «ГринАвто» за ответственное отношение к работе: всё сделали раньше назначенного срока и учли пожелания. Большое спасибо — мы очень довольны.",
    name: "Желяев Андрей",
    role: "Директор ООО «Антаркт»",
  },
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
    text: "Подбираем современную спецтехнику по характеристикам, площадке и виду работ.",
  },
  {
    number: "04",
    title: "Документы и договор",
    text: "Помогаем с необходимой документацией и фиксируем условия в договоре.",
  },
];

const process = [
  ["01", "Заявка", "Расскажите, где и что нужно сделать."],
  ["02", "Подбор", "Уточним характеристики техники и условия площадки."],
  ["03", "Расчёт", "Подтвердим подходящую машину, дату и стоимость."],
  ["04", "Подача", "Доставим согласованную спецтехнику на объект."],
];

const works = [
  ["01 / 04", "Высотные работы", "Автовышки", "/catalog/lift-28-hq.jpg", "Автовышка для высотных работ"],
  ["02 / 04", "Подъём грузов", "Автокраны", "/catalog/category-crane.webp", "Автомобильный кран для подъёма грузов"],
  ["03 / 04", "Земляные работы", "Экскаваторы", "/catalog/category-crawler-excavator.webp", "Гусеничный экскаватор для земляных работ"],
  ["04 / 04", "Погрузочные работы", "Погрузчики", "/catalog/front-loader-hq.jpg", "Фронтальный погрузчик"],
];

const faqs = [
  {
    question: "Как подобрать подходящую спецтехнику?",
    answer:
      "Сообщите вид работ, параметры объекта и условия подъезда. Если точных данных нет, опишите задачу — менеджер поможет определить подходящую категорию.",
  },
  {
    question: "Можно заказать технику на сегодня?",
    answer:
      "Срочная подача зависит от свободной техники и адреса объекта. Позвоните или отправьте заявку — оперативно проверим доступность.",
  },
  {
    question: "Что входит в стоимость?",
    answer:
      "Состав услуги, длительность смены, доставка и дополнительные условия подтверждаются при расчёте конкретной модели.",
  },
  {
    question: "Выезжаете в Ленинградскую область?",
    answer:
      "Да. Стоимость и время подачи зависят от удалённости объекта и выбранной техники.",
  },
  {
    question: "Можно работать ночью и в выходные?",
    answer:
      "Заявки принимаются круглосуточно. Возможность работ в конкретное время согласовывается с учётом техники, объекта и местных ограничений.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "ГРИНАВТО",
  description:
    "Аренда спецтехники в Санкт-Петербурге и Ленинградской области.",
  telephone: "+7-999-008-88-84",
  email,
  areaServed: ["Санкт-Петербург", "Ленинградская область"],
  openingHours: "Mo-Su 00:00-23:59",
  serviceType: "Аренда спецтехники",
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [equipmentFilter, setEquipmentFilter] = useState("all");
  const [submitted, setSubmitted] = useState(false);
  const [cookieOpen, setCookieOpen] = useState(false);

  useEffect(() => {
    setCookieOpen(localStorage.getItem("greenauto-cookie-choice") === null);
  }, []);

  const filteredEquipment =
    equipmentFilter === "all"
      ? equipment
      : equipment.filter((item) => item.kind === equipmentFilter);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  function saveCookieChoice(choice: "necessary" | "all") {
    localStorage.setItem("greenauto-cookie-choice", choice);
    setCookieOpen(false);
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

        <nav className={menuOpen ? "main-nav main-nav--open" : "main-nav"} aria-label="Основная навигация">
          <SiteNavigationLinks />
          <a className="nav-phone" href={phoneHref}>{phoneDisplay}</a>
        </nav>

        <a className="header-cta" href="#request">
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
              спецтехники
              <br />
              <em>без задержек</em>
            </h1>
            <p className="hero-lead">
              Автовышки, автокраны, экскаваторы и погрузчики для объектов
              Санкт-Петербурга и Ленинградской области.
            </p>
            <div className="hero-actions">
              <a className="button button--green" href="#request">
                Подобрать технику <span aria-hidden="true">↗︎</span>
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
              <span>для подбора техники</span>
            </div>
          </div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            <span>АРЕНДА СПЕЦТЕХНИКИ</span><i>↗︎</i>
            <span>САНКТ-ПЕТЕРБУРГ И ЛО</span><i>↗︎</i>
            <span>СВОЕВРЕМЕННАЯ ПОДАЧА</span><i>↗︎</i>
            <span>АРЕНДА СПЕЦТЕХНИКИ</span><i>↗︎</i>
            <span>САНКТ-ПЕТЕРБУРГ И ЛО</span><i>↗︎</i>
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
              <p className="eyebrow">Каталог техники</p>
              <h2>Весь парк<br /><em>в одном месте</em></h2>
            </div>
            <p className="section-intro">
              Автокраны, автовышки, экскаваторы и погрузчики. Подберём технику
              под вид работ, характеристики и условия объекта.
            </p>
          </div>

          <div className="category-grid">
            {categories.map((category, index) => (
              <a
                className="category-card"
                href={category.href}
                key={category.id}
                aria-label={`Открыть раздел: ${category.name}`}
              >
                <div className="category-media">
                  <img
                    src={category.image}
                    width="560"
                    height="560"
                    loading="lazy"
                    decoding="async"
                    alt={category.alt}
                    title={category.name}
                  />
                  <span>0{index + 1}</span>
                </div>
                <div className="category-copy">
                  <h3>{category.name}</h3>
                  <p>от {category.pricePerHour.toLocaleString("ru-RU")} ₽/ч</p>
                  <span className="category-arrow" aria-hidden="true">↗︎</span>
                </div>
              </a>
            ))}
          </div>

          <div className="models-head">
            <p className="eyebrow">Популярные модели</p>
            <h3>Характеристики<br /><em>и стоимость</em></h3>
          </div>

          <div className="filters" role="group" aria-label="Фильтр популярных моделей">
            {equipmentFilters.map((item) => (
              <button
                key={item.id}
                type="button"
                className={equipmentFilter === item.id ? "filter filter--active" : "filter"}
                onClick={() => setEquipmentFilter(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="catalog-grid">
            {filteredEquipment.map((item, index) => (
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
                  <p>{item.kind === "lift" ? "Автовышка" : "Автокран"}</p>
                  <h3>{item.name}</h3>
                  <dl>
                    {item.specs.map(([label, value]) => (
                      <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
                    ))}
                    <div><dt>Доставка</dt><dd>договорная</dd></div>
                  </dl>
                  <p className="model-price">от {item.price.toLocaleString("ru-RU")} ₽</p>
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
          <div className="services-grid">
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
              Основные группы техники для высотных, грузоподъёмных, земляных
              и погрузочных работ.
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
            <h2 id="reviews-title">Нам доверяют<br /><em>1 988 клиентов</em></h2>
            <Link className="text-link" href="/o-kompanii/otzyvy-o-nas">
              Все отзывы <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="reviews-grid">
            {testimonials.map((review, index) => (
              <article key={review.name}>
                <div className="review-photo">
                  <img
                    src={review.image}
                    width="900"
                    height="1100"
                    loading="lazy"
                    decoding="async"
                    alt={review.alt}
                  />
                  <span>0{index + 1}</span>
                </div>
                <div className="review-copy">
                  <p className="review-mark" aria-hidden="true">“</p>
                  <h3>{review.title}</h3>
                  <blockquote>{review.text}</blockquote>
                  <strong>{review.name}</strong>
                  <small>{review.role}</small>
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
              Используем цены из действующего каталога. Доставка рассчитывается
              отдельно и согласовывается до подачи техники.
            </p>
          </div>
          <div className="price-table">
            {equipment.map((item, index) => (
              <div className="price-row" key={item.id}>
                <span>0{index + 1}</span>
                <h3>{item.name}</h3>
                <p>{item.shortSpec}</p>
                <strong>от {item.price.toLocaleString("ru-RU")} ₽</strong>
                <a href="#request" aria-label={`Узнать стоимость: ${item.name}`}>↗︎</a>
              </div>
            ))}
          </div>
          <p className="price-note">
            На расчёт влияют выбранная модель, продолжительность аренды,
            удалённость объекта, сложность подъезда и доставка.
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
              эксплуатации автовышек и другой спецтехники.
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
              вариант спецтехники.
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
          <p>Аренда спецтехники<br />в Санкт-Петербурге и Ленинградской области.</p>
        </div>
        <div className="footer-column">
          <strong>Навигация</strong>
          <Link href="/katalog-tekhniki">Каталог техники</Link>
          <Link href="/services">Услуги</Link>
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
