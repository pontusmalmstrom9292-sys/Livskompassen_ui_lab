# Livskompassen UI Lab — MASTER-HANDOFF (v2-kontext)

**Datum:** 2026-07-29  
**Underlag:** tillgänglig originalchatt, lokalt repo `Livskompassen_ui_lab` och GitHub-status läst 2026-07-29.  
**Syfte:** fristående överlämning utan att blanda verifierade fakta med beslut, förslag eller antaganden.

## Lässtatus

Följande etiketter används genomgående:

- **VERIFIERAT I REPO** — finns i nuvarande checkout eller kan reproduceras från repo/GitHub-läsning.
- **BESLUTAT I CHATT** — uttryckligen sagt eller godkänt i chatten, men behöver inte ha landat i repo.
- **FÖRSLAG EJ AKTIVERAT** — möjlig nästa riktning, inte ett godkänt genomförande.
- **EJ VERIFIERAT** — saknas i tillgängligt repo-/chatunderlag eller har motstridiga källor.

Detta dokument är själv den enda avsiktliga filändringen i den aktuella handoff-körningen. Ingen kod, commit, push, merge eller deploy har gjorts.

## 1. Produkt- och repoavgränsning

### VERIFIERAT I REPO

`Livskompassen_ui_lab` är ett isolerat React/TypeScript/Vite/Tailwind-laboratorium. Det är inte produktionsappen och har enligt `AGENTS.md` absoluta gränser mot `Livskompassen3.0`:

- ingen import, länk eller kopiering från produktion;
- ingen Firebase, backend, Cloud Functions, produktions-API, auth, Capacitor eller PWA;
- endast typad, fiktiv mockdata;
- UI Lab-artefakter är lokala referenser och inte automatiskt produktionsgodkända.

De kanoniska platserna är Hjärtat, Familjen, Vardagen och Valvet. Fyren är ett bakgrundssystem för kapacitet, dagsform, gating och komplexitetsreduktion; den ska inte bli en femte destination.

### BESLUTAT I CHATT

Arbete ska följa repoets `AGENTS.md` bokstavligt, bevara befintliga ändringar och inte bredda scope utan uttryckligt godkännande. Produktionsarbete ska hållas separat från UI Lab.

## 2. Systemfas, aktivt program och FUT-status

### VERIFIERAT I REPO

Detta repo innehåller UI Lab-autopilotens backlogg, inte Livskompassen v2:s systemfas eller ett dokumenterat FUT-program. Ingen `PROJECT_STATE.md`, `ROADMAP.md`, `TODO.md`, `DASHBOARD.md` eller FUT-register finns i denna checkout.

### FUT-07 och FUT-08

| Objekt | Status | Evidens | Slutsats |
|---|---|---|---|
| FUT-07 | **EJ VERIFIERAT** | Ingen träff i repo eller tillgänglig chatthistorik | Ingen status, ägare, gate eller leverans får antas |
| FUT-08 | **EJ VERIFIERAT** | Ingen träff i repo eller tillgänglig chatthistorik | Ingen status, ägare, gate eller leverans får antas |

### Systemfas / aktivt program

| Påstående | Klassning |
|---|---|
| Systemfasens namn, gate och exit-kriterier för v2 | **EJ VERIFIERAT** |
| Aktivt program och programägare | **EJ VERIFIERAT** |
| Fas 24 och G85 som systemfas-/gatekontext | **EJ VERIFIERAT I DETTA REPO**; förekommer endast i äldre minneskontext och måste bekräftas mot rätt produktrepo |
| Deploy som `SKIP` pending Pontus approval | **EJ VERIFIERAT I DETTA REPO**; får inte behandlas som aktuell deployinstruktion utan återbekräftelse |

**Stopregel:** någon som tar över v2 måste först tillhandahålla den kanoniska systemfasfilen och en verifierad FUT-07/FUT-08-status innan programstatus eller gates uppdateras.

## 3. Beslut, planer och ändrade riktningar i den tillgängliga chatten

### BESLUTAT I CHATT

1. Börja med nuläge, repoidentitet, backlogg och kvalitetsgrind innan implementation.
2. UI Lab ska arbeta i separat worktree och inte direkt på `main`.
3. En autopilotkörning får hantera exakt en backloggpost.
4. Efter ändringar krävs typecheck, build, enhetstester och relevant E2E-kontroll.
5. `safe`-poster kan auto-mergas först efter godkänd Quality Gate; `review`-poster ska lämnas som draft PR.
6. Locked UX får inte tas bort eller döljas: Barnfokus, P3 Kanban, Valvets fyra flikar, manuell HITL-promovering, Journal/evidens-separation och kognitiv capacity gating.
7. När den inbäddade ignorerade projektkopian orsakade testupptäckt togs den bort från den lokala miljön. Root-projektet validerades därefter.
8. På användarens “okej kör” valdes Economy-arbetet som nästa konkreta riktning, trots att backloggens status var inkonsekvent.
9. En Economy-implementation skapades därefter i en isolerad temporär worktree, men den levererades aldrig till root-repot.
10. Den aktuella handoff-begäran stoppar all implementation och kräver endast detta dokument.

### Ändrad riktning / konflikt

Backloggen säger att autopiloten ska ta första `ready`-posten vars beroenden är `done`. Samtidigt stod `ECONOMY-030` som `in_progress`, medan `VAULT-040` var första `ready`-post. Chattens riktning blev ändå att fortsätta Economy. Det var ett medvetet scopeval i chatten men inte en ren backloggtransition.

## 4. UI Lab-programmets verifierade status

### VERIFIERAT I REPO

Aktuell `docs/AUTOPILOT_BACKLOG.md`:

| ID | Status i aktuell root | Mergeklass | Vad som krävs |
|---|---|---|---|
| AUTO-001 | `done` | safe | grund, Vitest, Playwright, Quality Gate och worktree-flöde |
| JOURNAL-010 | `done` | safe | Journal reference, kapacitetslägen och Valv-separation |
| FAMILY-020 | `done` | review | Barnfokus-kandidat, fiktiv data och låst frågor |
| ECONOMY-030 | `in_progress` | safe | Economy-kandidat med fiktiv data, kognitiv grind och nästa mikrosteg |
| VAULT-040 | `ready` | review | fyra Valv-flikar och synlig HITL-promovering |
| WELLBEING-050 | `ready` | review | två namngivna placeringsvarianter, ingen vinnare vald |
| SYSTEM-060 | `ready` | safe | tvärmodulär accessibility/overflow/capacity/locked-UX-runda |

### Economy-försöket

**VERIFIERAT I CHATTENS KÖRLOGG, EJ LEVERERAT I ROOT-REPO:**

- planerade filer: `src/mock-data/economy.ts`, `src/supermodules/manifests/economy.ts`, `src/screens/economy/EconomyScreen.tsx`, Studio-koppling, governance och E2E;
- designintention: kognitiv grind synlig i alla kapacitetslägen, ett tydligt nästa mikrosteg, mer sammanhang först vid normal/hög kapacitet och inga bank-/API-/backendkopplingar;
- temporär körning rapporterade 9 Vitest-tester, godkänd typecheck/build och 18/18 E2E efter utökad Chromium-behörighet;
- worktreen var temporär och är inte längre tillgänglig; inga av dessa filer finns i aktuell root-branch;
- `ECONOMY-030` ska därför **inte** markeras som levererad eller verifierad från denna körlogg.

## 5. PR:er, brancher, commits och verifieringar

### VERIFIERAT I REPO/GITHUB-LÄSNING

| PR | Titel | Branch | Status | Commit / verifiering |
|---:|---|---|---|---|
| #12 | Integrate outstanding UI Lab branches | `codex/integrate-all-branches` | MERGED | `ebde363` i `origin/main` |
| #11 | Resolve backlog status merge conflict | `codex/autopilot-economy-030` | OPEN | `41a94f9`; ändrar backloggstatus och lägger till `Livskompassen_ui_lab` som gitlink; Quality Gate rapporterad SUCCESS, men PR:n är inte Economy-implementation |
| #10 | feat(family): FAMILY-020 Barnfokus-kandidat | `codex/autopilot-family-020` | MERGED | `78c3a72` / integrerade commits |
| #9 | feat: JOURNAL-010 reference design | `codex/autopilot-journal-010` | MERGED | `ce94587` / integrerad commit |
| #8 | Finalize UI Lab and Home mobile refinement | `codex/ui-lab-finalize` | MERGED | äldre UI Lab-finalisering |
| #1 | Add governed UI Lab autopilot foundation | `codex/ui-lab-autopilot` | MERGED | `1f617e5` / senare refinement `a3637eb` |
| #5, #6, #7 | Dependabot-uppdateringar | Dependabot-brancher | OPEN | status läst 2026-07-29 |

Aktuell checkout:

- root-branch: `main` på `53f8231` (`fix(build): complete Tailwind 4 migration`);
- `origin/main`: `ebde363` (`chore: integrate outstanding UI Lab branches`), alltså nyare än lokal root;
- `codex/autopilot-economy-030`: `41a94f9`;
- `codex/autopilot-family-020`: `1d17787`;
- `codex/autopilot-journal-010`: `ce94587`;
- ingen PR skapades för det temporära Economy-försöket;
- den tidigare recovery-worktreen är prunable/ej tillgänglig och ska inte betraktas som leverans.

### Verifieringar

**VERIFIERAT I CHATTENS KÖRLOGG:** root-baseline efter rensning passerade 7 Vitest-tester, typecheck/build och 15/15 E2E när Chromium kördes med nödvändig behörighet. Den första E2E-körningen i sandlådan föll på macOS Mach-portåtkomst före testassertioner.

**EJ VERIFIERAT NU:** att aktuell `main` efter eventuell fjärrsynk fortfarande har samma testresultat. Handoff-körningen gjorde ingen synk och ingen kodändring.

## 6. PMIR-, WORM-, silo-, DCAP-, Zero Footprint-, Locked UX- och Titanium-regler

### VERIFIERAT SOM STOPPINTENTION I TILLGÄNGLIG POLICY/MINNESKONTEXT

Följande behandlas som skyddsräcken tills den kanoniska v2-policyfilen har verifierats:

- **PMIR:** produktionsnära eller säkerhets-/governancekänsliga ändringar kräver uttryckligt PMIR-/produktgodkännande; tester auktoriserar inte i sig en ändring.
- **WORM:** styrande eller bevisbärande material ska inte skrivas över godtyckligt; ändringar ska vara spårbara och append-/review-baserade enligt den kanoniska definitionen.
- **Silo:** separera de tre silorna och skapa ingen otillåten tvärkoppling. Exakt namn och datagräns måste bekräftas i v2:s policy.
- **DCAP before LLM:** kapacitets-/åtkomstkontroll ska ske före LLM-anrop. Inga LLM-anrop finns i UI Lab.
- **Zero Footprint:** inga produktionsspår, verklig användardata, hemligheter, bakdörrar eller produktionsberoenden får lämnas av UI Lab-arbete.
- **Locked UX:** låsta kärnflöden får bevaras och visualiseras men inte tas bort, döpas om eller göras valbara utan PMIR/uttryckligt godkännande.

### EJ VERIFIERAT

- exakt PMIR-akronym, beslutsmall, approverlista och versionsnummer;
- exakt WORM-implementationskrav;
- siloernas kanoniska namn, lagringsgränser och dataflöden;
- DCAP:s trösklar, policyfil och runtime-mekanism;
- officiell Zero Footprint-checklista;
- **Titanium-regeln:** termen förekommer inte i nuvarande UI Lab-repo eller tillgänglig chatthistorik. Ingen definition får uppfinnas här.

## 7. Kostnader, krediter och verktygsordning

### VERIFIERAT I REPO

UI Lab använder lokala npm-skript, Vitest, Playwright, Vite och TypeScript. Repoet innehåller ingen Google AI Pro-, GCP-, Firebase- eller produktions-API-konfiguration.

### EJ VERIFIERAT

- vilka Google AI Pro-förmåner eller GCP-krediter som gäller;
- kreditbelopp, utgångsdatum, projekt-ID, budgetalerts eller godkänd spend;
- om någon modell-, bild-, video- eller notebook-tjänst får köras mot krediter;
- kostnadsgräns per agent, körning eller leverans;
- om Flow och NotebookLM är godkända för v2-material.

### FÖRSLAG EJ AKTIVERAT: säker verktygsordning

1. Läs kanonisk state-/governancekälla.
2. Kontrollera repo, branch och silo-/locked-UX-gränser.
3. Gör billig lokal analys och typcheck.
4. Kör deterministiska tester och relevanta E2E-tester.
5. Använd dyra externa modeller/visualiseringar först när scope och kreditbudget är uttryckligen godkända.
6. Dokumentera kostnad, källa, artefakt och reversibilitet.
7. Ingen deploy eller produktionskoppling utan separat PMIR/explicit approval.

## 8. Roller och ansvar

### VERIFIERAT / BESLUTAT

- **Codex:** arbetande agent i denna chatt; ska följa AGENTS.md, göra avgränsade ändringar och rapportera evidens.
- **UI Lab-autopilot:** styrd implementation av exakt en ready-backlogpost i isolerad worktree med typed mockdata, tester och guarded delivery.

### EJ VERIFIERAT

- **Antigravity:** ingen verifierad roll, behörighet eller handoff-kontrakt i repoet.
- **Cursor:** PR #11 har en rapporterad “Cursor Approval Agent”-check med `NEUTRAL`; ingen kanonisk v2-roll är dokumenterad.
- **Android Studio:** ingen verifierad roll eller branch.
- **Flow:** ingen verifierad roll, export- eller kostnadspolicy.
- **NotebookLM:** ingen verifierad roll, datakälla eller retention-policy.

Föreslagna roller får inte behandlas som delegerad åtkomst eller godkännande förrän en v2-owner dokumenterar dem.

## 9. Klart, pausat, blockerat och föreslaget

### VERIFIERAT KLART

- UI Lab-grunden, Journal- och Family-milstolparna är integrerade enligt backlogg/GitHub-status.
- Root-baseline kunde valideras efter borttagning av den lokala dubblerade projektkopian.
- Isolerings- och locked-UX-reglerna finns i `AGENTS.md` och UI Lab-dokumenten.

### PAUSAT / EJ LEVERERAT

- Economy-implementationen från den temporära worktreen.
- Alla v2-systemfas- och FUT-leveranser som inte finns i detta repo.
- PR #11: öppen, konflikt-/gitlink-relaterad och inte en godkänd Economy-leverans.

### BLOCKERAT

- Verifierad status för FUT-07/FUT-08 saknas.
- Systemfas, aktivt program, ägare och exit-gates för v2 saknas.
- Titanium-, kostnads-, kredit- och verktygsregler saknar kanonisk källa.
- Att skapa en produktionsklar v2-leverans vore scopeöverskridande från detta UI Lab-repo.

### FÖRSLAG EJ AKTIVERAT

- skapa ett separat v2-state-/governancepaket med owner, version och beslutslogg;
- reparera eller stäng PR #11 efter uttryckligt beslut om gitlink och backloggstatus;
- implementera Economy på nytt som en ren, granskningsbar branch enligt `ECONOMY-030`;
- därefter följa backloggordningen: VAULT-040, WELLBEING-050, SYSTEM-060;
- skapa en v2-cost ledger och tool-permission matrix innan externa AI-tjänster används.

## 10. Exakt autonomimodell

### Agenten får göra själv inom godkänt scope

- läsa repo, brancher, docs, tester och lokala GitHub-metadata;
- skapa en isolerad worktree för en uttryckligen vald UI Lab-backlogpost;
- skriva typad fiktiv mockdata och återanvända befintligt designsystem;
- lägga till deterministiska Vitest-/Playwright-tester;
- köra typecheck, build, test och relevant lokal runtimekontroll;
- uppdatera backlogg, register, katalog och changelog när objektiva acceptanskriterier är uppfyllda;
- skapa commit/branch och förbereda rapport enligt godkänd leveransmodell, när användaren uttryckligen har bett om ändringen.

### Agenten måste stoppa och rapportera

- när acceptance criteria eller ägarskap är tvetydiga;
- när en post är `in_progress` utan verifierad ägare eller när ordningen motsäger backloggen;
- före ändring av produktion, Firebase/backend/API/auth, silo-/WORM-/DCAP-regler, säkerhetsregler, locked UX eller kanoniska zoner;
- före användning av verklig data, hemligheter, externa krediter eller oklara kostnader;
- när PMIR eller explicit produktgodkännande krävs;
- vid test-/build-/E2E-fel som inte kan förklaras och avgränsas;
- när browser-, nätverks- eller behörighetsfel gör att verifiering inte kan påstås;
- före deploy, merge, auto-merge, PR-skapande eller push om användarens aktuella instruktion inte uttryckligen omfattar det;
- när ett resultat bara finns i en temporär worktree och inte i den deklarerade root-branchen.

### Safe kontra review

- `safe`: får endast auto-mergas om alla policyvillkor, tester, scope- och diffkontroller är gröna.
- `review`: ska bli draft PR och stanna där tills mänsklig granskning är klar.
- UI Lab får aldrig användas som implicit produktionsgodkännande.

## 11. Nästa säkra steg

1. En v2-ägare verifierar och länkar systemfas, aktivt program, FUT-07/FUT-08, PMIR, WORM, silo, DCAP, Zero Footprint och Titanium.
2. Ägaren anger vilka kostnader, krediter och verktyg som faktiskt är godkända.
3. Separat från denna handoff: besluta om PR #11 ska stängas/repareras och om Economy ska implementeras om i en ren branch.
4. Kör aktuell root-baseline igen från aktuell `origin/main` före nästa UI Lab-milstolpe.
5. Fortsätt endast efter explicit val av nästa backloggpost och dess leveransklass.

## 12. Kort överlämningsstatus

**Det som kan sägas säkert:** UI Lab är isolerat, Journal och Family är integrerade, backloggen är styrd, PR #11 är öppen men inte en Economy-leverans, och den temporära Economy-körningen saknar beständig leverans. V2:s systemfas, FUT-07/FUT-08, Titanium, kostnadskrediter och externa roller är inte verifierade och måste fyllas från en kanonisk källa innan någon agent tar autonoma v2-beslut.
