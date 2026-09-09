import Link from "next/link";
import { GeneralSiteCredit } from "../components/general-site-credit";

export default function ConsentPage() {
  return (
    <main className="legal-page">
      <Link className="brand" href="/">
        <img className="brand-logo" src="/brand-clover-transparent.png" width="48" height="48" alt="" aria-hidden="true" />
        <span className="brand-copy">
          <strong>ГРИНАВТО</strong>
          <small>Своевременная подача · Ведущие марки</small>
        </span>
      </Link>
      <article>
        <h1>Согласие на обработку персональных данных</h1>
        <p>
          Отправляя форму на сайте, пользователь свободно и осознанно даёт согласие
          оператору — ООО «ГРИНАВТО» — на обработку указанных в форме данных.
        </p>
        <h2>Данные</h2>
        <ul>
          <li>номер телефона;</li>
          <li>адрес или район предполагаемых работ;</li>
          <li>дата и параметры заказа;</li>
          <li>текст обращения.</li>
        </ul>
        <h2>Цели</h2>
        <p>
          Обратная связь, подбор автовышки, расчёт стоимости, подготовка предложения и
          оформление договора по инициативе пользователя.
        </p>
        <h2>Действия с данными</h2>
        <p>
          Сбор, запись, систематизация, хранение, уточнение, использование, блокирование
          и удаление в объёме, необходимом для заявленных целей.
        </p>
        <h2>Отзыв согласия</h2>
        <p>
          Пользователь может отозвать согласие, направив обращение по адресу{" "}
          <a href="mailto:greenavtospb@mail.ru">greenavtospb@mail.ru</a>.
        </p>
        <Link className="back-link" href="/">← Вернуться на сайт</Link>
      </article>
      <GeneralSiteCredit />
    </main>
  );
}
