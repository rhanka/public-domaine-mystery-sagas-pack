import { createHash } from "node:crypto"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { dirname } from "node:path"

import { buildDocumentaryDescriptionIndex } from "../src/graphify-descriptions.js"
import type { SemanticGraph } from "../src/graphify-deepening.js"

const semanticPath = process.argv[2] ?? ".graphify/.graphify_semantic.json"
const graphPath = process.argv[3] ?? ".graphify/graph.json"
const outputPath = process.argv[4] ?? ".graphify/wiki/descriptions.json"

const semanticGraph = JSON.parse(await readFile(semanticPath, "utf8")) as SemanticGraph
const graphHash = createHash("sha256").update(await readFile(graphPath)).digest("hex")
const index = buildDocumentaryDescriptionIndex(semanticGraph, graphHash)

await mkdir(dirname(outputPath), { recursive: true })
await writeFile(outputPath, `${JSON.stringify(index, null, 2)}\n`, "utf8")

console.log(`Wrote ${Object.keys(index.nodes).length} wiki description(s) to ${outputPath}`)
