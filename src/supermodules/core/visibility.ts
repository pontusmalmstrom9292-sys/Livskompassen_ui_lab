import type { CapacityMode } from '@/design-system/tokens';
import type { SuperModuleManifest } from '@/supermodules/core/types';

export function getVisibleSectionIds(
  manifest: SuperModuleManifest,
  capacity: CapacityMode,
): ReadonlySet<string> {
  const configuredIds = manifest.capacityModes[capacity];
  const lockedIds = manifest.sections
    .filter((section) => section.locked)
    .map((section) => section.id);

  return new Set([...configuredIds, ...lockedIds]);
}
