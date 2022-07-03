//@ts-check
import ts from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

/** @type {import('rollup').RollupOptions[]} */
const config = [
  {
    input: ["src/index.ts"],
    output: [{ format: "es", file: "dist/index.mjs" }],
    plugins: [ts({ compilerOptions: { noEmit: true } })],
  },
  {
    input: ["src/jsx-runtime.ts"],
    output: [{ format: "es", file: "dist/jsx-runtime.mjs" }],
    plugins: [ts({ compilerOptions: { noEmit: true } })],
  },
  {
    input: ["src/index.ts"],
    output: [{ format: "umd", file: "dist/index.umd.js", name: "baste" }],
    plugins: [terser(), ts({ compilerOptions: { noEmit: true } })],
  },
  {
    input: ["src/jsx-runtime.ts"],
    output: [{ format: "umd", file: "dist/jsx-runtime.umd.js", name: "baste" }],
    plugins: [terser(), ts({ compilerOptions: { noEmit: true } })],
  },
];

export default config;
