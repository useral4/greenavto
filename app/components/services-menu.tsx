import Link from "next/link";
import {
  aboutNavigation,
  catalogNavigation,
  type NavigationItem,
  popularNavigation,
} from "../data/navigation";
import { serviceItems } from "../data/services";

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

const serviceNavigation: NavigationItem[] = serviceItems.map((service) => ({
  label: service.title,
  href: service.href,
}));

export function SiteNavigationLinks() {
  return (
    <>
      <Link href="/">Главная</Link>
      <DropdownMenu
        label="Каталог техники"
        href="/katalog-tekhniki"
        allLabel="Весь каталог"
        items={catalogNavigation}
      />
      <Link href="/price">Цены</Link>
      <DropdownMenu
        label="Услуги"
        href="/services"
        allLabel="Все услуги"
        items={serviceNavigation}
      />
      <DropdownMenu
        label="Популярные модели"
        href="/populyarnye-modeli-specztekhniki"
        allLabel="Все популярные модели"
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
