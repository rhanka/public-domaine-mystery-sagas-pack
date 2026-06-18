import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs"
import { join, dirname, basename, extname } from "node:path"

const ROOT = process.cwd()
const SRC_GRAPHIFY = join(ROOT, ".graphify")
const OUT = join(ROOT, "docs")

mkdirSync(OUT, { recursive: true })
mkdirSync(join(OUT, "wiki"), { recursive: true })


function bindMirroredQaReport(bundleDir: string): void {
  const reportPath = join(bundleDir, "quality-qa-report.json")
  if (!existsSync(reportPath)) return
  const report = JSON.parse(readFileSync(reportPath, "utf8")) as Record<string, unknown>
  report.bundle_path = bundleDir
  writeFileSync(reportPath, JSON.stringify(report, null, 2) + "\n")
}

function graphEntryHtml(): string {
  return [
    "<!DOCTYPE html>",
    "<html lang=\"en\">",
    "<head>",
    "<meta charset=\"utf-8\">",
    "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">",
    "<title>Graph - Mystery Sagas Knowledge Graph</title>",
    "<style>",
    "html, body { margin: 0; width: 100%; height: 100%; overflow: hidden; background: #fff; }",
    "#studio { border: 0; width: 100%; height: 100%; display: block; }",
    ".no-script { font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif; padding: 2rem; }",
    "</style>",
    "</head>",
    "<body>",
    "<iframe id=\"studio\" src=\"./studio/index.html\" title=\"Graphify Ontology Studio\"></iframe>",
    "<noscript><p class=\"no-script\"><a href=\"./studio/index.html\">Open the Graphify Ontology Studio</a></p></noscript>",
    "</body>",
    "</html>",
  ].join("\n")
}

const studioDir = join(SRC_GRAPHIFY, "studio")
if (existsSync(join(studioDir, "index.html"))) {
  const pagesStudioDir = join(OUT, "studio")
  rmSync(pagesStudioDir, { recursive: true, force: true })
  cpSync(studioDir, pagesStudioDir, { recursive: true })
  bindMirroredQaReport(pagesStudioDir)
  writeFileSync(join(OUT, "graph.html"), graphEntryHtml())
} else {
  throw new Error(`Standalone studio export not found at ${studioDir}. Generate .graphify/studio before building Pages.`)
}

const wikiDir = join(SRC_GRAPHIFY, "wiki")
const wikiFiles = readdirSync(wikiDir).filter((f) => f.endsWith(".md"))

function slugifyTitle(title: string): string {
  return title.replace(/\s+/g, "_")
}

function pageHrefForTitle(title: string): string {
  return `wiki/${slugifyTitle(title)}.html`
}

const titles = wikiFiles.map((f) => f.slice(0, -3))
const titleSet = new Set(titles)

function resolveTitle(raw: string): string | null {
  const t = raw.trim()
  if (titleSet.has(t)) return t
  const underscored = t.replace(/\s+/g, "_")
  if (titleSet.has(underscored)) return underscored
  return null
}

function mdToHtml(md: string): string {
  let body = md
  body = body.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, (_match, target: string, label: string) => {
    const resolved = resolveTitle(target)
    if (resolved) return `<a href="${pageHrefForTitle(resolved)}">${String(label).trim()}</a>`
    return String(label).trim()
  })
  body = body.replace(/\[\[([^\]]+)\]\]/g, (_match, target: string) => {
    const resolved = resolveTitle(target)
    if (resolved) return `<a href="${pageHrefForTitle(resolved)}">${String(target).trim()}</a>`
    return String(target).trim()
  })

  const lines = body.split("\n")
  const out: string[] = []
  let inUl = false
  let inP = false
  let inCode = false
  const closeP = () => { if (inP) { out.push("</p>"); inP = false } }
  const closeUl = () => { if (inUl) { out.push("</ul>"); inUl = false } }
  for (const raw of lines) {
    const line = raw.replace(/\r$/, "")
    if (line.trim().startsWith("```")) {
      closeP(); closeUl()
      if (!inCode) { out.push("<pre><code>"); inCode = true } else { out.push("</code></pre>"); inCode = false }
      continue
    }
    if (inCode) { out.push(escapeHtml(line)); continue }
    if (/^#{1,6} /.test(line)) {
      closeP(); closeUl()
      const m = /^(#{1,6}) (.*)$/.exec(line)
      if (m) {
        const level = m[1]!.length
        out.push(`<h${level}>${inlineFormat(m[2]!)}</h${level}>`)
      }
      continue
    }
    if (/^[-*] /.test(line)) {
      closeP()
      if (!inUl) { out.push("<ul>"); inUl = true }
      out.push(`<li>${inlineFormat(line.replace(/^[-*] /, ""))}</li>`)
      continue
    }
    if (line.trim() === "") {
      closeP(); closeUl(); continue
    }
    if (line.startsWith("> ")) {
      closeP(); closeUl()
      out.push(`<blockquote>${inlineFormat(line.slice(2))}</blockquote>`)
      continue
    }
    if (line.trim() === "---") {
      closeP(); closeUl()
      out.push("<hr>")
      continue
    }
    if (!inP) { out.push("<p>"); inP = true }
    out.push(inlineFormat(line) + " ")
  }
  closeP(); closeUl()
  if (inCode) out.push("</code></pre>")
  return out.join("\n")
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

function inlineFormat(s: string): string {
  let out = s
  out = out.replace(/`([^`]+)`/g, (_m, c: string) => `<code>${escapeHtml(c)}</code>`)
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
  out = out.replace(/\*([^*]+)\*/g, "<em>$1</em>")
  out = out.replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2">$1</a>')
  return out
}

const baseStyles = `
:root { color-scheme: light; }
body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; max-width: 760px; margin: 2rem auto; padding: 0 1rem; line-height: 1.55; color: #1a1a1a; background: #fff; }
header.site { display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #ddd; padding-bottom: .5rem; margin-bottom: 1.5rem; }
header.site h1 { margin: 0; font-size: 1.1rem; font-weight: 600; }
header.site nav a { margin-left: 1rem; color: #2563eb; text-decoration: none; font-size: .95rem; }
h1, h2, h3 { line-height: 1.3; }
a { color: #2563eb; }
a:hover { text-decoration: underline; }
blockquote { border-left: 3px solid #d1d5db; padding-left: 1rem; color: #4b5563; margin-left: 0; }
code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; background: #f3f4f6; padding: .1rem .3rem; border-radius: 3px; font-size: .9em; }
pre { background: #f3f4f6; padding: 1rem; border-radius: 6px; overflow-x: auto; }
hr { border: 0; border-top: 1px solid #e5e7eb; margin: 2rem 0; }
.lead { color: #4b5563; font-size: 1.05rem; }
ul { padding-left: 1.2rem; }
footer { margin-top: 3rem; padding-top: 1rem; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: .85rem; }
`

function htmlShell(title: string, body: string, depth: number): string {
  const rel = depth === 0 ? "" : "../".repeat(depth)
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)} — Mystery Sagas Knowledge Graph</title>
<style>${baseStyles}</style>
</head>
<body>
<header class="site">
  <h1><a href="${rel || "./"}index.html" style="color:inherit;text-decoration:none;">Mystery Sagas Knowledge Graph</a></h1>
  <nav>
    <a href="${rel || "./"}graph.html">Graph</a>
    <a href="${rel || "./"}index.html">Wiki</a>
    <a href="https://github.com/rhanka/public-domaine-mystery-sagas-pack">Source</a>
  </nav>
</header>
${body}
<footer>
  Public domain corpus (Conan Doyle, Leblanc, Chesterton, Freeman, Hornung). Generated by <a href="https://github.com/rhanka/graphify">graphify</a>. Site built from <code>.graphify/</code> on commit <code>${process.env.GITHUB_SHA?.slice(0,7) || "local"}</code>.
</footer>
</body>
</html>`
}

const indexMdPath = join(wikiDir, "index.md")
if (existsSync(indexMdPath)) {
  const md = readFileSync(indexMdPath, "utf8")
  writeFileSync(join(OUT, "index.html"), htmlShell("Wiki", mdToHtml(md), 0))
}

for (const f of wikiFiles) {
  if (f === "index.md") continue
  const title = f.slice(0, -3)
  const md = readFileSync(join(wikiDir, f), "utf8")
  writeFileSync(join(OUT, "wiki", `${slugifyTitle(title).replace(/\.md$/, "")}.html`), htmlShell(title.replace(/_/g, " "), mdToHtml(md), 1))
}

const cname = process.env.CNAME?.trim()
if (cname) writeFileSync(join(OUT, "CNAME"), cname + "\n")

writeFileSync(join(OUT, ".nojekyll"), "")

console.log(`Built ${wikiFiles.length} wiki pages + index + graph.html into docs/`)
