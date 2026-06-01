# Public Domain Mystery Sagas Pack

Open corpus pack for Graphify ontology and LLM-wiki UATs.

The repository packages public-domain mystery sagas as normalized plain text, with a TypeScript catalog, loader, provenance metadata, and reproducible fetch/check scripts. It intentionally excludes Agatha Christie and any author/translator that is not both:

- public-domain safe under a conservative `life + 70 years` rule in 2026;
- first published no later than 1930 for United States public-domain safety in 2026.

## Included sagas

| Saga | Author | Why it is useful for ontology tests |
|---|---|---|
| Sherlock Holmes | Arthur Conan Doyle | recurring characters, narrator, cases, evidence, aliases, locations |
| Arsene Lupin | Maurice Leblanc | disguises, identities, thefts, adversaries, cross-saga references |
| Father Brown | G. K. Chesterton | motives, moral reasoning, criminals, recurring detective relations |
| Dr. Thorndyke | R. Austin Freeman | forensic evidence, methods, legal/medical vocabulary |
| Raffles | E. W. Hornung | anti-hero arcs, accomplices, crimes, social network |

## Layout

```text
corpus/
  manifest.json
  <saga>/<work>/text.txt
  <saga>/<work>/metadata.json
src/
  catalog.ts
  gutenberg.ts
  index.ts
scripts/
  fetch-corpus.ts
  check-corpus.ts
```

## Public Graphify UAT Pack

This repository commits a documentary Graphify UAT export in [.graphify](.graphify), generated from selected Sherlock Holmes, Arsene Lupin, Father Brown, Dr. Thorndyke, and Raffles works. The export is corpus-only: TypeScript source, scripts, and tests are excluded from the committed graph surface, while pack-owned metadata adds a light saga/author layer and explicit narrative containment links.

The committed visualization contains 237 nodes, 430 edges, and 15 named communities. It is backed by the project-owned ontology configuration in [graphify](graphify), and the 25-work source selection plus regeneration notes live in [examples/graphify-three-works](examples/graphify-three-works).

## Commands

```bash
npm install
npm test
npm run build
npm run fetch
npm run check
```

`npm run fetch` regenerates `corpus/` from Project Gutenberg UTF-8 plain-text downloads. `npm run check` validates the committed corpus against the catalog, checksums, byte counts, and public-domain policy.

## Using the loader

```ts
import { loadCorpusFromRoot } from "public-domain-mystery-sagas-pack";

const corpus = await loadCorpusFromRoot("./corpus");
console.log(corpus.works[0]?.title, corpus.works[0]?.text.length);
```

## Legal note

The TypeScript code in this repository is MIT licensed. The corpus texts are sourced from Project Gutenberg public-domain works and normalized by the scripts in this repository. See `CORPUS_LICENSE.md` and each work-level `metadata.json` for provenance.

This repository is not affiliated with Project Gutenberg.
