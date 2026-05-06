# Corpus License And Provenance

The corpus is built from Project Gutenberg plain-text UTF-8 downloads listed in `src/catalog.ts` and `corpus/manifest.json`.

Selection policy:

- no Agatha Christie;
- no author or translator with `deathYear > 1955`;
- no work first published after 1930;
- only Project Gutenberg entries marked as public domain in the United States at source-review time.

The generated `corpus/**/text.txt` files are stripped of Project Gutenberg boilerplate by `scripts/fetch-corpus.ts`. If you need the original Project Gutenberg license text, fetch the official source URL listed in each work-level `metadata.json`.

Project Gutenberg states that works not restricted under U.S. copyright law can be used broadly when references to Project Gutenberg are removed from the text, while the Project Gutenberg trademark and full Project Gutenberg electronic work license carry their own terms. See:

- https://www.gutenberg.org/policy/license
- https://www.gutenberg.org/

The TypeScript code, tests, and repository-specific metadata are licensed under MIT.
