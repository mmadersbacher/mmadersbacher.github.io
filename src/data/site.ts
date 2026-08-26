// Zentrale Konstanten — hier ändern, nicht im Markup.

export const CTFTIME_TEAM = "https://ctftime.org/team/438200";
export const GITHUB = "https://github.com/mmadersbacher";
export const CONTACT_MAIL = "Telqrrrrr-ywh-462937e379a24618@yeswehack.ninja";

export const CTFTIME_USER = {
  telqrrrr: "https://ctftime.org/user/264976",
  lunaric: "https://ctftime.org/user/262753",
  yousuf: "https://ctftime.org/user/264965",
};

export type Result = {
  /** Platzierung laut CTFtime-Scoreboard. */
  place: number;
  event: string;
  /** Übersetzungsschlüssel für das Format, siehe i18n/ui.ts → results.kind. */
  kind: "jeopardy" | "qualifier";
  /** Teams im Scoreboard — der Nenner zur Platzierung. */
  field: number;
  /** CTF-Punkte und Rating-Punkte als Zahlen; formatiert wird pro Sprache. */
  pts: number;
  rating: number;
  /** Ende des Events (ISO), bestimmt die Reihenfolge. */
  date: string;
  url: string;
};

/**
 * Ergebnisse laut CTFtime — nach jedem CTF hier eine Zeile ergänzen und die
 * Zahlen gegen https://ctftime.org/team/438200 prüfen. Nichts erfinden.
 * Zahlen bleiben roh; Intl.NumberFormat macht daraus de- bzw. en-Schreibweise.
 * Sortiert wird automatisch nach Datum, neuestes Event zuerst.
 */
export const results: Result[] = [
  {
    place: 3,
    event: "BrunnerCTF 2026",
    kind: "jeopardy",
    field: 1102,
    pts: 6654,
    rating: 32.88,
    date: "2026-08-23",
    url: "https://ctftime.org/event/3065",
  },
  {
    place: 2,
    event: "MntcrlCTF 2026",
    kind: "jeopardy",
    field: 118,
    pts: 13764,
    rating: 36.639,
    date: "2026-06-28",
    url: "https://ctftime.org/event/3282",
  },
  {
    place: 255,
    event: "boroCTF 2026",
    kind: "jeopardy",
    field: 819,
    pts: 5200,
    rating: 7.087,
    date: "2026-06-16",
    url: "https://ctftime.org/event/3309",
  },
  {
    place: 37,
    event: "SAS CTF 2026 Quals",
    kind: "qualifier",
    field: 515,
    pts: 920,
    rating: 7.354,
    date: "2026-06-07",
    url: "https://ctftime.org/event/3109",
  },
].sort((a, b) => b.date.localeCompare(a.date));

/** Neuestes Event zuerst — bekommt in der Tabelle den «Neu»-Stempel. */
export const latestResult = results[0];

/** Podium heißt Top 3. Der Stempel zeigt die tatsächliche Platzierung. */
export const isPodium = (r: Result) => r.place <= 3;
