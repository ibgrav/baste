//@ts-check
import typescript from "@rollup/plugin-typescript";

/** @type {import('rollup').RollupOptions[]} */
const config = [
  {
    input: ["src/index.ts", "src/jsx-runtime.ts"],
    output: [
      { format: "es", dir: "dist", entryFileNames: (file) => `${file.name}.es.js` },
      { format: "cjs", dir: "dist", entryFileNames: (file) => `${file.name}.cjs.js` },
    ],
    plugins: [
      typescript({
        compilerOptions: {
          noEmit: false,
          outDir: "dist",
          emitDeclarationOnly: true,
        },
      }),
    ],
  },
];

export default config;
