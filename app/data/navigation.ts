export type NavigationItem = {
  label: string;
  href: string;
};

export const catalogNavigation: NavigationItem[] = [
  { label: "Автокраны", href: "/katalog-tekhniki/avtokrany" },
  { label: "Автовышки", href: "/katalog-tekhniki/avtovyshki" },
  { label: "Гусеничные краны", href: "/katalog-tekhniki/gusenichnye-krany" },
  {
    label: "Гусеничные экскаваторы",
    href: "/katalog-tekhniki/gusenichnye-ekskavatory",
  },
  {
    label: "Колесные экскаваторы",
    href: "/katalog-tekhniki/kolesnyj-ekskavator",
  },
  {
    label: "Экскаваторы-погрузчики",
    href: "/katalog-tekhniki/ekskavatory-pogruzchiki",
  },
  { label: "Мини-погрузчики", href: "/katalog-tekhniki/mini-pogruzchiki" },
  {
    label: "Вилочные погрузчики",
    href: "/katalog-tekhniki/vilochnye-pogruzchiki",
  },
  {
    label: "Фронтальные погрузчики",
    href: "/katalog-tekhniki/frontalnye-pogruzchiki",
  },
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
  {
    label: "Колёсный экскаватор Hyundai R 130W-3",
    href: "/katalog-tekhniki/kolesnyj-ekskavator",
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
