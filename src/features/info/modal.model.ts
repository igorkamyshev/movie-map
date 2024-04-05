import { createApi, createStore } from "effector";

export const $opened = createStore(false);

export const { open, close } = createApi($opened, {
  open: () => true,
  close: () => false,
});
