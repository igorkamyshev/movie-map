import { createQuery } from "@farfetched/core";
import { combine, createStore, sample } from "effector";
import { max } from "lodash";

import { appStarted } from "../../services/viewer";

export const allDataQuery = createQuery({
  initialData: [],
  async handler() {
    return [
      { country: "USA", amount: 100, year: 1920 },
      { country: "USA", amount: 90, year: 1930 },
      { country: "USA", amount: 80, year: 1940 },
      { country: "USA", amount: 70, year: 1950 },
      { country: "USA", amount: 60, year: 1960 },
      { country: "USA", amount: 50, year: 1970 },
      { country: "USA", amount: 40, year: 1980 },
      { country: "USA", amount: 30, year: 1990 },
      { country: "USA", amount: 20, year: 2000 },
      { country: "USA", amount: 10, year: 2010 },
      { country: "USA", amount: 0, year: 2020 },
      { country: "RUS", amount: 0, year: 1920 },
      { country: "RUS", amount: 10, year: 1930 },
      { country: "RUS", amount: 20, year: 1940 },
      { country: "RUS", amount: 30, year: 1950 },
      { country: "RUS", amount: 40, year: 1960 },
      { country: "RUS", amount: 50, year: 1970 },
      { country: "RUS", amount: 60, year: 1980 },
      { country: "RUS", amount: 70, year: 1990 },
      { country: "RUS", amount: 80, year: 2000 },
      { country: "RUS", amount: 90, year: 2010 },
      { country: "RUS", amount: 100, year: 2020 },
    ];
  },
});

export const $maxAmount = combine(
  allDataQuery.$data,
  (data) => max(data.map((item) => item.amount)) ?? 0
);

export const $minAmount = createStore(0);

sample({ clock: appStarted, target: allDataQuery.start });
