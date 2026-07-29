export type NavigationItem = {
  label: string;
  href: string;
};

export const catalogNavigation: NavigationItem[] = [
  { label: "Автовышки", href: "/katalog-tekhniki/avtovyshki" },
];

export const popularNavigation: NavigationItem[] = [
  {
    label: "Автовышка 12 метров Hyundai",
    href: "/katalog-tekhniki/avtovyshki/arenda-avtovyshki-12m",
  },
  {
    label: "Автовышка 45 метров",
    href: "/katalog-tekhniki/avtovyshki/arenda-avtovyshki-45m",
  },
];

export const aboutNavigation: NavigationItem[] = [
  {
    label: "Статьи и советы",
    href: "/o-kompanii/stati-i-sovety",
  },
  { label: "Отзывы", href: "/o-kompanii/otzyvy-o-nas" },
  { label: "Условия оплаты", href: "/o-kompanii/usloviya-oplaty" },
  { label: "Портфолио", href: "/portfolio" },
  { label: "Доставка", href: "/dostavka" },
];
