---
title: "Challenge-Name"
event: "IrgendeinCTF 2026"
date: 2026-01-31
category: "Web" # Web | Rev | Pwn | Crypto | Forensics | OSINT | Misc
author: "Telqrrrr"
points: 300 # optional
summary: "Ein bis zwei Sätze: was die Challenge war und woran sie letztlich gescheitert ist."
tags: ["ssrf", "python"]
draft: true
---

Kurz die Ausgangslage: was war gegeben, was war das Ziel.

## Recon

Was man zuerst sieht. Screenshots kommen nach `public/` und werden mit
`![Alt-Text](/writeups/bild.png)` eingebunden.

## Der Weg dahin

Auch die Sackgassen aufschreiben — die sind beim Lesen oft mehr wert als die Lösung.

```python
import requests

r = requests.get("http://target/api", timeout=5)
print(r.status_code)
```

## Flag

Warum es funktioniert hat, in einem Absatz. Nicht nur das Flag hinklatschen.

---

Diese Datei steht auf `draft: true` und wird deshalb weder gebaut noch verlinkt.
Zum Schreiben kopieren, z. B. nach `mntcrl-2026-ssrf.md`, Frontmatter ausfüllen und
`draft: false` setzen — der Dateiname wird die URL (`/writeups/mntcrl-2026-ssrf/`).
Sobald der erste Writeup live ist, taucht der Menüpunkt oben von selbst auf.
