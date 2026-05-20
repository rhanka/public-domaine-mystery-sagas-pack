# Graph Report - .  (2026-05-20)

## Corpus Check
- cluster-only mode - file stats not available

## Summary
- 62 nodes · 118 edges · 9 communities detected
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output


## Graph Freshness
- Built from Git commit: `29dfff9`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `A Study in Scarlet` - 22 edges
2. `A Scandal in Bohemia` - 10 edges
3. `The Red-Headed League` - 9 edges
4. `The Arrest of Arsene Lupin` - 9 edges
5. `Lauriston Gardens murders` - 9 edges
6. `Sherlock Holmes` - 9 edges
7. `The Extraordinary Adventures of Arsene Lupin` - 8 edges
8. `Drebber and Stangerson murders` - 7 edges
9. `Red-Headed League bank plot` - 6 edges
10. `Transatlantic Lupin arrest` - 6 edges

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
Cohesion: 0.32
Nodes (12): Bohemia photograph case, Dr. John H. Watson, Irene Adler, King of Bohemia, Sherlock Holmes, Bohemia photograph leverage scheme, Fire alarm reveals the photograph hiding place, Wedding ring advertisement trap (+4 more)

### Community 1 - "Arsene Lupin anthology and rivalry"
Cohesion: 0.44
Nodes (10): Transatlantic Lupin arrest, Arsene Lupin, Ganimard, La Provence jewel theft, Bernard d'Andrezy persona, Lupin arrest aboard La Provence, Ganimard identifies Lupin on La Provence, SS La Provence (+2 more)

### Community 2 - "Bohemia case and Holmes cast"
Cohesion: 0.38
Nodes (10): Red-Headed League bank plot, Jabez Wilson, John Clay, Red-Headed League bank tunnel scheme, Jabez Wilson lured away from his shop, City bank cellar, Decoy encyclopedia-copying job, Red-Headed League advertisement (+2 more)

### Community 3 - "A Study in Scarlet framing and home base"
Cohesion: 0.36
Nodes (8): Maurice Leblanc, Queen's Necklace affair, Herlock Sholmes, Queen's Necklace theft, Queen's Necklace, Arsene Lupin saga, Sherlock Holmes Arrives Too Late, The Extraordinary Adventures of Arsene Lupin

### Community 4 - "Lauriston Gardens evidence chain"
Cohesion: 0.33
Nodes (7): Young Stamford, Wedding ring left at the murder scene, 221B Baker Street, London, Wedding ring clue, Watson narrator role, A Study in Scarlet

### Community 5 - "La Provence arrest sequence"
Cohesion: 0.47
Nodes (6): Lauriston Gardens murders, Jefferson Hope, Joseph Stangerson, Drebber and Stangerson murders, Holmes blood-stain reagent, Jefferson Hope revenge motive

### Community 6 - "Lauriston Gardens revenge setting"
Cohesion: 0.5
Nodes (4): Arthur Conan Doyle, Sherlock Holmes saga, The Blue Carbuncle, The Adventures of Sherlock Holmes

### Community 7 - "Community 7"
Cohesion: 0.67
Nodes (3): Enoch Drebber, Drebber found dead at Lauriston Gardens, Blood-stain reagent test

### Community 8 - "Community 8"
Cohesion: 1
Nodes (2): Jefferson Hope revenge, Lauriston Gardens

## Knowledge Gaps
- **7 isolated node(s):** `The Blue Carbuncle`, `Young Stamford`, `Watson narrator role`, `221B Baker Street`, `London` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 8`** (2 nodes): `Jefferson Hope revenge`, `Lauriston Gardens`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `A Study in Scarlet` connect `Lauriston Gardens evidence chain` to `Sherlock Holmes anthology and Red-Headed League`, `La Provence arrest sequence`, `Community 7`, `Lauriston Gardens revenge setting`, `Community 8`?**
  _High betweenness centrality (0.242) - this node is a cross-community bridge._
- **Why does `Sherlock Holmes` connect `Sherlock Holmes anthology and Red-Headed League` to `Lauriston Gardens evidence chain`, `La Provence arrest sequence`, `Bohemia case and Holmes cast`, `Community 7`?**
  _High betweenness centrality (0.213) - this node is a cross-community bridge._
- **Why does `A Scandal in Bohemia` connect `Sherlock Holmes anthology and Red-Headed League` to `Lauriston Gardens revenge setting`?**
  _High betweenness centrality (0.104) - this node is a cross-community bridge._
- **What connects `The Blue Carbuncle`, `Young Stamford`, `Watson narrator role` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._