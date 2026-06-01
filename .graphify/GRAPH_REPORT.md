# Graph Report - corpus  (2026-06-01)

## Corpus Check
- Large corpus: 26 files · ~1,746,353 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 237 nodes · 430 edges · 15 communities detected
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output
- Edge kinds: part_of: 139 · appears_in: 66 · involves: 37 · belongs_to_saga: 25 · written_by: 25 · mentions: 18 · investigates: 16 · uses_method: 14 · contains_evidence: 13 · establishes_fact: 13 · occurs_at: 12 · opposes: 12 · commits: 10 · targets: 10 · disguises_as: 5 · located_in: 4 · motivates: 4 · translated_by: 3 · used_in: 3 · assists: 1


## Input Scope
- Requested: all
- Resolved: all (source: cli)
- Included files: 26 · Candidates: recursive
- Excluded: 0 untracked · 0 ignored · 0 sensitive · 0 missing committed

## Graph Freshness
- Built from Git commit: `8e62adb`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `A Study in Scarlet` - 26 edges
2. `Sherlock Holmes` - 24 edges
3. `Arsene Lupin` - 18 edges
4. `The Red-Headed League` - 13 edges
5. `A. J. Raffles` - 13 edges
6. `The Arrest of Arsene Lupin` - 12 edges
7. `Lauriston Gardens murders` - 12 edges
8. `A Scandal in Bohemia` - 11 edges
9. `Dr. John Thorndyke` - 10 edges
10. `The Sign of the Four` - 10 edges

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
Cohesion: 0.06
Nodes (52): Arthur Conan Doyle, Birlstone Manor murder, Sholto treasure case, Silver Blaze disappearance, Beppo, Boss McGinty, Cecil Barker, Colonel Sebastian Moran (+44 more)

### Community 1 - "Arsene Lupin anthology and rivalry"
Cohesion: 0.10
Nodes (44): Maurice Leblanc, Blue Diamond affair, Charmerace identity scheme, Crystal stopper case, Hollow Needle secret, Transatlantic Lupin arrest, Queen's Necklace affair, Arsene Lupin (+36 more)

### Community 2 - "Bohemia case and Holmes cast"
Cohesion: 0.15
Nodes (27): Lauriston Gardens murders, Enoch Drebber, Jefferson Hope, John Ferrier, Constable John Rance, Joseph Stangerson, Inspector Lestrade, Lucy Ferrier (+19 more)

### Community 3 - "A Study in Scarlet framing and home base"
Cohesion: 0.14
Nodes (26): R. Austin Freeman, John Bellingham disappearance, Oscar Brodski case, Red thumb-mark case, Dr. Jervis, Dr. John Thorndyke, John Bellingham, Polton (+18 more)

### Community 4 - "Lauriston Gardens evidence chain"
Cohesion: 0.15
Nodes (25): E. W. Hornung, Dan Levy emeralds affair, The Ides of March, Raffles return scheme, Trap to catch a cracksman, A. J. Raffles, Bunny Manders, Dan Levy (+17 more)

### Community 5 - "La Provence arrest sequence"
Cohesion: 0.18
Nodes (20): G. K. Chesterton, The Blue Cross, Father Brown method explanation, Mr. Glass disappearance, Father Brown, Flambeau, Aristide Valentin, Blue Cross theft plot (+12 more)

### Community 6 - "Lauriston Gardens revenge setting"
Cohesion: 0.22
Nodes (17): Red-Headed League bank plot, Duncan Ross, Jabez Wilson, John Clay, Mr. Merryweather (City and Suburban Bank), Inspector Peter Jones, Vincent Spaulding alias, Red-Headed League bank tunnel scheme (+9 more)

### Community 7 - "Community 7"
Cohesion: 0.36
Nodes (12): Bohemia photograph case, Godfrey Norton, Irene Adler, King of Bohemia, King of Bohemia, Bohemia photograph leverage scheme, Fire alarm reveals the photograph hiding place, Briony Lodge, St. John's Wood (+4 more)

### Community 8 - "Community 8"
Cohesion: 0.39
Nodes (8): Baskerville curse investigation, Jack Stapleton, Sir Henry Baskerville, Baskerville hound plot, Phosphorus-painted hound, Baskerville Hall, Grimpen Mire, The Hound of the Baskervilles

### Community 9 - "Community 9"
Cohesion: 1.00
Nodes (1): Birdy Edwards

### Community 10 - "Community 10"
Cohesion: 1.00
Nodes (1): Camilla Belsize

### Community 11 - "Community 11"
Cohesion: 1.00
Nodes (1): Duke of Charmerace

### Community 12 - "Community 12"
Cohesion: 1.00
Nodes (1): Harold Bellingham

### Community 13 - "Community 13"
Cohesion: 1.00
Nodes (1): Tonga

### Community 14 - "Community 14"
Cohesion: 1.00
Nodes (1): Victoire

## Knowledge Gaps
- **42 isolated node(s):** `The Blue Carbuncle`, `Young Stamford`, `Watson narrator role`, `221B Baker Street`, `London` (+37 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 9`** (1 nodes): `Birdy Edwards`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 10`** (1 nodes): `Camilla Belsize`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 11`** (1 nodes): `Duke of Charmerace`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 12`** (1 nodes): `Harold Bellingham`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 13`** (1 nodes): `Tonga`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 14`** (1 nodes): `Victoire`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Sherlock Holmes` connect `Sherlock Holmes anthology and Red-Headed League` to `Bohemia case and Holmes cast`, `Community 7`, `Lauriston Gardens revenge setting`, `Community 8`?**
  _High betweenness centrality (0.133) - this node is a cross-community bridge._
- **Why does `A Study in Scarlet` connect `Bohemia case and Holmes cast` to `Sherlock Holmes anthology and Red-Headed League`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **Why does `Red-Headed League bank plot` connect `Lauriston Gardens revenge setting` to `Sherlock Holmes anthology and Red-Headed League`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **What connects `The Blue Carbuncle`, `Young Stamford`, `Watson narrator role` to the rest of the system?**
  _42 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Sherlock Holmes anthology and Red-Headed League` be split into smaller, more focused modules?**
  _Cohesion score 0.06259426847662142 - nodes in this community are weakly interconnected._
- **Should `Arsene Lupin anthology and rivalry` be split into smaller, more focused modules?**
  _Cohesion score 0.09513742071881606 - nodes in this community are weakly interconnected._
- **Should `Bohemia case and Holmes cast` be split into smaller, more focused modules?**
  _Cohesion score 0.1452991452991453 - nodes in this community are weakly interconnected._