//@ts-check
import ts from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

/** @type {import('rollup').RollupOptions[]} */
const config = [
  {
    input: ["src/index.ts"],
    output: [{ format: "es", file: "dist/index.mjs" }],
    plugins: [terser(), ts({ compilerOptions: { noEmit: true } })],
  },
  {
    input: ["src/jsx-runtime.ts"],
    output: [{ format: "es", file: "dist/jsx-runtime.mjs" }],
    plugins: [terser(), ts({ compilerOptions: { noEmit: true } })],
  },
  {
    input: ["src/index.ts"],
    output: [{ format: "cjs", file: "dist/index.js" }],
    plugins: [terser(), ts({ compilerOptions: { noEmit: true } })],
  },
  {
    input: ["src/jsx-runtime.ts"],
    output: [{ format: "cjs", file: "dist/jsx-runtime.js" }],
    plugins: [terser(), ts({ compilerOptions: { noEmit: true } })],
  },
];

export default config;
