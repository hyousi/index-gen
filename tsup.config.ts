import { defineConfig } from "tsup";

const formats = ["cjs", "esm"] as const;

export default defineConfig(
  formats.map((format) => ({
    entryPoints: ["src/index.ts", "src/cli.ts"],
    format,
    outDir: `dist/${format}`,
    dts: {
      resolve: true,
      compilerOptions: {
        moduleResolution: "node",
      },
    },
    sourcemap: true,
    clean: true,
    minify: false,
    target: "node16",
  }))
);
