import { createQuery } from "@farfetched/core";
import { sample } from "effector";

import { appStarted } from "../../services/viewer";

export const allDataQuery = createQuery({
  initialData: {},
  async handler() {
    const { default: countries } = await import("../../../data/countries.json");

    return countries as Record<
      string /* year */,
      Record<string /* country */, Record<string /* award */, number>>
    >;
  },
});

export const awardsQuery = createQuery({
  initialData: [],
  async handler() {
    const { default: countries } = await import("../../../data/awards.json");

    return countries;
  },
});

sample({ clock: appStarted, target: [allDataQuery.start, awardsQuery.start] });
