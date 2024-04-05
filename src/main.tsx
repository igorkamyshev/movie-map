import React from "react";
import ReactDOM from "react-dom/client";
import { allSettled, fork } from "effector";
import { Provider } from "effector-react";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

import App from "./App.tsx";
import { appStarted } from "./services/viewer.ts";

const scope = fork();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider value={scope}>
      <MantineProvider>
        <App />
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);

allSettled(appStarted, { scope });
