import { Calendar, Info, LockKeyhole } from 'lucide-react';
import { ActionButton } from '@/design-system/components/ActionButton';
import { CalmCard } from '@/design-system/components/CalmCard';
import type { CapacityMode, DensityMode, DepthMode } from '@/design-system/tokens';
import { SuperModuleShell } from '@/supermodules/core/SuperModuleShell';
import { FloatingDock } from '@/components/FloatingDock';
import { familyMock } from '@/mock-data/family';
import { getVisibleSectionIds } from '@/supermodules/core/visibility';
import { familyManifest } from '@/supermodules/manifests/family';

type FamilyScreenProps = {
  capacity: CapacityMode;
  density: DensityMode;
  depth: DepthMode;
};

export function FamilyScreen({ capacity, density, depth }: FamilyScreenProps) {
  const visibleSections = getVisibleSectionIds(familyManifest, capacity);

  return (
    <SuperModuleShell
      title="Familjen"
      eyebrow="Familjen"
      density={density}
      depth={depth}
    >
      {visibleSections.has('barnfokus') && (
        <CalmCard className="module-card" depth={depth}>
          <div className="mb-4 flex min-h-12 items-center gap-2 rounded-control border border-line-strong bg-surface-1 px-3 text-xs text-text-secondary">
            <LockKeyhole aria-hidden="true" className="shrink-0 text-accent" size={17} />
            <span>Barnfokus - alltid synligt</span>
          </div>
          {familyMock.children.map((child) => (
            <div key={child.id} className="mb-6 last:mb-0">
              <h2 className="mb-4 font-display text-2xl">{child.name}</h2>
              <div className="space-y-4">
                {child.questions.map((q) => (
                  <div key={q.id} className="rounded-control border border-line-subtle bg-surface-1 p-4">
                    <p className="mb-3 text-sm font-semibold text-text-primary">{q.question}</p>
                    <div className="flex flex-wrap gap-2">
                      {q.options.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          className="flex min-h-12 items-center justify-center rounded-full border border-line-subtle bg-surface-2 px-4 py-2 text-sm text-text-secondary transition hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <ActionButton className="mt-6 w-full">Spara svar</ActionButton>
        </CalmCard>
      )}

      {visibleSections.has('activities') && (
        <CalmCard className="module-card" depth={depth}>
          <div className="mb-4 flex items-center gap-2">
            <Calendar aria-hidden="true" size={18} className="text-accent" />
            <h2 className="font-semibold">Kommande aktiviteter</h2>
          </div>
          <ul className="divide-y divide-line-subtle">
            {familyMock.upcomingActivities.map((act) => (
              <li key={act.id} className="flex min-h-12 items-center justify-between py-3 text-sm">
                <span>{act.title}</span>
                <span className="text-text-muted">{act.time}</span>
              </li>
            ))}
          </ul>
        </CalmCard>
      )}

      {visibleSections.has('household') && (
        <CalmCard className="module-card" depth={depth}>
          <div className="mb-2 flex items-center gap-2">
            <Info aria-hidden="true" size={18} className="text-accent" />
            <h2 className="font-semibold">Hushållsstatus</h2>
          </div>
          <p className="text-sm text-text-secondary">{familyMock.householdStatus}</p>
        </CalmCard>
      )}

      <div className="shrink-0 h-24" aria-hidden="true" />
      <FloatingDock active="family" />
    </SuperModuleShell>
  );
}
