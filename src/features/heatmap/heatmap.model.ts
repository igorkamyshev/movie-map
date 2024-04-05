import { createGate } from "effector-react";
import { attach, createStore, sample } from "effector";
import "../../vendor/datamaps";

import { $pallet } from "./colors.model";
import { $filteredData } from "./data.model";

// @ts-expect-error datamap does not have any typings
const Datamap = window.Datamap;

export const HeatmapGate = createGate<{
  ref: { current: HTMLDivElement | null };
}>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const $map = createStore<any>(null);

const createMapFx = attach({
  source: $map,
  async effect(oldMap, ref: { current: HTMLDivElement | null }) {
    if (oldMap) {
      // destroy old map
      oldMap.options.element.innerHTML = "";
    }

    if (!ref.current) {
      return;
    }

    const map = new Datamap({
      element: ref.current,
      projection: "mercator",
      geographyConfig: {
        highlightOnHover: false,
        popupOnHover: false,
      },
      fills: {
        defaultFill: "lightgray",
      },
    });

    return map;
  },
});

sample({ clock: HeatmapGate.open, fn: ({ ref }) => ref, target: createMapFx });
sample({ clock: createMapFx.doneData, target: $map });

const updateColorsFx = attach({
  source: { map: $map, pallet: $pallet, values: $filteredData },
  async effect({ map, pallet, values }) {
    if (!map) {
      return;
    }

    map.updateChoropleth(
      Object.fromEntries(
        values.map((item) => [item.country, pallet(item.amount)])
      )
    );
  },
});

sample({ clock: [$filteredData, $map], target: updateColorsFx });
