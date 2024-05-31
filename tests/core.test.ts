import path from "path";
import { describe, beforeAll, afterAll, it, vi, expect } from "vitest";
import { vol, fs as mockFs } from "memfs";

import { generateIndex } from "../src/core";

vi.mock("node:fs/promises", () => mockFs.promises);

describe("generateIndex", () => {
  const testDir = "/test-dir";

  beforeAll(async () => {
    // Initialize the in-memory file system with nested directories
    vol.fromJSON(
      {
        "./a.ts": "export const a = 1;",
        "./b.ts": "export const b = 2;",
        "./subdir/c.ts": "export const c = 3;",
        "./subdir/subsubdir/d.ts": "export const d = 4;",
      },
      testDir
    );

    await generateIndex({ directory: testDir });
  });

  afterAll(() => {
    vol.reset();
  });

  it("should generate index.ts with correct exports in root directory", async () => {
    const indexPath = path.join(testDir, "index.ts");
    const content = await mockFs.promises.readFile(indexPath, "utf-8");
    expect(content).toBe(
      [
        "export * from './a';",
        "export * from './b';",
        "export * from './subdir';",
      ].join("\n")
    );
  });

  it("should generate index.ts with correct exports in subdir", async () => {
    const subdirPath = path.join(testDir, "subdir");
    const indexPath = path.join(subdirPath, "index.ts");
    const content = await mockFs.promises.readFile(indexPath, "utf-8");
    expect(content).toBe(
      ["export * from './c';", "export * from './subsubdir';"].join("\n")
    );
  });

  it("should generate index.ts with correct exports in subsubdir", async () => {
    const subsubdirPath = path.join(testDir, "subdir", "subsubdir");
    const indexPath = path.join(subsubdirPath, "index.ts");
    const content = await mockFs.promises.readFile(indexPath, "utf-8");
    expect(content).toBe("export * from './d';");
  });
});
