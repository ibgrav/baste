//@ts-check
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

const ts = () => typescript({ project: "./tsconfig.build.json", compilerOptions: { noEmit: true } });

/** @type {import('rollup').RollupOptions[]} */
const config = [
  {
    input: ["src/index.ts"],
    output: [{ format: "es", file: "dist/index.mjs" }],
    plugins: [ts()],
  },
  {
    input: ["src/jsx-runtime.ts"],
    output: [{ format: "es", file: "dist/jsx-runtime.mjs" }],
    plugins: [ts()],
  },
  {
    input: ["src/index.ts"],
    output: [{ format: "umd", file: "dist/index.umd.js", name: "baste" }],
    plugins: [terser(), ts()],
  },
  {
    input: ["src/jsx-runtime.ts"],
    output: [{ format: "umd", file: "dist/jsx-runtime.umd.js", name: "baste" }],
    plugins: [terser(), ts()],
  },
];

export default config;
