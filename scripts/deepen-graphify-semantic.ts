import { readFile, writeFile } from "node:fs/promises"

import {
  deepenDocumentarySemanticGraph,
  type SemanticGraph
} from "../src/graphify-deepening.js"

const inputPath = process.argv[2] ?? ".graphify/.graphify_semantic.json"
const outputPath = process.argv[3] ?? inputPath

const raw = JSON.parse(await readFile(inputPath, "utf8")) as SemanticGraph
const deepened = deepenDocumentarySemanticGraph(raw)

await writeFile(outputPath, `${JSON.stringify(deepened, null, 2)}\n`, "utf8")

console.log(
  `Deepened semantic extraction: ${raw.nodes.length} -> ${deepened.nodes.length} nodes, ${raw.edges.length} -> ${deepened.edges.length} edges`
)
