import { createGate } from "effector-react";
import { attach, createStore, sample } from "effector";
import { mapValues } from "lodash";
import "../../vendor/datamaps";

import { $pallet } from "./colors.model";
import { $allCountries, $filteredData } from "./data.model";

// @ts-expect-error datamap does not have any typings
const Datamap = window.Datamap;

export const HeatmapGate = createGate<{
  ref: { current: HTMLDivElement | null };
}>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const $map = createStore<any>(null);

const createMapFx = attach({
  source: { oldMap: $map, pallete: $pallet },
  async effect({ oldMap, pallete }, ref: { current: HTMLDivElement | null }) {
    if (oldMap) {
      // destroy old map
      oldMap.options.element.innerHTML = "";
    }

    if (!ref.current) {
      return;
    }

    ref.current.innerHTML = "";

    const map = new Datamap({
      element: ref.current,
      projection: "mercator",
      geographyConfig: {
        highlightOnHover: false,
        popupOnHover: false,
      },
      fills: {
        defaultFill: pallete(0),
      },
    });

    return map;
  },
});

sample({ clock: HeatmapGate.open, fn: ({ ref }) => ref, target: createMapFx });
sample({ clock: createMapFx.doneData, target: $map });

const updateColorsFx = attach({
  source: {
    map: $map,
    pallet: $pallet,
    values: $filteredData,
    countries: $allCountries,
  },
  async effect({ map, pallet, values, countries }) {
    if (!map) {
      return;
    }

    map.updateChoropleth(
      Object.fromEntries(countries.map((country) => [country, pallet(0)]))
    );

    map.updateChoropleth(mapValues(values, (amount) => pallet(amount)));
  },
});

sample({ clock: [$filteredData, $map], target: updateColorsFx });
