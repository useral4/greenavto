export type EquipmentCategory = {
  id: string;
  href: string;
  name: string;
  pricePerHour: number;
  image: string;
  alt: string;
};

export type EquipmentProduct = {
  id: string;
  href: string;
  kind: "lift" | "crane";
  name: string;
  shortSpec: string;
  specs: Array<[string, string]>;
  price: number;
  image: string;
  alt: string;
};

export const categories: EquipmentCategory[] = [
  {
    id: "truck-cranes",
    href: "/katalog-tekhniki/avtokrany",
    name: "Автокраны",
    pricePerHour: 1800,
    image: "/catalog/category-crane.webp",
    alt: "Автомобильный кран в каталоге спецтехники ГРИНАВТО",
  },
  {
    id: "aerial-lifts",
    href: "/katalog-tekhniki/avtovyshki",
    name: "Автовышки",
    pricePerHour: 1800,
    image: "/catalog/category-lift.webp",
    alt: "Автомобильная вышка в каталоге техники ГРИНАВТО",
  },
  {
    id: "crawler-cranes",
    href: "/katalog-tekhniki/gusenichnye-krany",
    name: "Гусеничные краны",
    pricePerHour: 1400,
    image: "/catalog/category-crawler-crane.webp",
    alt: "Гусеничный кран в аренду",
  },
  {
    id: "crawler-excavators",
    href: "/katalog-tekhniki/gusenichnye-ekskavatory",
    name: "Гусеничные экскаваторы",
    pricePerHour: 1800,
    image: "/catalog/category-crawler-excavator.webp",
    alt: "Гусеничный экскаватор в аренду",
  },
  {
    id: "wheel-excavators",
    href: "/katalog-tekhniki/kolesnyj-ekskavator",
    name: "Колёсные экскаваторы",
    pricePerHour: 1800,
    image: "/catalog/category-wheel-excavator.webp",
    alt: "Колёсный экскаватор в аренду",
  },
  {
    id: "backhoe-loaders",
    href: "/katalog-tekhniki/ekskavatory-pogruzchiki",
    name: "Экскаваторы-погрузчики",
    pricePerHour: 1400,
    image: "/catalog/category-backhoe.webp",
    alt: "Экскаватор-погрузчик в аренду",
  },
  {
    id: "mini-loaders",
    href: "/katalog-tekhniki/mini-pogruzchiki",
    name: "Мини-погрузчики",
    pricePerHour: 1800,
    image: "/catalog/category-mini-loader.webp",
    alt: "Мини-погрузчик в аренду",
  },
  {
    id: "forklifts",
    href: "/katalog-tekhniki/vilochnye-pogruzchiki",
    name: "Вилочные погрузчики",
    pricePerHour: 1400,
    image: "/catalog/category-forklift.webp",
    alt: "Вилочный погрузчик в аренду",
  },
  {
    id: "front-loaders",
    href: "/katalog-tekhniki/frontalnye-pogruzchiki",
    name: "Фронтальные погрузчики",
    pricePerHour: 1800,
    image: "/catalog/category-front-loader.webp",
    alt: "Фронтальный погрузчик в аренду",
  },
];

export const equipment: EquipmentProduct[] = [
  {
    id: "lift-12",
    href: "/katalog-tekhniki/avtovyshki/arenda-avtovyshki-12m",
    kind: "lift",
    name: "Автомобильная вышка 12 м",
    shortSpec: "12 м",
    specs: [
      ["Рабочая высота", "12 м"],
      ["Рабочий радиус", "6 м"],
      ["Грузоподъёмность", "200 кг"],
      ["Поворот платформы", "220°"],
    ],
    price: 10000,
    image: "/catalog/lift-12.webp",
    alt: "Автомобильная вышка с рабочей высотой 12 метров",
  },
  {
    id: "lift-18",
    href: "/katalog-tekhniki/avtovyshki/arenda-avtovyshki-18m",
    kind: "lift",
    name: "Автомобильная вышка 18 м",
    shortSpec: "18 м",
    specs: [
      ["Рабочая высота", "18 м"],
      ["Марка подъёмника", "Велмаш-С"],
      ["Шасси", "ГАЗель Next"],
      ["Колёсная формула", "4×2"],
    ],
    price: 12000,
    image: "/catalog/lift-18-hq.webp",
    alt: "Автовышка 18 метров на шасси ГАЗель Next",
  },
  {
    id: "lift-28",
    href: "/katalog-tekhniki/avtovyshki/arenda-avtovyshki-28m",
    kind: "lift",
    name: "Автомобильная вышка 28 м",
    shortSpec: "28 м",
    specs: [
      ["Рабочая высота", "28 м"],
      ["Рабочий радиус", "15 м"],
      ["Грузоподъёмность", "300 кг"],
      ["Поворот платформы", "220°"],
    ],
    price: 15000,
    image: "/catalog/lift-28.webp",
    alt: "Автомобильная вышка Daewoo с рабочей высотой 28 метров",
  },
  {
    id: "lift-45",
    href: "/katalog-tekhniki/avtovyshki/arenda-avtovyshki-45m",
    kind: "lift",
    name: "Автомобильная вышка 45 м",
    shortSpec: "45 м",
    specs: [
      ["Рабочая высота", "45 м"],
      ["Грузоподъёмность", "300 кг"],
      ["Тип стрелы", "Телескопическая"],
      ["Поворот платформы", "360°"],
    ],
    price: 26000,
    image: "/catalog/lift-45-hero-hq.webp",
    alt: "Телескопическая автовышка DAEWOO высотой 45 метров",
  },
  {
    id: "lift-50",
    href: "/katalog-tekhniki/avtovyshki/arenda-avtovyshki-50m",
    kind: "lift",
    name: "Автомобильная вышка 50 м",
    shortSpec: "50 м",
    specs: [
      ["Рабочая высота", "50 м"],
      ["Рабочий радиус", "26 м"],
      ["Грузоподъёмность", "300 кг"],
      ["Поворот платформы", "360°"],
    ],
    price: 40000,
    image: "/catalog/lift-50.webp",
    alt: "Высотная автомобильная вышка с рабочей высотой 50 метров",
  },
  {
    id: "crane-16",
    href: "/katalog-tekhniki/avtokrany/arenda-avtokrana-16t",
    kind: "crane",
    name: "Автомобильный кран 16 т",
    shortSpec: "16 т",
    specs: [
      ["Грузоподъёмность", "16 т"],
      ["Длина стрелы", "18 м"],
      ["Длина гуська", "7 м"],
      ["Высота подъёма", "25 м"],
    ],
    price: 10000,
    image: "/catalog/crane-16.webp",
    alt: "Автомобильный кран грузоподъёмностью 16 тонн",
  },
  {
    id: "crane-25",
    href: "/katalog-tekhniki/avtokrany/arenda-avtokrana-25t",
    kind: "crane",
    name: "Автомобильный кран 25 т",
    shortSpec: "25 т",
    specs: [
      ["Грузоподъёмность", "25 т"],
      ["Длина стрелы", "20 м"],
      ["Длина гуська", "9 м"],
      ["Высота подъёма", "31 м"],
    ],
    price: 15050,
    image: "/catalog/crane-25.webp",
    alt: "Автомобильный кран грузоподъёмностью 25 тонн",
  },
  {
    id: "crane-50",
    href: "/katalog-tekhniki/avtokrany/arenda-avtokrana-50t",
    kind: "crane",
    name: "Автомобильный кран 50 т",
    shortSpec: "50 т",
    specs: [
      ["Грузоподъёмность", "50 т"],
      ["Длина стрелы", "40 м"],
      ["Длина гуська", "16 м"],
      ["Высота подъёма", "55 м"],
    ],
    price: 45000,
    image: "/catalog/crane-50.webp",
    alt: "Автомобильный кран грузоподъёмностью 50 тонн",
  },
];
