import { combine } from "effector";
import { mapValues, pick, uniq } from "lodash";

import { allDataQuery } from "../dataset";
import { $awardFilter, $yearFilter } from "../filters";

export const $allCountries = combine(allDataQuery.$data, (data) =>
  uniq(Object.values(data).map(Object.keys).flat())
);

export const $filteredData = combine(
  allDataQuery.$data,
  $yearFilter,
  $awardFilter,
  (data, year, awards) => {
    const yearData = data[year.toString()] ?? {};

    return mapValues(yearData, (value) => {
      const selectedAmounts = pick(value, ...awards);

      return Object.values(selectedAmounts).reduce(
        (acc, amount) => acc + amount,
        0
      );
    });
  }
);
