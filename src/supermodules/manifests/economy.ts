import type { SuperModuleManifest } from '@/supermodules/core/types';

export const economyManifest: SuperModuleManifest = {
  id: 'economy',
  title: 'Ekonomi',
  zone: 'vardagen',
  status: 'candidate',
  layout: 'dashboard',
  density: 'calm',
  depth: 'soft-3d',
  sections: [
    { id: 'cognitive-gate', title: 'Kognitiv grind', order: 1, visible: true, locked: true },
    { id: 'next-microstep', title: 'Nästa mikrosteg', order: 2, visible: true },
    { id: 'budget-overview', title: 'Fiktiv ekonomiöversikt', order: 3, visible: true },
  ],
  primaryAction: {
    id: 'review-step',
    label: 'Gör nästa mikrosteg',
  },
  capacityModes: {
    low: ['cognitive-gate', 'next-microstep'],
    normal: ['cognitive-gate', 'next-microstep', 'budget-overview'],
    high: ['cognitive-gate', 'next-microstep', 'budget-overview'],
  },
  lockedFeatures: ['cognitive-gate', 'no-bank-api-connection'],
};
