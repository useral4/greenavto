import Link from "next/link";

export default function NotFound() {
  return (
    <main className="legal-page">
      <article>
        <span className="section-kicker">Ошибка 404</span>
        <h1>Эта страница не поднялась на нужную высоту</h1>
        <p>Адрес мог измениться. Вернитесь на главную и выберите нужный раздел.</p>
        <Link className="button button-primary" href="/">На главную</Link>
      </article>
    </main>
  );
}
