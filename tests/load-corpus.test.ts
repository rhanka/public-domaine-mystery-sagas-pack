import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { describe, expect, test } from "vitest";

import { loadCorpusFromRoot } from "../src/index.js";

describe("corpus loader", () => {
  test("loads manifest entries and text files from a corpus root", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "mystery-corpus-"));
    const corpusRoot = path.join(root, "corpus");
    const workDir = path.join(corpusRoot, "sherlock-holmes", "a-study-in-scarlet");
    await mkdir(workDir, { recursive: true });
    await writeFile(path.join(workDir, "text.txt"), "Mr. Sherlock Holmes\n", "utf8");
    await writeFile(
      path.join(corpusRoot, "manifest.json"),
      JSON.stringify({
        generatedAt: "2026-05-06T00:00:00.000Z",
        works: [
          {
            saga: "sherlock-holmes",
            slug: "a-study-in-scarlet",
            title: "A Study in Scarlet",
            author: "Arthur Conan Doyle",
            textPath: "sherlock-holmes/a-study-in-scarlet/text.txt",
            sha256: "unused-in-loader-test",
            bytes: 20
          }
        ]
      }),
      "utf8"
    );

    const corpus = await loadCorpusFromRoot(corpusRoot);

    expect(corpus.works).toHaveLength(1);
    expect(corpus.works[0]?.text).toBe("Mr. Sherlock Holmes\n");
  });
});
