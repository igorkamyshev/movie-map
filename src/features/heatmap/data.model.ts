import { combine } from "effector";

import { allDataQuery } from "../dataset";
import { $yearFilter } from "../filters";

export const $filteredData = combine(
  allDataQuery.$data,
  $yearFilter,
  (data, year) => data.filter((item) => item.year === year) ?? []
);
