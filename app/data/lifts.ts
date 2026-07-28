export type Lift = {
  id: string;
  name: string;
  range: "compact" | "city" | "high";
  height: string;
  reach: string;
  capacity: string;
  note: string;
  shiftPrice: null;
  extraHourPrice: null;
};

export const lifts: Lift[] = [
  {
    id: "archive-12",
    name: "Компактная автовышка",
    range: "compact",
    height: "до 18 м",
    reach: "уточняется",
    capacity: "уточняется",
    note: "Состав моделей подтверждается по новому прайс-листу",
    shiftPrice: null,
    extraHourPrice: null,
  },
  {
    id: "archive-28",
    name: "Городская автовышка",
    range: "city",
    height: "19–28 м",
    reach: "уточняется",
    capacity: "уточняется",
    note: "Подберём под условия подъезда и рабочую задачу",
    shiftPrice: null,
    extraHourPrice: null,
  },
  {
    id: "archive-45",
    name: "Высотная автовышка",
    range: "high",
    height: "от 29 м",
    reach: "уточняется",
    capacity: "уточняется",
    note: "Финальные характеристики появятся после сверки парка",
    shiftPrice: null,
    extraHourPrice: null,
  },
];
