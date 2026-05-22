import { createHash } from "node:crypto"

import type { SemanticGraph, SemanticNode } from "./graphify-deepening.js"

export interface WikiDescriptionRecord {
  schema: "graphify_wiki_description_v1"
  target_id: string
  target_kind: "node"
  graph_hash: string
  status: "generated"
  description: string
  evidence_refs: [string, ...string[]]
  confidence: number
  cache_key: string
  generator: {
    mode: "assistant"
    provider: "pack-curated"
    model: null
    prompt_version: "wiki-description-v1"
  }
}

export interface WikiDescriptionIndex {
  schema: "graphify_wiki_description_index_v1"
  graph_hash: string
  prompt_version: "wiki-description-v1"
  nodes: Record<string, WikiDescriptionRecord>
}

const DESCRIPTION_BY_ID: Record<string, string> = {
  character_sherlock_holmes:
    "Sherlock Holmes is the consulting detective whose laboratory methods, close observation, and staged tests connect the Lauriston Gardens murders, the Bohemia photograph case, and the Red-Headed League bank plot.",
  character_dr_watson:
    "Dr. John H. Watson is the witness-narrator who introduces Holmes, records the Baker Street partnership, and anchors the reader's view of the investigations.",
  case_lauriston_gardens:
    "The Lauriston Gardens murders center on the deaths of Enoch Drebber and Joseph Stangerson, with blood traces, the wedding ring, and the revenge inscription shaping Holmes's reconstruction.",
  crime_drebber_stangerson_murders:
    "The Drebber and Stangerson murders are modeled as the underlying crime scheme behind the Lauriston Gardens case, driven by Jefferson Hope's revenge motive.",
  motive_jefferson_hope_revenge:
    "Jefferson Hope's revenge motive explains why the Lauriston Gardens case is not a robbery but a retaliatory murder plot.",
  method_blood_stain_reagent:
    "The blood-stain reagent test is an early forensic method Holmes demonstrates before the case, then ties to the interpretation of blood evidence at Lauriston Gardens.",
  object_wedding_ring:
    "The wedding ring is a concrete clue from the Lauriston Gardens scene and becomes a trap when Holmes tries to draw the murderer back to recover it.",
  case_bohemia_photograph:
    "The Bohemia photograph case turns on the King's fear that Irene Adler can use a compromising photograph against his reputation.",
  method_staged_fire_alarm:
    "The staged fire alarm is Holmes's tactic for making Irene Adler reveal where she has hidden the photograph.",
  crime_red_headed_bank_tunnel:
    "The Red-Headed League bank tunnel scheme uses a fake clerical job to remove Jabez Wilson from his shop while John Clay works toward the bank cellar.",
  organization_red_headed_league:
    "The Red-Headed League is a decoy organization whose advertisement and copying job conceal the bank tunnel plan.",
  character_arsene_lupin:
    "Arsene Lupin is the gentleman-burglar whose disguise, notoriety, and rivalry with detectives structure the La Provence theft and later stories.",
  case_lupin_transatlantic:
    "The Transatlantic Lupin arrest case follows the hunt for Lupin aboard La Provence after passengers learn that the famous thief is hiding among them.",
  disguise_bernard_dandrezy:
    "The Bernard d'Andrezy persona is the assumed identity under which Lupin travels before Ganimard identifies him.",
  crime_transatlantic_jewel_theft:
    "The La Provence jewel theft captures Lupin's habit of making theft, disguise, and public reputation part of the same performance.",
  case_queen_necklace:
    "The Queen's Necklace affair is a Lupin case centered on the necklace as both coveted object and narrative proof of the thief's reach.",
  "saga_sherlock-holmes":
    "The Sherlock Holmes saga groups Conan Doyle's Holmes works so cases, methods, recurring protagonists, and Baker Street settings can be read across books and stories.",
  "saga_arsene-lupin":
    "The Arsene Lupin saga groups Leblanc's Lupin stories around thefts, disguises, detective rivalry, and the burglar's public persona.",
  "saga_father-brown":
    "The Father Brown saga collects Chesterton's stories where the unassuming Essex priest pierces crimes by moral reasoning, recurring opposite the master thief Flambeau and detective Aristide Valentin.",
  "saga_dr-thorndyke":
    "The Dr. Thorndyke saga gathers R. Austin Freeman's medico-legal cases in which barrister-scientist John Thorndyke unpicks forgeries and framings, starting with the diamond theft and fingerprint frame of The Red Thumb Mark.",
  "saga_raffles":
    "The Raffles saga gathers E. W. Hornung's tales of A. J. Raffles, the gentleman cricketer who burgles London society from his rooms at the Albany with his old fag Bunny Manders as accomplice and narrator.",

  // Works
  work_study_in_scarlet:
    "A Study in Scarlet is the 1887 novel that introduces Holmes and Watson, frames their Baker Street partnership through the Lauriston Gardens murders, and reveals Jefferson Hope's revenge on Drebber and Stangerson.",
  work_adventures_sherlock_holmes:
    "The Adventures of Sherlock Holmes is the 1892 short-story collection opening with A Scandal in Bohemia and gathering early Strand cases such as The Red-Headed League and The Blue Carbuncle.",
  work_hound_baskervilles:
    "The Hound of the Baskervilles is the 1902 Dartmoor novel in which Holmes and Watson protect Sir Henry Baskerville from a spectral hound while Jack Stapleton works the family-curse legend toward inheritance.",
  work_extraordinary_arsene_lupin:
    "The Extraordinary Adventures of Arsene Lupin, Gentleman-Burglar is the 1907 English edition of Leblanc's first Lupin collection, opening with the La Provence arrest and the rivalry with Ganimard and Herlock Sholmes.",
  work_innocence_father_brown:
    "The Innocence of Father Brown is Chesterton's 1911 collection that introduces the Essex priest and the reformed thief Flambeau, opening with The Blue Cross and the pursuit led by Aristide Valentin.",
  work_red_thumb_mark:
    "The Red Thumb Mark is R. Austin Freeman's 1907 Thorndyke novel in which a parcel of rough diamonds vanishes from John Hornby's safe and a bloody thumb-print frames the nephew Reuben Hornby.",
  work_amateur_cracksman:
    "The Amateur Cracksman is E. W. Hornung's 1899 collection where A. J. Raffles, cricketer and Albany resident, recruits the ruined Bunny Manders into a run of London burglaries."
}

function sha256(value: string | Buffer): string {
  return createHash("sha256").update(value).digest("hex")
}

function sourceRefsForNode(node: SemanticNode): [string, ...string[]] {
  const refs = Array.isArray(node.evidence_refs)
    ? node.evidence_refs.filter((ref): ref is string => typeof ref === "string" && ref.trim().length > 0)
    : []
  if (refs.length > 0) return [refs[0]!, ...refs.slice(1)]
  const sourceFile = typeof node.source_file === "string" ? node.source_file : "unknown"
  const sourceLocation = typeof node.source_location === "string" ? node.source_location : "source"
  return [`${sourceFile}#${sourceLocation}`]
}

function createRecord(node: SemanticNode, graphHash: string): WikiDescriptionRecord | null {
  const description = DESCRIPTION_BY_ID[node.id]
  if (!description) return null
  const evidenceRefs = sourceRefsForNode(node)
  const cacheInput = {
    schema: "graphify_wiki_description_v1",
    target_id: node.id,
    target_kind: "node",
    graph_hash: graphHash,
    prompt_version: "wiki-description-v1",
    mode: "assistant",
    provider: "pack-curated",
    model: null
  }
  return {
    schema: "graphify_wiki_description_v1",
    target_id: node.id,
    target_kind: "node",
    graph_hash: graphHash,
    status: "generated",
    description,
    evidence_refs: evidenceRefs,
    confidence: 0.9,
    cache_key: sha256(JSON.stringify(cacheInput)),
    generator: {
      mode: "assistant",
      provider: "pack-curated",
      model: null,
      prompt_version: "wiki-description-v1"
    }
  }
}

export function buildDocumentaryDescriptionIndex(graph: SemanticGraph, graphHash: string): WikiDescriptionIndex {
  const nodes: Record<string, WikiDescriptionRecord> = {}
  for (const node of graph.nodes) {
    const record = createRecord(node, graphHash)
    if (record) nodes[node.id] = record
  }

  return {
    schema: "graphify_wiki_description_index_v1",
    graph_hash: graphHash,
    prompt_version: "wiki-description-v1",
    nodes
  }
}
