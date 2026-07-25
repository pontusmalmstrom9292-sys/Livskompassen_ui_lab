import type { SuperModuleManifest } from '@/supermodules/core/types';

export const homeManifest: SuperModuleManifest = {
  id: 'home',
  title: 'Den Trygga Hamnen',
  zone: 'hjartat',
  status: 'configurable',
  layout: 'focus',
  density: 'calm',
  depth: 'soft-3d',
  sections: [
    { id: 'anchor', title: 'Dagens ankare', order: 1, visible: true },
    { id: 'next-step', title: 'Nästa mikrosteg', order: 2, visible: true },
    { id: 'daily-steps', title: 'Dagens steg', order: 3, visible: true },
    { id: 'quick-capture', title: 'Snabbstart', order: 4, visible: true },
    { id: 'capacity', title: 'Kapacitet', order: 5, visible: true },
  ],
  primaryAction: {
    id: 'quick-note',
    label: 'Ny anteckning',
  },
  capacityModes: {
    low: ['anchor', 'next-step', 'quick-capture'],
    normal: ['anchor', 'next-step', 'daily-steps', 'quick-capture', 'capacity'],
    high: ['anchor', 'next-step', 'daily-steps', 'quick-capture', 'capacity'],
  },
  lockedFeatures: [],
};
