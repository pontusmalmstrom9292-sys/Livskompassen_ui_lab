export type VaultTabId = 'patterns' | 'orchestra' | 'knowledge-bank' | 'actor-map';

export type VaultTabMock = {
  id: VaultTabId;
  label: string;
  detail: string;
};

export type VaultMock = {
  separationNotice: string;
  nextReview: string;
  promotionGuidance: string;
  tabs: VaultTabMock[];
};

export const vaultMock: VaultMock = {
  separationNotice: 'Evidensflödet är separat från Dagbokens personliga reflektioner.',
  nextReview: 'Granska den fiktiva notisen innan något förs vidare.',
  promotionGuidance: 'En människa granskar alltid underlaget innan det promoveras till Valvet.',
  tabs: [
    {
      id: 'patterns',
      label: 'Mönster',
      detail: 'Fiktivt mönster: återkommande avbrott vid sena eftermiddagar.',
    },
    {
      id: 'orchestra',
      label: 'Orkester',
      detail: 'Fiktiv orkestrering: samla underlag före nästa trygga steg.',
    },
    {
      id: 'knowledge-bank',
      label: 'Kunskapsbank',
      detail: 'Fiktiv kunskap: korta pauser kan minska belastningen före beslut.',
    },
    {
      id: 'actor-map',
      label: 'Aktörskarta',
      detail: 'Fiktiv aktörskarta: Sam, mentor och vårdcentralen kan vara relevanta.',
    },
  ],
};
