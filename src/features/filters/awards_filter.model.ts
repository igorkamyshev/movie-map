import { combine, createEvent, createStore, sample } from "effector";

import { awardsQuery } from "../dataset";

export const $selectedAwards = createStore<string[]>([]);

// by default, we select all awards
sample({
  clock: awardsQuery.finished.success,
  fn: ({ result }) => result,
  target: $selectedAwards,
});

export const toggleAward = createEvent<string>();

// by clicking on the award, we either
// add it to the list of selected awards
// or remove it from there
sample({
  clock: toggleAward,
  source: $selectedAwards,
  fn: (awards, award) =>
    awards.includes(award)
      ? awards.filter((a) => a !== award)
      : [...awards, award],
  target: $selectedAwards,
});

export const $awardsFilterBoundaries = combine(
  { all: awardsQuery.$data, selected: $selectedAwards },
  ({ all, selected }) =>
    all.map((item) => ({ label: item, selected: selected.includes(item) }))
);
