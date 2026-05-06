import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import { WORKS, assertPublicDomainPolicy } from "../src/catalog.js";
import { sha256, stripGutenbergBoilerplate } from "../src/gutenberg.js";

const root = process.cwd();
const corpusRoot = path.join(root, "corpus");

async function fetchText(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "public-domain-mystery-sagas-pack/0.1"
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }

  return response.text();
}

async function main(): Promise<void> {
  assertPublicDomainPolicy(WORKS);
  await rm(corpusRoot, { recursive: true, force: true });
  await mkdir(corpusRoot, { recursive: true });

  const manifestWorks = [];

  for (const work of WORKS) {
    const rawText = await fetchText(work.downloadUrl);
    const text = `${stripGutenbergBoilerplate(rawText)}\n`;
    const workDir = path.join(corpusRoot, work.saga, work.slug);
    const textPath = path.join(work.saga, work.slug, "text.txt");
    const metaPath = path.join(work.saga, work.slug, "metadata.json");
    const digest = sha256(text);
    const bytes = Buffer.byteLength(text, "utf8");

    await mkdir(workDir, { recursive: true });
    await writeFile(path.join(corpusRoot, textPath), text, "utf8");
    await writeFile(
      path.join(corpusRoot, metaPath),
      `${JSON.stringify(
        {
          saga: work.saga,
          sagaTitle: work.sagaTitle,
          slug: work.slug,
          title: work.title,
          author: work.author,
          translators: work.translators ?? [],
          firstPublicationYear: work.firstPublicationYear,
          gutenbergId: work.gutenbergId,
          sourceUrl: work.sourceUrl,
          downloadUrl: work.downloadUrl,
          sha256: digest,
          bytes,
          notes: work.notes
        },
        null,
        2
      )}\n`,
      "utf8"
    );

    manifestWorks.push({
      saga: work.saga,
      sagaTitle: work.sagaTitle,
      slug: work.slug,
      title: work.title,
      author: work.author.name,
      translators: work.translators?.map((translator) => translator.name),
      firstPublicationYear: work.firstPublicationYear,
      gutenbergId: work.gutenbergId,
      sourceUrl: work.sourceUrl,
      downloadUrl: work.downloadUrl,
      textPath,
      metaPath,
      sha256: digest,
      bytes,
      notes: work.notes
    });

    console.log(`fetched ${work.saga}/${work.slug} ${bytes} bytes`);
  }

  await writeFile(
    path.join(corpusRoot, "manifest.json"),
    `${JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        source: "Project Gutenberg plain text UTF-8 downloads, normalized by repository scripts.",
        policy: "Only authors/translators that are life+70 safe in 2026 and works first published no later than 1930 are included.",
        works: manifestWorks
      },
      null,
      2
    )}\n`,
    "utf8"
  );

  await writeFile(
    path.join(corpusRoot, "README.md"),
    [
      "# Corpus",
      "",
      "Generated with `npm run fetch` from the checked-in TypeScript catalog.",
      "",
      `Work count: ${manifestWorks.length}`,
      "",
      "| Saga | Works | Bytes |",
      "|---|---:|---:|",
      ...Object.entries(
        manifestWorks.reduce<Record<string, { count: number; bytes: number }>>((acc, work) => {
          acc[work.saga] ??= { count: 0, bytes: 0 };
          acc[work.saga].count += 1;
          acc[work.saga].bytes += work.bytes;
          return acc;
        }, {})
      ).map(([saga, stats]) => `| ${saga} | ${stats.count} | ${stats.bytes} |`),
      ""
    ].join("\n"),
    "utf8"
  );
}

await main();
