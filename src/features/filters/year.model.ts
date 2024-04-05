import { createEvent, createStore, restore } from "effector";

// -- year filter --

const MIN_YEAR = 1920;
const MAX_YEAR = 2020;

export const $yearFilterBoundaries = createStore({
  min: MIN_YEAR,
  max: MAX_YEAR,
});

export const $yearFilterStep = createStore(10);

export const changeYearFilter = createEvent<number>();

export const $yearFilter = restore(changeYearFilter, MAX_YEAR);
