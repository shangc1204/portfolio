/// <reference types="vite/client" />

import type { Config } from "./types/index.js";

declare global {
  const __CONFIG__: Config;
}
