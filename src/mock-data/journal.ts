export type JournalEntryMock = {
  id: string;
  title: string;
};

export type JournalMock = {
  reflectionPrompt: string;
  reflectionGuidance: string;
  placeholder: string;
  entries: JournalEntryMock[];
};

export const journalMock: JournalMock = {
  reflectionPrompt: 'Vad behöver få lämna huvudet idag?',
  reflectionGuidance: 'Skriv fritt. Ingenting behöver bli perfekt eller färdigt.',
  placeholder: 'Skriv det som finns inom dig...',
  entries: [
    { id: 'entry-1', title: 'Tacksam för lugnet' },
    { id: 'entry-2', title: 'Kvällspromenaden' },
    { id: 'entry-3', title: 'Ett svårt samtal' },
  ],
};
