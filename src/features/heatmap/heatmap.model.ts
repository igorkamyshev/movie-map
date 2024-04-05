import { createGate } from "effector-react";
import { attach, createStore, sample } from "effector";
import { mapValues } from "lodash";

import { $pallet } from "./colors.model";
import { $allCountries, $filteredData } from "./data.model";

// @ts-expect-error datamap does not have any typings
const Datamap = window.Datamap;

export const HeatmapGate = createGate<{
  ref: { current: HTMLDivElement | null };
}>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const $map = createStore<any>(null);

const MapResizeListenerStorage = Symbol("MapResizeListenerStorage");

const createMapFx = attach({
  source: { oldMap: $map, pallete: $pallet },
  async effect({ oldMap, pallete }, ref: { current: HTMLDivElement | null }) {
    if (oldMap) {
      window.removeEventListener("resize", oldMap[MapResizeListenerStorage]);

      // destroy old map
      oldMap.options.element.innerHTML = "";
    }

    if (!ref.current) {
      return;
    }

    // destroy old map one more time 😇
    ref.current.innerHTML = "";

    const map = new Datamap({
      element: ref.current,
      projection: "mercator",
      responsive: true,
      geographyConfig: {
        highlightOnHover: false,
        popupOnHover: false,
      },
      fills: {
        defaultFill: pallete(0),
      },
    });

    const listener = () => map.resize();
    window.addEventListener("resize", listener);
    // Store listener inside map instance to remove it later
    map[MapResizeListenerStorage] = listener;

    return map;
  },
});

sample({
  clock: HeatmapGate.open,
  fn: ({ ref }) => ref,
  target: createMapFx,
});
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

sample({
  clock: [$filteredData, $map],
  target: updateColorsFx,
});
