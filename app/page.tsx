"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { lifts, type Lift } from "./data/lifts";

const phoneDisplay = "+7 (999) 008-88-84";
const phoneHref = "tel:+79990088884";
const whatsappHref =
  "https://wa.me/79990088884?text=%D0%9D%D1%83%D0%B6%D0%BD%D0%B0%20%D0%B0%D0%B2%D1%82%D0%BE%D0%B2%D1%8B%D1%88%D0%BA%D0%B0.%20%D0%9F%D0%BE%D0%BC%D0%BE%D0%B3%D0%B8%D1%82%D0%B5%20%D0%BF%D0%BE%D0%B4%D0%BE%D0%B1%D1%80%D0%B0%D1%82%D1%8C%20%D1%82%D0%B5%D1%85%D0%BD%D0%B8%D0%BA%D1%83.";

const useCases = [
  ["01", "Фасады и остекление", "Монтаж, осмотр, ремонт и мойка на высоте."],
  ["02", "Реклама и вывески", "Установка и обслуживание наружных конструкций."],
  ["03", "Освещение", "Монтаж светильников, опор и кабельных линий."],
  ["04", "Деревья", "Кронирование и безопасный спил в сложных местах."],
  ["05", "Кровельные работы", "Доступ к карнизам, водостокам и кровле."],
  ["06", "Металлоконструкции", "Подъём специалистов и инструмента к зоне работ."],
];

const benefits = [
  ["24/7", "Принимаем срочные заявки и работаем ночью"],
  ["СПб + ЛО", "Подаём технику по городу и Ленинградской области"],
  ["С оператором", "Услуга включает управление подготовленным специалистом"],
  ["По договору", "Фиксируем согласованные условия и готовим документы"],
  ["Под задачу", "Учитываем высоту, вылет стрелы и условия подъезда"],
  ["Без сюрпризов", "До подачи согласовываем состав и факторы стоимости"],
];

const faqs = [
  [
    "Как выбрать нужную высоту автовышки?",
    "Сообщите высоту объекта, расстояние от места установки машины до рабочей зоны и характер работ. Если точных данных нет, менеджер поможет определить нужный диапазон.",
  ],
  [
    "Какой минимальный срок аренды?",
    "Минимальная смена зависит от конкретной машины и адреса подачи. Мы укажем её в расчёте после подтверждения нового прайс-листа.",
  ],
  [
    "Входит ли оператор в стоимость?",
    "Техника подаётся с оператором. Окончательный состав цены фиксируется в расчёте и договоре.",
  ],
  [
    "Можно ли заказать технику ночью?",
    "Да, заявки принимаются 24/7. Возможность срочной ночной подачи зависит от свободной техники и условий объекта.",
  ],
  [
    "Работаете ли вы за пределами Санкт-Петербурга?",
    "Да, выезжаем по Ленинградской области. Стоимость подачи зависит от расстояния и согласовывается до заказа.",
  ],
  [
    "Что влияет на стоимость?",
    "Рабочая высота, вылет стрелы, длительность смены, адрес, время подачи, ограничения подъезда и характер работ.",
  ],
  [
    "Какие документы получает юридическое лицо?",
    "Состав документов согласуется при оформлении заказа. Компания работает с наличной и безналичной оплатой.",
  ],
  [
    "Можно ли работать в узком дворе?",
    "Часто да. Пришлите адрес и фотографии подъезда — проверим габариты, место для опор и подберём компактный вариант.",
  ],
  [
    "Что подготовить до приезда техники?",
    "Освободить место установки, проверить подъезд и покрытие, обозначить рабочую зону и сообщить об ограничениях по высоте или массе.",
  ],
  [
    "Можно ли срочно заказать автовышку сегодня?",
    "Можно оставить срочную заявку. Диспетчер проверит ближайшую свободную машину и назовёт реальное время подачи.",
  ],
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://arenda-vyshki.pro/#organization",
      name: "ГРИНАВТО",
      url: "https://arenda-vyshki.pro/",
      telephone: "+79990088884",
      email: "greenavtospb@mail.ru",
      areaServed: ["Санкт-Петербург", "Ленинградская область"],
    },
    {
      "@type": "Service",
      "@id": "https://arenda-vyshki.pro/#service",
      name: "Аренда автовышек",
      provider: { "@id": "https://arenda-vyshki.pro/#organization" },
      areaServed: ["Санкт-Петербург", "Ленинградская область"],
      description:
        "Аренда автовышек с оператором для высотных работ в Санкт-Петербурге и Ленинградской области.",
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [range, setRange] = useState<"all" | Lift["range"]>("all");
  const [submitted, setSubmitted] = useState(false);
  const [cookieOpen, setCookieOpen] = useState(false);

  useEffect(() => {
    if (!window.localStorage.getItem("greenauto-cookie-choice")) {
      setCookieOpen(true);
    }
  }, []);

  const filteredLifts = useMemo(
    () => (range === "all" ? lifts : lifts.filter((lift) => lift.range === range)),
    [range],
  );

  function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  function saveCookieChoice(choice: "necessary" | "analytics") {
    window.localStorage.setItem("greenauto-cookie-choice", choice);
    setCookieOpen(false);
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">
        Перейти к содержанию
      </a>

      <header className="topbar">
        <Link className="brand" href="/" aria-label="ГРИНАВТО — главная">
          <span className="brand-mark" aria-hidden="true">
            Г
          </span>
          <span>
            <strong>ГРИНАВТО</strong>
            <small>Аренда автовышек</small>
          </span>
        </Link>

        <nav className={menuOpen ? "nav nav-open" : "nav"} aria-label="Основная навигация">
          <a href="#fleet" onClick={() => setMenuOpen(false)}>
            Автовышки
          </a>
          <a href="#prices" onClick={() => setMenuOpen(false)}>
            Цены
          </a>
          <a href="#process" onClick={() => setMenuOpen(false)}>
            Как заказать
          </a>
          <a href="#works" onClick={() => setMenuOpen(false)}>
            Наши работы
          </a>
          <a href="#contacts" onClick={() => setMenuOpen(false)}>
            Контакты
          </a>
        </nav>

        <div className="header-actions">
          <div className="header-phone">
            <span>
              <i aria-hidden="true" /> Работаем 24/7
            </span>
            <a href={phoneHref}>{phoneDisplay}</a>
          </div>
          <a className="button button-small" href="#selection">
            Заказать звонок
          </a>
          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <section className="hero">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy">
            <div className="eyebrow">
              <span>Санкт-Петербург</span>
              <b>и Ленинградская область</b>
            </div>
            <h1>
              Автовышка
              <br />
              <em>точно под</em>
              <br />
              вашу задачу
            </h1>
            <p className="hero-lead">
              Подберём рабочую высоту и проверим условия подъезда. Подача с оператором,
              работа 24/7.
            </p>
            <div className="hero-cta">
              <a className="button button-primary hero-primary" href="#selection">
                Подобрать автовышку <span aria-hidden="true">↗</span>
              </a>
              <a className="text-link" href="#prices">
                Посмотреть цены <span aria-hidden="true">↓</span>
              </a>
            </div>
            <ul className="hero-facts" aria-label="Ключевые условия">
              <li>24/7</li>
              <li>с оператором</li>
              <li>наличный и безналичный расчёт</li>
              <li>документы для юрлиц</li>
            </ul>
          </div>

          <div className="machine-stage" aria-label="Анимация выезжающей автовышки">
            <div className="height-scale" aria-hidden="true">
              <span>45 м</span>
              <span>30 м</span>
              <span>18 м</span>
              <span>0 м</span>
            </div>
            <div className="machine-shadow" aria-hidden="true" />
            <div className="machine" aria-hidden="true">
              <div className="boom">
                <div className="boom-inner" />
                <div className="basket">
                  <span />
                </div>
              </div>
              <div className="truck-body">
                <div className="truck-platform" />
                <div className="truck-cab">
                  <span className="truck-window" />
                  <span className="truck-light" />
                </div>
                <div className="outrigger outrigger-left" />
                <div className="outrigger outrigger-right" />
                <span className="wheel wheel-left" />
                <span className="wheel wheel-right" />
              </div>
            </div>
            <div className="machine-caption">
              <span>Точная подача</span>
              <strong>Техника под высоту и условия объекта</strong>
            </div>
          </div>
        </section>

        <section className="selection section-pad" id="selection">
          <div className="section-heading selection-heading">
            <div>
              <span className="section-kicker">Подбор за 2 минуты</span>
              <h2>Какая автовышка вам нужна?</h2>
            </div>
            <p>
              Не знаете высоту — ничего страшного. Опишите объект, и мы поможем с
              параметрами.
            </p>
          </div>

          <form className="selection-form" onSubmit={submitLead}>
            <label>
              Рабочая высота
              <select name="height" defaultValue="">
                <option value="">Не знаю — нужна консультация</option>
                <option value="up-to-18">До 18 метров</option>
                <option value="19-28">19–28 метров</option>
                <option value="29-plus">29 метров и выше</option>
              </select>
            </label>
            <label>
              Адрес или район
              <input name="area" placeholder="Например, Московский район" />
            </label>
            <label>
              Дата работ
              <input name="date" type="date" />
            </label>
            <label>
              Телефон
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+7 999 000-00-00"
                required
              />
            </label>
            <label className="wide-field">
              Что предстоит сделать
              <textarea
                name="task"
                rows={3}
                placeholder="Опишите объект, высоту и условия подъезда"
              />
            </label>
            <label className="consent-field">
              <input type="checkbox" required />
              <span>
                Я принимаю{" "}
                <Link href="/consent">условия обработки персональных данных</Link> и{" "}
                <Link href="/privacy">политику конфиденциальности</Link>.
              </span>
            </label>
            <div className="form-submit">
              <button className="button button-primary" type="submit">
                Рассчитать стоимость <span aria-hidden="true">↗</span>
              </button>
              <small>Сторонняя передача данных в этой версии не подключена.</small>
            </div>
          </form>

          <div className={submitted ? "form-result form-result-visible" : "form-result"} aria-live="polite">
            <div>
              <strong>Обращение подготовлено.</strong>
              <span>
                Для быстрого ответа отправьте задачу диспетчеру в WhatsApp или позвоните.
              </span>
            </div>
            <a className="button button-green" href={whatsappHref} target="_blank" rel="noreferrer">
              Открыть WhatsApp
            </a>
          </div>
        </section>

        <section className="fleet section-pad" id="fleet">
          <div className="section-heading">
            <div>
              <span className="section-kicker">Каталог</span>
              <h2>Выберите диапазон высоты</h2>
            </div>
            <p>
              Модели и цены обновятся после подтверждения прайс-листа. Сейчас каталог
              показывает структуру подбора без выдуманных характеристик.
            </p>
          </div>

          <div className="filter-row" role="group" aria-label="Фильтр по высоте">
            {[
              ["all", "Все"],
              ["compact", "До 18 м"],
              ["city", "19–28 м"],
              ["high", "29+ м"],
            ].map(([value, label]) => (
              <button
                className={range === value ? "filter-active" : ""}
                type="button"
                key={value}
                onClick={() => setRange(value as typeof range)}
                aria-pressed={range === value}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="fleet-grid">
            {filteredLifts.map((lift, index) => (
              <article className="lift-card" key={lift.id}>
                <div className={`lift-media lift-media-${index + 1}`}>
                  <Image
                    src="/og.png"
                    alt=""
                    fill
                    sizes="(max-width: 760px) 100vw, 33vw"
                    className="lift-photo"
                  />
                  <span>Данные на проверке</span>
                  <b>{lift.height}</b>
                </div>
                <div className="lift-content">
                  <div>
                    <span className="availability">
                      <i aria-hidden="true" /> Наличие по запросу
                    </span>
                    <h3>{lift.name}</h3>
                  </div>
                  <dl>
                    <div>
                      <dt>Рабочая высота</dt>
                      <dd>{lift.height}</dd>
                    </div>
                    <div>
                      <dt>Вылет стрелы</dt>
                      <dd>{lift.reach}</dd>
                    </div>
                    <div>
                      <dt>Люлька</dt>
                      <dd>{lift.capacity}</dd>
                    </div>
                  </dl>
                  <p>{lift.note}</p>
                  <div className="card-price">
                    <span>Стоимость</span>
                    <strong>по запросу</strong>
                  </div>
                  <a className="button button-outline" href="#selection">
                    Подобрать <span aria-hidden="true">→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="use-cases section-pad">
          <div className="section-heading">
            <div>
              <span className="section-kicker">Задачи</span>
              <h2>Для какой работы нужна вышка?</h2>
            </div>
            <a className="text-link" href="#selection">
              Описать свою задачу <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="cases-grid">
            {useCases.map(([number, title, text]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <a href="#selection" aria-label={`Подобрать автовышку: ${title}`}>
                  Подобрать <b aria-hidden="true">↗</b>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="night-ops section-pad">
          <div className="night-visual">
            <Image
              src="/og.png"
              alt="Жёлтая автовышка с поднятой стрелой на городском объекте"
              fill
              sizes="(max-width: 900px) 100vw, 52vw"
            />
            <div className="night-stamp">
              <span>24</span>
              <b>часа<br />на связи</b>
            </div>
          </div>
          <div className="night-copy">
            <span className="section-kicker">Готовы к сложным условиям</span>
            <h2>Подача по городу и области — днём и ночью</h2>
            <p>
              Сначала проверяем высоту, рабочий радиус, подъезд и место для опор. Затем
              предлагаем подходящий класс техники и заранее согласовываем условия.
            </p>
            <div className="benefit-list">
              {benefits.map(([title, text]) => (
                <div key={title}>
                  <strong>{title}</strong>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="process section-pad" id="process">
          <div className="section-heading">
            <div>
              <span className="section-kicker">Без лишней переписки</span>
              <h2>От задачи до подачи — четыре шага</h2>
            </div>
          </div>
          <ol className="process-grid">
            {[
              ["01", "Оставляете заявку", "Телефон, адрес и короткое описание работ."],
              ["02", "Уточняем объект", "Высота, вылет стрелы, подъезд и место установки."],
              ["03", "Согласовываем", "Подходящая техника, время, стоимость и документы."],
              ["04", "Подаём автовышку", "Оператор приезжает в согласованное время."],
            ].map(([number, title, text]) => (
              <li key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
          <div className="process-cta">
            <p>Расскажите, где и на какой высоте предстоит работать.</p>
            <a className="button button-primary" href="#selection">
              Оставить заявку <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <section className="works section-pad" id="works">
          <div className="section-heading">
            <div>
              <span className="section-kicker">Наши работы</span>
              <h2>Реальные объекты — без фотобанков</h2>
            </div>
            <p>
              Блок подготовлен для фотографий заказчика. Кейсы появятся после передачи
              подтверждённых материалов.
            </p>
          </div>
          <div className="works-grid">
            {["Фасадные работы", "Монтаж освещения", "Работа в узком дворе"].map(
              (title, index) => (
                <article key={title}>
                  <div className="work-placeholder">
                    <span>0{index + 1}</span>
                    <b>Фото объекта ожидается</b>
                  </div>
                  <h3>{title}</h3>
                  <p>Высота, район и модель будут добавлены после проверки кейса.</p>
                </article>
              ),
            )}
          </div>
        </section>

        <section className="prices section-pad" id="prices">
          <div className="section-heading">
            <div>
              <span className="section-kicker">Прайс</span>
              <h2>Стоимость без мелкого шрифта</h2>
            </div>
            <p>
              Финальный расчёт зависит от высоты, адреса, длительности, времени подачи и
              условий установки.
            </p>
          </div>
          <div className="price-panel">
            <div className="price-table" role="table" aria-label="Структура прайс-листа">
              <div className="price-row price-head" role="row">
                <span role="columnheader">Диапазон</span>
                <span role="columnheader">Минимальная смена</span>
                <span role="columnheader">Стоимость</span>
                <span role="columnheader">Подача за город</span>
              </div>
              {[
                ["До 18 м", "уточняется", "после прайса", "по адресу"],
                ["19–28 м", "уточняется", "после прайса", "по адресу"],
                ["29 м и выше", "уточняется", "после прайса", "по адресу"],
              ].map((row) => (
                <div className="price-row" role="row" key={row[0]}>
                  {row.map((cell, index) => (
                    <span role="cell" key={cell}>
                      {index === 0 ? <strong>{cell}</strong> : cell}
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <aside>
              <span className="price-badge">Прайс обновляется</span>
              <h3>Нужна точная стоимость?</h3>
              <p>
                Отправьте адрес и задачу. Проверим технику и назовём расчёт до оформления.
              </p>
              <a className="button button-primary" href="#selection">
                Получить расчёт <span aria-hidden="true">↗</span>
              </a>
            </aside>
          </div>
        </section>

        <section className="faq section-pad">
          <div className="section-heading">
            <div>
              <span className="section-kicker">Коротко о важном</span>
              <h2>Частые вопросы</h2>
            </div>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => (
              <details key={question}>
                <summary>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{question}</strong>
                  <i aria-hidden="true">+</i>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="contacts section-pad" id="contacts">
          <div className="contact-copy">
            <span className="section-kicker">Диспетчерская 24/7</span>
            <h2>Расскажите о задаче — подберём следующий шаг</h2>
            <p>
              Для быстрого расчёта подготовьте адрес, желаемое время, примерную высоту и
              фотографию места установки.
            </p>
            <a className="contact-phone" href={phoneHref}>
              {phoneDisplay}
            </a>
            <div className="contact-links">
              <a href={whatsappHref} target="_blank" rel="noreferrer">
                WhatsApp <span aria-hidden="true">↗</span>
              </a>
              <a href="https://t.me/generalsite" target="_blank" rel="noreferrer">
                Telegram <span aria-hidden="true">↗</span>
              </a>
              <a href="mailto:greenavtospb@mail.ru">
                Email <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <div className="service-map" aria-label="Зона обслуживания">
            <div className="map-ring map-ring-1" />
            <div className="map-ring map-ring-2" />
            <div className="map-core">
              <span>СПб</span>
              <b>Подача по городу</b>
            </div>
            <div className="map-label map-label-1">Север</div>
            <div className="map-label map-label-2">Область</div>
            <div className="map-label map-label-3">Юг</div>
            <p>Точная стоимость подачи рассчитывается по адресу.</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-top">
          <Link className="brand" href="/">
            <span className="brand-mark" aria-hidden="true">Г</span>
            <span>
              <strong>ГРИНАВТО</strong>
              <small>Аренда автовышек</small>
            </span>
          </Link>
          <p>Санкт-Петербург и Ленинградская область · Работаем 24/7</p>
          <a className="footer-phone" href={phoneHref}>{phoneDisplay}</a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 ГРИНАВТО. Данные компании требуют финального подтверждения.</span>
          <div>
            <Link href="/privacy">Политика конфиденциальности</Link>
            <Link href="/consent">Согласие на обработку данных</Link>
            <button type="button" onClick={() => setCookieOpen(true)}>Настройки cookie</button>
          </div>
        </div>
      </footer>

      <div className="mobile-actions" aria-label="Быстрые действия">
        <a href={phoneHref}>Позвонить</a>
        <a href={whatsappHref} target="_blank" rel="noreferrer">Написать</a>
        <a href="#selection">Рассчитать</a>
      </div>

      {cookieOpen && (
        <div className="cookie-banner" role="dialog" aria-label="Настройки cookie" aria-live="polite">
          <div>
            <strong>Настройки конфиденциальности</strong>
            <p>
              Сейчас сайт использует только необходимые локальные настройки. Аналитика не
              подключена и не загрузится без отдельного согласия.
            </p>
          </div>
          <div className="cookie-actions">
            <button type="button" onClick={() => saveCookieChoice("necessary")}>
              Только необходимые
            </button>
            <button
              className="button button-primary"
              type="button"
              onClick={() => saveCookieChoice("analytics")}
            >
              Разрешить аналитику
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
