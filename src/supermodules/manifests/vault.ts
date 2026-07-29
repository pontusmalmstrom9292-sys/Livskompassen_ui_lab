import type { SuperModuleManifest } from '@/supermodules/core/types';

export const vaultManifest: SuperModuleManifest = {
  id: 'vault',
  title: 'Valvet',
  zone: 'valvet',
  status: 'candidate',
  layout: 'stack',
  density: 'calm',
  depth: 'soft-3d',
  sections: [
    { id: 'promotion-gate', title: 'Manuell promovering', order: 1, visible: true, locked: true },
    { id: 'vault-tabs', title: 'Valvets flikar', order: 2, visible: true, locked: true },
    { id: 'evidence-summary', title: 'Evidensöversikt', order: 3, visible: true },
  ],
  primaryAction: {
    id: 'manual-promotion',
    label: 'Granska och promovera manuellt',
  },
  capacityModes: {
    low: ['promotion-gate', 'vault-tabs'],
    normal: ['promotion-gate', 'vault-tabs', 'evidence-summary'],
    high: ['promotion-gate', 'vault-tabs', 'evidence-summary'],
  },
  lockedFeatures: ['vault-tabs', 'manual-hitl-promotion', 'separate-from-journal-evidence'],
};
