# UI Lab Autopilot Backlog

Autopiloten tar exakt den första `ready`-posten vars beroenden är `done`.
Varje körning arbetar i en separat Git-worktree och får bara slutföra en post.

## Statusar

- `ready` — får byggas automatiskt.
- `in_progress` — ägs av en aktiv autopilotkörning.
- `blocked` — kräver ett produkt- eller governancebeslut.
- `done` — implementation, dokumentation och `npm run check` är godkända.

## Mergeklass

- `safe` — får auto-mergas efter godkänd Quality Gate.
- `review` — ska lämnas som draft-PR och notifiera användaren.

## Ordnad backlog

| ID | Status | Merge | Leverans | Beroenden | Acceptanskriterier |
|---|---|---|---|---|---|
| AUTO-001 | done | safe | Autopilotgrund | — | Repo-skill, Vitest, Playwright, Quality Gate och nattlig worktree-körning är konfigurerade. |
| JOURNAL-010 | done | safe | `JOURNAL-001` till reference | AUTO-001 | Låg kapacitet visar bara skrivytan; normal/hög visar reflektion och historik; separationen från Valvet är alltid synlig; ingen docköverlappning eller overflow. |
| FAMILY-020 | done | review | Barnfokus-kandidat | JOURNAL-010 | Barnfokusfrågor finns kvar som uttryckligt låst flöde; typat manifest och fiktiv mockdata; låg kapacitet minskar innehåll utan att dölja frågorna. |
| ECONOMY-030 | in_progress | safe | Economy-kandidat | JOURNAL-010 | Endast fiktiv mockdata; kognitiv grind i alla lägen; ett tydligt nästa mikrosteg; ingen bank-, API- eller backendkoppling. |
| VAULT-040 | ready | review | Valvet-kandidat | FAMILY-020 | Flikarna Mönster, Orkester, Kunskapsbank och Aktörskarta finns kvar; manuell HITL-promovering är synlig; Journal blandas inte med evidensflödet. |
| WELLBEING-050 | ready | review | Två placeringsvarianter | ECONOMY-030 | Skapa separata namngivna kandidater för Hjärtat och Vardagen; välj ingen vinnare; båda använder samma typade mockdata och manifestgräns. |
| SYSTEM-060 | ready | safe | Tvärmodulär tillgänglighetsrunda | FAMILY-020, ECONOMY-030, VAULT-040, WELLBEING-050 | Alla registrerade vyer klarar touch-, overflow-, kapacitets- och locked-UX-tester; governancefilerna är synkroniserade. |

## Permanenta stoppregler

- Ändra aldrig `Livskompassen3.0` eller skapa beroenden till produktion.
- Använd aldrig verklig användardata, hemligheter, backend, Firebase, auth, PWA eller Capacitor.
- Ändra inte kanoniska platser, Fyren-rollen eller låsta UX-koncept.
- En `review`-post får byggas till draft-PR men aldrig auto-mergas.
- Om acceptanskriterierna inte räcker för ett säkert val: markera posten `blocked`,
  lämna övriga filer orörda och rapportera den minsta nödvändiga beslutspunkten.
