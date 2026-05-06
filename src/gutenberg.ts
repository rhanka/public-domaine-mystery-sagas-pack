import { createHash } from "node:crypto";

export function sha256(input: string): string {
  return createHash("sha256").update(input, "utf8").digest("hex");
}

export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function stripGutenbergBoilerplate(raw: string): string {
  const normalized = raw.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const startPattern = /\*\*\*\s*START OF (?:THE |THIS )?PROJECT GUTENBERG EBOOK[^*]*\*\*\*/i;
  const endPattern = /\*\*\*\s*END OF (?:THE |THIS )?PROJECT GUTENBERG EBOOK[^*]*\*\*\*/i;
  const start = normalized.search(startPattern);
  const afterStart = start >= 0 ? normalized.slice(start).replace(startPattern, "") : normalized;
  const end = afterStart.search(endPattern);
  const bodyWithLegacyFooter = end >= 0 ? afterStart.slice(0, end) : afterStart;
  const body = bodyWithLegacyFooter.replace(/\n\s*End of Project Gutenberg['’]s? [\s\S]*$/i, "");

  return body
    .split("\n")
    .filter((line) => !/Project Gutenberg also has/i.test(line))
    .map((line) => line.trimEnd())
    .join("\n")
    .replace(/\n{4,}/g, "\n\n\n")
    .trim();
}
