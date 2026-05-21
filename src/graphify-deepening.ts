import { WORKS, type Work } from "./catalog.js"
import { slugify } from "./gutenberg.js"

export interface SemanticCitation {
  source_file: string
  section?: string
}

export interface SemanticNode {
  id: string
  label: string
  type: string
  file_type: string
  source_file: string
  source_location?: string
  confidence: string
  status?: string
  citations?: SemanticCitation[]
  evidence_refs?: string[]
  [key: string]: unknown
}

export interface SemanticEdge {
  source: string
  target: string
  relation: string
  confidence: string
  citations?: SemanticCitation[]
  evidence_refs?: string[]
  [key: string]: unknown
}

export interface SemanticGraph {
  nodes: SemanticNode[]
  edges: SemanticEdge[]
  hyperedges?: unknown[]
  input_tokens?: number
  output_tokens?: number
  [key: string]: unknown
}

const PART_OF_TYPES = new Set([
  "ChapterOrStory",
  "Case",
  "Event",
  "Fact",
  "CrimeOrScheme",
  "Motive",
  "ForensicMethod",
  "DisguisePersona",
  "Location",
  "Object",
  "Evidence",
  "Organization",
  "NarrativeRole"
])

function metadataPathForSourceFile(sourceFile: string): string {
  return sourceFile.replace(/\/text\.txt$/, "/metadata.json")
}

function metadataRefForSourceFile(sourceFile: string): string {
  return `${metadataPathForSourceFile(sourceFile)}#metadata`
}

function createMetadataNode(id: string, label: string, type: string, sourceFile: string): SemanticNode {
  return {
    id,
    label,
    type,
    file_type: "concept",
    source_file: metadataPathForSourceFile(sourceFile),
    source_location: "metadata",
    confidence: "EXTRACTED",
    status: "validated",
    citations: [
      {
        source_file: metadataPathForSourceFile(sourceFile),
        section: "metadata"
      }
    ],
    evidence_refs: [metadataRefForSourceFile(sourceFile)]
  }
}

function createMetadataEdge(
  source: string,
  relation: string,
  target: string,
  sourceFile: string
): SemanticEdge {
  return {
    source,
    relation,
    target,
    source_file: metadataPathForSourceFile(sourceFile),
    confidence: "EXTRACTED",
    citations: [
      {
        source_file: metadataPathForSourceFile(sourceFile),
        section: "metadata"
      }
    ],
    evidence_refs: [metadataRefForSourceFile(sourceFile)]
  }
}

function workFromSourceFile(sourceFile: string, works: readonly Work[]): Work | undefined {
  const match = sourceFile.match(/^corpus\/([^/]+)\/([^/]+)\/text\.txt$/)
  if (!match) return undefined
  const [, saga, slug] = match
  return works.find((work) => work.saga === saga && work.slug === slug)
}

function edgeKey(edge: Pick<SemanticEdge, "source" | "relation" | "target">): string {
  return `${edge.source}::${edge.relation}::${edge.target}`
}

interface CuratedDetailNode {
  id: string
  label: string
  type: string
  source_file: string
  source_location: string
}

interface CuratedDetailEdge {
  source: string
  relation: string
  target: string
  source_file: string
  source_location: string
}

const STUDY = "corpus/sherlock-holmes/a-study-in-scarlet/text.txt"
const ADVENTURES = "corpus/sherlock-holmes/the-adventures-of-sherlock-holmes/text.txt"
const HOUND = "corpus/sherlock-holmes/the-hound-of-the-baskervilles/text.txt"
const LUPIN = "corpus/arsene-lupin/the-extraordinary-adventures-of-arsene-lupin-gentleman-burglar/text.txt"
const FATHER_BROWN_INNOCENCE = "corpus/father-brown/the-innocence-of-father-brown/text.txt"
const RED_THUMB_MARK = "corpus/dr-thorndyke/the-red-thumb-mark/text.txt"
const AMATEUR_CRACKSMAN = "corpus/raffles/the-amateur-cracksman/text.txt"

const CURATED_DETAIL_NODES: CuratedDetailNode[] = [
  {
    id: "crime_drebber_stangerson_murders",
    label: "Drebber and Stangerson murders",
    type: "CrimeOrScheme",
    source_file: STUDY,
    source_location: "part 1"
  },
  {
    id: "fact_drebber_found_dead",
    label: "Drebber found dead at Lauriston Gardens",
    type: "Fact",
    source_file: STUDY,
    source_location: "part 1"
  },
  {
    id: "fact_wedding_ring_left",
    label: "Wedding ring left at the murder scene",
    type: "Fact",
    source_file: STUDY,
    source_location: "case evidence"
  },
  {
    id: "motive_jefferson_hope_revenge",
    label: "Jefferson Hope revenge motive",
    type: "Motive",
    source_file: STUDY,
    source_location: "part 2"
  },
  {
    id: "method_blood_stain_reagent",
    label: "Blood-stain reagent test",
    type: "ForensicMethod",
    source_file: STUDY,
    source_location: "laboratory scene"
  },
  {
    id: "method_ring_advertisement_trap",
    label: "Wedding ring advertisement trap",
    type: "ForensicMethod",
    source_file: STUDY,
    source_location: "case evidence"
  },
  {
    id: "crime_bohemia_photograph_leverage",
    label: "Bohemia photograph leverage scheme",
    type: "CrimeOrScheme",
    source_file: ADVENTURES,
    source_location: "A Scandal in Bohemia"
  },
  {
    id: "motive_bohemia_reputation",
    label: "Royal reputation motive",
    type: "Motive",
    source_file: ADVENTURES,
    source_location: "A Scandal in Bohemia"
  },
  {
    id: "method_staged_fire_alarm",
    label: "Staged fire alarm reveal",
    type: "ForensicMethod",
    source_file: ADVENTURES,
    source_location: "A Scandal in Bohemia"
  },
  {
    id: "fact_fire_alarm_reveals_photo",
    label: "Fire alarm reveals the photograph hiding place",
    type: "Fact",
    source_file: ADVENTURES,
    source_location: "A Scandal in Bohemia"
  },
  {
    id: "crime_red_headed_bank_tunnel",
    label: "Red-Headed League bank tunnel scheme",
    type: "CrimeOrScheme",
    source_file: ADVENTURES,
    source_location: "The Red-Headed League"
  },
  {
    id: "method_decoy_copying_job",
    label: "Decoy encyclopedia-copying job",
    type: "ForensicMethod",
    source_file: ADVENTURES,
    source_location: "The Red-Headed League"
  },
  {
    id: "fact_wilson_lured_from_shop",
    label: "Jabez Wilson lured away from his shop",
    type: "Fact",
    source_file: ADVENTURES,
    source_location: "The Red-Headed League"
  },
  {
    id: "location_bank_cellar",
    label: "City bank cellar",
    type: "Location",
    source_file: ADVENTURES,
    source_location: "The Red-Headed League"
  },
  {
    id: "crime_transatlantic_jewel_theft",
    label: "La Provence jewel theft",
    type: "CrimeOrScheme",
    source_file: LUPIN,
    source_location: "The Arrest of Arsene Lupin"
  },
  {
    id: "disguise_bernard_dandrezy",
    label: "Bernard d'Andrezy persona",
    type: "DisguisePersona",
    source_file: LUPIN,
    source_location: "The Arrest of Arsene Lupin"
  },
  {
    id: "fact_ganimard_identifies_lupin",
    label: "Ganimard identifies Lupin on La Provence",
    type: "Fact",
    source_file: LUPIN,
    source_location: "The Arrest of Arsene Lupin"
  },
  {
    id: "motive_lupin_notoriety_game",
    label: "Lupin notoriety game",
    type: "Motive",
    source_file: LUPIN,
    source_location: "The Arrest of Arsene Lupin"
  },
  {
    id: "crime_queens_necklace_theft",
    label: "Queen's Necklace theft",
    type: "CrimeOrScheme",
    source_file: LUPIN,
    source_location: "The Queen's Necklace"
  },
  // ---- Expansion pack 1 — Study in Scarlet supporting cast ----
  {
    id: "character_tobias_gregson",
    label: "Inspector Tobias Gregson",
    type: "Character",
    source_file: STUDY,
    source_location: "part 1"
  },
  {
    id: "character_lestrade",
    label: "Inspector Lestrade",
    type: "Character",
    source_file: STUDY,
    source_location: "part 1"
  },
  {
    id: "character_john_rance",
    label: "Constable John Rance",
    type: "Character",
    source_file: STUDY,
    source_location: "part 1"
  },
  {
    id: "character_john_ferrier",
    label: "John Ferrier",
    type: "Character",
    source_file: STUDY,
    source_location: "part 2"
  },
  {
    id: "character_lucy_ferrier",
    label: "Lucy Ferrier",
    type: "Character",
    source_file: STUDY,
    source_location: "part 2"
  },
  // ---- Expansion pack 2 — Study in Scarlet objects & evidence ----
  {
    id: "object_rache_marking",
    label: "RACHE bloodstain marking",
    type: "Object",
    source_file: STUDY,
    source_location: "part 1"
  },
  {
    id: "object_pillbox",
    label: "Twin pillbox poison case",
    type: "Object",
    source_file: STUDY,
    source_location: "part 1"
  },
  {
    id: "evidence_footprints_lauriston",
    label: "Cab and boot footprints at Lauriston Gardens",
    type: "Evidence",
    source_file: STUDY,
    source_location: "part 1"
  },
  {
    id: "location_pondicherry_lodge",
    label: "Salt Lake Valley (Hope backstory)",
    type: "Location",
    source_file: STUDY,
    source_location: "part 2"
  },
  // ---- Expansion pack 3 — Adventures supporting cast ----
  {
    id: "character_irene_adler",
    label: "Irene Adler",
    type: "Character",
    source_file: ADVENTURES,
    source_location: "A Scandal in Bohemia"
  },
  {
    id: "character_king_of_bohemia",
    label: "King of Bohemia",
    type: "Character",
    source_file: ADVENTURES,
    source_location: "A Scandal in Bohemia"
  },
  {
    id: "character_godfrey_norton",
    label: "Godfrey Norton",
    type: "Character",
    source_file: ADVENTURES,
    source_location: "A Scandal in Bohemia"
  },
  {
    id: "character_jabez_wilson",
    label: "Jabez Wilson",
    type: "Character",
    source_file: ADVENTURES,
    source_location: "The Red-Headed League"
  },
  {
    id: "character_vincent_spaulding",
    label: "Vincent Spaulding alias",
    type: "DisguisePersona",
    source_file: ADVENTURES,
    source_location: "The Red-Headed League"
  },
  {
    id: "character_john_clay",
    label: "John Clay",
    type: "Character",
    source_file: ADVENTURES,
    source_location: "The Red-Headed League"
  },
  {
    id: "character_duncan_ross",
    label: "Duncan Ross",
    type: "Character",
    source_file: ADVENTURES,
    source_location: "The Red-Headed League"
  },
  {
    id: "character_peter_jones",
    label: "Inspector Peter Jones",
    type: "Character",
    source_file: ADVENTURES,
    source_location: "The Red-Headed League"
  },
  {
    id: "character_merryweather",
    label: "Mr. Merryweather (City and Suburban Bank)",
    type: "Character",
    source_file: ADVENTURES,
    source_location: "The Red-Headed League"
  },
  // ---- Expansion pack 4 — Adventures locations & objects ----
  {
    id: "location_briony_lodge",
    label: "Briony Lodge, St. John's Wood",
    type: "Location",
    source_file: ADVENTURES,
    source_location: "A Scandal in Bohemia"
  },
  {
    id: "location_city_suburban_bank",
    label: "City and Suburban Bank",
    type: "Location",
    source_file: ADVENTURES,
    source_location: "The Red-Headed League"
  },
  {
    id: "object_red_headed_advertisement",
    label: "Red-Headed League newspaper advertisement",
    type: "Object",
    source_file: ADVENTURES,
    source_location: "The Red-Headed League"
  },
  {
    id: "object_bohemia_photograph",
    label: "Cabinet photograph of Adler with the King",
    type: "Object",
    source_file: ADVENTURES,
    source_location: "A Scandal in Bohemia"
  },
  {
    id: "evidence_encyclopedia_pages",
    label: "Encyclopedia copying-job pages",
    type: "Evidence",
    source_file: ADVENTURES,
    source_location: "The Red-Headed League"
  },
  // ---- Expansion pack 5 — Lupin supporting cast & objects ----
  {
    id: "character_ganimard",
    label: "Inspector Ganimard",
    type: "Character",
    source_file: LUPIN,
    source_location: "The Arrest of Arsene Lupin"
  },
  {
    id: "character_herlock_sholmes",
    label: "Herlock Sholmes (Lupin parody adversary)",
    type: "Character",
    source_file: LUPIN,
    source_location: "Herlock Sholmes Arrives Too Late"
  },
  {
    id: "location_la_provence_ship",
    label: "La Provence transatlantic liner",
    type: "Location",
    source_file: LUPIN,
    source_location: "The Arrest of Arsene Lupin"
  },
  {
    id: "object_queens_necklace_artifact",
    label: "Queen Marie-Antoinette's diamond necklace",
    type: "Object",
    source_file: LUPIN,
    source_location: "The Queen's Necklace"
  },
  {
    id: "disguise_rozaine",
    label: "Rozaine traveler persona",
    type: "DisguisePersona",
    source_file: LUPIN,
    source_location: "The Arrest of Arsene Lupin"
  },
  {
    id: "evidence_ganimard_telegram",
    label: "Ganimard's telegram identifying Lupin",
    type: "Evidence",
    source_file: LUPIN,
    source_location: "The Arrest of Arsene Lupin"
  },
  // ---- Expansion pack 6 — Hound of the Baskervilles ----
  {
    id: "crime_baskerville_hound_plot",
    label: "Baskerville hound plot",
    type: "CrimeOrScheme",
    source_file: HOUND,
    source_location: "case"
  },
  {
    id: "character_sir_henry_baskerville",
    label: "Sir Henry Baskerville",
    type: "Character",
    source_file: HOUND,
    source_location: "case"
  },
  {
    id: "character_jack_stapleton",
    label: "Jack Stapleton",
    type: "Character",
    source_file: HOUND,
    source_location: "case"
  },
  {
    id: "location_baskerville_hall",
    label: "Baskerville Hall",
    type: "Location",
    source_file: HOUND,
    source_location: "case"
  },
  {
    id: "location_grimpen_mire",
    label: "Grimpen Mire",
    type: "Location",
    source_file: HOUND,
    source_location: "case"
  },
  {
    id: "evidence_phosphorus_hound",
    label: "Phosphorus-painted hound",
    type: "Evidence",
    source_file: HOUND,
    source_location: "case"
  },
  // ---- Expansion pack 7 — Father Brown: The Blue Cross ----
  {
    id: "crime_blue_cross_theft_plot",
    label: "Blue Cross theft plot",
    type: "CrimeOrScheme",
    source_file: FATHER_BROWN_INNOCENCE,
    source_location: "The Blue Cross"
  },
  {
    id: "character_flambeau",
    label: "Flambeau",
    type: "Character",
    source_file: FATHER_BROWN_INNOCENCE,
    source_location: "The Blue Cross"
  },
  {
    id: "character_valentin",
    label: "Aristide Valentin",
    type: "Character",
    source_file: FATHER_BROWN_INNOCENCE,
    source_location: "The Blue Cross"
  },
  {
    id: "object_blue_cross",
    label: "Blue Cross relic",
    type: "Object",
    source_file: FATHER_BROWN_INNOCENCE,
    source_location: "The Blue Cross"
  },
  {
    id: "method_priestly_moral_inference",
    label: "Priestly moral inference",
    type: "ForensicMethod",
    source_file: FATHER_BROWN_INNOCENCE,
    source_location: "The Blue Cross"
  },
  // ---- Expansion pack 8 — Dr. Thorndyke: The Red Thumb Mark ----
  {
    id: "crime_red_thumb_mark_forgery",
    label: "Red thumb-mark forgery",
    type: "CrimeOrScheme",
    source_file: RED_THUMB_MARK,
    source_location: "case"
  },
  {
    id: "character_reuben_hornby",
    label: "Reuben Hornby",
    type: "Character",
    source_file: RED_THUMB_MARK,
    source_location: "case"
  },
  {
    id: "evidence_bloody_thumb_print",
    label: "Bloody thumb print",
    type: "Evidence",
    source_file: RED_THUMB_MARK,
    source_location: "case"
  },
  {
    id: "method_fingerprint_comparison",
    label: "Fingerprint comparison",
    type: "ForensicMethod",
    source_file: RED_THUMB_MARK,
    source_location: "case"
  },
  {
    id: "method_laboratory_reconstruction",
    label: "Laboratory reconstruction",
    type: "ForensicMethod",
    source_file: RED_THUMB_MARK,
    source_location: "case"
  },
  // ---- Expansion pack 9 — Raffles: The Ides of March ----
  {
    id: "crime_raffles_jewellery_theft",
    label: "Raffles jewellery theft",
    type: "CrimeOrScheme",
    source_file: AMATEUR_CRACKSMAN,
    source_location: "The Ides of March"
  },
  {
    id: "character_bunny_manders",
    label: "Bunny Manders",
    type: "Character",
    source_file: AMATEUR_CRACKSMAN,
    source_location: "The Ides of March"
  },
  {
    id: "location_albany_chambers",
    label: "Albany chambers",
    type: "Location",
    source_file: AMATEUR_CRACKSMAN,
    source_location: "The Ides of March"
  },
  {
    id: "method_social_access_burglary",
    label: "Social access burglary",
    type: "ForensicMethod",
    source_file: AMATEUR_CRACKSMAN,
    source_location: "The Ides of March"
  },
  {
    id: "motive_raffles_sporting_theft",
    label: "Raffles sporting theft motive",
    type: "Motive",
    source_file: AMATEUR_CRACKSMAN,
    source_location: "The Ides of March"
  }
]

const CURATED_DETAIL_EDGES: CuratedDetailEdge[] = [
  { source: "case_lauriston_gardens", relation: "involves", target: "crime_drebber_stangerson_murders", source_file: STUDY, source_location: "part 1" },
  { source: "crime_drebber_stangerson_murders", relation: "targets", target: "character_enoch_drebber", source_file: STUDY, source_location: "part 1" },
  { source: "crime_drebber_stangerson_murders", relation: "targets", target: "character_joseph_stangerson", source_file: STUDY, source_location: "part 1" },
  { source: "motive_jefferson_hope_revenge", relation: "motivates", target: "crime_drebber_stangerson_murders", source_file: STUDY, source_location: "part 2" },
  { source: "character_jefferson_hope", relation: "commits", target: "crime_drebber_stangerson_murders", source_file: STUDY, source_location: "part 2" },
  { source: "crime_drebber_stangerson_murders", relation: "occurs_at", target: "location_lauriston_gardens", source_file: STUDY, source_location: "part 1" },
  { source: "fact_drebber_found_dead", relation: "involves", target: "character_enoch_drebber", source_file: STUDY, source_location: "part 1" },
  { source: "fact_drebber_found_dead", relation: "occurs_at", target: "location_lauriston_gardens", source_file: STUDY, source_location: "part 1" },
  { source: "object_wedding_ring", relation: "establishes_fact", target: "fact_wedding_ring_left", source_file: STUDY, source_location: "case evidence" },
  { source: "method_blood_stain_reagent", relation: "establishes_fact", target: "fact_drebber_found_dead", source_file: STUDY, source_location: "laboratory scene" },
  { source: "character_sherlock_holmes", relation: "uses_method", target: "method_blood_stain_reagent", source_file: STUDY, source_location: "laboratory scene" },
  { source: "character_sherlock_holmes", relation: "uses_method", target: "method_ring_advertisement_trap", source_file: STUDY, source_location: "case evidence" },
  { source: "case_bohemia_photograph", relation: "involves", target: "crime_bohemia_photograph_leverage", source_file: ADVENTURES, source_location: "A Scandal in Bohemia" },
  { source: "motive_bohemia_reputation", relation: "motivates", target: "crime_bohemia_photograph_leverage", source_file: ADVENTURES, source_location: "A Scandal in Bohemia" },
  { source: "crime_bohemia_photograph_leverage", relation: "targets", target: "character_king_bohemia", source_file: ADVENTURES, source_location: "A Scandal in Bohemia" },
  { source: "character_sherlock_holmes", relation: "uses_method", target: "method_staged_fire_alarm", source_file: ADVENTURES, source_location: "A Scandal in Bohemia" },
  { source: "method_staged_fire_alarm", relation: "establishes_fact", target: "fact_fire_alarm_reveals_photo", source_file: ADVENTURES, source_location: "A Scandal in Bohemia" },
  { source: "fact_fire_alarm_reveals_photo", relation: "involves", target: "object_bohemia_photograph", source_file: ADVENTURES, source_location: "A Scandal in Bohemia" },
  { source: "case_red_headed_league", relation: "involves", target: "crime_red_headed_bank_tunnel", source_file: ADVENTURES, source_location: "The Red-Headed League" },
  { source: "crime_red_headed_bank_tunnel", relation: "targets", target: "location_bank_cellar", source_file: ADVENTURES, source_location: "The Red-Headed League" },
  { source: "crime_red_headed_bank_tunnel", relation: "involves", target: "character_john_clay", source_file: ADVENTURES, source_location: "The Red-Headed League" },
  { source: "method_decoy_copying_job", relation: "establishes_fact", target: "fact_wilson_lured_from_shop", source_file: ADVENTURES, source_location: "The Red-Headed League" },
  { source: "organization_red_headed_league", relation: "uses_method", target: "method_decoy_copying_job", source_file: ADVENTURES, source_location: "The Red-Headed League" },
  { source: "fact_wilson_lured_from_shop", relation: "involves", target: "character_jabez_wilson", source_file: ADVENTURES, source_location: "The Red-Headed League" },
  { source: "case_lupin_transatlantic", relation: "involves", target: "crime_transatlantic_jewel_theft", source_file: LUPIN, source_location: "The Arrest of Arsene Lupin" },
  { source: "crime_transatlantic_jewel_theft", relation: "occurs_at", target: "location_ss_la_provence", source_file: LUPIN, source_location: "The Arrest of Arsene Lupin" },
  { source: "crime_transatlantic_jewel_theft", relation: "involves", target: "character_arsene_lupin", source_file: LUPIN, source_location: "The Arrest of Arsene Lupin" },
  { source: "character_arsene_lupin", relation: "disguises_as", target: "disguise_bernard_dandrezy", source_file: LUPIN, source_location: "The Arrest of Arsene Lupin" },
  { source: "disguise_bernard_dandrezy", relation: "used_in", target: "case_lupin_transatlantic", source_file: LUPIN, source_location: "The Arrest of Arsene Lupin" },
  { source: "fact_ganimard_identifies_lupin", relation: "involves", target: "character_ganimard", source_file: LUPIN, source_location: "The Arrest of Arsene Lupin" },
  { source: "fact_ganimard_identifies_lupin", relation: "involves", target: "disguise_bernard_dandrezy", source_file: LUPIN, source_location: "The Arrest of Arsene Lupin" },
  { source: "motive_lupin_notoriety_game", relation: "motivates", target: "character_arsene_lupin", source_file: LUPIN, source_location: "The Arrest of Arsene Lupin" },
  { source: "case_queen_necklace", relation: "involves", target: "crime_queens_necklace_theft", source_file: LUPIN, source_location: "The Queen's Necklace" },
  { source: "crime_queens_necklace_theft", relation: "targets", target: "object_queens_necklace", source_file: LUPIN, source_location: "The Queen's Necklace" },
  // ---- Expansion edges pack 1 — Study in Scarlet supporting cast ----
  { source: "character_tobias_gregson", relation: "investigates", target: "case_lauriston_gardens", source_file: STUDY, source_location: "part 1" },
  { source: "character_lestrade", relation: "investigates", target: "case_lauriston_gardens", source_file: STUDY, source_location: "part 1" },
  { source: "character_lestrade", relation: "opposes", target: "character_tobias_gregson", source_file: STUDY, source_location: "part 1" },
  { source: "character_john_rance", relation: "appears_in", target: "case_lauriston_gardens", source_file: STUDY, source_location: "part 1" },
  { source: "character_jefferson_hope", relation: "appears_in", target: "location_pondicherry_lodge", source_file: STUDY, source_location: "part 2" },
  { source: "character_john_ferrier", relation: "appears_in", target: "location_pondicherry_lodge", source_file: STUDY, source_location: "part 2" },
  { source: "character_lucy_ferrier", relation: "appears_in", target: "location_pondicherry_lodge", source_file: STUDY, source_location: "part 2" },
  { source: "motive_jefferson_hope_revenge", relation: "involves", target: "character_lucy_ferrier", source_file: STUDY, source_location: "part 2" },
  // ---- Expansion edges pack 2 — Study in Scarlet objects/evidence ----
  { source: "object_rache_marking", relation: "establishes_fact", target: "fact_drebber_found_dead", source_file: STUDY, source_location: "part 1" },
  { source: "object_rache_marking", relation: "occurs_at", target: "location_lauriston_gardens", source_file: STUDY, source_location: "part 1" },
  { source: "object_pillbox", relation: "used_in", target: "crime_drebber_stangerson_murders", source_file: STUDY, source_location: "part 1" },
  { source: "evidence_footprints_lauriston", relation: "occurs_at", target: "location_lauriston_gardens", source_file: STUDY, source_location: "part 1" },
  { source: "evidence_footprints_lauriston", relation: "establishes_fact", target: "fact_drebber_found_dead", source_file: STUDY, source_location: "part 1" },
  // ---- Expansion edges pack 3 — Adventures supporting cast ----
  { source: "character_irene_adler", relation: "opposes", target: "character_sherlock_holmes", source_file: ADVENTURES, source_location: "A Scandal in Bohemia" },
  { source: "character_irene_adler", relation: "appears_in", target: "case_bohemia_photograph", source_file: ADVENTURES, source_location: "A Scandal in Bohemia" },
  { source: "character_king_of_bohemia", relation: "appears_in", target: "case_bohemia_photograph", source_file: ADVENTURES, source_location: "A Scandal in Bohemia" },
  { source: "character_godfrey_norton", relation: "appears_in", target: "case_bohemia_photograph", source_file: ADVENTURES, source_location: "A Scandal in Bohemia" },
  { source: "character_jabez_wilson", relation: "appears_in", target: "case_red_headed_league", source_file: ADVENTURES, source_location: "The Red-Headed League" },
  { source: "character_john_clay", relation: "disguises_as", target: "character_vincent_spaulding", source_file: ADVENTURES, source_location: "The Red-Headed League" },
  { source: "character_john_clay", relation: "commits", target: "crime_red_headed_bank_tunnel", source_file: ADVENTURES, source_location: "The Red-Headed League" },
  { source: "character_duncan_ross", relation: "appears_in", target: "case_red_headed_league", source_file: ADVENTURES, source_location: "The Red-Headed League" },
  { source: "character_peter_jones", relation: "investigates", target: "case_red_headed_league", source_file: ADVENTURES, source_location: "The Red-Headed League" },
  { source: "character_merryweather", relation: "appears_in", target: "location_city_suburban_bank", source_file: ADVENTURES, source_location: "The Red-Headed League" },
  // ---- Expansion edges pack 4 — Adventures locations & objects ----
  { source: "case_bohemia_photograph", relation: "occurs_at", target: "location_briony_lodge", source_file: ADVENTURES, source_location: "A Scandal in Bohemia" },
  { source: "character_irene_adler", relation: "appears_in", target: "location_briony_lodge", source_file: ADVENTURES, source_location: "A Scandal in Bohemia" },
  { source: "crime_red_headed_bank_tunnel", relation: "occurs_at", target: "location_city_suburban_bank", source_file: ADVENTURES, source_location: "The Red-Headed League" },
  { source: "method_decoy_copying_job", relation: "uses_method", target: "object_red_headed_advertisement", source_file: ADVENTURES, source_location: "The Red-Headed League" },
  { source: "object_red_headed_advertisement", relation: "involves", target: "character_jabez_wilson", source_file: ADVENTURES, source_location: "The Red-Headed League" },
  { source: "evidence_encyclopedia_pages", relation: "establishes_fact", target: "fact_wilson_lured_from_shop", source_file: ADVENTURES, source_location: "The Red-Headed League" },
  { source: "object_bohemia_photograph", relation: "involves", target: "character_irene_adler", source_file: ADVENTURES, source_location: "A Scandal in Bohemia" },
  { source: "object_bohemia_photograph", relation: "involves", target: "character_king_of_bohemia", source_file: ADVENTURES, source_location: "A Scandal in Bohemia" },
  { source: "crime_bohemia_photograph_leverage", relation: "targets", target: "object_bohemia_photograph", source_file: ADVENTURES, source_location: "A Scandal in Bohemia" },
  // ---- Expansion edges pack 5 — Lupin supporting cast & objects ----
  { source: "character_ganimard", relation: "investigates", target: "case_lupin_transatlantic", source_file: LUPIN, source_location: "The Arrest of Arsene Lupin" },
  { source: "character_ganimard", relation: "opposes", target: "character_arsene_lupin", source_file: LUPIN, source_location: "The Arrest of Arsene Lupin" },
  { source: "character_herlock_sholmes", relation: "opposes", target: "character_arsene_lupin", source_file: LUPIN, source_location: "Herlock Sholmes Arrives Too Late" },
  { source: "case_lupin_transatlantic", relation: "occurs_at", target: "location_la_provence_ship", source_file: LUPIN, source_location: "The Arrest of Arsene Lupin" },
  { source: "character_arsene_lupin", relation: "appears_in", target: "location_la_provence_ship", source_file: LUPIN, source_location: "The Arrest of Arsene Lupin" },
  { source: "character_arsene_lupin", relation: "disguises_as", target: "disguise_rozaine", source_file: LUPIN, source_location: "The Arrest of Arsene Lupin" },
  { source: "disguise_rozaine", relation: "used_in", target: "case_lupin_transatlantic", source_file: LUPIN, source_location: "The Arrest of Arsene Lupin" },
  { source: "object_queens_necklace_artifact", relation: "establishes_fact", target: "crime_queens_necklace_theft", source_file: LUPIN, source_location: "The Queen's Necklace" },
  { source: "evidence_ganimard_telegram", relation: "establishes_fact", target: "fact_ganimard_identifies_lupin", source_file: LUPIN, source_location: "The Arrest of Arsene Lupin" },
  // ---- Expansion edges pack 6 — Hound of the Baskervilles ----
  { source: "case_baskerville_curse", relation: "involves", target: "crime_baskerville_hound_plot", source_file: HOUND, source_location: "case" },
  { source: "crime_baskerville_hound_plot", relation: "targets", target: "character_sir_henry_baskerville", source_file: HOUND, source_location: "case" },
  { source: "character_jack_stapleton", relation: "commits", target: "crime_baskerville_hound_plot", source_file: HOUND, source_location: "case" },
  { source: "crime_baskerville_hound_plot", relation: "occurs_at", target: "location_baskerville_hall", source_file: HOUND, source_location: "case" },
  { source: "crime_baskerville_hound_plot", relation: "occurs_at", target: "location_grimpen_mire", source_file: HOUND, source_location: "case" },
  { source: "evidence_phosphorus_hound", relation: "establishes_fact", target: "crime_baskerville_hound_plot", source_file: HOUND, source_location: "case" },
  { source: "character_sherlock_holmes", relation: "investigates", target: "case_baskerville_curse", source_file: HOUND, source_location: "case" },
  // ---- Expansion edges pack 7 — Father Brown: The Blue Cross ----
  { source: "case_blue_cross", relation: "involves", target: "crime_blue_cross_theft_plot", source_file: FATHER_BROWN_INNOCENCE, source_location: "The Blue Cross" },
  { source: "crime_blue_cross_theft_plot", relation: "targets", target: "object_blue_cross", source_file: FATHER_BROWN_INNOCENCE, source_location: "The Blue Cross" },
  { source: "character_flambeau", relation: "commits", target: "crime_blue_cross_theft_plot", source_file: FATHER_BROWN_INNOCENCE, source_location: "The Blue Cross" },
  { source: "character_flambeau", relation: "opposes", target: "character_father_brown", source_file: FATHER_BROWN_INNOCENCE, source_location: "The Blue Cross" },
  { source: "character_valentin", relation: "investigates", target: "case_blue_cross", source_file: FATHER_BROWN_INNOCENCE, source_location: "The Blue Cross" },
  { source: "character_father_brown", relation: "uses_method", target: "method_priestly_moral_inference", source_file: FATHER_BROWN_INNOCENCE, source_location: "The Blue Cross" },
  { source: "method_priestly_moral_inference", relation: "establishes_fact", target: "crime_blue_cross_theft_plot", source_file: FATHER_BROWN_INNOCENCE, source_location: "The Blue Cross" },
  // ---- Expansion edges pack 8 — Dr. Thorndyke: The Red Thumb Mark ----
  { source: "case_red_thumb_mark", relation: "involves", target: "crime_red_thumb_mark_forgery", source_file: RED_THUMB_MARK, source_location: "case" },
  { source: "crime_red_thumb_mark_forgery", relation: "targets", target: "character_reuben_hornby", source_file: RED_THUMB_MARK, source_location: "case" },
  { source: "evidence_bloody_thumb_print", relation: "establishes_fact", target: "crime_red_thumb_mark_forgery", source_file: RED_THUMB_MARK, source_location: "case" },
  { source: "character_dr_thorndyke", relation: "uses_method", target: "method_fingerprint_comparison", source_file: RED_THUMB_MARK, source_location: "case" },
  { source: "character_dr_thorndyke", relation: "uses_method", target: "method_laboratory_reconstruction", source_file: RED_THUMB_MARK, source_location: "case" },
  { source: "method_laboratory_reconstruction", relation: "establishes_fact", target: "evidence_bloody_thumb_print", source_file: RED_THUMB_MARK, source_location: "case" },
  // ---- Expansion edges pack 9 — Raffles: The Ides of March ----
  { source: "case_ides_of_march", relation: "involves", target: "crime_raffles_jewellery_theft", source_file: AMATEUR_CRACKSMAN, source_location: "The Ides of March" },
  { source: "character_aj_raffles", relation: "commits", target: "crime_raffles_jewellery_theft", source_file: AMATEUR_CRACKSMAN, source_location: "The Ides of March" },
  { source: "character_bunny_manders", relation: "appears_in", target: "case_ides_of_march", source_file: AMATEUR_CRACKSMAN, source_location: "The Ides of March" },
  { source: "crime_raffles_jewellery_theft", relation: "occurs_at", target: "location_albany_chambers", source_file: AMATEUR_CRACKSMAN, source_location: "The Ides of March" },
  { source: "character_aj_raffles", relation: "uses_method", target: "method_social_access_burglary", source_file: AMATEUR_CRACKSMAN, source_location: "The Ides of March" },
  { source: "motive_raffles_sporting_theft", relation: "motivates", target: "crime_raffles_jewellery_theft", source_file: AMATEUR_CRACKSMAN, source_location: "The Ides of March" }
]

function sourceRefForLocation(sourceFile: string, sourceLocation: string): string {
  return `${sourceFile}#${slugify(sourceLocation)}`
}

function createCuratedNode(node: CuratedDetailNode): SemanticNode {
  return {
    ...node,
    file_type: "concept",
    confidence: "EXTRACTED",
    status: "validated",
    citations: [{ source_file: node.source_file, section: node.source_location }],
    evidence_refs: [sourceRefForLocation(node.source_file, node.source_location)]
  }
}

function createCuratedEdge(edge: CuratedDetailEdge): SemanticEdge {
  return {
    ...edge,
    confidence: "EXTRACTED",
    citations: [{ source_file: edge.source_file, section: edge.source_location }],
    evidence_refs: [sourceRefForLocation(edge.source_file, edge.source_location)]
  }
}

export function deepenDocumentarySemanticGraph(
  graph: SemanticGraph,
  works: readonly Work[] = WORKS
): SemanticGraph {
  const nodes = [...graph.nodes]
  const edges = [...graph.edges]
  const nodeIds = new Set(nodes.map((node) => node.id))
  const edgeKeys = new Set(edges.map(edgeKey))
  const workNodesBySourceFile = new Map(
    nodes
      .filter((node) => node.type === "Work")
      .map((node) => [node.source_file, node] as const)
  )
  const storyNodesBySourceFile = new Map<string, SemanticNode[]>()
  const selectedSourceFiles = new Set(nodes.map((node) => node.source_file))

  for (const node of nodes) {
    if (node.type !== "ChapterOrStory") continue
    const list = storyNodesBySourceFile.get(node.source_file) ?? []
    list.push(node)
    storyNodesBySourceFile.set(node.source_file, list)
  }

  for (const node of nodes) {
    if (node.type !== "Work") continue
    const work = workFromSourceFile(node.source_file, works)
    if (!work) continue

    const sagaNodeId = `saga_${slugify(work.saga)}`
    const authorNodeId = `author_${slugify(work.author.name)}`
    const translatorNodeIds = (work.translators ?? []).map(
      (translator) => `translator_${slugify(translator.name)}`
    )

    const metadataNodes: SemanticNode[] = [
      createMetadataNode(sagaNodeId, `${work.sagaTitle} saga`, "Saga", node.source_file),
      createMetadataNode(authorNodeId, work.author.name, "Author", node.source_file),
      ...(work.translators ?? []).map((translator, index) =>
        createMetadataNode(translatorNodeIds[index]!, translator.name, "Translator", node.source_file)
      )
    ]

    for (const metadataNode of metadataNodes) {
      if (nodeIds.has(metadataNode.id)) continue
      nodes.push(metadataNode)
      nodeIds.add(metadataNode.id)
    }

    const metadataEdges: SemanticEdge[] = [
      createMetadataEdge(node.id, "belongs_to_saga", sagaNodeId, node.source_file),
      createMetadataEdge(node.id, "written_by", authorNodeId, node.source_file),
      ...(work.translators ?? []).map((translator, index) =>
        createMetadataEdge(node.id, "translated_by", translatorNodeIds[index]!, node.source_file)
      )
    ]

    for (const metadataEdge of metadataEdges) {
      const key = edgeKey(metadataEdge)
      if (edgeKeys.has(key)) continue
      edges.push(metadataEdge)
      edgeKeys.add(key)
    }
  }

  for (const detailNode of CURATED_DETAIL_NODES) {
    if (!selectedSourceFiles.has(detailNode.source_file)) continue
    if (nodeIds.has(detailNode.id)) continue
    nodes.push(createCuratedNode(detailNode))
    nodeIds.add(detailNode.id)
  }

  for (const detailEdge of CURATED_DETAIL_EDGES) {
    if (!selectedSourceFiles.has(detailEdge.source_file)) continue
    if (!nodeIds.has(detailEdge.source) || !nodeIds.has(detailEdge.target)) continue
    const edge = createCuratedEdge(detailEdge)
    const key = edgeKey(edge)
    if (edgeKeys.has(key)) continue
    edges.push(edge)
    edgeKeys.add(key)
  }

  for (const node of nodes) {
    if (!PART_OF_TYPES.has(node.type)) continue
    const workNode = workNodesBySourceFile.get(node.source_file)
    if (!workNode) continue

    const storyNodes = storyNodesBySourceFile.get(node.source_file) ?? []
    const storyNode = storyNodes.find((candidate) => candidate.label === node.source_location)
    const target = node.type === "ChapterOrStory" ? workNode.id : (storyNode?.id ?? workNode.id)
    const edge = createMetadataEdge(node.id, "part_of", target, node.source_file)
    const key = edgeKey(edge)
    if (edgeKeys.has(key)) continue
    edges.push(edge)
    edgeKeys.add(key)
  }

  return {
    ...graph,
    nodes,
    edges
  }
}
