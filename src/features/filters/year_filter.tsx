import { Grid, Slider } from "@mantine/core";
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
import { AutoChange } from "./auto_change";
import { desktop } from "../../services/breakpoints";
import styles from "./year_filter.module.css";

export const YearSlider = reflect({
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
    classNames: { mark: styles.mark, bar: styles.bar },
  },
});

export function YearFilter() {
  return (
    <Grid>
      <Grid.Col span="content">
        <AutoChange />
      </Grid.Col>
      <Grid.Col span="auto">
        <YearSlider />
      </Grid.Col>
    </Grid>
  );
}
