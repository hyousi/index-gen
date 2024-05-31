#!/usr/bin/env node

import { Command } from "commander";
import * as path from "path";

import { generateIndex } from "./core";
import packageJson from "../package.json";

const program = new Command();

program
  .version(packageJson.version)
  .description("Generate index.ts files recursively for a directory")
  .argument("<directory>", "Directory to generate index.ts files in")
  .action(async (directory: string) => {
    const fullPath = path.resolve(directory);
    try {
      await generateIndex({ directory: fullPath });
      console.log(`Index files generated successfully in ${fullPath}`);
    } catch (error) {
      console.error(`Failed to generate index files: ${error.message}`);
    }
  });

program.parse(process.argv);
