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
    { id: 'vault-tabs', title: 'Valvets flikar', order: 1, visible: true, locked: true },
    { id: 'evidence-summary', title: 'Evidensöversikt', order: 2, visible: true },
    { id: 'promotion-gate', title: 'Manuell promovering', order: 3, visible: true, locked: true },
  ],
  primaryAction: {
    id: 'manual-promotion',
    label: 'Granska och promovera manuellt',
  },
  capacityModes: {
    low: ['vault-tabs', 'promotion-gate'],
    normal: ['vault-tabs', 'evidence-summary', 'promotion-gate'],
    high: ['vault-tabs', 'evidence-summary', 'promotion-gate'],
  },
  lockedFeatures: ['vault-tabs', 'manual-hitl-promotion', 'separate-from-journal-evidence'],
};
