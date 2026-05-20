# Graph Report - .  (2026-05-20)

## Corpus Check
- cluster-only mode - file stats not available

## Summary
- 85 nodes · 168 edges · 10 communities detected
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output


## Graph Freshness
- Built from Git commit: `d60d60b`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `A Study in Scarlet` - 26 edges
2. `The Red-Headed League` - 13 edges
3. `The Arrest of Arsene Lupin` - 12 edges
4. `Lauriston Gardens murders` - 12 edges
5. `A Scandal in Bohemia` - 11 edges
6. `Sherlock Holmes` - 10 edges
7. `The Extraordinary Adventures of Arsene Lupin` - 9 edges
8. `Red-Headed League bank plot` - 9 edges
9. `Arsene Lupin` - 9 edges
10. `Bohemia photograph case` - 8 edges

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
Cohesion: 0.22
Nodes (17): Red-Headed League bank plot, Duncan Ross, Jabez Wilson, John Clay, Mr. Merryweather (City and Suburban Bank), Inspector Peter Jones, Vincent Spaulding alias, Red-Headed League bank tunnel scheme (+9 more)

### Community 1 - "Arsene Lupin anthology and rivalry"
Cohesion: 0.26
Nodes (16): Bohemia photograph case, Dr. John H. Watson, Godfrey Norton, Irene Adler, King of Bohemia, King of Bohemia, Sherlock Holmes, Bohemia photograph leverage scheme (+8 more)

### Community 2 - "Bohemia case and Holmes cast"
Cohesion: 0.37
Nodes (13): Transatlantic Lupin arrest, Arsene Lupin, Ganimard, La Provence jewel theft, Bernard d'Andrezy persona, Rozaine traveler persona, Lupin arrest aboard La Provence, Ganimard's telegram identifying Lupin (+5 more)

### Community 3 - "A Study in Scarlet framing and home base"
Cohesion: 0.33
Nodes (9): Maurice Leblanc, Queen's Necklace affair, Herlock Sholmes, Queen's Necklace theft, Queen's Necklace, Queen Marie-Antoinette's diamond necklace, Arsene Lupin saga, Sherlock Holmes Arrives Too Late (+1 more)

### Community 4 - "Lauriston Gardens evidence chain"
Cohesion: 0.33
Nodes (7): Young Stamford, Wedding ring left at the murder scene, 221B Baker Street, London, Wedding ring clue, Watson narrator role, A Study in Scarlet

### Community 5 - "La Provence arrest sequence"
Cohesion: 0.5
Nodes (5): Lauriston Gardens murders, Constable John Rance, Inspector Lestrade, Inspector Tobias Gregson, Holmes blood-stain reagent

### Community 6 - "Lauriston Gardens revenge setting"
Cohesion: 0.4
Nodes (5): Jefferson Hope, John Ferrier, Lucy Ferrier, Salt Lake Valley (Hope backstory), Jefferson Hope revenge motive

### Community 7 - "Community 7"
Cohesion: 0.6
Nodes (5): Jefferson Hope revenge, Cab and boot footprints at Lauriston Gardens, Drebber found dead at Lauriston Gardens, Lauriston Gardens, RACHE bloodstain marking

### Community 8 - "Community 8"
Cohesion: 0.5
Nodes (4): Arthur Conan Doyle, Sherlock Holmes saga, The Blue Carbuncle, The Adventures of Sherlock Holmes

### Community 9 - "Community 9"
Cohesion: 0.5
Nodes (4): Enoch Drebber, Joseph Stangerson, Drebber and Stangerson murders, Twin pillbox poison case

## Knowledge Gaps
- **13 isolated node(s):** `The Blue Carbuncle`, `Young Stamford`, `Watson narrator role`, `221B Baker Street`, `London` (+8 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `A Study in Scarlet` connect `Lauriston Gardens evidence chain` to `Arsene Lupin anthology and rivalry`, `Lauriston Gardens revenge setting`, `Community 9`, `Community 8`, `La Provence arrest sequence`, `Community 7`?**
  _High betweenness centrality (0.261) - this node is a cross-community bridge._
- **Why does `Sherlock Holmes` connect `Arsene Lupin anthology and rivalry` to `Lauriston Gardens evidence chain`, `La Provence arrest sequence`, `Sherlock Holmes anthology and Red-Headed League`?**
  _High betweenness centrality (0.253) - this node is a cross-community bridge._
- **Why does `Red-Headed League bank plot` connect `Sherlock Holmes anthology and Red-Headed League` to `Arsene Lupin anthology and rivalry`?**
  _High betweenness centrality (0.153) - this node is a cross-community bridge._
- **What connects `The Blue Carbuncle`, `Young Stamford`, `Watson narrator role` to the rest of the system?**
  _13 weakly-connected nodes found - possible documentation gaps or missing edges._