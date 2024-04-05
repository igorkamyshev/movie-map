import { Slider } from "@mantine/core";
import { reflect } from "@effector/reflect";
import { combine } from "effector";
import { range } from "lodash";
import { either } from "patronum";

import {
  $yearFilter,
  $yearFilterBoundaries,
  $yearFilterStep,
  changeYearFilter,
} from "./year.model";
import { desktop } from "../../services/breakpoints";

export const YearFilter = reflect({
  view: Slider,
  bind: {
    step: $yearFilterStep,
    min: combine($yearFilterBoundaries, ({ min }) => min),
    max: combine($yearFilterBoundaries, ({ max }) => max),
    value: $yearFilter,
    onChange: changeYearFilter,
    marks: either({
      filter: desktop.$matches,
      then: combine(
        $yearFilterBoundaries,
        $yearFilterStep,
        ({ min, max }, step) =>
          range(min, max + step, step).map((value) => ({ value, label: value }))
      ),
      other: combine($yearFilterBoundaries, ({ min, max }) => [
        { value: min, label: min },
        { value: max, label: max },
      ]),
    }),
    color: "blue",
    showLabelOnHover: false,
  },
});
