import Link from "next/link";
import {
  aboutNavigation,
  type NavigationItem,
  popularNavigation,
} from "../data/navigation";

function DropdownMenu({
  label,
  href,
  allLabel,
  items,
}: {
  label: string;
  href: string;
  allLabel: string;
  items: NavigationItem[];
}) {
  return (
    <details className="services-menu">
      <summary>
        {label} <span aria-hidden="true" />
      </summary>
      <div className="services-menu-panel">
        <Link className="services-menu-all" href={href}>
          <span>00</span>
          <strong>{allLabel}</strong>
          <i aria-hidden="true">↗︎</i>
        </Link>
        {items.map((item, index) => (
          <Link href={item.href} key={item.href}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{item.label}</strong>
            <i aria-hidden="true">↗︎</i>
          </Link>
        ))}
      </div>
    </details>
  );
}

export function SiteNavigationLinks() {
  return (
    <>
      <Link href="/">Главная</Link>
      <Link href="/katalog-tekhniki/avtovyshki">Автовышки</Link>
      <Link href="/price">Цены</Link>
      <Link href="/services/arenda-avtovyshek">Аренда</Link>
      <DropdownMenu
        label="Популярные модели"
        href="/katalog-tekhniki/avtovyshki"
        allLabel="Все автовышки"
        items={popularNavigation}
      />
      <DropdownMenu
        label="О нас"
        href="/o-kompanii"
        allLabel="О компании"
        items={aboutNavigation}
      />
      <Link href="/kontakty">Контакты</Link>
    </>
  );
}
