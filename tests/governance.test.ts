import { describe, expect, it } from 'vitest';
import { capacityModes, moduleZones } from '@/design-system/tokens';
import { getVisibleSectionIds } from '@/supermodules/core/visibility';
import { homeManifest } from '@/supermodules/manifests/home';
import { journalManifest } from '@/supermodules/manifests/journal';
import { planningManifest } from '@/supermodules/manifests/planning';
import { vaultManifest } from '@/supermodules/manifests/vault';

const manifests = [homeManifest, planningManifest, journalManifest, vaultManifest];

describe('SuperModule governance', () => {
  it('keeps Fyren outside the canonical product zones', () => {
    expect(moduleZones).toEqual(['hjartat', 'familjen', 'vardagen', 'valvet']);
    expect(moduleZones).not.toContain('fyren');
  });

  it.each(manifests)('$id has valid, ordered and capacity-safe sections', (manifest) => {
    const sectionIds = manifest.sections.map((section) => section.id);
    const sectionOrders = manifest.sections.map((section) => section.order);

    expect(moduleZones).toContain(manifest.zone);
    expect(new Set(sectionIds).size).toBe(sectionIds.length);
    expect(new Set(sectionOrders).size).toBe(sectionOrders.length);
    expect(sectionOrders).toEqual([...sectionOrders].sort((a, b) => a - b));

    for (const capacity of capacityModes) {
      for (const configuredId of manifest.capacityModes[capacity]) {
        expect(sectionIds).toContain(configuredId);
      }

      for (const lockedSection of manifest.sections.filter((section) => section.locked)) {
        expect(getVisibleSectionIds(manifest, capacity)).toContain(lockedSection.id);
      }
    }
  });

  it('preserves the explicitly locked P3 and Journal boundaries', () => {
    expect(planningManifest.lockedFeatures).toContain('p3-kanban');
    expect(journalManifest.lockedFeatures).toContain('separate-from-vault');
  });

  it('preserves Valvet tabs, manual promotion and its separation from Journal', () => {
    expect(vaultManifest.lockedFeatures).toEqual(
      expect.arrayContaining([
        'vault-tabs',
        'manual-hitl-promotion',
        'separate-from-journal-evidence',
      ]),
    );
    expect(getVisibleSectionIds(vaultManifest, 'low')).toContain('vault-tabs');
    expect(getVisibleSectionIds(vaultManifest, 'low')).toContain('promotion-gate');
  });
});
