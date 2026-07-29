"use client";

import { useMemo, useState } from "react";

const rentalOptions = [
  { value: "11000", label: "Автовышка 12 м" },
  { value: "16000", label: "Автовышка 28 м" },
  { value: "40000", label: "Автовышка 50 м" },
  { value: "10000", label: "Автокран 16 т" },
  { value: "15050", label: "Автокран 25 т" },
  { value: "45000", label: "Автокран 50 т" },
] as const;

export function CatalogCalculator() {
  const [rate, setRate] = useState(rentalOptions[0].value);
  const [shifts, setShifts] = useState(1);

  const total = useMemo(
    () => Number(rate) * Math.max(1, shifts || 1),
    [rate, shifts],
  );

  return (
    <div className="catalog-index-calculator">
      <div>
        <span>Быстрый расчёт</span>
        <h2>Примерная стоимость аренды</h2>
        <p>
          Выберите технику и количество смен. Точную стоимость подтвердит
          менеджер после уточнения адреса и условий работы.
        </p>
      </div>

      <div className="catalog-index-calculator-form">
        <label>
          <span>Вид техники</span>
          <select value={rate} onChange={(event) => setRate(event.target.value)}>
            {rentalOptions.map((option) => (
              <option value={option.value} key={option.label}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Количество смен</span>
          <input
            type="number"
            min="1"
            max="365"
            value={shifts}
            onChange={(event) => setShifts(Number(event.target.value))}
          />
        </label>
        <div className="catalog-index-total" aria-live="polite">
          <span>Ориентировочно</span>
          <strong>{total.toLocaleString("ru-RU")} ₽</strong>
        </div>
        <a href="tel:+79990088884">
          Уточнить расчёт <span aria-hidden="true">↗︎</span>
        </a>
      </div>
    </div>
  );
}
