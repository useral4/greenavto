export type EquipmentCategory = {
  id: string;
  name: string;
  pricePerHour: number;
  image: string;
  alt: string;
};

export type EquipmentProduct = {
  id: string;
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
    name: "Автокраны",
    pricePerHour: 1800,
    image: "/catalog/category-crane.webp",
    alt: "Автомобильный кран в каталоге спецтехники ГРИНАВТО",
  },
  {
    id: "aerial-lifts",
    name: "Автовышки",
    pricePerHour: 1800,
    image: "/catalog/category-lift.webp",
    alt: "Автомобильная вышка в каталоге техники ГРИНАВТО",
  },
  {
    id: "crawler-cranes",
    name: "Гусеничные краны",
    pricePerHour: 1400,
    image: "/catalog/category-crawler-crane.webp",
    alt: "Гусеничный кран в аренду",
  },
  {
    id: "crawler-excavators",
    name: "Гусеничные экскаваторы",
    pricePerHour: 1800,
    image: "/catalog/category-crawler-excavator.webp",
    alt: "Гусеничный экскаватор в аренду",
  },
  {
    id: "wheel-excavators",
    name: "Колёсные экскаваторы",
    pricePerHour: 1800,
    image: "/catalog/category-wheel-excavator.webp",
    alt: "Колёсный экскаватор в аренду",
  },
  {
    id: "backhoe-loaders",
    name: "Экскаваторы-погрузчики",
    pricePerHour: 1400,
    image: "/catalog/category-backhoe.webp",
    alt: "Экскаватор-погрузчик в аренду",
  },
  {
    id: "mini-loaders",
    name: "Мини-погрузчики",
    pricePerHour: 1800,
    image: "/catalog/category-mini-loader.webp",
    alt: "Мини-погрузчик в аренду",
  },
  {
    id: "forklifts",
    name: "Вилочные погрузчики",
    pricePerHour: 1400,
    image: "/catalog/category-forklift.webp",
    alt: "Вилочный погрузчик в аренду",
  },
  {
    id: "front-loaders",
    name: "Фронтальные погрузчики",
    pricePerHour: 1800,
    image: "/catalog/category-front-loader.webp",
    alt: "Фронтальный погрузчик в аренду",
  },
];

export const equipment: EquipmentProduct[] = [
  {
    id: "lift-12",
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
    id: "lift-28",
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
    id: "lift-50",
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
