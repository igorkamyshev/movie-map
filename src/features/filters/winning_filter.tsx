import { reflect } from "@effector/reflect";
import { Switch } from "@mantine/core";
import { $winningFilter, toggleWinningFilter } from "./winning_filter.model";

export const WinningFilter = reflect({
  view: Switch,
  bind: {
    checked: $winningFilter,
    onChange: toggleWinningFilter,
    label: "Только победители",
  },
});
