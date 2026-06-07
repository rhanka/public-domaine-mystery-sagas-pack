import { execFileSync } from "node:child_process"
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join, resolve } from "node:path"

import { afterEach, describe, expect, test } from "vitest"

const tempDirs: string[] = []

afterEach(() => {
  while (tempDirs.length > 0) {
    rmSync(tempDirs.pop()!, { recursive: true, force: true })
  }
})

function tempProject(): string {
  const dir = mkdtempSync(join(tmpdir(), "mystery-pages-"))
  tempDirs.push(dir)
  return dir
}

function runBuildPages(root: string): void {
  execFileSync(
    process.execPath,
    ["--import", resolve("node_modules/tsx/dist/esm/index.mjs"), resolve("scripts/build-pages.ts")],
    { cwd: root, stdio: "pipe" },
  )
}

describe("build-pages", () => {
  test("publishes the standalone studio at /graph.html instead of the legacy graph export", () => {
    const root = tempProject()
    mkdirSync(join(root, ".graphify", "wiki"), { recursive: true })
    mkdirSync(join(root, ".graphify", "studio", "assets"), { recursive: true })
    writeFileSync(join(root, ".graphify", "wiki", "index.md"), "# Knowledge Graph Index\n", "utf8")
    writeFileSync(join(root, ".graphify", "wiki", "Community_0.md"), "# Community 0\n", "utf8")
    writeFileSync(join(root, ".graphify", "studio", "index.html"), "<!doctype html><title>Studio</title>", "utf8")
    writeFileSync(join(root, ".graphify", "studio", "assets", "app.js"), "console.log('studio')\n", "utf8")
    writeFileSync(join(root, ".graphify", "studio", "scene.json"), JSON.stringify({ nodes: [], edges: [] }), "utf8")
    writeFileSync(join(root, ".graphify", "graph.html"), "<script src=\"https://unpkg.com/vis-network@9\"></script>", "utf8")

    runBuildPages(root)

    const graphHtml = readFileSync(join(root, "docs", "graph.html"), "utf8")
    expect(graphHtml).toContain('src="./studio/index.html"')
    expect(graphHtml).not.toContain("vis-network")
    expect(readFileSync(join(root, "docs", "studio", "index.html"), "utf8")).toContain("Studio")
    expect(readFileSync(join(root, "docs", "studio", "scene.json"), "utf8")).toContain("nodes")
  })
})
