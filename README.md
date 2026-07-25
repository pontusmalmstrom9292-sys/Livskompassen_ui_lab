# Livskompassen UI Lab v0.2

Ett helt fristående frontend- och designlaboratorium byggt med React, TypeScript,
Vite, Tailwind och typad mockdata.

## Syfte

Här testas designsystem, navigation, SuperModules, kapacitetsanpassning och
visuella varianter innan något övervägs för produktionsappen.

## Starta lokalt

Node.js och npm krävs. Installera beroenden och starta Vites lokala
utvecklingsserver:

```bash
npm install
npm run dev
```

Öppna sedan den lokala adress som Vite visar, normalt
`http://localhost:5173`.

Verifiera en ändring med:

```bash
npm run typecheck
npm run build
```

## Använd Studio

Studio-panelen styr telefonpreviewn i realtid:

- **Modul:** växlar mellan Home, Planning och Journal.
- **Kapacitet:** `low`, `normal` eller `high`. Låg kapacitet visar färre
  uppgifter och handlingar, men döljer aldrig låsta kärnflöden.
- **Täthet:** `calm`, `balanced` eller `full` ändrar mellanrum och kortens
  kompakthet.
- **Djup:** `flat`, `soft-3d` eller `instrument` ändrar elevation, skuggor och
  strukturella linjer.

Telefonpreviewn är responsiv upp till 390 px och innehåller den gemensamma
FloatingDock-navigationen.

## Referensmoduler

1. **Home** — Den Trygga Hamnen med ankare, nästa mikrosteg och snabbstart.
2. **Planning** — kapacitetsanpassad planering där P3 Kanban är ett låst
   kärnflöde.
3. **Journal** — lugn skrivyta som alltid hålls separerad från Valvets
   evidensflöden.

## Struktur

- `docs/` — Design Bible, UI Laws, Module Registry och övrig governance.
- `src/design-system/` — tokens och återanvändbara primitiver.
- `src/components/` — delade UI-byggblock.
- `src/studio/` — kontroller och telefonpreview.
- `src/supermodules/` — typade manifest, skal och låst synlighetslogik.
- `src/screens/` — Home, Planning och Journal.
- `src/mock-data/` — all demonstrationsdata, explicit typad och fiktiv.

## Arkitekturgräns mot Livskompassen3.0

UI Lab är inte produktionsappen och har ingen kör- eller kodberoende relation
till `Livskompassen3.0`. Kod, filer, stores och data får aldrig importeras,
kopieras eller länkas därifrån. Firebase, backend, produktions-API:er,
autentisering, Capacitor, PWA-funktioner, hemligheter och verklig användardata
är uttryckligen förbjudna.

En design eller komponent i detta repo är endast en lokal referens tills den
har granskats och beslutats separat för produktion.
