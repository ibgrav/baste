import { defineConfig } from "vite";

export default defineConfig({
  esbuild: {
    jsxFragment: "Fragment",
    jsxFactory: "createElement",
    jsxInject: `import { createElement, Fragment } from 'baste/jsx-runtime'`,
  },
});
