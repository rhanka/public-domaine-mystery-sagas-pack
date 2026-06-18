# Graphify Curated Mystery Demo

This public fixture illustrates Graphify on a public-domain mystery corpus drawn from the committed texts. It is meant for ontology lifecycle, reconciliation, citation-display, and LLM-wiki UI mockups without using private or proprietary data.

## Source Works

The selected 25-work source scope is listed in [selection.json](selection.json) and mirrored by the `inputs.corpus` section in [../../graphify.yaml](../../graphify.yaml).

## Generated Artifacts

- [../../.graphify/GRAPH_REPORT.md](../../.graphify/GRAPH_REPORT.md) - human-readable graph audit report
- [../../.graphify/graph.json](../../.graphify/graph.json) - Graphify graph export
- [../../.graphify/studio](../../.graphify/studio) - source bundle for the published studio

The generated graph has 2091 nodes, 3168 edges, and 133 named communities. The current export includes a full citation sidecar in `.graphify/studio/ontology/citations.json`; inline citations are intentionally capped to a top-8 display projection. The export adds a metadata layer (`Saga`, `Author`, `Translator`) plus `part_of` links and curated case/evidence/method details so works, stories, cases, and evidence do not sit as isolated islands.

## Regeneration Notes

The committed graph lives in the repository-standard `.graphify/` directory and is validated by the `mystery_public_studio` quality target in `graphify.yaml`.

A clean regeneration should validate the profile, build from a profile extraction, run the corpus export, apply the committed community labels, and commit only portable `.graphify/` artifacts. Do not regenerate this fixture with the repository-wide `graphify update` path: that path is for generic repo graphs and can reintroduce source-code files into this documentary UAT pack.
