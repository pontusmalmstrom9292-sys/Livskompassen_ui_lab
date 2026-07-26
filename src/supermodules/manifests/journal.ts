import type { SuperModuleManifest } from '@/supermodules/core/types';

export const journalManifest: SuperModuleManifest = {
  id: 'journal',
  title: 'Dagbok',
  zone: 'hjartat',
  status: 'reference',
  layout: 'writing',
  density: 'calm',
  depth: 'soft-3d',
  sections: [
    { id: 'current-reflection', title: 'Dagens reflektion', order: 1, visible: true },
    { id: 'writing-surface', title: 'Skrivyta', order: 2, visible: true },
    { id: 'recent-entries', title: 'Senaste inlägg', order: 3, visible: true },
  ],
  primaryAction: {
    id: 'new-entry',
    label: 'Ny anteckning',
  },
  capacityModes: {
    low: ['writing-surface'],
    normal: ['current-reflection', 'writing-surface', 'recent-entries'],
    high: ['current-reflection', 'writing-surface', 'recent-entries'],
  },
  lockedFeatures: ['separate-from-vault'],
};
