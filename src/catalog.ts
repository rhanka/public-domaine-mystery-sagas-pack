import { slugify } from "./gutenberg.js";

export interface Person {
  name: string;
  birthYear: number;
  deathYear: number;
}

export interface Work {
  saga: string;
  sagaTitle: string;
  title: string;
  author: Person;
  translators?: Person[];
  firstPublicationYear: number;
  gutenbergId: number;
  sourceUrl: string;
  downloadUrl: string;
  slug: string;
  notes?: string;
}

const DOYLE: Person = { name: "Arthur Conan Doyle", birthYear: 1859, deathYear: 1930 };
const LEBLANC: Person = { name: "Maurice Leblanc", birthYear: 1864, deathYear: 1941 };
const CHESTERTON: Person = { name: "G. K. Chesterton", birthYear: 1874, deathYear: 1936 };
const FREEMAN: Person = { name: "R. Austin Freeman", birthYear: 1862, deathYear: 1943 };
const HORNUNG: Person = { name: "E. W. Hornung", birthYear: 1866, deathYear: 1921 };
const TEIXEIRA: Person = { name: "Alexander Teixeira de Mattos", birthYear: 1865, deathYear: 1921 };
const JEPSON: Person = { name: "Edgar Jepson", birthYear: 1863, deathYear: 1938 };

interface WorkInput {
  saga: string;
  sagaTitle: string;
  title: string;
  author: Person;
  translators?: Person[];
  firstPublicationYear: number;
  gutenbergId: number;
  notes?: string;
}

function work(input: WorkInput): Work {
  return {
    ...input,
    slug: slugify(input.title),
    sourceUrl: `https://www.gutenberg.org/ebooks/${input.gutenbergId}`,
    downloadUrl: `https://www.gutenberg.org/ebooks/${input.gutenbergId}.txt.utf-8`
  };
}

export const WORKS: readonly Work[] = [
  work({ saga: "sherlock-holmes", sagaTitle: "Sherlock Holmes", title: "A Study in Scarlet", author: DOYLE, firstPublicationYear: 1887, gutenbergId: 244 }),
  work({ saga: "sherlock-holmes", sagaTitle: "Sherlock Holmes", title: "The Sign of the Four", author: DOYLE, firstPublicationYear: 1890, gutenbergId: 2097 }),
  work({ saga: "sherlock-holmes", sagaTitle: "Sherlock Holmes", title: "The Adventures of Sherlock Holmes", author: DOYLE, firstPublicationYear: 1892, gutenbergId: 1661 }),
  work({ saga: "sherlock-holmes", sagaTitle: "Sherlock Holmes", title: "The Memoirs of Sherlock Holmes", author: DOYLE, firstPublicationYear: 1893, gutenbergId: 834 }),
  work({ saga: "sherlock-holmes", sagaTitle: "Sherlock Holmes", title: "The Hound of the Baskervilles", author: DOYLE, firstPublicationYear: 1902, gutenbergId: 2852 }),
  work({ saga: "sherlock-holmes", sagaTitle: "Sherlock Holmes", title: "The Return of Sherlock Holmes", author: DOYLE, firstPublicationYear: 1905, gutenbergId: 108 }),
  work({ saga: "sherlock-holmes", sagaTitle: "Sherlock Holmes", title: "The Valley of Fear", author: DOYLE, firstPublicationYear: 1915, gutenbergId: 3289 }),
  work({ saga: "sherlock-holmes", sagaTitle: "Sherlock Holmes", title: "His Last Bow", author: DOYLE, firstPublicationYear: 1917, gutenbergId: 2350 }),
  work({ saga: "sherlock-holmes", sagaTitle: "Sherlock Holmes", title: "The Case-Book of Sherlock Holmes", author: DOYLE, firstPublicationYear: 1927, gutenbergId: 69700 }),
  work({
    saga: "arsene-lupin",
    sagaTitle: "Arsene Lupin",
    title: "The Extraordinary Adventures of Arsene Lupin, Gentleman-Burglar",
    author: LEBLANC,
    firstPublicationYear: 1907,
    gutenbergId: 6133,
    notes: "English edition of the first Lupin collection."
  }),
  work({ saga: "arsene-lupin", sagaTitle: "Arsene Lupin", title: "Arsene Lupin", author: LEBLANC, translators: [JEPSON], firstPublicationYear: 1909, gutenbergId: 4014 }),
  work({ saga: "arsene-lupin", sagaTitle: "Arsene Lupin", title: "The Blonde Lady", author: LEBLANC, translators: [TEIXEIRA], firstPublicationYear: 1908, gutenbergId: 24839 }),
  work({ saga: "arsene-lupin", sagaTitle: "Arsene Lupin", title: "The Hollow Needle", author: LEBLANC, translators: [TEIXEIRA], firstPublicationYear: 1909, gutenbergId: 4017 }),
  work({ saga: "arsene-lupin", sagaTitle: "Arsene Lupin", title: "The Crystal Stopper", author: LEBLANC, firstPublicationYear: 1912, gutenbergId: 1563 }),
  work({ saga: "father-brown", sagaTitle: "Father Brown", title: "The Innocence of Father Brown", author: CHESTERTON, firstPublicationYear: 1911, gutenbergId: 204 }),
  work({ saga: "father-brown", sagaTitle: "Father Brown", title: "The Wisdom of Father Brown", author: CHESTERTON, firstPublicationYear: 1914, gutenbergId: 223 }),
  work({ saga: "father-brown", sagaTitle: "Father Brown", title: "The Secret of Father Brown", author: CHESTERTON, firstPublicationYear: 1927, gutenbergId: 70175 }),
  work({ saga: "dr-thorndyke", sagaTitle: "Dr. Thorndyke", title: "The Red Thumb Mark", author: FREEMAN, firstPublicationYear: 1907, gutenbergId: 11128 }),
  work({ saga: "dr-thorndyke", sagaTitle: "Dr. Thorndyke", title: "John Thorndyke's Cases", author: FREEMAN, firstPublicationYear: 1909, gutenbergId: 13882 }),
  work({ saga: "dr-thorndyke", sagaTitle: "Dr. Thorndyke", title: "The Vanishing Man", author: FREEMAN, firstPublicationYear: 1911, gutenbergId: 10476, notes: "Published in the UK as The Eye of Osiris." }),
  work({ saga: "dr-thorndyke", sagaTitle: "Dr. Thorndyke", title: "The Adventures of Dr. Thorndyke", author: FREEMAN, firstPublicationYear: 1912, gutenbergId: 59478 }),
  work({ saga: "raffles", sagaTitle: "Raffles", title: "The Amateur Cracksman", author: HORNUNG, firstPublicationYear: 1899, gutenbergId: 706 }),
  work({ saga: "raffles", sagaTitle: "Raffles", title: "Raffles: Further Adventures of the Amateur Cracksman", author: HORNUNG, firstPublicationYear: 1901, gutenbergId: 707 }),
  work({ saga: "raffles", sagaTitle: "Raffles", title: "A Thief in the Night", author: HORNUNG, firstPublicationYear: 1905, gutenbergId: 2098 }),
  work({ saga: "raffles", sagaTitle: "Raffles", title: "Mr. Justice Raffles", author: HORNUNG, firstPublicationYear: 1909, gutenbergId: 9806 })
];

export function listSagas(): string[] {
  return [...new Set(WORKS.map((workItem) => workItem.saga))];
}

export function assertPublicDomainPolicy(works: readonly Work[], currentYear = 2026): void {
  for (const workItem of works) {
    if (workItem.firstPublicationYear > currentYear - 96) {
      throw new Error(`${workItem.title} is not safely public domain in the United States`);
    }

    for (const person of [workItem.author, ...(workItem.translators ?? [])]) {
      if (person.deathYear > currentYear - 71) {
        throw new Error(`${workItem.title} uses ${person.name}, who is not life+70 safe`);
      }
    }
  }
}
