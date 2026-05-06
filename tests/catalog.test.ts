import { describe, expect, test } from "vitest";

import { assertPublicDomainPolicy, listSagas, WORKS } from "../src/catalog.js";

describe("corpus catalog", () => {
  test("contains only the intended public-domain mystery sagas", () => {
    expect(listSagas()).toEqual([
      "sherlock-holmes",
      "arsene-lupin",
      "father-brown",
      "dr-thorndyke",
      "raffles"
    ]);
  });

  test("excludes Agatha Christie and other life+70 unsafe authors", () => {
    const allNames = WORKS.flatMap((work) => [
      work.author.name,
      ...(work.translators ?? []).map((translator) => translator.name)
    ]);

    expect(allNames.join("\n")).not.toMatch(/christie/i);
    expect(() => assertPublicDomainPolicy(WORKS)).not.toThrow();
  });

  test("documents source URLs and Gutenberg IDs for every work", () => {
    expect(WORKS.length).toBeGreaterThanOrEqual(15);
    for (const work of WORKS) {
      expect(work.gutenbergId).toBeGreaterThan(0);
      expect(work.sourceUrl).toBe(`https://www.gutenberg.org/ebooks/${work.gutenbergId}`);
      expect(work.downloadUrl).toBe(`https://www.gutenberg.org/ebooks/${work.gutenbergId}.txt.utf-8`);
    }
  });
});
