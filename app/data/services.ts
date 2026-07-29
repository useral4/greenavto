export type ServiceItem = {
  number: string;
  title: string;
  description: string;
  href: string;
  image: string;
  alt: string;
};

export const serviceItems: ServiceItem[] = [
  {
    number: "01",
    title: "Разработка котлована, шпунтование",
    description: "Земляные работы и шпунтование под параметры объекта.",
    href: "/services/razrabotka-kotlovana-shpuntovanie",
    image: "/source/c30ee07abb879cef.webp",
    alt: "Разработка котлована экскаватором и шпунтовое ограждение",
  },
  {
    number: "02",
    title: "Планировка земли",
    description: "Выравнивание и подготовка площадки спецтехникой.",
    href: "/services/planirovka-zemli",
    image: "/source/d669fff2d1ab6180.webp",
    alt: "Планировка и выравнивание грунта спецтехникой",
  },
  {
    number: "03",
    title: "Бурение",
    description: "Скважины и лидерное бурение для строительных задач.",
    href: "/services/burenie",
    image: "/source/028240dfabc274fb.webp",
    alt: "Буровая спецтехника на строительной площадке",
  },
  {
    number: "04",
    title: "Вывоз грунта",
    description: "Погрузка и вывоз грунта с территории объекта.",
    href: "/services/vyvoz-grunta",
    image: "/source/51beb97870a72cf3.webp",
    alt: "Погрузка грунта в самосвал",
  },
  {
    number: "05",
    title: "Вывоз спила",
    description: "Уборка веток, древесины и остатков после расчистки.",
    href: "/services/vyvoz-spila",
    image: "/source/5f9f367e6b09a9bf.webp",
    alt: "Вывоз спиленных веток и древесины",
  },
  {
    number: "06",
    title: "Вывоз строительного мусора",
    description: "Погрузка, вывоз и утилизация строительных отходов.",
    href: "/services/vyvoz-stroitelnogo-musora",
    image: "/source/4101e733801e5c0e.webp",
    alt: "Вывоз строительного мусора с объекта",
  },
  {
    number: "07",
    title: "Аренда автовышек",
    description: "Высотные работы с техникой нужной высоты и вылета.",
    href: "/services/arenda-avtovyshek",
    image: "/catalog/lift-28-hq.jpg",
    alt: "Автовышка ГРИНАВТО для высотных работ",
  },
  {
    number: "08",
    title: "Перевозка сыпучих материалов",
    description: "Доставка сыпучих строительных материалов на объект.",
    href: "/services/perevozka-sypuchih-materilov",
    image: "/source/6fd07ed0807109b3.webp",
    alt: "Перевозка сыпучих строительных материалов",
  },
];
