export type EconomyItemMock = {
  id: string;
  label: string;
  amount: string;
};

export type EconomyMock = {
  cognitiveGateNotice: string;
  nextMicroStep: string;
  nextStepDetail: string;
  overviewItems: EconomyItemMock[];
};

export const economyMock: EconomyMock = {
  cognitiveGateNotice: 'Kognitiv grind: Inga direkta transaktioner eller bankkopplingar.',
  nextMicroStep: 'Granska veckans tre fasta utgifter',
  nextStepDetail: 'Se över de tre fiktiva posterna för att behålla lugn överblick.',
  overviewItems: [
    { id: 'item-1', label: 'Fasta buffertar', amount: 'Fiktiv struktur' },
    { id: 'item-2', label: 'Planerade inköp', amount: 'Fiktiv struktur' },
    { id: 'item-3', label: 'Veckans överblick', amount: 'Ingen bankdata' },
  ],
};
