import { useUnit } from "effector-react";
import { Checkbox, Title } from "@mantine/core";

import { $awardsFilterBoundaries, toggleAward } from "./awards_filter.model";

export function AwardFilter() {
  const { boundaries, onChange } = useUnit({
    boundaries: $awardsFilterBoundaries,
    onChange: toggleAward,
  });

  return (
    <>
      <Title order={2}>Премии</Title>
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
