import { combine } from "effector";

import { $maxAmount, $minAmount } from "../dataset";

export const $pallet = combine($minAmount, $maxAmount, (minValue, maxValue) => {
  // @ts-expect-error d3 is not typed in this app
  const paletteScale = d3.scale
    .linear()
    .domain([minValue, maxValue])
    .range(["#EFEFFF", "#02386F"]);

  return paletteScale as (value: number) => string;
});
