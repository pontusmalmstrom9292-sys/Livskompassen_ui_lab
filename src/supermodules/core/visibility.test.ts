import { describe, expect, it } from 'vitest';
import { getVisibleSectionIds } from '@/supermodules/core/visibility';
import { planningManifest } from '@/supermodules/manifests/planning';

describe('getVisibleSectionIds', () => {
  it('keeps locked sections visible even if a capacity preset omits them', () => {
    const manifest = {
      ...planningManifest,
      capacityModes: {
        ...planningManifest.capacityModes,
        low: planningManifest.capacityModes.low.filter((id) => id !== 'p3-kanban'),
      },
    };

    expect(getVisibleSectionIds(manifest, 'low')).toContain('p3-kanban');
  });

  it('does not add unlocked sections that the capacity preset omits', () => {
    expect(getVisibleSectionIds(planningManifest, 'low')).not.toContain('inbox');
  });
});
