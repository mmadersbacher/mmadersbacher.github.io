// Zwei Sprachen, echte URLs: Deutsch liegt auf /, Englisch auf /en/.
// Kein Client-JS, kein Cookie — der Umschalter ist ein normaler Link, damit
// Suchmaschinen und Leute ohne JS beide Fassungen bekommen.
//
// Eigennamen bleiben stehen: «Gehackt ist Geil», «Absolute Bubensahne» und die
// Event-Namen werden nicht übersetzt. Alles andere schon.
//
// Strings mit "Html" im Namen landen über set:html im Markup — dort ist Inline-
// Auszeichnung erlaubt, aber nur unsere eigene.

export const languages = { de: "Deutsch", en: "English" } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = "de";
export const langCodes = Object.keys(languages) as Lang[];

/**
 * BCP-47 bzw. OG-Locale je Sprache.
 *
 * `date` und `num` sind absichtlich getrennt: de-AT schreibt Datumsangaben
 * österreichisch («Jänner»), gruppiert Zahlen laut CLDR aber mit schmalem
 * Leerzeichen — 13 764 statt 13.764. Die Seite schreibt Tausender seit jeher
 * mit Punkt, also kommt für Zahlen de-DE zum Einsatz.
 */
export const locales: Record<Lang, { html: string; og: string; date: string; num: string }> = {
  de: { html: "de", og: "de_AT", date: "de-AT", num: "de-DE" },
  en: { html: "en", og: "en_GB", date: "en-GB", num: "en-GB" },
};

/**
 * /ueber-uns → /en/ueber-uns, / → /en/.
 * Der Pfad kommt immer in der Default-Sprache (also ohne Präfix) herein.
 */
export function localePath(lang: Lang, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return lang === defaultLang ? clean : `/en${clean === "/" ? "/" : clean}`;
}

/** Gegenstück zur aktuellen Sprache — für den Umschalter. */
export function otherLang(lang: Lang): Lang {
  return lang === "de" ? "en" : "de";
}

const de = {
  nav: {
    home: "Start",
    palmares: "Palmarès",
    crew: "Crew",
    writeups: "Writeups",
    mainNav: "Hauptnavigation",
    footNav: "Fußzeile",
    homeAria: "Gehackt ist Geil — Startseite",
  },
  lang: {
    /** aria-label am Umschalter */
    label: "Sprache wählen",
    switchTo: "Auf Englisch umschalten",
  },
  foot: {
    tagline: "Akademisches CTF-Team · Österreich",
    est: "Absolute Bubensahne™ · Est. 2026",
  },
  home: {
    title: "Gehackt ist Geil",
    ogTitle: "Gehackt ist Geil — CTF-Team",
    description:
      "Gehackt ist Geil — akademisches CTF-Team aus Österreich. Flags jagen statt schlafen. Ergebnisse, Crew und wie du mitmachst.",
    orgDescription: "Akademisches CTF-Team aus Österreich.",
    kicker: ["Academic CTF-Team", "AT · Österreich", "seit 2026"],
    /** Der Teamname bleibt in beiden Sprachen stehen. */
    h1: ["Gehackt", "ist", "Geil"],
    /** Nur in der englischen Fassung: Übersetzung des Namens als Fußnote. */
    gloss: "",
    leadHtml:
      "Ein Haufen Studenten, die am Wochenende lieber <b>Flags jagen</b> als schlafen. Wir zerlegen Web, Binaries und Krypto, bis das Flag rausfällt — weil kaputt&shy;machen und verstehen dasselbe ist.",
    ctaTeam: "Team auf CTFtime",
    ctaResults: "Ergebnisse",
    photoAlt:
      "Halftone-Portrait des Team-Maskottchens: Absolute Bubensahne",
    photoCaption: "GiG // Bubensahne",
    photoTech: "Halftone · 2c",
    stampMascot: ["Offizielles", "Maskottchen"],
    stampEst: ["Est.", "2026"],
    marquee: ["Gehackt ist Geil", "Absolute Bubensahne", "Flags > Schlaf", "CTFtime /438200"],
    manifest: {
      h2: "Wer wir sind",
      no: "§01 — Manifest",
      bigHtml:
        'Kein Sponsor. Kein Business-Plan.<br />Nur <span class="hl">Koffein</span>, <span class="hl-r">Neugier</span> und die feste Gewissheit, dass gehackt geil ist.',
      p1Html:
        "<b>«Gehackt ist Geil»</b> ist ein akademisches CTF-Team aus Österreich. Wir treten bei Capture-the-Flag-Wettbewerben an — Web-Exploitation, Reverse Engineering, Krypto, Forensik — und lernen dabei mehr über echte Systeme als in jedem Skript.",
      p2Html:
        "Angefangen hat's aus einer einzigen Frage: Wie funktioniert das wirklich, und wo bricht es? Heute heißt das durchgemachte Nächte, zu viel Mate und die eine Zeile im Write-up, die alles erklärt. Mal Platz&nbsp;2, mal Platz&nbsp;255 — Hauptsache dabei.",
    },
    palmares: {
      h2: "Palmarès",
      no: "§02 — Saison 2026 · CTFtime",
      place: "Platz",
      pts: "CTF-Punkte",
      rating: "Rating",
      teams: "Teams",
      podium: "Top",
      fresh: "Neu",
      kind: { jeopardy: "Jeopardy", qualifier: "Qualifier" },
      note: "Offizielle Wertung — nachrechnen erlaubt.",
      full: "Volle Team-Seite",
    },
    crew: {
      h2: "Crew",
      no: "§03 — Roster",
      role: "Player",
      telqrrrr:
        "Netzwerke, Reversing und die Überzeugung, dass man Dinge zerlegen muss, um sie zu verstehen. Baut Tools, wenn ihm eins fehlt.",
      lunaric:
        "Bug-Bounty-Jäger mit einer Schwäche für kaputte Zugriffskontrolle. Schreibt sich die Werkzeuge selbst, wenn es keine gibt.",
      yousuf: "Jagt Flags mit dem Team, seit es das Team gibt.",
      profile: "Profil",
      joinQ: "Rein<br />hier?",
      joinText: "Lust mitzuspielen? Schreib uns — wir beißen nicht.",
      joinCta: "Schreib uns",
    },
    band: {
      h2: "Wir suchen Leute, die gehackt auch geil finden.",
      cta: "Auf CTFtime finden",
    },
  },
  mario: {
    title: "Mario Madersbacher — Security & Netzwerke",
    description:
      "Mario Madersbacher (Telqrrrr) aus Tirol: Open-Source-Beiträge zu Scapy, Impacket, Sigma und Nuclei, eigene Netzwerk- und Security-Tools in Rust und Go, CTFs mit «Gehackt ist Geil».",
    jobTitle: "Security- und Netzwerk-Schüler",
    kicker: ["Telqrrrr", "Tirol · Österreich", "Security & Netzwerke"],
    h1: ["Mario", "Madersbacher"],
    leadHtml:
      "18, HAK in Tirol, und der Großteil der Energie geht in Security und Netzwerke. Wenn ich nicht verstehe, wie sich etwas verhält, schreibe ich meistens das Tool, das es mir zeigt. Rust und Go, wenn es schnell sein muss, Python wenn ich nur die Antwort will. Linux als Alltagssystem.",
    subHtml:
      'Nebenbei spiele ich CTFs mit <a href="{home}">«Gehackt ist Geil»</a> — diese Seite ist auch von mir.',
    oss: {
      h2: "Open Source",
      no: "§A — Upstream",
      lead:
        "Kein Fork-Friedhof: Änderungen an Projekten, die andere Leute wirklich benutzen. Jede Zeile hier ist ein Pull Request im Original-Repo.",
      merged: "gemerged",
      open: "offen",
    },
    tools: { h2: "Eigene Tools", no: "§B — Werkstatt", repo: "Repo" },
    facts: {
      h2: "CTF & Papierkram",
      no: "§C — Belege",
      ctfK: "CTF",
      ctfHtml:
        'Spiele mit <a href="{team}" target="_blank" rel="noopener">Gehackt ist Geil</a>, beste Platzierung bisher Platz&nbsp;2 bei MntcrlCTF&nbsp;2026. Eigenes Profil: <a href="{user}" target="_blank" rel="noopener">ctftime.org/user/264976</a>.',
      certK: "Zertifikate",
      cert: "TryHackMe Junior Penetration Tester (PT1) und AI Security (AI1), beide 2026.",
      bbK: "Bug Bounty",
      bb: "Angenommene Reports in öffentlichen und privaten Programmen. Details bleiben dort, wo sie hingehören — bei den Programmen.",
      nowK: "Gerade dran",
      now: "Netzwerkprotokolle, Reverse Engineering und Rust. Und daran, weniger Tabs offen zu haben.",
    },
    contact: {
      h2: "Kontakt",
      no: "§D — Erreichbar",
      mail: "E-Mail",
      note: "Mails laufen über eine Relay-Adresse — kommt trotzdem an.",
    },
  },
  lunaric: {
    title: "Lunaric — Bug Bounty & Offensive Security",
    description:
      "Lunaric: Bug Bounty und CTFs mit «Gehackt ist Geil». Schwerpunkt Zugriffskontrolle, eigene Recon- und IDOR-Tools in Python, Go und Rust.",
    jobTitle: "Bug-Bounty-Jäger & Security-Researcher",
    kicker: ["Lunaric", "Bug Bounty · CTF", "seit 2026 dabei"],
    h1: ["Lunaric", ""],
    leadHtml:
      "Offensive Security, Bug Bounty, Homelab — in der Reihenfolge, in der die Neugier gerade zieht. Ich mache Dinge kaputt, um zu verstehen, wie sie funktionieren, automatisiere den langweiligen Teil und baue mir das, was ich zum Weiterlernen brauche.",
    subHtml:
      'CTFs spiele ich mit <a href="{home}">«Gehackt ist Geil»</a>. Meine eigene Seite liegt auf <a href="{site}" target="_blank" rel="noopener">lunaric.dev</a>.',
    hunt: {
      h2: "Bug Bounty",
      no: "§A — Feldarbeit",
      lead:
        "Öffentliche und private Programme. Was in den Reports steht, bleibt bei den Programmen — hier steht nur, wonach ich suche und wie.",
      focusK: "Schwerpunkt",
      focus:
        "Zugriffskontrolle. IDOR, fehlende Berechtigungsprüfungen, Endpunkte, die man ohne Login erreicht — die Stellen, an denen eine Anwendung vergisst zu fragen, wer da eigentlich klopft. Code Injection und Path Traversal, wenn sich die Gelegenheit ergibt.",
      methodK: "Methode",
      method:
        "Zwei Accounts, dieselbe Anfrage, die Antworten nebeneinandergelegt. Klingt simpel, findet erstaunlich viel. Und wenn ich denselben Handgriff zum dritten Mal mache, schreibe ich das Tool dafür.",
      whereK: "Wo ich unterwegs bin",
      where:
        "YesWeHack und HackerOne, nebenbei TryHackMe für die Grundlagen. Die Profile sind unten verlinkt.",
      note:
        "Keine Zahlen auf dieser Seite — Reports, Punkte und Ränge stehen auf den Plattformen und ändern sich dort ohnehin ständig.",
    },
    tools: {
      h2: "Eigene Tools",
      no: "§B — Werkstatt",
      lead:
        "Jedes davon ist aus derselben Situation entstanden: etwas dreimal von Hand gemacht, beim vierten Mal reicht's. Alles selbst geschrieben, alles öffentlich.",
      repo: "Repo",
    },
    facts: {
      h2: "CTF & Papierkram",
      no: "§C — Belege",
      ctfK: "CTF",
      ctfHtml:
        'Spiele seit Juni 2026 mit <a href="{team}" target="_blank" rel="noopener">Gehackt ist Geil</a> — zuletzt Platz&nbsp;3 unter 1.102 Teams beim BrunnerCTF&nbsp;2026. Eigenes Profil: <a href="{user}" target="_blank" rel="noopener">ctftime.org/user/262753</a>.',
      siteK: "Eigene Seite",
      siteHtml:
        '<a href="{site}" target="_blank" rel="noopener">lunaric.dev</a> habe ich von Hand in Rust geschrieben, nach WebAssembly kompiliert und auf Cloudflares Edge gelegt. Kein Generator, kein Framework — ich wollte wissen, ob das geht.',
      langK: "Sprachen",
      lang: "Niederländisch, Deutsch, Englisch, Russisch. Praktisch, wenn ein Programm sein Scope auf Niederländisch beschreibt.",
      modestK: "Selbsteinschätzung",
      modestHtml:
        'In meinem CTFtime-Profil steht unter «Good at»: <b>nothing</b>. Das Scoreboard sieht das anders.',
    },
    contact: {
      h2: "Kontakt",
      no: "§D — Erreichbar",
      note: "Sicherheitsrelevantes bitte über die Plattformen — dort ist es richtig aufgehoben.",
    },
  },
  writeups: {
    title: "Writeups — Gehackt ist Geil",
    description:
      "Lösungswege des CTF-Teams «Gehackt ist Geil»: wie wir Web-, Reversing-, Krypto- und Pwn-Challenges aufgemacht haben.",
    no: "§04 — Archiv",
    h1: "Writeups",
    lead:
      "Wie wir die Challenge aufgemacht haben — inklusive der Sackgassen. Wer nur das Flag postet, hat nichts erklärt.",
    emptyQ: "Noch<br />leer",
    emptyText:
      "Hier landen unsere Lösungswege, sobald der erste geschrieben ist. Bis dahin: Ergebnisse stehen auf der Startseite, gespielt wird trotzdem.",
    emptyCta: "Zur Startseite",
    footNote: "Selbst was gelöst und Lust, es aufzuschreiben?",
    footCta: "Schreib uns",
    back: "← Alle Writeups",
    points: "Punkte",
    /** Writeups selbst sind deutsch — in der EN-Fassung steht das als Hinweis. */
    germanOnly: "",
  },
  notFound: {
    title: "404 — Gehackt ist Geil",
    description: "Diese Seite gibt es nicht.",
    no: "§404 — Nicht gefunden",
    h1: "Kein<br />Flag hier",
    lead:
      "Die Seite existiert nicht (mehr). Kein Exploit nötig — der Weg zurück ist ganz normal verlinkt.",
    cta: "Zur Startseite",
  },
};

/** Englisch muss dieselbe Form haben wie Deutsch — sonst meckert tsc. */
const en: typeof de = {
  nav: {
    home: "Home",
    palmares: "Palmarès",
    crew: "Crew",
    writeups: "Writeups",
    mainNav: "Main navigation",
    footNav: "Footer",
    homeAria: "Gehackt ist Geil — home",
  },
  lang: {
    label: "Choose language",
    switchTo: "Switch to German",
  },
  foot: {
    tagline: "Academic CTF team · Austria",
    est: "Absolute Bubensahne™ · Est. 2026",
  },
  home: {
    title: "Gehackt ist Geil — Austrian CTF team",
    ogTitle: "Gehackt ist Geil — CTF team",
    description:
      "Gehackt ist Geil — an academic CTF team from Austria. Chasing flags instead of sleeping. Results, crew, and how to join.",
    orgDescription: "Academic CTF team from Austria.",
    kicker: ["Academic CTF team", "AT · Austria", "since 2026"],
    h1: ["Gehackt", "ist", "Geil"],
    gloss: "German for «hacked is awesome». Yes, really.",
    leadHtml:
      "A bunch of students who would rather <b>chase flags</b> on the weekend than sleep. We take web, binaries and crypto apart until the flag falls out — because breaking something and understanding it are the same thing.",
    ctaTeam: "Team on CTFtime",
    ctaResults: "Results",
    photoAlt: "Halftone portrait of the team mascot: Absolute Bubensahne",
    photoCaption: "GiG // Bubensahne",
    photoTech: "Halftone · 2c",
    stampMascot: ["Official", "Mascot"],
    stampEst: ["Est.", "2026"],
    marquee: ["Gehackt ist Geil", "Absolute Bubensahne", "Flags > Sleep", "CTFtime /438200"],
    manifest: {
      h2: "Who we are",
      no: "§01 — Manifesto",
      bigHtml:
        'No sponsor. No business plan.<br />Just <span class="hl">caffeine</span>, <span class="hl-r">curiosity</span> and the firm belief that hacking is awesome.',
      p1Html:
        "<b>«Gehackt ist Geil»</b> is an academic CTF team from Austria. We play capture-the-flag competitions — web exploitation, reverse engineering, crypto, forensics — and learn more about real systems doing it than from any course handout.",
      p2Html:
        "It started with a single question: how does this actually work, and where does it break? These days that means all-nighters, too much mate tea and the one line in the write-up that explains everything. Sometimes 2nd place, sometimes 255th — the point is being there.",
    },
    palmares: {
      h2: "Palmarès",
      no: "§02 — 2026 season · CTFtime",
      place: "Place",
      pts: "CTF points",
      rating: "Rating",
      teams: "teams",
      podium: "Top",
      fresh: "New",
      kind: { jeopardy: "Jeopardy", qualifier: "Qualifier" },
      note: "Official scoring — check the maths if you like.",
      full: "Full team page",
    },
    crew: {
      h2: "Crew",
      no: "§03 — Roster",
      role: "Player",
      telqrrrr:
        "Networks, reversing, and the conviction that you have to take things apart to understand them. Writes the tool when one is missing.",
      lunaric:
        "Bug bounty hunter with a soft spot for broken access control. Writes his own tooling when none exists.",
      yousuf: "Has been chasing flags with the team since the team existed.",
      profile: "Profile",
      joinQ: "Room<br />for me?",
      joinText: "Want to play with us? Drop us a line — we don't bite.",
      joinCta: "Get in touch",
    },
    band: {
      h2: "We're looking for people who also think hacking is awesome.",
      cta: "Find us on CTFtime",
    },
  },
  mario: {
    title: "Mario Madersbacher — security & networks",
    description:
      "Mario Madersbacher (Telqrrrr) from Tyrol, Austria: upstream contributions to Scapy, Impacket, Sigma and Nuclei, his own network and security tools in Rust and Go, CTFs with «Gehackt ist Geil».",
    jobTitle: "Security and networking student",
    kicker: ["Telqrrrr", "Tyrol · Austria", "Security & networks"],
    h1: ["Mario", "Madersbacher"],
    leadHtml:
      "18, business school in Tyrol, and most of the energy goes into security and networks. When I don't understand how something behaves, I usually end up writing the tool that shows me. Rust and Go when it has to be fast, Python when I just want the answer. Linux as the daily driver.",
    subHtml:
      'On the side I play CTFs with <a href="{home}">«Gehackt ist Geil»</a> — this site is mine too.',
    oss: {
      h2: "Open source",
      no: "§A — Upstream",
      lead:
        "Not a graveyard of forks: changes to projects other people actually use. Every line here is a pull request in the original repo.",
      merged: "merged",
      open: "open",
    },
    tools: { h2: "My own tools", no: "§B — Workshop", repo: "Repo" },
    facts: {
      h2: "CTF & paperwork",
      no: "§C — Receipts",
      ctfK: "CTF",
      ctfHtml:
        'I play with <a href="{team}" target="_blank" rel="noopener">Gehackt ist Geil</a>; best placing so far is 2nd at MntcrlCTF&nbsp;2026. My own profile: <a href="{user}" target="_blank" rel="noopener">ctftime.org/user/264976</a>.',
      certK: "Certificates",
      cert: "TryHackMe Junior Penetration Tester (PT1) and AI Security (AI1), both 2026.",
      bbK: "Bug bounty",
      bb: "Accepted reports in public and private programmes. The details stay where they belong — with the programmes.",
      nowK: "Currently on",
      now: "Network protocols, reverse engineering and Rust. And on keeping fewer tabs open.",
    },
    contact: {
      h2: "Contact",
      no: "§D — Reachable",
      mail: "E-mail",
      note: "Mail goes through a relay address — it still gets there.",
    },
  },
  lunaric: {
    title: "Lunaric — bug bounty & offensive security",
    description:
      "Lunaric: bug bounty and CTFs with «Gehackt ist Geil». Focus on access control, plus my own recon and IDOR tooling in Python, Go and Rust.",
    jobTitle: "Bug bounty hunter & security researcher",
    kicker: ["Lunaric", "Bug bounty · CTF", "with us since 2026"],
    h1: ["Lunaric", ""],
    leadHtml:
      "Offensive security, bug bounty, homelab — in whichever order curiosity is pulling. I break things to understand how they work, automate the boring parts and build whatever I need to learn next.",
    subHtml:
      'I play CTFs with <a href="{home}">«Gehackt ist Geil»</a>. My own site lives at <a href="{site}" target="_blank" rel="noopener">lunaric.dev</a>.',
    hunt: {
      h2: "Bug bounty",
      no: "§A — Field work",
      lead:
        "Public and private programmes. What's in the reports stays with the programmes — this is only what I look for, and how.",
      focusK: "Focus",
      focus:
        "Access control. IDOR, missing authorisation checks, endpoints you can reach without logging in — the places where an application forgets to ask who is actually knocking. Code injection and path traversal when the opportunity shows up.",
      methodK: "Method",
      method:
        "Two accounts, the same request, the responses laid side by side. Sounds trivial, finds a surprising amount. And when I catch myself doing the same step for the third time, I write the tool for it.",
      whereK: "Where I hunt",
      where:
        "YesWeHack and HackerOne, plus TryHackMe for the fundamentals. The profiles are linked below.",
      note:
        "No numbers on this page — reports, points and ranks live on the platforms and keep moving there anyway.",
    },
    tools: {
      h2: "My own tools",
      no: "§B — Workshop",
      lead:
        "Every one of them came out of the same situation: did it by hand three times, the fourth time was enough. All written from scratch, all public.",
      repo: "Repo",
    },
    facts: {
      h2: "CTF & paperwork",
      no: "§C — Receipts",
      ctfK: "CTF",
      ctfHtml:
        'Playing with <a href="{team}" target="_blank" rel="noopener">Gehackt ist Geil</a> since June 2026 — most recently 3rd out of 1,102 teams at BrunnerCTF&nbsp;2026. My own profile: <a href="{user}" target="_blank" rel="noopener">ctftime.org/user/262753</a>.',
      siteK: "My own site",
      siteHtml:
        'I hand-wrote <a href="{site}" target="_blank" rel="noopener">lunaric.dev</a> in Rust, compiled it to WebAssembly and put it on Cloudflare\'s edge. No generator, no framework — I wanted to know whether it would work.',
      langK: "Languages",
      lang: "Dutch, German, English, Russian. Handy when a programme writes its scope in Dutch.",
      modestK: "Self-assessment",
      modestHtml:
        'My CTFtime profile lists, under «Good at»: <b>nothing</b>. The scoreboard sees it differently.',
    },
    contact: {
      h2: "Contact",
      no: "§D — Reachable",
      note: "Anything security-relevant via the platforms, please — that's where it belongs.",
    },
  },
  writeups: {
    title: "Writeups — Gehackt ist Geil",
    description:
      "How the CTF team «Gehackt ist Geil» solved it: web, reversing, crypto and pwn challenges taken apart step by step.",
    no: "§04 — Archive",
    h1: "Writeups",
    lead:
      "How we opened the challenge — dead ends included. Posting just the flag explains nothing.",
    emptyQ: "Still<br />empty",
    emptyText:
      "Our solutions land here as soon as the first one is written. Until then: the results are on the home page, and we're still playing.",
    emptyCta: "Back to the home page",
    footNote: "Solved something yourself and want to write it up?",
    footCta: "Get in touch",
    back: "← All writeups",
    points: "points",
    germanOnly: "Heads up: the write-ups themselves are written in German.",
  },
  notFound: {
    title: "404 — Gehackt ist Geil",
    description: "This page does not exist.",
    no: "§404 — Not found",
    h1: "No flag<br />here",
    lead:
      "This page doesn't exist (any more). No exploit needed — the way back is linked like normal.",
    cta: "Back to the home page",
  },
};

export const ui: Record<Lang, typeof de> = { de, en };

/** Kurzhelfer: const s = useTranslations(lang) → s.home.ctaTeam */
export function useTranslations(lang: Lang) {
  return ui[lang] ?? ui[defaultLang];
}

/** Platzhalter der Form {name} in einem String ersetzen. */
export function fill(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
}
