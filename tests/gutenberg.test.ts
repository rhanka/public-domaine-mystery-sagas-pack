import { describe, expect, test } from "vitest";

import { sha256, slugify, stripGutenbergBoilerplate } from "../src/gutenberg.js";

describe("Gutenberg text helpers", () => {
  test("strips the Project Gutenberg header and footer markers", () => {
    const raw = [
      "Metadata and license header",
      "*** START OF THE PROJECT GUTENBERG EBOOK 123 ***",
      "",
      "CHAPTER I",
      "The actual story starts here.",
      "",
      "*** END OF THE PROJECT GUTENBERG EBOOK 123 ***",
      "License footer"
    ].join("\n");

    expect(stripGutenbergBoilerplate(raw)).toBe("CHAPTER I\nThe actual story starts here.");
  });

  test("strips legacy footer lines and Gutenberg notes left inside the body", () => {
    const raw = [
      "*** START OF THIS PROJECT GUTENBERG EBOOK SAMPLE ***",
      "Note: Project Gutenberg also has an HTML version of this file.",
      "",
      "CHAPTER I",
      "The actual story starts here.",
      "",
      "End of Project Gutenberg's Sample, by Example Author",
      "Footer material"
    ].join("\n");

    expect(stripGutenbergBoilerplate(raw)).toBe("CHAPTER I\nThe actual story starts here.");
  });

  test("normalizes accented titles into stable ASCII slugs", () => {
    expect(slugify("Arsène Lupin, Gentleman-Burglar")).toBe("arsene-lupin-gentleman-burglar");
  });

  test("computes stable SHA-256 checksums", () => {
    expect(sha256("Holmes\n")).toBe("8592fc1622f8a2ecbcac6ce8065233cf061f3ffb87d9391cc6bb1a37a10f9b42");
  });
});
