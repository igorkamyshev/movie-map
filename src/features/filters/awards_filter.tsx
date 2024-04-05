import { useUnit } from "effector-react";
import { Checkbox } from "@mantine/core";

import { $awardsFilterBoundaries, toggleAward } from "./awards_filter.model";

export function AwardFilter() {
  const { boundaries, onChange } = useUnit({
    boundaries: $awardsFilterBoundaries,
    onChange: toggleAward,
  });

  return (
    <>
      {boundaries.map((item) => (
        <Checkbox
          key={item.label}
          label={item.label}
          checked={item.selected}
          onChange={() => onChange(item.label)}
        />
      ))}
    </>
  );
}
