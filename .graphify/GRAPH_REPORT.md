# Graph Report - .  (2026-06-07)

## Corpus Check
- Large corpus: 32 files · ~1,748,252 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 1193 nodes · 1749 edges · 141 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output
- Edge kinds: appears_in: 376 · part_of: 232 · used_in: 117 · involves: 114 · uses_method: 107 · occurs_at: 105 · commits: 100 · establishes_fact: 75 · investigates: 73 · motivates: 59 · targets: 57 · assists: 52 · located_in: 51 · opposes: 42 · mentions: 37 · contains_evidence: 33 · written_by: 26 · belongs_to_saga: 25 · narrates: 24 · alias_of: 13 · suspected_of: 13 · disguises_as: 12 · same_as: 4 · translated_by: 2


## Input Scope
- Requested: all
- Resolved: all (source: cli)
- Included files: 32 · Candidates: recursive
- Excluded: 0 untracked · 0 ignored · 0 sensitive · 0 missing committed

## Graph Freshness
- Built from Git commit: `9394444`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `Sherlock Holmes` - 104 edges
2. `A. J. Raffles` - 80 edges
3. `Arsene Lupin` - 72 edges
4. `Dr. John Thorndyke` - 68 edges
5. `Father Brown` - 35 edges
6. `A Study in Scarlet` - 26 edges
7. `The Valley of Fear` - 24 edges
8. `Dr. John H. Watson` - 23 edges
9. `The Sign of the Four` - 23 edges
10. `The Blonde Lady` - 20 edges

## Surprising Connections (you probably didn't know these)
- `Trap to catch a cracksman (Maguire's man-trap)` --involves--> `A. J. Raffles`  [EXTRACTED]
  corpus/raffles/a-thief-in-the-night/text.txt → corpus/raffles/the-amateur-cracksman/text.txt
- `Alice Demun` --assists--> `Arsene Lupin`  [EXTRACTED]
  corpus/arsene-lupin/the-blonde-lady/text.txt → corpus/arsene-lupin/the-extraordinary-adventures-of-arsene-lupin-gentleman-burglar/text.txt
- `Arsene Lupin` --commits--> `Gothic chapel sculptures theft`  [EXTRACTED]
  corpus/arsene-lupin/the-extraordinary-adventures-of-arsene-lupin-gentleman-burglar/text.txt → corpus/arsene-lupin/the-hollow-needle/text.txt
- `Arsene Lupin` --commits--> `Rubens paintings substitution scheme`  [EXTRACTED]
  corpus/arsene-lupin/the-extraordinary-adventures-of-arsene-lupin-gentleman-burglar/text.txt → corpus/arsene-lupin/the-hollow-needle/text.txt
- `Duke of Charmerace persona` --alias_of--> `Arsene Lupin`  [EXTRACTED]
  corpus/arsene-lupin/arsene-lupin/text.txt → corpus/arsene-lupin/the-extraordinary-adventures-of-arsene-lupin-gentleman-burglar/text.txt

## Communities

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (52): John McMurdo alias, Steve Wilson alias, Birlstone Manor murder, Birdy Edwards, Boss McGinty, Brother Morris, Captain Marvin, Cecil Barker (+44 more)

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (47): Sholto treasure case, Abdullah Khan, Achmet the Merchant, Athelney Jones, Bartholomew Sholto, Captain Arthur Morstan, Dost Akbar, Jonathan Small (+39 more)

### Community 2 - "Community 2"
Cohesion: 0.05
Nodes (45): Aloysius Garcia, Beppo, Giuseppe Gorgiano, Arthur Cadogan West, Charles Augustus Milverton, Colonel Valentine Walter, Don Juan Murillo (Henderson), Emilia Lucca (+37 more)

### Community 3 - "Community 3"
Cohesion: 0.05
Nodes (42): Blanched Soldier / Godfrey Emsworth case, Cardboard Box severed ears mystery, Creeping Man / Professor Presbury case, Park Lane Mystery / Ronald Adair murder, Illustrious Client case (Baron Gruner), Disappearance of Lady Frances Carfax, Mazarin Stone theft case, Moriarty criminal organisation investigation (+34 more)

### Community 4 - "Community 4"
Cohesion: 0.07
Nodes (39): Crystal stopper case, Clarisse Mergy, Daubrecq, Gilbert, The Growler, Langeroux, Léonard, Marquis d'Albufex (+31 more)

### Community 5 - "Community 5"
Cohesion: 0.08
Nodes (37): John Bellingham disappearance, Arthur Jellicoe, Dr. Norbury, George Hurst, Godfrey Bellingham, Inspector Badger, John Bellingham, Mr. Marchmont (+29 more)

### Community 6 - "Community 6"
Cohesion: 0.07
Nodes (36): Burroughs and Burroughs letter theft, Dan Levy emeralds affair, Garland debt rescue, Camilla Belsize, Dan Levy, The foreign assassin, Lady Laura Belsize, Mackenzie (+28 more)

### Community 7 - "Community 7"
Cohesion: 0.07
Nodes (34): Achille, Arsene Lupin, Duke of Charmerace (real, deceased), Chief-Inspector Guerchard, Raymonde de Saint-Véran, Duke of Charmerace identity usurpation scheme, Abduction of Raymonde de Saint-Véran, Lupin's sniper shots at the scaffold (+26 more)

### Community 8 - "Community 8"
Cohesion: 0.07
Nodes (34): A. J. Raffles, Dr. Theobald, Jacques Saillard, Duplicate cigarette-box jewel swindle, Thames Valley bicycle burglaries, Mr. Maturin (invalid persona), Raffles as well-known military man at bank, Raffles torpedo-beard canoeist disguise (+26 more)

### Community 9 - "Community 9"
Cohesion: 0.09
Nodes (31): Isaac Löwe Japanese art robbery, Moabite cipher / Piccadilly jewel theft, Oscar Brodski murder investigation, Dr. John Thorndyke, Futashima (Japanese burglar), Professor Poppelbaum, Brodski's broken spectacle lenses with planted extra glass fragments, Tablecloth fibres (red wool, blue cotton, yellow jute) linking murder house to Brodski's teeth and iron bar (+23 more)

### Community 10 - "Community 10"
Cohesion: 0.09
Nodes (27): Maurice Leblanc, The Jewish Lamp theft, Alice Demun, Baron d'Hautrec, The Blonde Lady, Clotilde Destange, Herlock Sholmes, Lucien Destange (+19 more)

### Community 11 - "Community 11"
Cohesion: 0.09
Nodes (27): Hollow Needle secret, Brédoux, Dr. Delattre, Ephraim B. Harlington, Isidore Beautrelet, Louis Valméras, M. Filleul, M. Massiban (+19 more)

### Community 12 - "Community 12"
Cohesion: 0.08
Nodes (27): Colonel James Barclay, Effie Munro, Grant Munro, Hall Pycroft, Henry Wood, Jim Browner, Mr. Melas, Mycroft Holmes (+19 more)

### Community 13 - "Community 13"
Cohesion: 0.12
Nodes (26): Arthur Conan Doyle, Dr. Leslie Armstrong, Dr. John H. Watson, Godfrey Staunton, Grace Dunbar, Maria Gibson, Neil Gibson, Trevor Bennett (+18 more)

### Community 14 - "Community 14"
Cohesion: 0.17
Nodes (24): Lauriston Gardens murders, Enoch Drebber, Jefferson Hope, John Ferrier, Constable John Rance, Joseph Stangerson, Lucy Ferrier, Young Stamford (+16 more)

### Community 15 - "Community 15"
Cohesion: 0.11
Nodes (22): The Absence of Mr Glass, Mandeville murder / Actor and the Alibi case, Marne duel-and-fraud case, Carstairs Collection theft and blackmail, Harrogate embezzlement and staged kidnapping, Vaudrey disappearance and murder case, Dr Orion Hood, Father Brown (+14 more)

### Community 16 - "Community 16"
Cohesion: 0.10
Nodes (22): Charmerace identity scheme investigation, M. Charolais, M. Formery, Germaine Gournay-Martin, M. Gournay-Martin, Sonia Kritchnoff, Gournay-Martin Paris house burglary, Sonia's repeated petty thefts from the Gournay-Martins (+14 more)

### Community 17 - "Community 17"
Cohesion: 0.12
Nodes (19): Admiral Pendragon, Colonel Cray, Colonel Dubosc, Dr Paul Hirsch, Flambeau, Pendragon tower arson to fake curse, Dubosc disguised as Dr Hirsch, Flambeau's castle in Spain (+11 more)

### Community 18 - "Community 18"
Cohesion: 0.12
Nodes (17): Lion's Mane / McPherson death case, Colonel Emsworth, Fitzroy McPherson, Godfrey Emsworth, Harold Stackhurst, Ian Murdoch, James M. Dodd, Maud Bellamy (+9 more)

### Community 19 - "Community 19"
Cohesion: 0.22
Nodes (17): Red-Headed League bank plot, Duncan Ross, Jabez Wilson, John Clay, Mr. Merryweather (City and Suburban Bank), Inspector Peter Jones, Vincent Spaulding alias, Red-Headed League bank tunnel scheme (+9 more)

### Community 20 - "Community 20"
Cohesion: 0.20
Nodes (15): E. W. Hornung, The Ides of March, Bunny Manders, Raffles jewellery theft, Bunny served prison time (18 months) before this collection opens, Raffles recognised as greatest burglar of his age, Albany chambers, False insurance detective impersonation (+7 more)

### Community 21 - "Community 21"
Cohesion: 0.14
Nodes (15): Chloroform attack on Mrs. Chater at Willowdale, Augustus Bailey (alias Captain Rowland / Mr. Harrington-Baillie), Mr. Boscovitch, Dr. Christopher Jervis, Mrs. Jehu B. Chater, Oscar Brodski, Silas Hickler, Superintendent Miller (+7 more)

### Community 22 - "Community 22"
Cohesion: 0.16
Nodes (14): G. K. Chesterton, Grandison Chace, Mrs. Mandeville, Tommy Hunter, Tommy Hunter steals Red Moon ruby using painted hand, Mrs. Mandeville murders husband via trap-door alibi, Criminal empathy / inside-the-murderer method, Grandison Chace as framing interlocutor (+6 more)

### Community 23 - "Community 23"
Cohesion: 0.18
Nodes (13): Disappearance (death) of James Brown at the Girdler lighthouse, Amos Todd (alias James Brown), Captain Grumpass, Polton, Tom Jeffreys (alias Jeffrey Rorke), Jeffreys kills Amos Todd at the Girdler lighthouse and sinks the boat, Pipe from lighthouse rack containing shag tobacco and mole hairs identifying Brown, Girdler Sand screw-pile lighthouse (+5 more)

### Community 24 - "Community 24"
Cohesion: 0.19
Nodes (13): Murder of ex-warder Pratt, General O'Gorman, Jack Ellis, Ex-Warder Pratt, Rufus Pembury (alias Francis Dobbs), Pembury's premeditated murder of blackmailer Pratt using musk-scented knife to frame Ellis, Bloody hand-prints on oak bough showing short man with both forefingers intact, Musk-scented Norwegian knife, brush-case and crucible-tongs from hornbeam tree (+5 more)

### Community 25 - "Community 25"
Cohesion: 0.26
Nodes (12): R. Austin Freeman, Red thumb-mark case, Dr. Jervis, Reuben Hornby, Red thumb-mark forgery, Bloody thumb print, Fingerprint comparison, Laboratory reconstruction (+4 more)

### Community 26 - "Community 26"
Cohesion: 0.36
Nodes (12): Bohemia photograph case, Godfrey Norton, Irene Adler, King of Bohemia, King of Bohemia, Bohemia photograph leverage scheme, Fire alarm reveals the photograph hiding place, Briony Lodge, St. John's Wood (+4 more)

### Community 27 - "Community 27"
Cohesion: 0.33
Nodes (12): Transatlantic Lupin arrest, Ganimard, La Provence jewel theft, Bernard d'Andrezy persona, Rozaine traveler persona, Lupin arrest aboard La Provence, Ganimard's telegram identifying Lupin, Ganimard identifies Lupin on La Provence (+4 more)

### Community 28 - "Community 28"
Cohesion: 0.21
Nodes (12): Count Corbucci, Faustina, Stefano, Camorra revenge trap (Corbucci's clock-pistol), Raffles's vengeance for Faustina (killing of Stefano), Corbucci's vineyard near Bay of Naples, Corbucci's Camorra vendetta against Raffles, Grandfather clock with concealed revolver mechanism (Corbucci's revenge device) (+4 more)

### Community 29 - "Community 29"
Cohesion: 0.20
Nodes (12): Crawshay, Inspector Druce, Silver chest bank strong-room scheme, Scotland Yard Black Museum Raffles Relics theft, Raffles volunteers for Boer War and dies, Raffles Relics displayed in Scotland Yard Black Museum, City and Suburban Bank, Sloane Street, Scotland Yard Black Museum (+4 more)

### Community 30 - "Community 30"
Cohesion: 0.18
Nodes (11): Minna Adler murder, Paul Petrofsky, Paul Petrofsky's murder of Minna Adler, Deep-sea Foraminifera sand on pillow, Shed hair tress planted in dead woman's hand, Planted shed hair in Minna Adler's hand (combings, not torn from murderer), Whitechapel / Aldgate (scene of Minna Adler murder), Microscopic identification of deep-sea Foraminifera sand (+3 more)

### Community 31 - "Community 31"
Cohesion: 0.20
Nodes (11): Gwynne murder / Mirror of the Magistrate case, James Bagshaw, Osric Orm, Sir Arthur Travers, Sir Humphrey Gwynne, Murder of Justice Gwynne via mirror confusion, Murderer shot at his own reflection, not Gwynne, Justice Gwynne's illuminated garden (+3 more)

### Community 32 - "Community 32"
Cohesion: 0.18
Nodes (11): Anna (Wife of Professor Coram), Captain Jack Crocker, Lady Brackenstall (Mary Fraser), Patrick Cairns, Captain Peter Carey, Professor Coram (Sergius), Inspector Stanley Hopkins, Golden Pince-Nez (+3 more)

### Community 33 - "Community 33"
Cohesion: 0.20
Nodes (10): The Cornish Horror (Devil's Foot poisoning), Dr. Leon Sterndale, Mortimer Tregennis, Devil's Foot root poisoning (Tregennis siblings), Devil's Foot ash residue on lamp shield, Gravel on Tregennis window sill, Poldhu Bay, Cornwall, Tregennis greed (sole guardian of family property) (+2 more)

### Community 34 - "Community 34"
Cohesion: 0.22
Nodes (10): Silver Blaze disappearance and trainer murder, Colonel Ross, Fitzroy Simpson, John Straker, Straker's plot to maim Silver Blaze, Dartmoor / King's Pyland stables, The curious incident of the dog in the night-time, Straker's financial debt from secret mistress (+2 more)

### Community 35 - "Community 35"
Cohesion: 0.28
Nodes (9): Camberwell murder of Caldwell, Frank Belfield, Joseph Woodthorpe, Woodthorpe murders Caldwell and forges Belfield's finger-prints to frame him, Handkerchief stained with camel's blood linking Woodthorpe to Caldwell murder, Forged finger-print stamps made from Belfield's official prison form, Microscopic blood corpuscle measurement to identify animal species, Detection of forged finger-prints via thumb-plane impossibility and scar comparison (+1 more)

### Community 36 - "Community 36"
Cohesion: 0.22
Nodes (9): Edith Grant death investigation, Harold Stopford (painter), Edith Grant killed by steer horn projecting from cattle truck, not by Harold Stopford, Woldhurst (branch line, Kent), Fingerprint powder (insufflator) development, Thorndyke laboratory method, Blue sequin from victim's hat, Steer's left horn bearing brain tissue, blood, and sequin (+1 more)

### Community 37 - "Community 37"
Cohesion: 0.22
Nodes (9): Alfred Hartridge murder, Leonard Wolfe (alias Thomas Barlow), Leonard Wolfe remote-rifle murder of Hartridge, Metal washer bearing rifling marks (dagger rifle), Inner Temple (Thorndyke's chambers), Ballistic analysis of dagger fired from Chassepôt rifle, Inheritance of Hartridge estate (Wolfe), Aluminium-hilted dagger (TRADITORE inscription) (+1 more)

### Community 38 - "Community 38"
Cohesion: 0.28
Nodes (9): Captain Bellingham, Corporal Connal, Corporal Connal's horse sabotage for Boers, Raffles and Bunny enlist in irregular horse for the Boer War, Bunny wounded in the leg on the veldt, Death of Raffles on the South African veldt, South Africa / Boer War veldt, Raffles's patriotic motive (Boer War enlistment) (+1 more)

### Community 39 - "Community 39"
Cohesion: 0.22
Nodes (9): British Museum gold cup theft (Jubilee gift), Carlsbad emerald necklace theft, Raffles and Bunny flee to the Continent, Raffles was romantically attached to Camilla but stepped aside for Teddy, The Room of Gold, British Museum, Carlsbad, Raffles sporting theft motive, Gold Cup from the Room of Gold (Jubilee present to Queen Victoria) (+1 more)

### Community 40 - "Community 40"
Cohesion: 0.28
Nodes (9): X-ray identification of John Bellingham in Sebek-hotep mummy, Gold and tin dental fillings identified in mummy X-ray matching Bellingham's dentist records, Tattooed Eye of Osiris in vermilion on Bellingham's chest, Old Pott's fracture of left ankle (John Bellingham), Silver suture wires in both kneecaps (surgical repair by Sir Morgan Bennet), British Museum, Bloomsbury (Egyptian Department, containing Sebek-hotep mummy), Mummy of Sebek-hotep (containing Bellingham's body), Tomb furniture of Sebek-hotep (Canopic jars, Ushabti figures, chair, ink-palette) (+1 more)

### Community 41 - "Community 41"
Cohesion: 0.39
Nodes (8): Baskerville curse investigation, Jack Stapleton, Sir Henry Baskerville, Baskerville hound plot, Phosphorus-painted hound, Baskerville Hall, Grimpen Mire, The Hound of the Baskervilles

### Community 42 - "Community 42"
Cohesion: 0.25
Nodes (8): Charles Hearn murder investigation, Alfred Draper (Ted), Arthur Jezzard, Jezzard gang's staged murder of Hearn to frame Draper, Morphia poison in Hearn's stomach, Silencing potential witness / informant (Jezzard gang vs Hearn), Nailed shoes (diamond-and-cross pattern), The Man with the Nailed Shoes

### Community 43 - "Community 43"
Cohesion: 0.29
Nodes (8): Baron Adelbert Gruner, Kitty Winter, Shinwell Johnson, Sir James Damery, Violet de Merville, Vitriol attack on Baron Gruner, Gruner's scheme to protect advantageous marriage, The Adventure of the Illustrious Client

### Community 44 - "Community 44"
Cohesion: 0.29
Nodes (7): The Blonde Lady Duel of Wits, Real blue diamond hidden in Lupin's cane, File M.B. in Destange's cupboard, Garnets from Clotilde's brooch, Diamond found at Chateau de Crozon is imitation, Lupin's second arrest (then escape), Yacht Hirondelle

### Community 45 - "Community 45"
Cohesion: 0.33
Nodes (7): Kidnapping of Dan Levy, Levy signs mortgage deed in tower, Empty tower house on the Thames, Raffles altruistic revenge against Levy, Camilla's enamel coat button, Levy's plated revolver, Garland mortgage indenture deed

### Community 46 - "Community 46"
Cohesion: 0.33
Nodes (7): Trap to catch a cracksman (Maguire's man-trap), Barney Maguire, Barney Maguire trophies theft (drugged whiskey trap), Half-moon Street (Maguire's house), Hocussed whiskey decanter (Maguire's drug trap), Maguire's trophies (Nevada belt, gold brick, silver statuette), A Trap to Catch a Cracksman

### Community 47 - "Community 47"
Cohesion: 0.33
Nodes (7): Baron Von Herling, Martha (Holmes's spy-housekeeper), Von Bork, Wartime spy plot, British Naval Signals codebook, Von Bork's German spy network in England, His Last Bow: The War Service of Sherlock Holmes

### Community 48 - "Community 48"
Cohesion: 0.33
Nodes (7): Richard Brunton, Reginald Musgrave, Musgrave family ritual document, Hurlstone Manor, Sussex, Geometric decoding of the Musgrave Ritual, Crown of King Charles I, The Musgrave Ritual

### Community 49 - "Community 49"
Cohesion: 0.29
Nodes (7): Comte de Gesvres, Jean Daval, Ambrumésy burglary and murder of Jean Daval, Gothic chapel sculptures theft, Rubens paintings substitution scheme, Château d'Ambrumésy, Jean Daval's greed / love affair motive

### Community 50 - "Community 50"
Cohesion: 0.29
Nodes (7): Isadora Klein, Mary Maberley, Steve Dixie, Three Gables burglary (manuscript theft), Douglas Maberley's manuscript (roman à clef), Isadora Klein's motive to suppress manuscript, The Adventure of the Three Gables

### Community 51 - "Community 51"
Cohesion: 0.29
Nodes (7): Lady Beatrice Falder, Sir Robert Norberton, Shoscombe Old Place corpse concealment scheme, Shoscombe Old Place, Microscopic evidence analysis, Shoscombe Prince (racehorse), The Adventure of Shoscombe Old Place

### Community 52 - "Community 52"
Cohesion: 0.33
Nodes (6): Murder of Aurora Rome, Aurora Rome, Sliding looking-glass panel in theatre passage, Apollo Theatre passage, Adelphi, Mirror reflection as alibi-breaking deduction, The Man in the Passage

### Community 53 - "Community 53"
Cohesion: 0.53
Nodes (6): The Blue Cross, Aristide Valentin, Blue Cross theft plot, Priestly moral inference, Blue Cross relic, The Innocence of Father Brown

### Community 54 - "Community 54"
Cohesion: 0.33
Nodes (6): Fred Calverley suicide / Mandarin's Pearl conspiracy, Captain Raggerton, Fred Calverley, Alfred Calverley and Raggerton conspiracy to drive Fred Calverley to suicide, Mandarin's Pearl (ebony pendant with pear-shaped pearl), The Mandarin's Pearl

### Community 55 - "Community 55"
Cohesion: 0.60
Nodes (6): Queen's Necklace affair, Queen's Necklace theft, Queen's Necklace, Queen Marie-Antoinette's diamond necklace, Arsene Lupin saga, The Extraordinary Adventures of Arsene Lupin

### Community 56 - "Community 56"
Cohesion: 0.40
Nodes (6): Arthur Carstairs, Christabel Carstairs, Arthur Carstairs blackmails siblings in disguise, Arthur Carstairs disguised as crooked-nosed blackmailer, Wounded pride and resentment of unjust will, The Head of Caesar

### Community 57 - "Community 57"
Cohesion: 0.33
Nodes (6): Hector Carruthers (Lord Lochmaben), Lady Lochmaben, Bunny's Beloved (unnamed), Palace Gardens burglary (Lochmaben diamonds), Palace Gardens, Kensington, Out of Paradise

### Community 58 - "Community 58"
Cohesion: 0.40
Nodes (6): Hugo Romaine, Marquis of Marne (Maurice Mair), Maurice Mair fakes death then shoots James Mair, Castle of Marne, Maurice Mair's jealousy of James's engagement, The Chief Mourner of Marne

### Community 59 - "Community 59"
Cohesion: 0.40
Nodes (6): Lord Thornaby, Thornaby House robes burglary during Criminologists' dinner, Thornaby House, Park Lane, Lord Thornaby's peer's robes and coronet, The Criminologists' Club, The Criminologists' Club

### Community 60 - "Community 60"
Cohesion: 0.40
Nodes (5): Freddy Haldean abduction, Percy Haldean, Percy Haldean abduction of Freddy for inheritance, Microscopic analysis of hair and dust, The Stranger's Latchkey

### Community 61 - "Community 61"
Cohesion: 0.40
Nodes (5): Hirsch forged spy document affair, Forged spy note with systematically wrong details, Dubosc and Hirsch are the same person, Inversion of misleading evidence, Noiseless explosive formula (Hirsch)

### Community 62 - "Community 62"
Cohesion: 0.40
Nodes (5): Goldfish theft / Song of the Flying Fish case, Jameson (head clerk), Boyle heard Jameson open the door (not bar it): the Arab was Jameson, Golden fish bowl (Peregrine Smart's), The Song of the Flying Fish

### Community 63 - "Community 63"
Cohesion: 0.40
Nodes (5): Von Bork German espionage operation, Von Bork's spy dossiers, Von Bork's country house (east coast, near Harwich), Patriotism / war service (Holmes's motivation in His Last Bow), Practical Handbook of Bee Culture (Holmes's decoy book)

### Community 64 - "Community 64"
Cohesion: 0.40
Nodes (5): Abe Slaney, Elsie Cubitt (née Patrick), Hilton Cubitt, Dancing Men Cipher, The Adventure of the Dancing Men

### Community 65 - "Community 65"
Cohesion: 0.50
Nodes (5): Colonel Crutchley, Campden Hill house occupation (Rest Cure), Raffles's vagrant / shabby-beard disguise, Campden Hill house (Colonel Crutchley's residence), The Rest Cure

### Community 66 - "Community 66"
Cohesion: 0.40
Nodes (5): Count Negretto Sylvius, Lord Cantlemere, Sam Merton, Crown diamond (Mazarin Stone) theft, The Adventure of the Mazarin Stone

### Community 67 - "Community 67"
Cohesion: 0.40
Nodes (5): Dr. Ray Ernest, Josiah Amberley, Amberley gas-chamber double murder, The Haven, Lewisham (Amberley's house), Amberley's jealousy and miser's revenge

### Community 68 - "Community 68"
Cohesion: 0.50
Nodes (5): Eugenia Ronder, Leonardo the strongman, Ronder murder / lion-paw club scheme, Prussic acid bottle (Eugenia Ronder's temptation), The Adventure of the Veiled Lodger

### Community 69 - "Community 69"
Cohesion: 0.40
Nodes (5): Greywood Usher, Pilgrim's Pond, Ireton Todd's estate, Critique of psychometric machine (lie-detector), Psychometric machine (pulsometer), The Mistake of the Machine

### Community 70 - "Community 70"
Cohesion: 0.50
Nodes (5): Mr. Guillemard, Guillemard country house burglary (old Bunny home), Raffles's riding-suit disguise (Guillemard escape), Guillemard jewels (diamond tiara, emerald necklace), The Spoils of Sacrilege

### Community 71 - "Community 71"
Cohesion: 0.40
Nodes (5): Jack Ferguson, Mrs. Ferguson (Peruvian wife), Robert Ferguson, Curare-tipped arrows (Sussex Vampire), The Adventure of the Sussex Vampire

### Community 72 - "Community 72"
Cohesion: 0.40
Nodes (5): Captain James Musgrave, Captain Musgrave kills father and impersonates him, Musgrave Moss castle (Northumberland), Captain Musgrave kills father to secure estate and post obit, The Worst Crime in the World

### Community 73 - "Community 73"
Cohesion: 0.40
Nodes (5): Killer Evans, Nathan Garrideb, Three Garridebs counterfeit press scheme, Prescott's counterfeiting press and forged notes, The Adventure of the Three Garridebs

### Community 74 - "Community 74"
Cohesion: 0.50
Nodes (5): Ezza Montano (King of Thieves), Samuel Harrogate, Hull and Huddersfield Bank embezzlement with staged kidnapping, Concealment of financial ruin and embezzlement, The Paradise of Thieves

### Community 75 - "Community 75"
Cohesion: 0.40
Nodes (5): Theft of the Lamballe coronet, Coronet substitution under Gournay-Martin's eyes, Coronet of the Princesse de Lamballe, Fake coronet (imitation substituted by Lupin), Lupin's telegram about the coronet

### Community 76 - "Community 76"
Cohesion: 0.40
Nodes (5): Absence of adipocere proving dry-atmosphere decay (mummy bones, not fresh remains), Ring and mummy finger-bones found in well at Woodford house, Snails' eggs and worm-tubes on bones showing submersion position and separate hand, Scattered bones are parts of Sebek-hotep mummy, not Bellingham, Systematic skeletal examination (measurements, eburnation, adipocere, submersion marks)

### Community 77 - "Community 77"
Cohesion: 0.50
Nodes (4): Bruce-Partington Plans theft, Cadogan West's body on train roof, Pierrot Daily Telegraph agony-column messages, Woolwich Arsenal

### Community 78 - "Community 78"
Cohesion: 0.50
Nodes (4): Culverton Smith murder plot, Culverton Smith, Poisoned ivory spring-box, The Adventure of the Dying Detective

### Community 79 - "Community 79"
Cohesion: 0.50
Nodes (4): Michael Moonshine / Man with Two Beards case, Two different false beards on Michael Moonshine, Moonshine was genuinely reformed and was Father Brown's penitent, Moonshine's two beards (old and planted)

### Community 80 - "Community 80"
Cohesion: 0.50
Nodes (4): Red Moon of Meru ruby theft case, Hunter's hand painted brown (he refused palmist to hide it), Mallowood Abbey (Lady Mounteagle's estate), Red Moon of Meru (great ruby)

### Community 81 - "Community 81"
Cohesion: 0.50
Nodes (4): M. Gerbois, Lottery ticket extortion scheme, Lottery ticket No. 514 Series 23, Napoleon writing-desk

### Community 82 - "Community 82"
Cohesion: 0.67
Nodes (4): John Bankes, Michael Moonshine, Bankes uses Moonshine's corpse as stage property, The Man with Two Beards

### Community 83 - "Community 83"
Cohesion: 0.67
Nodes (4): John Dalmon, Dalmon cuts Vaudrey's throat in barber chair, Vaudrey's revenge: forcing Sybil to marry a murderer, The Vanishing of Vaudrey

### Community 84 - "Community 84"
Cohesion: 0.67
Nodes (4): Lord Ernest Belville, Lord Ernest Belville's society burglaries, Lord Belville's hollow Indian clubs (jewel hiding-place), To Catch a Thief

### Community 85 - "Community 85"
Cohesion: 0.67
Nodes (4): Nipper Nasmyth, Nasmyth's bank robbery (Founder's Fund), Raffles's private justice / redistribution motive, The Field of Phillipi

### Community 86 - "Community 86"
Cohesion: 0.50
Nodes (4): Professor Presbury, Professor Presbury langur serum self-experiment, Professor Presbury's rejuvenation motive, Lowenstein's langur serum

### Community 87 - "Community 87"
Cohesion: 0.50
Nodes (4): Young Medlicott, East Molesey wedding-present burglary, East Molesey / banks of the Mole, A Bad Night

### Community 88 - "Community 88"
Cohesion: 0.50
Nodes (4): Death certificate of the real Duke of Charmerace, Gold-tipped Mercedes cigarette (linking Lupin to burglary escape), Pink salvias from Charmerace (linking burglars to château), Lupin IS the Duke of Charmerace (true identity revealed)

### Community 89 - "Community 89"
Cohesion: 0.67
Nodes (3): Thor Bridge mystery (Maria Gibson death), Chipped parapet at Thor Bridge, Thor Bridge

### Community 90 - "Community 90"
Cohesion: 0.67
Nodes (3): Wisteria Lodge / Oxshott murder (Garcia case), Coded note to Garcia ('Our own colours, green and white'), Wisteria Lodge, near Esher, Surrey

### Community 91 - "Community 91"
Cohesion: 0.67
Nodes (3): Musgrave patricide / Worst Crime in the World case, Young Musgrave exposed by his ability to jump the moat (an old man cannot), Missing suit of armour (Musgrave castle)

### Community 92 - "Community 92"
Cohesion: 0.67
Nodes (3): Duke of Holdernesse, James Wilder, The Adventure of the Priory School

### Community 93 - "Community 93"
Cohesion: 0.67
Nodes (3): Jack Woodley, Miss Violet Smith, The Adventure of the Solitary Cyclist

### Community 94 - "Community 94"
Cohesion: 0.67
Nodes (3): Holmes and Moriarty at Reichenbach Falls, Reichenbach Falls, Switzerland, Moriarty's revenge against Holmes for exposing his network

### Community 95 - "Community 95"
Cohesion: 0.67
Nodes (3): Cross of Lorraine watermark, Crystal stopper model (decoy), The list found in the tobacco packet was a forgery

### Community 96 - "Community 96"
Cohesion: 1.00
Nodes (2): Daubrecq's letter fragment about hollowing crystal, Daubrecq stole the list from dying Germineaux

### Community 97 - "Community 97"
Cohesion: 1.00
Nodes (2): Levy's signed confession receipt, Dan Levy murdered by foreign creditor, not Raffles

### Community 98 - "Community 98"
Cohesion: 1.00
Nodes (2): Teddy's promissory note and instalment receipts, Teddy Garland borrowed £300 from Levy, now owes £700

### Community 99 - "Community 99"
Cohesion: 1.00
Nodes (2): Blue chalk in Victoire's pocket (accomplice proof), Victoire is Lupin's accomplice (blue chalk, wrote signatures)

### Community 100 - "Community 100"
Cohesion: 1.00
Nodes (1): Bernard Charolais

### Community 101 - "Community 101"
Cohesion: 1.00
Nodes (1): Clémence

### Community 102 - "Community 102"
Cohesion: 1.00
Nodes (1): Irma

### Community 103 - "Community 103"
Cohesion: 1.00
Nodes (1): Jacques Mergy

### Community 104 - "Community 104"
Cohesion: 1.00
Nodes (1): Stanislas Vorenglade

### Community 105 - "Community 105"
Cohesion: 1.00
Nodes (1): Theft of the naval treaty document

### Community 106 - "Community 106"
Cohesion: 1.00
Nodes (1): Arrest of Gilbert and Vaucheray

### Community 107 - "Community 107"
Cohesion: 1.00
Nodes (1): Daubrecq's suicide at Gare du Nord

### Community 108 - "Community 108"
Cohesion: 1.00
Nodes (1): Gilbert's escape from Île de Ré

### Community 109 - "Community 109"
Cohesion: 1.00
Nodes (1): Lupin wounded and hidden in abbey crypt

### Community 110 - "Community 110"
Cohesion: 1.00
Nodes (1): Lupin's cliff rescue and knife attack at Mortepierre

### Community 111 - "Community 111"
Cohesion: 1.00
Nodes (1): Trial verdict: Gilbert and Vaucheray sentenced to death

### Community 112 - "Community 112"
Cohesion: 1.00
Nodes (1): Raid on Villa Marie-Thérèse at Enghien

### Community 113 - "Community 113"
Cohesion: 1.00
Nodes (1): Chauffeur's leather cap

### Community 114 - "Community 114"
Cohesion: 1.00
Nodes (1): Eburnation (rheumatoid arthritis patch) on right hip-joint

### Community 115 - "Community 115"
Cohesion: 1.00
Nodes (1): Four false Rubens paintings (copies by Charpenais)

### Community 116 - "Community 116"
Cohesion: 1.00
Nodes (1): Stourbridge glass-blower invoice

### Community 117 - "Community 117"
Cohesion: 1.00
Nodes (1): Daubrecq deliberately corrupted Gilbert in revenge against Clarisse

### Community 118 - "Community 118"
Cohesion: 1.00
Nodes (1): Prasville's name on the list via Vorenglade

### Community 119 - "Community 119"
Cohesion: 1.00
Nodes (1): Third finger of left hand missing from skeleton; removed for ring

### Community 120 - "Community 120"
Cohesion: 1.00
Nodes (1): Survivorship: last proven moment Bellingham was alive determines property succession

### Community 121 - "Community 121"
Cohesion: 1.00
Nodes (1): Badsham Junction railway station

### Community 122 - "Community 122"
Cohesion: 1.00
Nodes (1): Camden House

### Community 123 - "Community 123"
Cohesion: 1.00
Nodes (1): Camford (university town)

### Community 124 - "Community 124"
Cohesion: 1.00
Nodes (1): Chateau de Crozon

### Community 125 - "Community 125"
Cohesion: 1.00
Nodes (1): Château de l'Aiguille (on the Creuse)

### Community 126 - "Community 126"
Cohesion: 1.00
Nodes (1): Cuckoo Pits, Epping Forest, Woodford (right arm found)

### Community 127 - "Community 127"
Cohesion: 1.00
Nodes (1): Dockhead, Bermondsey (Bailey's flat at Hanover Buildings)

### Community 128 - "Community 128"
Cohesion: 1.00
Nodes (1): Hotel Destange, Place Malesherbes

### Community 129 - "Community 129"
Cohesion: 1.00
Nodes (1): Lycée Janson-de-Sailly

### Community 130 - "Community 130"
Cohesion: 1.00
Nodes (1): Lyceum Theatre (rendezvous)

### Community 131 - "Community 131"
Cohesion: 1.00
Nodes (1): Nice hotel (Daubrecq's final lair)

### Community 132 - "Community 132"
Cohesion: 1.00
Nodes (1): 40 Rue Chalgrin

### Community 133 - "Community 133"
Cohesion: 1.00
Nodes (1): Woodford house (Godfrey Bellingham's former residence near Epping Forest)

### Community 134 - "Community 134"
Cohesion: 1.00
Nodes (1): Imitation blue diamond

### Community 135 - "Community 135"
Cohesion: 1.00
Nodes (1): Jewish Lamp

### Community 136 - "Community 136"
Cohesion: 1.00
Nodes (1): Norwegian knife smeared with rat blood and musk essence

### Community 137 - "Community 137"
Cohesion: 1.00
Nodes (1): Pearl pendant (Lupin's gift to Germaine)

### Community 138 - "Community 138"
Cohesion: 1.00
Nodes (1): Thumbograph (finger-print album) used in Hornby case

### Community 139 - "Community 139"
Cohesion: 1.00
Nodes (1): Toby the tracking dog

### Community 140 - "Community 140"
Cohesion: 1.00
Nodes (1): Wax Bust of Holmes

## Knowledge Gaps
- **530 isolated node(s):** `The Blue Carbuncle`, `Young Stamford`, `London`, `Constable John Rance`, `John Ferrier` (+525 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 96`** (2 nodes): `Daubrecq's letter fragment about hollowing crystal`, `Daubrecq stole the list from dying Germineaux`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 97`** (2 nodes): `Levy's signed confession receipt`, `Dan Levy murdered by foreign creditor, not Raffles`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 98`** (2 nodes): `Teddy's promissory note and instalment receipts`, `Teddy Garland borrowed £300 from Levy, now owes £700`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 99`** (2 nodes): `Blue chalk in Victoire's pocket (accomplice proof)`, `Victoire is Lupin's accomplice (blue chalk, wrote signatures)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 100`** (1 nodes): `Bernard Charolais`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 101`** (1 nodes): `Clémence`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 102`** (1 nodes): `Irma`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 103`** (1 nodes): `Jacques Mergy`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 104`** (1 nodes): `Stanislas Vorenglade`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 105`** (1 nodes): `Theft of the naval treaty document`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 106`** (1 nodes): `Arrest of Gilbert and Vaucheray`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 107`** (1 nodes): `Daubrecq's suicide at Gare du Nord`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 108`** (1 nodes): `Gilbert's escape from Île de Ré`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 109`** (1 nodes): `Lupin wounded and hidden in abbey crypt`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 110`** (1 nodes): `Lupin's cliff rescue and knife attack at Mortepierre`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 111`** (1 nodes): `Trial verdict: Gilbert and Vaucheray sentenced to death`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 112`** (1 nodes): `Raid on Villa Marie-Thérèse at Enghien`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 113`** (1 nodes): `Chauffeur's leather cap`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 114`** (1 nodes): `Eburnation (rheumatoid arthritis patch) on right hip-joint`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 115`** (1 nodes): `Four false Rubens paintings (copies by Charpenais)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 116`** (1 nodes): `Stourbridge glass-blower invoice`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 117`** (1 nodes): `Daubrecq deliberately corrupted Gilbert in revenge against Clarisse`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 118`** (1 nodes): `Prasville's name on the list via Vorenglade`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 119`** (1 nodes): `Third finger of left hand missing from skeleton; removed for ring`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 120`** (1 nodes): `Survivorship: last proven moment Bellingham was alive determines property succession`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 121`** (1 nodes): `Badsham Junction railway station`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 122`** (1 nodes): `Camden House`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 123`** (1 nodes): `Camford (university town)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 124`** (1 nodes): `Chateau de Crozon`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 125`** (1 nodes): `Château de l'Aiguille (on the Creuse)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 126`** (1 nodes): `Cuckoo Pits, Epping Forest, Woodford (right arm found)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 127`** (1 nodes): `Dockhead, Bermondsey (Bailey's flat at Hanover Buildings)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 128`** (1 nodes): `Hotel Destange, Place Malesherbes`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 129`** (1 nodes): `Lycée Janson-de-Sailly`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 130`** (1 nodes): `Lyceum Theatre (rendezvous)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 131`** (1 nodes): `Nice hotel (Daubrecq's final lair)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 132`** (1 nodes): `40 Rue Chalgrin`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 133`** (1 nodes): `Woodford house (Godfrey Bellingham's former residence near Epping Forest)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 134`** (1 nodes): `Imitation blue diamond`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 135`** (1 nodes): `Jewish Lamp`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 136`** (1 nodes): `Norwegian knife smeared with rat blood and musk essence`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 137`** (1 nodes): `Pearl pendant (Lupin's gift to Germaine)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 138`** (1 nodes): `Thumbograph (finger-print album) used in Hornby case`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 139`** (1 nodes): `Toby the tracking dog`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 140`** (1 nodes): `Wax Bust of Holmes`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Sherlock Holmes` connect `Community 3` to `Community 1`, `Community 0`, `Community 13`, `Community 2`, `Community 26`, `Community 47`, `Community 12`, `Community 41`, `Community 77`, `Community 33`, `Community 78`, `Community 14`, `Community 18`, `Community 19`, `Community 34`, `Community 89`, `Community 63`, `Community 90`, `Community 43`, `Community 66`, `Community 50`, `Community 67`, `Community 73`, `Community 51`, `Community 48`, `Community 64`, `Community 71`, `Community 68`?**
  _High betweenness centrality (0.102) - this node is a cross-community bridge._
- **Why does `Dr. John Thorndyke` connect `Community 9` to `Community 25`, `Community 35`, `Community 21`, `Community 36`, `Community 54`, `Community 60`, `Community 37`, `Community 42`, `Community 23`, `Community 5`, `Community 30`, `Community 24`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Why does `The Return of Sherlock Holmes` connect `Community 13` to `Community 3`, `Community 32`, `Community 2`, `Community 64`, `Community 0`, `Community 92`, `Community 93`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **What connects `The Blue Carbuncle`, `Young Stamford`, `London` to the rest of the system?**
  _530 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05731523378582202 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.06105457909343201 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.052525252525252523 - nodes in this community are weakly interconnected._