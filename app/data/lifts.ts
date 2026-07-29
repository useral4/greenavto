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
    id: "aerial-lifts",
    href: "/katalog-tekhniki/avtovyshki",
    name: "Автовышки",
    pricePerHour: 1375,
    image: "/catalog/lift-28-hq.jpg",
    alt: "Автовышка из парка ГРИНАВТО",
  },
];

function liftSpecs(height: number): Array<[string, string]> {
  return [
    ["Рабочая высота", `${height} м`],
    ["Оператор", "включён"],
    ["Подача", "СПб и ЛО"],
  ];
}

export const equipment: EquipmentProduct[] = [
  {
    id: "lift-12",
    href: "/katalog-tekhniki/avtovyshki/arenda-avtovyshki-12m",
    kind: "lift",
    name: "Автовышка 12 м",
    shortSpec: "12 м",
    specs: [
      ["Рабочая высота", "12 м"],
      ["Рабочий радиус", "6 м"],
      ["Грузоподъёмность", "200 кг"],
      ["Поворот платформы", "220°"],
    ],
    price: 11000,
    image: "/source/cfc668039c53031d.webp",
    alt: "Автовышка с рабочей высотой 12 метров",
  },
  {
    id: "lift-15",
    href: "/katalog-tekhniki/avtovyshki/arenda-avtovyshki-15m",
    kind: "lift",
    name: "Автовышка 15 м",
    shortSpec: "15 м",
    specs: liftSpecs(15),
    price: 11600,
    image: "/source/0bd7c0af8ce5f80a.webp",
    alt: "Автовышка ГАЗель Next с рабочей высотой 15 метров",
  },
  {
    id: "lift-17",
    href: "/katalog-tekhniki/avtovyshki/arenda-avtovyshki-17m",
    kind: "lift",
    name: "Автовышка 17 м",
    shortSpec: "17 м",
    specs: liftSpecs(17),
    price: 12000,
    image: "/source/1acb7b310bb675ed.webp",
    alt: "Автовышка с рабочей высотой 17 метров",
  },
  {
    id: "lift-18",
    href: "/katalog-tekhniki/avtovyshki/arenda-avtovyshki-18m",
    kind: "lift",
    name: "Автовышка 18 м",
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
    id: "lift-22",
    href: "/katalog-tekhniki/avtovyshki/arenda-avtovyshki-22m",
    kind: "lift",
    name: "Автовышка 22 м",
    shortSpec: "22 м",
    specs: liftSpecs(22),
    price: 14000,
    image: "/source/324af103fd541fcb.webp",
    alt: "Автовышка с рабочей высотой 22 метра",
  },
  {
    id: "lift-24",
    href: "/katalog-tekhniki/avtovyshki/arenda-avtovyshki-24m",
    kind: "lift",
    name: "Автовышка 24 м",
    shortSpec: "24 м",
    specs: liftSpecs(24),
    price: 15000,
    image: "/source/b07943c6e0bca7ad.webp",
    alt: "Автовышка Tadano с рабочей высотой 24 метра",
  },
  {
    id: "lift-25",
    href: "/katalog-tekhniki/avtovyshki/arenda-avtovyshki-25m",
    kind: "lift",
    name: "Автовышка 25 м",
    shortSpec: "25 м",
    specs: liftSpecs(25),
    price: 15000,
    image: "/source/13d42843b14bb23f.webp",
    alt: "Автовышка Hyundai с рабочей высотой 25 метров",
  },
  {
    id: "lift-26",
    href: "/katalog-tekhniki/avtovyshki/arenda-avtovyshki-26m",
    kind: "lift",
    name: "Автовышка 26 м",
    shortSpec: "26 м",
    specs: liftSpecs(26),
    price: 15000,
    image: "/source/85d840d7c244cd4c.webp",
    alt: "Автовышка с рабочей высотой 26 метров",
  },
  {
    id: "lift-28",
    href: "/katalog-tekhniki/avtovyshki/arenda-avtovyshki-28m",
    kind: "lift",
    name: "Автовышка 28 м",
    shortSpec: "28 м",
    specs: [
      ["Рабочая высота", "28 м"],
      ["Рабочий радиус", "15 м"],
      ["Грузоподъёмность", "300 кг"],
      ["Поворот платформы", "220°"],
    ],
    price: 16000,
    image: "/catalog/lift-28-hq.jpg",
    alt: "Автовышка Daewoo с рабочей высотой 28 метров",
  },
  {
    id: "lift-32",
    href: "/katalog-tekhniki/avtovyshki/arenda-avtovyshki-32m",
    kind: "lift",
    name: "Автовышка 32 м",
    shortSpec: "32 м",
    specs: liftSpecs(32),
    price: 19500,
    image: "/source/cb51bdad415f8200.webp",
    alt: "Автовышка с рабочей высотой 32 метра",
  },
  {
    id: "lift-35",
    href: "/katalog-tekhniki/avtovyshki/arenda-avtovyshki-35m",
    kind: "lift",
    name: "Автовышка 35 м",
    shortSpec: "35 м",
    specs: liftSpecs(35),
    price: 20000,
    image: "/source/0bc393a2421a4bb4.webp",
    alt: "Автовышка с рабочей высотой 35 метров",
  },
  {
    id: "lift-45",
    href: "/katalog-tekhniki/avtovyshki/arenda-avtovyshki-45m",
    kind: "lift",
    name: "Автовышка 45 м",
    shortSpec: "45 м",
    specs: [
      ["Рабочая высота", "45 м"],
      ["Грузоподъёмность", "300 кг"],
      ["Тип стрелы", "телескопическая"],
      ["Поворот платформы", "360°"],
    ],
    price: 26000,
    image: "/catalog/lift-45-hero-hq.webp",
    alt: "Телескопическая автовышка Daewoo высотой 45 метров",
  },
  {
    id: "lift-50",
    href: "/katalog-tekhniki/avtovyshki/arenda-avtovyshki-50m",
    kind: "lift",
    name: "Автовышка 50 м",
    shortSpec: "50 м",
    specs: [
      ["Рабочая высота", "50 м"],
      ["Рабочий радиус", "26 м"],
      ["Грузоподъёмность", "300 кг"],
      ["Поворот платформы", "360°"],
    ],
    price: 40000,
    image: "/source/8d81d992bb9b3ea8.webp",
    alt: "Высотная автомобильная вышка с рабочей высотой 50 метров",
  },
  {
    id: "lift-60",
    href: "/katalog-tekhniki/avtovyshki/arenda-avtovyshki-60m",
    kind: "lift",
    name: "Автовышка 60 м",
    shortSpec: "60 м",
    specs: liftSpecs(60),
    price: 40000,
    image: "/source/b9756bf00221b1bd.webp",
    alt: "Высотная автомобильная вышка с рабочей высотой 60 метров",
  },
];
