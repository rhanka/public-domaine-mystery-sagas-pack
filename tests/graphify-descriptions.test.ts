import { readFileSync } from "node:fs"
import { resolve } from "node:path"

import { describe, expect, test } from "vitest"

import { buildDocumentaryDescriptionIndex } from "../src/graphify-descriptions.js"
import type { SemanticGraph } from "../src/graphify-deepening.js"

describe("graphify wiki descriptions", () => {
  test("builds source-backed description sidecars for detailed ontology nodes", () => {
    const index = buildDocumentaryDescriptionIndex(
      {
        nodes: [
          {
            id: "character_sherlock_holmes",
            label: "Sherlock Holmes",
            type: "Character",
            file_type: "concept",
            source_file: "corpus/sherlock-holmes/a-study-in-scarlet/text.txt",
            source_location: "part 1",
            confidence: "EXTRACTED",
            evidence_refs: ["corpus/sherlock-holmes/a-study-in-scarlet/text.txt#part-1"]
          },
          {
            id: "crime_red_headed_bank_tunnel",
            label: "Red-Headed League bank tunnel scheme",
            type: "CrimeOrScheme",
            file_type: "concept",
            source_file: "corpus/sherlock-holmes/the-adventures-of-sherlock-holmes/text.txt",
            source_location: "The Red-Headed League",
            confidence: "EXTRACTED",
            evidence_refs: [
              "corpus/sherlock-holmes/the-adventures-of-sherlock-holmes/text.txt#the-red-headed-league"
            ]
          },
          {
            id: "thin_unconfigured_node",
            label: "Thin node",
            type: "Fact",
            file_type: "concept",
            source_file: "corpus/sherlock-holmes/a-study-in-scarlet/text.txt",
            source_location: "part 1",
            confidence: "EXTRACTED"
          }
        ],
        edges: []
      },
      "graph-hash"
    )

    expect(index.schema).toBe("graphify_wiki_description_index_v1")
    expect(index.graph_hash).toBe("graph-hash")
    expect(index.nodes.character_sherlock_holmes?.status).toBe("generated")
    expect(index.nodes.character_sherlock_holmes?.description).toContain("consulting detective")
    expect(index.nodes.crime_red_headed_bank_tunnel?.description).toContain("bank tunnel")
    expect(index.nodes.crime_red_headed_bank_tunnel?.evidence_refs).toEqual([
      "corpus/sherlock-holmes/the-adventures-of-sherlock-holmes/text.txt#the-red-headed-league"
    ])
    expect(index.nodes.thin_unconfigured_node).toBeUndefined()
  })

  test("every Saga, Work, ChapterOrStory and Character node in the live graph has a curated description", () => {
    const graphPath = resolve(process.cwd(), ".graphify/graph.json")
    const graph = JSON.parse(readFileSync(graphPath, "utf8")) as SemanticGraph
    const index = buildDocumentaryDescriptionIndex(graph, "live-graph")

    const requiredKinds = new Set(["Saga", "Work", "ChapterOrStory", "Character"])
    const missing: string[] = []
    for (const node of graph.nodes) {
      if (!requiredKinds.has(node.type)) continue
      const record = index.nodes[node.id]
      if (!record || typeof record.description !== "string" || record.description.trim().length === 0) {
        missing.push(`${node.type}:${node.id}`)
      }
    }

    expect(missing, `missing curated descriptions for: ${missing.join(", ")}`).toEqual([])
  })
})
