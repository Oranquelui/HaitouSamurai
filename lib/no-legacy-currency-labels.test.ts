import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

const repoRoot = path.resolve(__dirname, "..");
const forbiddenCurrencyCode = String.fromCharCode(75, 82, 87);
const includedExtensions = new Set([".md", ".py", ".ts", ".tsx"]);
const ignoredDirectories = new Set([".git", ".next", "coverage", "node_modules"]);

async function collectAuthoredFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return ignoredDirectories.has(entry.name) ? [] : collectAuthoredFiles(entryPath);
      }

      return includedExtensions.has(path.extname(entry.name)) ? [entryPath] : [];
    })
  );

  return files.flat();
}

describe("public currency vocabulary", () => {
  it("does not include the deprecated non-JPY currency code in authored files", async () => {
    const authoredFiles = await collectAuthoredFiles(repoRoot);
    const filesWithDeprecatedCode: string[] = [];

    for (const filePath of authoredFiles) {
      const source = await readFile(filePath, "utf8");

      if (source.includes(forbiddenCurrencyCode)) {
        filesWithDeprecatedCode.push(path.relative(repoRoot, filePath));
      }
    }

    expect(filesWithDeprecatedCode).toEqual([]);
  });
});
