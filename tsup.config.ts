import { defineConfig } from "tsup";

export default defineConfig({
  entryPoints: ["src/index.ts"],
  dts: true,
  sourcemap: false,
  format: ["cjs", "esm"],
  clean: true,
  minify: true,
  target: "node16",
});
