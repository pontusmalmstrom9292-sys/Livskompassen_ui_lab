import { PieChart, ShieldCheck, Sparkles } from 'lucide-react';
import { ActionButton } from '@/design-system/components/ActionButton';
import { CalmCard } from '@/design-system/components/CalmCard';
import type { CapacityMode, DensityMode, DepthMode } from '@/design-system/tokens';
import { SuperModuleShell } from '@/supermodules/core/SuperModuleShell';
import { FloatingDock } from '@/components/FloatingDock';
import { economyMock } from '@/mock-data/economy';
import { getVisibleSectionIds } from '@/supermodules/core/visibility';
import { economyManifest } from '@/supermodules/manifests/economy';

type EconomyScreenProps = {
  capacity: CapacityMode;
  density: DensityMode;
  depth: DepthMode;
};

export function EconomyScreen({ capacity, density, depth }: EconomyScreenProps) {
  const visibleSections = getVisibleSectionIds(economyManifest, capacity);

  return (
    <SuperModuleShell
      title="Ekonomi"
      eyebrow="Vardagen"
      density={density}
      depth={depth}
    >
      {visibleSections.has('cognitive-gate') && (
        <CalmCard className="module-card" depth={depth}>
          <div className="flex min-h-12 items-center gap-2 rounded-control border border-line-strong bg-surface-1 px-3 text-xs text-text-secondary">
            <ShieldCheck aria-hidden="true" className="shrink-0 text-accent" size={18} />
            <span>{economyMock.cognitiveGateNotice}</span>
          </div>
        </CalmCard>
      )}

      {visibleSections.has('next-microstep') && (
        <CalmCard className="module-card border-accent/35 bg-surface-3" depth={depth}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-text-muted">
                Nästa mikrosteg
              </p>
              <h2 className="mt-2 text-xl font-semibold text-text-primary">
                {economyMock.nextMicroStep}
              </h2>
              <p className="mt-2 text-xs leading-5 text-text-secondary">
                {economyMock.nextStepDetail}
              </p>
            </div>
            <div className="grid size-14 shrink-0 place-items-center rounded-full border border-line-strong bg-surface-3 text-accent shadow-inset">
              <Sparkles aria-hidden="true" size={22} />
            </div>
          </div>
          <ActionButton className="mt-4 w-full">Gör nästa mikrosteg</ActionButton>
        </CalmCard>
      )}

      {visibleSections.has('budget-overview') && (
        <CalmCard className="module-card" depth={depth}>
          <div className="mb-4 flex items-center gap-2">
            <PieChart aria-hidden="true" size={18} className="text-accent" />
            <h2 className="font-semibold text-text-primary">Fiktiv översikt</h2>
          </div>
          <ul className="divide-y divide-line-subtle">
            {economyMock.overviewItems.map((item) => (
              <li key={item.id} className="flex min-h-12 items-center justify-between py-3 text-sm">
                <span className="text-text-primary">{item.label}</span>
                <span className="text-xs text-text-muted">{item.amount}</span>
              </li>
            ))}
          </ul>
        </CalmCard>
      )}

      <div className="shrink-0 h-24" aria-hidden="true" />
      <FloatingDock active="everyday" />
    </SuperModuleShell>
  );
}
