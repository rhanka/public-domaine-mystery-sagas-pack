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

## Public Graphify Demo

A small committed Graphify demo is available in [examples/graphify-three-works](examples/graphify-three-works). It uses two Sherlock Holmes works and one Arsene Lupin work to exercise public ontology, reconciliation, and LLM-wiki UI scenarios.

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
