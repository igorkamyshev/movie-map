import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react({ babel: { plugins: ["effector/babel-plugin"] } })],
  optimizeDeps: {
    exclude: ["datamaps"],
  },
});
