# Graphify Curated Mystery Demo

This public fixture illustrates Graphify on a small mystery corpus drawn from the committed public-domain texts. It is meant for ontology lifecycle, reconciliation, and LLM-wiki UI mockups without using private or proprietary data.

## Source Works

- Sherlock Holmes / A Study in Scarlet
- Sherlock Holmes / The Adventures of Sherlock Holmes
- Sherlock Holmes / The Hound of the Baskervilles
- Arsene Lupin / The Extraordinary Adventures of Arsene Lupin, Gentleman-burglar
- Father Brown / The Innocence of Father Brown
- Dr. Thorndyke / The Red Thumb Mark
- Raffles / The Amateur Cracksman

The selected source files are listed in [selection.json](selection.json).

## Generated Artifacts

- [../../.graphify/GRAPH_REPORT.md](../../.graphify/GRAPH_REPORT.md) - human-readable graph audit report
- [../../.graphify/graph.json](../../.graphify/graph.json) - Graphify graph export
- [../../.graphify/graph.html](../../.graphify/graph.html) - standalone interactive visualization

The generated graph has 237 nodes, 430 edges, and 15 named communities. It is a documentary/profile-first export: only the selected corpus texts are represented, while repository code, scripts, and tests are excluded from the graph surface. The current export adds a small metadata layer (`Saga`, `Author`, `Translator`) plus `part_of` links and curated case/evidence/method details so works, stories, cases, and evidence do not sit as isolated islands.

## Regeneration Notes

The committed graph lives in the repository-standard `.graphify/` directory and was generated with Graphify TypeScript 0.9.2 using the project-owned profile in `graphify.yaml`.

A clean regeneration should validate the profile, build from a profile extraction, run the corpus export, apply the committed community labels, and commit only portable `.graphify/` artifacts. Do not regenerate this fixture with the repository-wide `graphify update` path: that path is for generic repo graphs and can reintroduce source-code files into this documentary UAT pack.
