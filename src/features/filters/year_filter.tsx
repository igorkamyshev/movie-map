import { Slider } from "@mantine/core";
import { reflect } from "@effector/reflect";
import { combine } from "effector";
import { range } from "lodash";

import {
  $yearFilter,
  $yearFilterBoundaries,
  $yearFilterStep,
  changeYearFilter,
} from "./year.model";

export const YearFilter = reflect({
  view: Slider,
  bind: {
    step: $yearFilterStep,
    min: combine($yearFilterBoundaries, ({ min }) => min),
    max: combine($yearFilterBoundaries, ({ max }) => max),
    value: $yearFilter,
    onChange: changeYearFilter,
    marks: combine(
      $yearFilterBoundaries,
      $yearFilterStep,
      ({ min, max }, step) =>
        range(min, max + step, step).map((value) => ({ value, label: value }))
    ),
    color: "blue",
    showLabelOnHover: false,
  },
});
