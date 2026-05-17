# Graph Report - .  (2026-05-17)

## Corpus Check
- cluster-only mode - file stats not available

## Summary
- 39 nodes · 43 edges · 11 communities detected
- Extraction: 86% EXTRACTED · 14% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output


## Graph Freshness
- Built from Git commit: `fdde846`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `A Study in Scarlet` - 7 edges
2. `Lauriston Gardens murders` - 7 edges
3. `Sherlock Holmes` - 6 edges
4. `The Extraordinary Adventures of Arsene Lupin` - 4 edges
5. `A Scandal in Bohemia` - 4 edges
6. `Red-Headed League bank plot` - 4 edges
7. `The Adventures of Sherlock Holmes` - 3 edges
8. `Bohemia photograph case` - 3 edges
9. `Transatlantic Lupin arrest` - 3 edges
10. `Irene Adler` - 3 edges

## Surprising Connections (you probably didn't know these)
- `A Scandal in Bohemia` --mentions--> `Sherlock Holmes`  [EXTRACTED]
  corpus/sherlock-holmes/the-adventures-of-sherlock-holmes/text.txt → corpus/sherlock-holmes/a-study-in-scarlet/text.txt
- `Sherlock Holmes` --investigates--> `Bohemia photograph case`  [EXTRACTED]
  corpus/sherlock-holmes/a-study-in-scarlet/text.txt → corpus/sherlock-holmes/the-adventures-of-sherlock-holmes/text.txt
- `Sherlock Holmes` --investigates--> `Red-Headed League bank plot`  [EXTRACTED]
  corpus/sherlock-holmes/a-study-in-scarlet/text.txt → corpus/sherlock-holmes/the-adventures-of-sherlock-holmes/text.txt

## Communities

### Community 0 - "Holmes investigations and evidence"
Cohesion: 0.25
Nodes (8): Bohemia photograph case, Red-Headed League bank plot, Dr. John H. Watson, John Clay, Sherlock Holmes, Irene Adler photograph, Red-Headed League advertisement, Red-Headed League

### Community 1 - "Sherlock Holmes story cycle"
Cohesion: 0.33
Nodes (7): Irene Adler, Jabez Wilson, King of Bohemia, The Blue Carbuncle, The Red-Headed League, A Scandal in Bohemia, The Adventures of Sherlock Holmes

### Community 2 - "A Study in Scarlet cast and narration"
Cohesion: 0.4
Nodes (5): Enoch Drebber, Jefferson Hope, Young Stamford, Watson narrator role, A Study in Scarlet

### Community 3 - "Lauriston Gardens evidence chain"
Cohesion: 0.5
Nodes (4): Lauriston Gardens murders, Joseph Stangerson, Holmes blood-stain reagent, Wedding ring clue

### Community 4 - "Arsene Lupin and Sholmes rivalry"
Cohesion: 0.67
Nodes (4): Arsene Lupin, Herlock Sholmes, Sherlock Holmes Arrives Too Late, The Extraordinary Adventures of Arsene Lupin

### Community 5 - "La Provence arrest sequence"
Cohesion: 0.67
Nodes (3): Transatlantic Lupin arrest, Lupin arrest aboard La Provence, SS La Provence

### Community 6 - "Queen's Necklace affair"
Cohesion: 1
Nodes (2): Queen's Necklace affair, Queen's Necklace

### Community 7 - "Ganimard pursuit of Lupin"
Cohesion: 1
Nodes (2): Ganimard, The Arrest of Arsene Lupin

### Community 8 - "Lauriston Gardens revenge setting"
Cohesion: 1
Nodes (2): Jefferson Hope revenge, Lauriston Gardens

### Community 9 - "221B Baker Street home base"
Cohesion: 1
Nodes (1): 221B Baker Street

### Community 10 - "London setting"
Cohesion: 1
Nodes (1): London

## Knowledge Gaps
- **15 isolated node(s):** `The Blue Carbuncle`, `Queen's Necklace affair`, `Young Stamford`, `Jabez Wilson`, `John Clay` (+10 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Queen's Necklace affair`** (2 nodes): `Queen's Necklace affair`, `Queen's Necklace`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Ganimard pursuit of Lupin`** (2 nodes): `Ganimard`, `The Arrest of Arsene Lupin`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Lauriston Gardens revenge setting`** (2 nodes): `Jefferson Hope revenge`, `Lauriston Gardens`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `221B Baker Street home base`** (1 nodes): `221B Baker Street`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `London setting`** (1 nodes): `London`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Sherlock Holmes` connect `Holmes investigations and evidence` to `A Study in Scarlet cast and narration`, `Lauriston Gardens evidence chain`, `Sherlock Holmes story cycle`?**
  _High betweenness centrality (0.293) - this node is a cross-community bridge._
- **Why does `Lauriston Gardens murders` connect `Lauriston Gardens evidence chain` to `Holmes investigations and evidence`, `A Study in Scarlet cast and narration`, `Lauriston Gardens revenge setting`?**
  _High betweenness centrality (0.159) - this node is a cross-community bridge._
- **Why does `A Scandal in Bohemia` connect `Sherlock Holmes story cycle` to `Holmes investigations and evidence`?**
  _High betweenness centrality (0.156) - this node is a cross-community bridge._
- **What connects `The Blue Carbuncle`, `Queen's Necklace affair`, `Young Stamford` to the rest of the system?**
  _15 weakly-connected nodes found - possible documentation gaps or missing edges._