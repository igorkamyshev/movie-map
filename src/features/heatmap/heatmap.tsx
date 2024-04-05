import { useGate } from "effector-react";
import { HeatmapGate } from "./heatmap.model";
import { useRef } from "react";

export function Heatmap() {
  const ref = useRef<HTMLDivElement | null>(null);

  useGate(HeatmapGate, { ref });

  return (
    <div
      ref={ref}
      style={{ width: "100%", height: "80%", position: "relative" }}
    />
  );
}
