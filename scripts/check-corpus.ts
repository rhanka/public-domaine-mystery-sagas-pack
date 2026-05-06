import { readFile } from "node:fs/promises";
import path from "node:path";

import { assertPublicDomainPolicy, WORKS } from "../src/catalog.js";
import { sha256 } from "../src/gutenberg.js";
import { loadManifestFromRoot } from "../src/index.js";

const corpusRoot = path.join(process.cwd(), "corpus");

async function main(): Promise<void> {
  assertPublicDomainPolicy(WORKS);
  const manifest = await loadManifestFromRoot(corpusRoot);
  const catalogKeys = new Set(WORKS.map((work) => `${work.saga}/${work.slug}`));

  if (manifest.works.length !== WORKS.length) {
    throw new Error(`Manifest has ${manifest.works.length} works, catalog has ${WORKS.length}`);
  }

  for (const work of manifest.works) {
    const key = `${work.saga}/${work.slug}`;
    if (!catalogKeys.has(key)) {
      throw new Error(`Manifest work is not in catalog: ${key}`);
    }

    const text = await readFile(path.join(corpusRoot, work.textPath), "utf8");
    const digest = sha256(text);
    const bytes = Buffer.byteLength(text, "utf8");
    if (digest !== work.sha256) {
      throw new Error(`SHA mismatch for ${key}: ${digest} !== ${work.sha256}`);
    }
    if (bytes !== work.bytes) {
      throw new Error(`Byte count mismatch for ${key}: ${bytes} !== ${work.bytes}`);
    }
  }

  console.log(`Corpus OK: ${manifest.works.length} works`);
}

await main();
