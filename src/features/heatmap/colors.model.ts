import { combine, createStore } from "effector";
import { max } from "lodash";

import { $filteredData } from "./data.model";

export const $maxAmount = combine(
  $filteredData,
  (data) => max(Object.values(data)) ?? 0
);

export const $minAmount = createStore(0);

export const $pallet = combine($minAmount, $maxAmount, (minValue, maxValue) => {
  // @ts-expect-error d3 is not typed in this app
  const paletteScale = d3.scale
    .linear()
    .domain([minValue, maxValue])
    .range(["#EFEFFF", "#02386F"]);

  return paletteScale as (value: number) => string;
});
