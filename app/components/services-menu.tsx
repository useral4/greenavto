import Link from "next/link";
import { serviceItems } from "../data/services";

export function ServicesMenu() {
  return (
    <details className="services-menu">
      <summary>
        Услуги <span aria-hidden="true">⌄</span>
      </summary>
      <div className="services-menu-panel">
        <Link className="services-menu-all" href="/services">
          <span>00</span>
          <strong>Все услуги</strong>
          <i aria-hidden="true">↗</i>
        </Link>
        {serviceItems.map((service) => (
          <Link href={service.href} key={service.href}>
            <span>{service.number}</span>
            <strong>{service.title}</strong>
            <i aria-hidden="true">↗</i>
          </Link>
        ))}
      </div>
    </details>
  );
}
