# Graph Report - corpus  (2026-05-21)

## Corpus Check
- Large corpus: 26 files · ~1,746,353 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 123 nodes · 221 edges · 9 communities detected
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output


## Input Scope
- Requested: all
- Resolved: all (source: cli)
- Included files: 26 · Candidates: recursive
- Excluded: 0 untracked · 0 ignored · 0 sensitive · 0 missing committed

## Graph Freshness
- Built from Git commit: `688b927`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `A Study in Scarlet` - 26 edges
2. `The Red-Headed League` - 13 edges
3. `The Arrest of Arsene Lupin` - 12 edges
4. `Lauriston Gardens murders` - 12 edges
5. `A Scandal in Bohemia` - 11 edges
6. `Sherlock Holmes` - 11 edges
7. `The Extraordinary Adventures of Arsene Lupin` - 9 edges
8. `Red-Headed League bank plot` - 9 edges
9. `Arsene Lupin` - 9 edges
10. `Bohemia photograph case` - 8 edges

## Surprising Connections (you probably didn't know these)
- `A Scandal in Bohemia` --mentions--> `Sherlock Holmes`  [EXTRACTED]
  corpus/sherlock-holmes/the-adventures-of-sherlock-holmes/text.txt → corpus/sherlock-holmes/a-study-in-scarlet/text.txt
- `Sherlock Holmes` --investigates--> `Bohemia photograph case`  [EXTRACTED]
  corpus/sherlock-holmes/a-study-in-scarlet/text.txt → corpus/sherlock-holmes/the-adventures-of-sherlock-holmes/text.txt
- `Sherlock Holmes` --investigates--> `Red-Headed League bank plot`  [EXTRACTED]
  corpus/sherlock-holmes/a-study-in-scarlet/text.txt → corpus/sherlock-holmes/the-adventures-of-sherlock-holmes/text.txt
- `A Study in Scarlet` --belongs_to_saga--> `Sherlock Holmes saga`  [EXTRACTED]
  corpus/sherlock-holmes/a-study-in-scarlet/text.txt → corpus/sherlock-holmes/a-study-in-scarlet/metadata.json
- `A Study in Scarlet` --written_by--> `Arthur Conan Doyle`  [EXTRACTED]
  corpus/sherlock-holmes/a-study-in-scarlet/text.txt → corpus/sherlock-holmes/a-study-in-scarlet/metadata.json

## Communities

### Community 0 - "Sherlock Holmes anthology and Red-Headed League"
Cohesion: 0.13
Nodes (30): Lauriston Gardens murders, Dr. John H. Watson, Enoch Drebber, Jefferson Hope, John Ferrier, Constable John Rance, Joseph Stangerson, Inspector Lestrade (+22 more)

### Community 1 - "Arsene Lupin anthology and rivalry"
Cohesion: 0.22
Nodes (17): Red-Headed League bank plot, Duncan Ross, Jabez Wilson, John Clay, Mr. Merryweather (City and Suburban Bank), Inspector Peter Jones, Vincent Spaulding alias, Red-Headed League bank tunnel scheme (+9 more)

### Community 2 - "Bohemia case and Holmes cast"
Cohesion: 0.37
Nodes (13): Transatlantic Lupin arrest, Arsene Lupin, Ganimard, La Provence jewel theft, Bernard d'Andrezy persona, Rozaine traveler persona, Lupin arrest aboard La Provence, Ganimard's telegram identifying Lupin (+5 more)

### Community 3 - "A Study in Scarlet framing and home base"
Cohesion: 0.24
Nodes (12): Arthur Conan Doyle, Baskerville curse investigation, Jack Stapleton, Sir Henry Baskerville, Baskerville hound plot, Phosphorus-painted hound, Baskerville Hall, Grimpen Mire (+4 more)

### Community 4 - "Lauriston Gardens evidence chain"
Cohesion: 0.36
Nodes (12): Bohemia photograph case, Godfrey Norton, Irene Adler, King of Bohemia, King of Bohemia, Bohemia photograph leverage scheme, Fire alarm reveals the photograph hiding place, Briony Lodge, St. John's Wood (+4 more)

### Community 5 - "La Provence arrest sequence"
Cohesion: 0.29
Nodes (10): E. W. Hornung, The Ides of March, A. J. Raffles, Bunny Manders, Raffles jewellery theft, Albany chambers, Social access burglary, Raffles sporting theft motive (+2 more)

### Community 6 - "Lauriston Gardens revenge setting"
Cohesion: 0.29
Nodes (10): G. K. Chesterton, The Blue Cross, Father Brown, Flambeau, Aristide Valentin, Blue Cross theft plot, Priestly moral inference, Blue Cross relic (+2 more)

### Community 7 - "Community 7"
Cohesion: 0.29
Nodes (10): R. Austin Freeman, Red thumb-mark case, Dr. John Thorndyke, Reuben Hornby, Red thumb-mark forgery, Bloody thumb print, Fingerprint comparison, Laboratory reconstruction (+2 more)

### Community 8 - "Community 8"
Cohesion: 0.33
Nodes (9): Maurice Leblanc, Queen's Necklace affair, Herlock Sholmes, Queen's Necklace theft, Queen's Necklace, Queen Marie-Antoinette's diamond necklace, Arsene Lupin saga, Sherlock Holmes Arrives Too Late (+1 more)

## Knowledge Gaps
- **24 isolated node(s):** `The Blue Carbuncle`, `Young Stamford`, `Watson narrator role`, `221B Baker Street`, `London` (+19 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Sherlock Holmes` connect `Sherlock Holmes anthology and Red-Headed League` to `Lauriston Gardens evidence chain`, `Arsene Lupin anthology and rivalry`, `A Study in Scarlet framing and home base`?**
  _High betweenness centrality (0.153) - this node is a cross-community bridge._
- **Why does `A Study in Scarlet` connect `Sherlock Holmes anthology and Red-Headed League` to `A Study in Scarlet framing and home base`?**
  _High betweenness centrality (0.147) - this node is a cross-community bridge._
- **Why does `Red-Headed League bank plot` connect `Arsene Lupin anthology and rivalry` to `Sherlock Holmes anthology and Red-Headed League`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **What connects `The Blue Carbuncle`, `Young Stamford`, `Watson narrator role` to the rest of the system?**
  _24 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Sherlock Holmes anthology and Red-Headed League` be split into smaller, more focused modules?**
  _Cohesion score 0.13 - nodes in this community are weakly interconnected._