import { createEvent, createStore, sample } from "effector";

export const $winningFilter = createStore(true);

export const toggleWinningFilter = createEvent<unknown>();

sample({
  clock: toggleWinningFilter,
  source: $winningFilter,
  fn: (value) => !value,
  target: $winningFilter,
});
