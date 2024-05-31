import { defineConfig, Options } from "tsup";
import { version } from "./package.json";

const formats = ["cjs", "esm"] as const;

export default defineConfig(
  formats.map(
    (format) =>
      ({
        entryPoints: ["src/index.ts", "src/cli.ts"],
        format,
        outDir: `dist/${format}`,
        dts: {
          resolve: true,
          compilerOptions: {
            esModuleInterop: true,
            moduleResolution: "node",
            resolveJsonModule: true,
          },
        },
        sourcemap: true,
        clean: true,
        minify: true,
        target: "node16",
        env: {
          PACKAGE_VERSION: version,
        },
      } satisfies Options)
  )
);
