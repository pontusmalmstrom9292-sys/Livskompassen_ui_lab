# Changelog

## v0.2 — lokal stabilisering (2026-07-25)

- Rättade Vite/TypeScript-projektreferenserna med `noEmit`, Node-typer och
  ESM-säker aliasupplösning för `@/`.
- Återställde Tailwinds koppling till samtliga färg-, linje-, skugg- och
  radietokens samt tog bort ersättningsbara hårdkodade färger.
- Gjorde Studio responsivt runt 390 px och gav alla kontroller minst 48 px
  touchyta, synliga focus states och tydliga aktiva tillstånd.
- Kopplade kapacitetslägen till typade manifest och mockdata. Låg kapacitet
  reducerar synligt innehåll, medan hög kapacitet visar mer sammanhang.
- Säkrade låst P3 Kanban i alla kapacitetslägen och gjorde Journals separation
  från Valvets evidensflöden permanent synlig.
- Förankrade FloatingDock i telefonpreviewn och förbättrade dess semantik.
- Gjorde FloatingDock flödesmedveten och kompaktare så att primärhandlingar
  inte täcks, utan att minska navigationsknapparnas touchytor.
- Uppdaterade lokal start-, Studio- och isoleringsdokumentation.

## v0.2

- Added shared SuperModuleShell
- Added configurable Home, Planning and Journal previews
- Added working capacity, density and depth controls
- Added FloatingDock component
- Low-capacity mode now reduces visible content
- Added first P3 Kanban visual reference
- Added first calm journal writing surface
