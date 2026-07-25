import { Plus } from 'lucide-react';
import { ActionButton } from '@/design-system/components/ActionButton';
import { CalmCard } from '@/design-system/components/CalmCard';
import type { CapacityMode, DensityMode, DepthMode } from '@/design-system/tokens';
import { SuperModuleShell } from '@/supermodules/core/SuperModuleShell';
import { FloatingDock } from '@/components/FloatingDock';
import { planningMock } from '@/mock-data/planning';
import { getVisibleSectionIds } from '@/supermodules/core/visibility';
import { planningManifest } from '@/supermodules/manifests/planning';

type PlanningScreenProps = {
  capacity: CapacityMode;
  density: DensityMode;
  depth: DepthMode;
};

export function PlanningScreen({ capacity, density, depth }: PlanningScreenProps) {
  const visibleSections = getVisibleSectionIds(planningManifest, capacity);
  const itemLimit: Record<CapacityMode, number> = { low: 1, normal: 2, high: 3 };
  const capacityLabel: Record<CapacityMode, string> = {
    low: 'Låg – bara det viktigaste',
    normal: 'Normal – balanserad vy',
    high: 'Hög – mer sammanhang',
  };

  return (
    <SuperModuleShell
      title="Planering"
      eyebrow="Vardagen"
      density={density}
      depth={depth}
    >
      {visibleSections.has('capacity') && (
        <CalmCard className="module-card" depth={depth}>
          <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Kapacitetsläge</p>
          <p className="mt-2 text-sm font-semibold text-accent">{capacityLabel[capacity]}</p>
        </CalmCard>
      )}

      {visibleSections.has('next-step') && (
        <CalmCard className="module-card" depth={depth}>
          <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Nästa steg</p>
          <h2 className="mt-2 text-xl font-semibold">{planningMock.nextStep}</h2>
          {capacity !== 'low' && (
            <p className="mt-2 text-sm text-text-secondary">{planningMock.guidance}</p>
          )}
        </CalmCard>
      )}

      {visibleSections.has('p3-kanban') && (
        <section aria-labelledby="p3-title">
          <div className="mb-3 flex min-h-12 items-center justify-between gap-3">
            <h2 id="p3-title" className="text-sm font-semibold">
              P3 Kanban
            </h2>
            <span className="rounded-full border border-line-strong px-3 py-1 text-xs text-accent">
              Låst kärnflöde
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {planningMock.columns.map((column) => (
              <CalmCard key={column.id} className="module-card" depth={depth}>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.12em]">
                    {column.title}
                  </h3>
                  <span className="text-xs text-text-muted">{column.items.length}</span>
                </div>
                <div className="space-y-2">
                  {column.items.slice(0, itemLimit[capacity]).map((item) => (
                    <article
                      key={item}
                      className="rounded-control border border-line-subtle bg-surface-1 p-3 text-xs leading-5"
                    >
                      {item}
                    </article>
                  ))}
                </div>
              </CalmCard>
            ))}
          </div>
        </section>
      )}

      {visibleSections.has('inbox') && (
        <CalmCard className="module-card" depth={depth}>
          <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Inkorg</p>
          <p className="mt-2 text-sm text-text-secondary">
            {planningMock.inboxCount} mockade poster väntar på sortering.
          </p>
        </CalmCard>
      )}

      <ActionButton className="w-full">
        <Plus aria-hidden="true" className="mr-2 inline" size={18} />
        Ny uppgift
      </ActionButton>

      <FloatingDock active="everyday" />
    </SuperModuleShell>
  );
}
