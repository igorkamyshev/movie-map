import { ActionIcon } from "@mantine/core";
import { combine, createEvent, split } from "effector";
import {
  IconPlayerPlayFilled,
  IconPlayerPauseFilled,
} from "@tabler/icons-react";
import { variant } from "@effector/reflect";

import {
  $autoChangeRunning,
  startAutoChange,
  stopAutoChange,
} from "./auto_change.model";
import { useUnit } from "effector-react";

const handleClick = createEvent();

const Icon = variant({
  if: $autoChangeRunning,
  then: IconPlayerPauseFilled,
  else: IconPlayerPlayFilled,
});

split({
  source: handleClick,
  match: combine($autoChangeRunning, (running) => (running ? "stop" : "start")),
  cases: { stop: stopAutoChange, start: startAutoChange },
});

export function AutoChange() {
  const { onClick } = useUnit({ onClick: handleClick });

  return (
    <ActionIcon onClick={onClick}>
      <Icon />
    </ActionIcon>
  );
}
