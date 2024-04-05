import { combine } from "effector";
import { mapValues, pick, uniq } from "lodash";

import { allDataQuery } from "../dataset";
import { $awardFilter, $winningFilter, $yearFilter } from "../filters";

export const $allCountries = combine(allDataQuery.$data, (data) =>
  uniq(Object.values(data).map(Object.keys).flat())
);

export const $filteredData = combine(
  allDataQuery.$data,
  $yearFilter,
  $awardFilter,
  $winningFilter,
  (data, year, awards, winning) => {
    const yearData = data[year.toString()] ?? {};

    return mapValues(yearData, (value) => {
      const selectedAmounts = pick(value, ...awards);

      return Object.values(selectedAmounts).reduce(
        (acc, amount) =>
          acc + (winning ? amount.win : amount.win + amount.nomination),
        0
      );
    });
  }
);
