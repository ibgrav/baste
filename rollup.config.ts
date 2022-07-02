import type { RollupOptions } from "rollup";
import ts from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

const config: Array<RollupOptions> = [
  {
    input: ["src/index.ts", "src/jsx-runtime.ts"],
    output: [{ format: "es", dir: "dist/es" }],
    plugins: [ts({ exclude: ["rollup.config.ts"], compilerOptions: { outDir: "dist/es", declaration: true } })],
  },
  {
    input: ["src/index.ts"],
    output: [{ format: "umd", dir: "dist/umd", name: "baste", inlineDynamicImports: true, minifyInternalExports: true }],
    plugins: [ts({ exclude: ["rollup.config.ts"], compilerOptions: { noEmit: true } }), terser()],
  },
  {
    input: ["src/jsx-runtime.ts"],
    output: [{ format: "umd", dir: "dist/umd", name: "baste", inlineDynamicImports: true, minifyInternalExports: true }],
    plugins: [ts({ exclude: ["rollup.config.ts"], compilerOptions: { noEmit: true } }), terser()],
  },
];

export default config;
