import * as fs from "fs/promises";
import * as path from "path";

type Config = {
  directory: string;
};

async function generateIndex(config: Config) {
  const { directory } = config;
  const files = await fs.readdir(directory, { withFileTypes: true });
  const indexPath = path.join(directory, "index.ts");

  const exportStatements: string[] = [];
  const jobs: Promise<void>[] = [];

  for (const file of files) {
    if (file.isDirectory()) {
      const subdirPath = path.join(directory, file.name);
      exportStatements.push(`export * from './${file.name}';`);

      jobs.push(generateIndex({ directory: subdirPath }));
    } else if (
      file.isFile() &&
      file.name.endsWith(".ts") &&
      file.name !== "index.ts"
    ) {
      const basename = path.basename(file.name, ".ts");
      exportStatements.push(`export * from './${basename}';`);
    }
  }

  await fs.writeFile(indexPath, exportStatements.join("\n"));
  await Promise.all(jobs);
}

export { generateIndex };
