# Graph Report - public-domain-mystery-three-works  (2026-05-07)

## Corpus Check
- 3 files · ~201,857 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 20 nodes · 38 edges · 3 communities detected
- Extraction: 68% EXTRACTED · 32% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.5)
- Token cost: 9,800 input · 1,420 output


## Input Scope
- Requested: all
- Resolved: all (source: cli)
- Included files: 3 · Candidates: recursive
- Excluded: 0 untracked · 0 ignored · 0 sensitive · 0 missing committed
## God Nodes (most connected - your core abstractions)
1. `Sherlock Holmes` - 10 edges
2. `A Study in Scarlet` - 8 edges
3. `The Adventures of Sherlock Holmes` - 8 edges
4. `The Extraordinary Adventures of Arsène Lupin, Gentleman-burglar` - 6 edges
5. `Dr. John H. Watson` - 5 edges
6. `Holmes's Method of Deduction and Observation` - 5 edges
7. `Detective Fiction Genre` - 5 edges
8. `Arsène Lupin` - 4 edges
9. `221B Baker Street` - 3 edges
10. `Haemoglobin Blood-Stain Reagent Test` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Rationale: Sherlock Holmes appears in Lupin stories as foil` --contextualises--> `The Adventures of Sherlock Holmes`  [INFERRED]
  corpus/arsene-lupin/the-extraordinary-adventures-of-arsene-lupin-gentleman-burglar/text.txt → corpus/sherlock-holmes/the-adventures-of-sherlock-holmes/text.txt
- `Gentleman Thief Archetype` --contrasts_with--> `Detective Fiction Genre`  [INFERRED]
  corpus/arsene-lupin/the-extraordinary-adventures-of-arsene-lupin-gentleman-burglar/text.txt → corpus/sherlock-holmes/a-study-in-scarlet/text.txt
- `Irene Adler` --intellectually_rivals--> `Sherlock Holmes`  [INFERRED]
  corpus/sherlock-holmes/the-adventures-of-sherlock-holmes/text.txt → corpus/sherlock-holmes/a-study-in-scarlet/text.txt
- `The Extraordinary Adventures of Arsène Lupin, Gentleman-burglar` --belongs_to_genre--> `Detective Fiction Genre`  [INFERRED]
  corpus/arsene-lupin/the-extraordinary-adventures-of-arsene-lupin-gentleman-burglar/text.txt → corpus/sherlock-holmes/a-study-in-scarlet/text.txt
- `Rationale: Watson as unreliable/partial narrator` --explains_narrative_choice_in--> `The Adventures of Sherlock Holmes`  [INFERRED]
  corpus/sherlock-holmes/a-study-in-scarlet/text.txt → corpus/sherlock-holmes/the-adventures-of-sherlock-holmes/text.txt

## Hyperedges (group relationships)
- **Holmes–Watson Investigative Partnership** —  [EXTRACTED]
- **Detective vs. Thief Intertextual Rivalry** —  [INFERRED]
- **Victorian/Edwardian Crime Fiction Corpus** —  [INFERRED]

## Communities

### Community 0 - "Community 0"
Cohesion: 0.52
Nodes (7): The Adventures of Sherlock Holmes, 221B Baker Street, Holmes's Method of Deduction and Observation, Detective Fiction Genre, Haemoglobin Blood-Stain Reagent Test, Rationale: Watson as unreliable/partial narrator, A Study in Scarlet

### Community 1 - "Community 1"
Cohesion: 0.38
Nodes (7): Irene Adler, Wilhelm Gottsreich Sigismond von Ormstein, King of Bohemia, A Scandal in Bohemia (story), Second Afghan War (historical context), Sherlock Holmes, Young Stamford, Dr. John H. Watson

### Community 2 - "Community 2"
Cohesion: 0.4
Nodes (6): The Extraordinary Adventures of Arsène Lupin, Gentleman-burglar, Arsène Lupin, Ganimard, Gentleman Thief Archetype, SS La Provence (transatlantic voyage setting), Rationale: Sherlock Holmes appears in Lupin stories as foil

## Knowledge Gaps
- **2 isolated node(s):** `SS La Provence (transatlantic voyage setting)`, `Second Afghan War (historical context)`
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Sherlock Holmes` connect `Community 1` to `Community 0`, `Community 2`?**
  _High betweenness centrality (0.397) - this node is a cross-community bridge._
- **Why does `The Extraordinary Adventures of Arsène Lupin, Gentleman-burglar` connect `Community 2` to `Community 1`, `Community 0`?**
  _High betweenness centrality (0.244) - this node is a cross-community bridge._
- **Why does `The Adventures of Sherlock Holmes` connect `Community 0` to `Community 1`, `Community 2`?**
  _High betweenness centrality (0.201) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `A Study in Scarlet` (e.g. with `Detective Fiction Genre` and `Rationale: Watson as unreliable/partial narrator`) actually correct?**
  _`A Study in Scarlet` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `The Adventures of Sherlock Holmes` (e.g. with `Detective Fiction Genre` and `Rationale: Sherlock Holmes appears in Lupin stories as foil`) actually correct?**
  _`The Adventures of Sherlock Holmes` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `The Extraordinary Adventures of Arsène Lupin, Gentleman-burglar` (e.g. with `Detective Fiction Genre` and `Rationale: Sherlock Holmes appears in Lupin stories as foil`) actually correct?**
  _`The Extraordinary Adventures of Arsène Lupin, Gentleman-burglar` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `SS La Provence (transatlantic voyage setting)`, `Second Afghan War (historical context)` to the rest of the system?**
  _2 weakly-connected nodes found - possible documentation gaps or missing edges._