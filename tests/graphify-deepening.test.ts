import { describe, expect, test } from "vitest"

import { deepenDocumentarySemanticGraph } from "../src/graphify-deepening.js"
import { WORKS } from "../src/index.js"

describe("graphify documentary deepening", () => {
  test("adds metadata and containment links without duplicating character appearance edges", () => {
    const graph = deepenDocumentarySemanticGraph(
      {
        nodes: [
          {
            id: "work_study_in_scarlet",
            label: "A Study in Scarlet",
            type: "Work",
            file_type: "document",
            source_file: "corpus/sherlock-holmes/a-study-in-scarlet/text.txt",
            source_location: "work",
            confidence: "EXTRACTED"
          },
          {
            id: "case_lauriston_gardens",
            label: "Lauriston Gardens murders",
            type: "Case",
            file_type: "concept",
            source_file: "corpus/sherlock-holmes/a-study-in-scarlet/text.txt",
            source_location: "part 1",
            confidence: "EXTRACTED"
          },
          {
            id: "story_scandal_bohemia",
            label: "A Scandal in Bohemia",
            type: "ChapterOrStory",
            file_type: "concept",
            source_file: "corpus/sherlock-holmes/the-adventures-of-sherlock-holmes/text.txt",
            source_location: "story",
            confidence: "EXTRACTED"
          },
          {
            id: "work_adventures_sherlock_holmes",
            label: "The Adventures of Sherlock Holmes",
            type: "Work",
            file_type: "document",
            source_file: "corpus/sherlock-holmes/the-adventures-of-sherlock-holmes/text.txt",
            source_location: "work",
            confidence: "EXTRACTED"
          },
          {
            id: "case_bohemia_photograph",
            label: "Bohemia photograph case",
            type: "Case",
            file_type: "concept",
            source_file: "corpus/sherlock-holmes/the-adventures-of-sherlock-holmes/text.txt",
            source_location: "A Scandal in Bohemia",
            confidence: "EXTRACTED"
          },
          {
            id: "character_sherlock_holmes",
            label: "Sherlock Holmes",
            type: "Character",
            file_type: "concept",
            source_file: "corpus/sherlock-holmes/a-study-in-scarlet/text.txt",
            source_location: "part 1",
            confidence: "EXTRACTED"
          }
        ],
        edges: [
          {
            source: "character_sherlock_holmes",
            relation: "appears_in",
            target: "work_study_in_scarlet",
            confidence: "EXTRACTED"
          }
        ]
      },
      WORKS
    )

    expect(graph.nodes.some((node) => node.type === "Saga" && node.label === "Sherlock Holmes saga")).toBe(true)
    expect(graph.nodes.some((node) => node.type === "Author" && node.label === "Arthur Conan Doyle")).toBe(true)
    expect(
      graph.edges.some(
        (edge) =>
          edge.source === "work_study_in_scarlet" &&
          edge.relation === "written_by" &&
          edge.target === "author_arthur-conan-doyle" &&
          edge.source_file === "corpus/sherlock-holmes/a-study-in-scarlet/metadata.json"
      )
    ).toBe(true)
    expect(
      graph.edges.some(
        (edge) =>
          edge.source === "story_scandal_bohemia" &&
          edge.relation === "part_of" &&
          edge.target === "work_adventures_sherlock_holmes"
      )
    ).toBe(true)
    expect(
      graph.edges.some(
        (edge) =>
          edge.source === "case_bohemia_photograph" &&
          edge.relation === "part_of" &&
          edge.target === "story_scandal_bohemia"
      )
    ).toBe(true)
    expect(
      graph.edges.filter(
        (edge) =>
          edge.source === "character_sherlock_holmes" &&
          edge.relation === "part_of"
      )
    ).toHaveLength(0)
  })

  test("adds translator metadata when a selected work carries translators", () => {
    const graph = deepenDocumentarySemanticGraph(
      {
        nodes: [
          {
            id: "work_lupin",
            label: "Arsene Lupin",
            type: "Work",
            file_type: "document",
            source_file: "corpus/arsene-lupin/arsene-lupin/text.txt",
            source_location: "work",
            confidence: "EXTRACTED"
          }
        ],
        edges: []
      },
      WORKS
    )

    expect(graph.nodes.some((node) => node.type === "Translator" && node.label === "Edgar Jepson")).toBe(true)
    expect(
      graph.edges.some(
        (edge) =>
          edge.source === "work_lupin" &&
          edge.relation === "translated_by" &&
          edge.target === "translator_edgar-jepson"
      )
    ).toBe(true)
  })
})
