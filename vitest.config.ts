import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    watch: false,
    coverage: {
      provider: "v8",
      include: ["src/**"],
      exclude: ["src/**/index.ts"],
    },
  },
});
