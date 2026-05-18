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
