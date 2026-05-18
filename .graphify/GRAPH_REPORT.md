# Graph Report - .  (2026-05-18)

## Corpus Check
- cluster-only mode - file stats not available

## Summary
- 43 nodes · 65 edges · 7 communities detected
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output


## Graph Freshness
- Built from Git commit: `6eb6c9e`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `A Study in Scarlet` - 16 edges
2. `Lauriston Gardens murders` - 8 edges
3. `The Extraordinary Adventures of Arsene Lupin` - 7 edges
4. `A Scandal in Bohemia` - 6 edges
5. `Sherlock Holmes` - 6 edges
6. `The Adventures of Sherlock Holmes` - 5 edges
7. `The Red-Headed League` - 5 edges
8. `The Arrest of Arsene Lupin` - 5 edges
9. `Red-Headed League bank plot` - 5 edges
10. `Bohemia photograph case` - 4 edges

## Surprising Connections (you probably didn't know these)
- `A Study in Scarlet` --belongs_to_saga--> `Sherlock Holmes saga`  [EXTRACTED]
  corpus/sherlock-holmes/a-study-in-scarlet/text.txt → corpus/sherlock-holmes/a-study-in-scarlet/metadata.json
- `A Study in Scarlet` --written_by--> `Arthur Conan Doyle`  [EXTRACTED]
  corpus/sherlock-holmes/a-study-in-scarlet/text.txt → corpus/sherlock-holmes/a-study-in-scarlet/metadata.json
- `Sherlock Holmes` --investigates--> `Red-Headed League bank plot`  [EXTRACTED]
  corpus/sherlock-holmes/a-study-in-scarlet/text.txt → corpus/sherlock-holmes/the-adventures-of-sherlock-holmes/text.txt
- `The Adventures of Sherlock Holmes` --belongs_to_saga--> `Sherlock Holmes saga`  [EXTRACTED]
  corpus/sherlock-holmes/the-adventures-of-sherlock-holmes/text.txt → corpus/sherlock-holmes/a-study-in-scarlet/metadata.json
- `The Adventures of Sherlock Holmes` --written_by--> `Arthur Conan Doyle`  [EXTRACTED]
  corpus/sherlock-holmes/the-adventures-of-sherlock-holmes/text.txt → corpus/sherlock-holmes/a-study-in-scarlet/metadata.json

## Communities

### Community 0 - "Sherlock Holmes anthology and Red-Headed League"
Cohesion: 0.24
Nodes (10): Arthur Conan Doyle, Red-Headed League bank plot, Jabez Wilson, John Clay, Red-Headed League advertisement, Red-Headed League, Sherlock Holmes saga, The Blue Carbuncle (+2 more)

### Community 1 - "Arsene Lupin anthology and rivalry"
Cohesion: 0.32
Nodes (8): Maurice Leblanc, Queen's Necklace affair, Arsene Lupin, Herlock Sholmes, Queen's Necklace, Arsene Lupin saga, Sherlock Holmes Arrives Too Late, The Extraordinary Adventures of Arsene Lupin

### Community 2 - "Bohemia case and Holmes cast"
Cohesion: 0.48
Nodes (7): Bohemia photograph case, Dr. John H. Watson, Irene Adler, King of Bohemia, Sherlock Holmes, Irene Adler photograph, A Scandal in Bohemia

### Community 3 - "A Study in Scarlet framing and home base"
Cohesion: 0.33
Nodes (6): Joseph Stangerson, Young Stamford, 221B Baker Street, London, Watson narrator role, A Study in Scarlet

### Community 4 - "Lauriston Gardens evidence chain"
Cohesion: 0.4
Nodes (5): Lauriston Gardens murders, Enoch Drebber, Jefferson Hope, Holmes blood-stain reagent, Wedding ring clue

### Community 5 - "La Provence arrest sequence"
Cohesion: 0.7
Nodes (5): Transatlantic Lupin arrest, Ganimard, Lupin arrest aboard La Provence, SS La Provence, The Arrest of Arsene Lupin

### Community 6 - "Lauriston Gardens revenge setting"
Cohesion: 1
Nodes (2): Jefferson Hope revenge, Lauriston Gardens

## Knowledge Gaps
- **9 isolated node(s):** `The Blue Carbuncle`, `Young Stamford`, `Jabez Wilson`, `John Clay`, `Watson narrator role` (+4 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Lauriston Gardens revenge setting`** (2 nodes): `Jefferson Hope revenge`, `Lauriston Gardens`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `A Study in Scarlet` connect `A Study in Scarlet framing and home base` to `Bohemia case and Holmes cast`, `Lauriston Gardens evidence chain`, `Sherlock Holmes anthology and Red-Headed League`, `Lauriston Gardens revenge setting`?**
  _High betweenness centrality (0.253) - this node is a cross-community bridge._
- **Why does `Sherlock Holmes` connect `Bohemia case and Holmes cast` to `A Study in Scarlet framing and home base`, `Lauriston Gardens evidence chain`, `Sherlock Holmes anthology and Red-Headed League`?**
  _High betweenness centrality (0.189) - this node is a cross-community bridge._
- **Why does `Red-Headed League bank plot` connect `Sherlock Holmes anthology and Red-Headed League` to `Bohemia case and Holmes cast`?**
  _High betweenness centrality (0.095) - this node is a cross-community bridge._
- **What connects `The Blue Carbuncle`, `Young Stamford`, `Jabez Wilson` to the rest of the system?**
  _9 weakly-connected nodes found - possible documentation gaps or missing edges._