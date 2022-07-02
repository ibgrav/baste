import type { RollupOptions } from "rollup";
import typescript from "@rollup/plugin-typescript";

const config: Array<RollupOptions> = [
  {
    input: ["src/index.ts", "src/jsx-runtime.ts"],
    output: [{ format: "es", dir: "dist/es" }],
    plugins: [typescript({ exclude: ["rollup.config.ts"], compilerOptions: { outDir: "dist/es", declaration: true } })],
  },
  {
    input: ["src/index.ts", "src/jsx-runtime.ts"],
    output: [{ format: "cjs", dir: "dist/cjs" }],
    plugins: [typescript({ exclude: ["rollup.config.ts"], compilerOptions: { noEmit: true } })],
  },
];

export default config;
