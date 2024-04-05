import { trackMediaQuery } from "@withease/web-api";

import { appStarted } from "./viewer";

export const { mobile, desktop } = trackMediaQuery(
  { mobile: "(max-width: 600px)", desktop: "(min-width: 601px)" },
  { setup: appStarted }
);
