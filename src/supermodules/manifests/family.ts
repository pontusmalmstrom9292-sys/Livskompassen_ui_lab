import type { SuperModuleManifest } from '../core/types';

export const familyManifest: SuperModuleManifest = {
  id: 'family',
  title: 'Familjen',
  zone: 'familjen',
  status: 'candidate',
  layout: 'stack',
  density: 'calm',
  depth: 'soft-3d',
  lockedFeatures: ['barnfokus'],
  sections: [
    { id: 'barnfokus', title: 'Barnfokus', order: 1, visible: true, locked: true },
    { id: 'activities', title: 'Kommande aktiviteter', order: 2, visible: true },
    { id: 'household', title: 'Hushållsstatus', order: 3, visible: true },
  ],
  capacityModes: {
    low: ['barnfokus'],
    normal: ['barnfokus', 'activities', 'household'],
    high: ['barnfokus', 'activities', 'household'],
  },
};
