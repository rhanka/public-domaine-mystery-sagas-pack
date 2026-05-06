import { readFile } from "node:fs/promises";
import path from "node:path";

export interface CorpusManifestWork {
  saga: string;
  slug: string;
  title: string;
  author: string;
  textPath: string;
  sha256: string;
  bytes: number;
}

export interface CorpusManifest {
  generatedAt: string;
  works: CorpusManifestWork[];
}

export interface LoadedCorpusWork extends CorpusManifestWork {
  text: string;
}

export interface LoadedCorpus {
  manifest: CorpusManifest;
  works: LoadedCorpusWork[];
}

export async function loadManifestFromRoot(corpusRoot: string): Promise<CorpusManifest> {
  const manifestPath = path.join(corpusRoot, "manifest.json");
  return JSON.parse(await readFile(manifestPath, "utf8")) as CorpusManifest;
}

export async function loadCorpusFromRoot(corpusRoot: string): Promise<LoadedCorpus> {
  const manifest = await loadManifestFromRoot(corpusRoot);
  const works = await Promise.all(
    manifest.works.map(async (work) => ({
      ...work,
      text: await readFile(path.join(corpusRoot, work.textPath), "utf8")
    }))
  );

  return { manifest, works };
}

export { WORKS, assertPublicDomainPolicy, listSagas } from "./catalog.js";
export type { Person, Work } from "./catalog.js";
export { sha256, slugify, stripGutenbergBoilerplate } from "./gutenberg.js";
