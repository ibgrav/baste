/// <reference types="vitest" />

import { defineConfig } from "vite";

export default defineConfig({
  test: {},
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
    jsxInject: `import { h, Fragment } from './src/jsx-runtime'`,
  },
});
