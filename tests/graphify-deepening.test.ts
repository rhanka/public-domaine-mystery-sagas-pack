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

  test("adds detailed fact, motive, method, crime and disguise ontology nodes", () => {
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
            id: "character_enoch_drebber",
            label: "Enoch Drebber",
            type: "Character",
            file_type: "concept",
            source_file: "corpus/sherlock-holmes/a-study-in-scarlet/text.txt",
            source_location: "part 1",
            confidence: "EXTRACTED"
          },
          {
            id: "character_jefferson_hope",
            label: "Jefferson Hope",
            type: "Character",
            file_type: "concept",
            source_file: "corpus/sherlock-holmes/a-study-in-scarlet/text.txt",
            source_location: "part 2",
            confidence: "EXTRACTED"
          },
          {
            id: "location_lauriston_gardens",
            label: "Lauriston Gardens",
            type: "Location",
            file_type: "concept",
            source_file: "corpus/sherlock-holmes/a-study-in-scarlet/text.txt",
            source_location: "part 1",
            confidence: "EXTRACTED"
          },
          {
            id: "work_extraordinary_arsene_lupin",
            label: "The Extraordinary Adventures of Arsene Lupin",
            type: "Work",
            file_type: "document",
            source_file: "corpus/arsene-lupin/the-extraordinary-adventures-of-arsene-lupin-gentleman-burglar/text.txt",
            source_location: "work",
            confidence: "EXTRACTED"
          },
          {
            id: "case_lupin_transatlantic",
            label: "Transatlantic Lupin arrest",
            type: "Case",
            file_type: "concept",
            source_file: "corpus/arsene-lupin/the-extraordinary-adventures-of-arsene-lupin-gentleman-burglar/text.txt",
            source_location: "The Arrest of Arsene Lupin",
            confidence: "EXTRACTED"
          },
          {
            id: "character_arsene_lupin",
            label: "Arsene Lupin",
            type: "Character",
            file_type: "concept",
            source_file: "corpus/arsene-lupin/the-extraordinary-adventures-of-arsene-lupin-gentleman-burglar/text.txt",
            source_location: "collection",
            confidence: "EXTRACTED"
          },
          {
            id: "location_ss_la_provence",
            label: "SS La Provence",
            type: "Location",
            file_type: "concept",
            source_file: "corpus/arsene-lupin/the-extraordinary-adventures-of-arsene-lupin-gentleman-burglar/text.txt",
            source_location: "The Arrest of Arsene Lupin",
            confidence: "EXTRACTED"
          }
        ],
        edges: []
      },
      WORKS
    )

    expect(graph.nodes.some((node) => node.id === "crime_drebber_stangerson_murders" && node.type === "CrimeOrScheme")).toBe(true)
    expect(graph.nodes.some((node) => node.id === "fact_drebber_found_dead" && node.type === "Fact")).toBe(true)
    expect(graph.nodes.some((node) => node.id === "motive_jefferson_hope_revenge" && node.type === "Motive")).toBe(true)
    expect(graph.nodes.some((node) => node.id === "method_blood_stain_reagent" && node.type === "ForensicMethod")).toBe(true)
    expect(graph.nodes.some((node) => node.id === "disguise_bernard_dandrezy" && node.type === "DisguisePersona")).toBe(true)
    expect(
      graph.edges.some(
        (edge) =>
          edge.source === "motive_jefferson_hope_revenge" &&
          edge.relation === "motivates" &&
          edge.target === "crime_drebber_stangerson_murders"
      )
    ).toBe(true)
    expect(
      graph.edges.some(
        (edge) =>
          edge.source === "crime_transatlantic_jewel_theft" &&
          edge.relation === "occurs_at" &&
          edge.target === "location_ss_la_provence"
      )
    ).toBe(true)
    expect(
      graph.edges.some(
        (edge) =>
          edge.source === "character_arsene_lupin" &&
          edge.relation === "disguises_as" &&
          edge.target === "disguise_bernard_dandrezy"
      )
    ).toBe(true)
  })

  test("adds curated detail nodes for additional public-domain mystery works", () => {
    const graph = deepenDocumentarySemanticGraph(
      {
        nodes: [
          {
            id: "work_hound_baskervilles",
            label: "The Hound of the Baskervilles",
            type: "Work",
            file_type: "document",
            source_file: "corpus/sherlock-holmes/the-hound-of-the-baskervilles/text.txt",
            source_location: "work",
            confidence: "EXTRACTED"
          },
          {
            id: "case_baskerville_curse",
            label: "Baskerville curse investigation",
            type: "Case",
            file_type: "concept",
            source_file: "corpus/sherlock-holmes/the-hound-of-the-baskervilles/text.txt",
            source_location: "case",
            confidence: "EXTRACTED"
          },
          {
            id: "character_sherlock_holmes",
            label: "Sherlock Holmes",
            type: "Character",
            file_type: "concept",
            source_file: "corpus/sherlock-holmes/the-hound-of-the-baskervilles/text.txt",
            source_location: "case",
            confidence: "EXTRACTED"
          },
          {
            id: "work_innocence_father_brown",
            label: "The Innocence of Father Brown",
            type: "Work",
            file_type: "document",
            source_file: "corpus/father-brown/the-innocence-of-father-brown/text.txt",
            source_location: "work",
            confidence: "EXTRACTED"
          },
          {
            id: "case_blue_cross",
            label: "The Blue Cross",
            type: "Case",
            file_type: "concept",
            source_file: "corpus/father-brown/the-innocence-of-father-brown/text.txt",
            source_location: "The Blue Cross",
            confidence: "EXTRACTED"
          },
          {
            id: "character_father_brown",
            label: "Father Brown",
            type: "Character",
            file_type: "concept",
            source_file: "corpus/father-brown/the-innocence-of-father-brown/text.txt",
            source_location: "The Blue Cross",
            confidence: "EXTRACTED"
          },
          {
            id: "work_red_thumb_mark",
            label: "The Red Thumb Mark",
            type: "Work",
            file_type: "document",
            source_file: "corpus/dr-thorndyke/the-red-thumb-mark/text.txt",
            source_location: "work",
            confidence: "EXTRACTED"
          },
          {
            id: "case_red_thumb_mark",
            label: "Red thumb-mark case",
            type: "Case",
            file_type: "concept",
            source_file: "corpus/dr-thorndyke/the-red-thumb-mark/text.txt",
            source_location: "case",
            confidence: "EXTRACTED"
          },
          {
            id: "character_dr_thorndyke",
            label: "Dr. John Thorndyke",
            type: "Character",
            file_type: "concept",
            source_file: "corpus/dr-thorndyke/the-red-thumb-mark/text.txt",
            source_location: "case",
            confidence: "EXTRACTED"
          },
          {
            id: "work_amateur_cracksman",
            label: "The Amateur Cracksman",
            type: "Work",
            file_type: "document",
            source_file: "corpus/raffles/the-amateur-cracksman/text.txt",
            source_location: "work",
            confidence: "EXTRACTED"
          },
          {
            id: "case_ides_of_march",
            label: "The Ides of March",
            type: "Case",
            file_type: "concept",
            source_file: "corpus/raffles/the-amateur-cracksman/text.txt",
            source_location: "The Ides of March",
            confidence: "EXTRACTED"
          },
          {
            id: "character_aj_raffles",
            label: "A. J. Raffles",
            type: "Character",
            file_type: "concept",
            source_file: "corpus/raffles/the-amateur-cracksman/text.txt",
            source_location: "The Ides of March",
            confidence: "EXTRACTED"
          }
        ],
        edges: []
      },
      WORKS
    )

    expect(graph.nodes.some((node) => node.id === "location_baskerville_hall")).toBe(true)
    expect(graph.nodes.some((node) => node.id === "method_priestly_moral_inference")).toBe(true)
    expect(graph.nodes.some((node) => node.id === "evidence_bloody_thumb_print")).toBe(true)
    expect(graph.nodes.some((node) => node.id === "crime_raffles_jewellery_theft")).toBe(true)
    expect(
      graph.edges.some(
        (edge) =>
          edge.source === "character_jack_stapleton" &&
          edge.relation === "commits" &&
          edge.target === "crime_baskerville_hound_plot"
      )
    ).toBe(true)
    expect(
      graph.edges.some(
        (edge) =>
          edge.source === "character_flambeau" &&
          edge.relation === "opposes" &&
          edge.target === "character_father_brown"
      )
    ).toBe(true)
    expect(
      graph.edges.some(
        (edge) =>
          edge.source === "character_dr_thorndyke" &&
          edge.relation === "uses_method" &&
          edge.target === "method_fingerprint_comparison"
      )
    ).toBe(true)
    expect(
      graph.edges.some(
        (edge) =>
          edge.source === "character_aj_raffles" &&
          edge.relation === "commits" &&
          edge.target === "crime_raffles_jewellery_theft"
      )
    ).toBe(true)
  })
})
