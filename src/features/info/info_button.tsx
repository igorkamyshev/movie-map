import { Button } from "@mantine/core";
import { useUnit } from "effector-react";

import { open } from "./modal.model";

export function InfoButton() {
  const { onClick } = useUnit({ onClick: open });

  return <Button onClick={onClick}>Что у вас здесь происходит?</Button>;
}
