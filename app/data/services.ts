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
    title: "Аренда автовышек",
    description: "Высотные работы с техникой нужной высоты и вылета.",
    href: "/services/arenda-avtovyshek",
    image: "/catalog/lift-28-hq.jpg",
    alt: "Автовышка ГРИНАВТО для высотных работ",
  },
];
