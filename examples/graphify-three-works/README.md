# Graphify Three-Work Demo

This public fixture illustrates Graphify on a small mystery corpus drawn from the committed public-domain texts. It is meant for ontology lifecycle, reconciliation, and LLM-wiki UI mockups without using private or proprietary data.

## Source Works

- Sherlock Holmes / A Study in Scarlet
- Sherlock Holmes / The Adventures of Sherlock Holmes
- Arsene Lupin / The Extraordinary Adventures of Arsene Lupin, Gentleman-burglar

The selected source files are listed in [selection.json](selection.json).

## Generated Artifacts

- [../../.graphify/GRAPH_REPORT.md](../../.graphify/GRAPH_REPORT.md) - human-readable graph audit report
- [../../.graphify/graph.json](../../.graphify/graph.json) - Graphify graph export
- [../../.graphify/graph.html](../../.graphify/graph.html) - standalone interactive visualization

The generated graph has 20 nodes, 38 edges, and 3 reported communities. It intentionally keeps inferred edges visible so review and reconciliation flows have useful examples.

## Regeneration Notes

The committed graph lives in the repository-standard `.graphify/` directory and was generated with Graphify TypeScript 0.7.5 using the Anthropic direct backend. Runtime-local files such as absolute-path manifests and runtime config are intentionally not committed.

A clean regeneration should select the three listed source files, run Graphify with `--all`, and commit only portable `.graphify/` artifacts.
