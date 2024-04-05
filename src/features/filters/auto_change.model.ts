import { createEvent, createStore, sample } from "effector";
import { interval } from "patronum";
import {
  $yearFilter,
  $yearFilterBoundaries,
  $yearFilterStep,
  changeYearFilter,
} from "./year.model";

export const startAutoChange = createEvent();
export const stopAutoChange = createEvent();

export const $autoChangeRunning = createStore(false);

$autoChangeRunning
  .on(startAutoChange, () => true)
  .on(stopAutoChange, () => false);

// first show the earliest year
sample({
  clock: startAutoChange,
  source: { boundaries: $yearFilterBoundaries },
  fn: ({ boundaries }) => boundaries.min,
  target: changeYearFilter,
});

// then change year automatically
sample({
  clock: interval({
    timeout: 700,
    start: startAutoChange,
    stop: stopAutoChange,
  }).tick,
  source: {
    year: $yearFilter,
    step: $yearFilterStep,
    boundaries: $yearFilterBoundaries,
  },
  fn: ({ year, step, boundaries }) => {
    const nextFilter = year + step;

    if (nextFilter > boundaries.max) {
      return boundaries.min;
    }

    return nextFilter;
  },
  target: changeYearFilter,
});
