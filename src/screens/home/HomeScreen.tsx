import { useState } from 'react';
import { Check, Mic, NotebookPen, Sparkles } from 'lucide-react';
import { ActionButton } from '@/design-system/components/ActionButton';
import { CalmCard } from '@/design-system/components/CalmCard';
import type { CapacityMode, DensityMode, DepthMode } from '@/design-system/tokens';
import { homeMock } from '@/mock-data/home';
import { SuperModuleShell } from '@/supermodules/core/SuperModuleShell';
import { FloatingDock } from '@/components/FloatingDock';
import { getVisibleSectionIds } from '@/supermodules/core/visibility';
import { homeManifest } from '@/supermodules/manifests/home';

type HomeScreenProps = {
  capacity: CapacityMode;
  density: DensityMode;
  depth: DepthMode;
};

export function HomeScreen({ capacity, density, depth }: HomeScreenProps) {
  const visibleSections = getVisibleSectionIds(homeManifest, capacity);
  const [completedStepIds, setCompletedStepIds] = useState(
    () => new Set(homeMock.steps.filter((step) => step.done).map((step) => step.id)),
  );
  const stepLimit: Record<CapacityMode, number> = { low: 0, normal: 2, high: 3 };
  const quickActionLimit: Record<CapacityMode, number> = { low: 1, normal: 2, high: 3 };
  const quickActionGrid: Record<CapacityMode, string> = {
    low: 'grid-cols-1',
    normal: 'grid-cols-2',
    high: 'grid-cols-3',
  };
  const quickActions = [
    { label: 'Anteckning', Icon: NotebookPen },
    { label: 'Inspelning', Icon: Mic },
    { label: 'Inkast', Icon: Sparkles },
  ] as const;

  function toggleStep(stepId: string) {
    setCompletedStepIds((current) => {
      const next = new Set(current);

      if (next.has(stepId)) {
        next.delete(stepId);
      } else {
        next.add(stepId);
      }

      return next;
    });
  }

  return (
    <SuperModuleShell
      title={`God morgon, ${homeMock.userName}`}
      eyebrow="Den Trygga Hamnen"
      density={density}
      depth={depth}
    >
      {visibleSections.has('next-step') && (
        <CalmCard
          className="module-card border-accent/35 bg-surface-3"
          depth={depth}
          aria-labelledby="home-next-step"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-text-muted">
                Nästa mikrosteg
              </p>
              <h2 id="home-next-step" className="mt-2 text-xl font-semibold">
                {homeMock.nextStep}
              </h2>
            </div>
            <div className="grid size-14 shrink-0 place-items-center rounded-full border border-line-strong bg-surface-3 text-accent shadow-inset">
              <Sparkles aria-hidden="true" size={22} />
            </div>
          </div>
        </CalmCard>
      )}

      {visibleSections.has('anchor') && (
        <CalmCard className="module-card" depth={depth}>
          <p className="text-xs uppercase tracking-[0.18em] text-accent">Dagens ankare</p>
          <p className="mt-3 font-display text-2xl">{homeMock.anchor}</p>
        </CalmCard>
      )}

      {visibleSections.has('daily-steps') && (
        <CalmCard className="module-card" depth={depth}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Dagens steg</h2>
            <span className="text-sm text-text-muted">
              {stepLimit[capacity]} av {homeMock.steps.length}
            </span>
          </div>
          <ul className="divide-y divide-line-subtle">
            {homeMock.steps.slice(0, stepLimit[capacity]).map((step) => {
              const isCompleted = completedStepIds.has(step.id);

              return (
                <li key={step.id}>
                  <button
                    type="button"
                    aria-pressed={isCompleted}
                    aria-label={`${isCompleted ? 'Markera som inte klar' : 'Markera som klar'}: ${step.label}`}
                    data-testid={`home-step-${step.id}`}
                    onClick={() => toggleStep(step.id)}
                    className={[
                      'flex min-h-12 w-full items-center gap-3 rounded-control py-3 text-left',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70',
                    ].join(' ')}
                  >
                    <span
                      aria-hidden="true"
                      className={[
                        'grid size-6 shrink-0 place-items-center rounded-md border',
                        isCompleted
                          ? 'border-accent bg-accent text-text-on-accent'
                          : 'border-accent/55 text-transparent',
                      ].join(' ')}
                    >
                      <Check size={15} strokeWidth={2.5} />
                    </span>
                    <span
                      className={[
                        'flex-1 text-sm',
                        isCompleted ? 'text-text-muted line-through' : 'text-text-primary',
                      ].join(' ')}
                    >
                      {step.label}
                    </span>
                    <time className="text-xs text-text-muted">{step.time}</time>
                  </button>
                </li>
              );
            })}
          </ul>
        </CalmCard>
      )}

      {visibleSections.has('quick-capture') && (
        <section aria-labelledby="quick-actions-title">
          <h2
            id="quick-actions-title"
            className="mb-3 text-xs uppercase tracking-[0.18em] text-text-muted"
          >
            Snabbstart
          </h2>
          <div className={['grid gap-3', quickActionGrid[capacity]].join(' ')}>
            {quickActions.slice(0, quickActionLimit[capacity]).map(({ label, Icon }) => (
              <ActionButton
                key={label}
                variant="secondary"
                className="flex flex-col items-center gap-2"
              >
                <Icon aria-hidden="true" size={20} />
                {label}
              </ActionButton>
            ))}
          </div>
        </section>
      )}

      {visibleSections.has('capacity') && (
        <CalmCard className="module-card" depth={depth}>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Kapacitet idag</p>
              <p className="mt-2 font-display text-4xl text-accent">{homeMock.capacity}/10</p>
              <p className="mt-1 text-sm text-text-secondary">Stabil</p>
            </div>
            <div
              role="meter"
              aria-label="Kapacitet"
              aria-valuemin={0}
              aria-valuemax={10}
              aria-valuenow={homeMock.capacity}
              className="h-12 w-28 rounded-full border border-line-subtle bg-surface-1 p-1"
            >
              <div
                className="h-full rounded-full bg-accent/75"
                style={{ width: `${homeMock.capacity * 10}%` }}
              />
            </div>
          </div>
        </CalmCard>
      )}

      <FloatingDock active="home" />
    </SuperModuleShell>
  );
}
