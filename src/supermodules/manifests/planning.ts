import type { SuperModuleManifest } from '@/supermodules/core/types';

export const planningManifest: SuperModuleManifest = {
  id: 'planning',
  title: 'Planering',
  zone: 'vardagen',
  status: 'locked',
  layout: 'kanban',
  density: 'balanced',
  depth: 'soft-3d',
  sections: [
    { id: 'capacity', title: 'Kapacitet', order: 1, visible: true },
    { id: 'next-step', title: 'Nästa steg', order: 2, visible: true },
    { id: 'p3-kanban', title: 'P3 Kanban', order: 3, visible: true, locked: true },
    { id: 'inbox', title: 'Inkorg', order: 4, visible: true },
  ],
  primaryAction: {
    id: 'new-task',
    label: 'Ny uppgift',
  },
  capacityModes: {
    low: ['capacity', 'next-step', 'p3-kanban'],
    normal: ['capacity', 'next-step', 'p3-kanban'],
    high: ['capacity', 'next-step', 'p3-kanban', 'inbox'],
  },
  lockedFeatures: ['p3-kanban'],
};
