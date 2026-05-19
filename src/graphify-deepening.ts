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
const LUPIN = "corpus/arsene-lupin/the-extraordinary-adventures-of-arsene-lupin-gentleman-burglar/text.txt"

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
  { source: "crime_queens_necklace_theft", relation: "targets", target: "object_queens_necklace", source_file: LUPIN, source_location: "The Queen's Necklace" }
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
