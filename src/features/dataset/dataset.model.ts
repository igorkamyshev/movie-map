import { createQuery } from "@farfetched/core";
import { sample } from "effector";

import { appStarted } from "../../services/viewer";

export const allDataQuery = createQuery({
  initialData: {},
  async handler() {
    const { default: countries } = await import(
      "../../../data/unfiltered.json"
    );

    return countries as Record<string, Record<string, number>>;
  },
});

sample({ clock: appStarted, target: allDataQuery.start });
