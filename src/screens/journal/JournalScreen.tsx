import { BookOpenText, LockKeyhole, PenLine } from 'lucide-react';
import { ActionButton } from '@/design-system/components/ActionButton';
import { CalmCard } from '@/design-system/components/CalmCard';
import type { CapacityMode, DensityMode, DepthMode } from '@/design-system/tokens';
import { SuperModuleShell } from '@/supermodules/core/SuperModuleShell';
import { FloatingDock } from '@/components/FloatingDock';
import { journalMock } from '@/mock-data/journal';
import { getVisibleSectionIds } from '@/supermodules/core/visibility';
import { journalManifest } from '@/supermodules/manifests/journal';

type JournalScreenProps = {
  capacity: CapacityMode;
  density: DensityMode;
  depth: DepthMode;
};

export function JournalScreen({ capacity, density, depth }: JournalScreenProps) {
  const visibleSections = getVisibleSectionIds(journalManifest, capacity);
  const entryLimit: Record<CapacityMode, number> = { low: 0, normal: 2, high: 3 };

  return (
    <SuperModuleShell
      title="Dagbok"
      eyebrow="Hjärtat"
      density={density}
      depth={depth}
    >
      {visibleSections.has('current-reflection') && (
        <CalmCard className="module-card" depth={depth}>
          <p className="text-xs uppercase tracking-[0.18em] text-accent">Dagens reflektion</p>
          <p className="mt-3 font-display text-2xl">{journalMock.reflectionPrompt}</p>
          <p className="mt-3 text-sm leading-6 text-text-secondary">
            {journalMock.reflectionGuidance}
          </p>
        </CalmCard>
      )}

      {visibleSections.has('writing-surface') && (
        <CalmCard className="module-card" depth={depth}>
          <div className="mb-4 flex min-h-12 items-center gap-2 rounded-control border border-line-strong bg-surface-1 px-3 text-xs text-text-secondary">
            <LockKeyhole aria-hidden="true" className="shrink-0 text-accent" size={17} />
            <span>Fristående från Valvets evidensflöden</span>
          </div>
          <label htmlFor="journal-entry" className="flex items-center gap-2 text-sm font-semibold">
            <PenLine aria-hidden="true" size={18} className="text-accent" />
            Skrivyta
          </label>
          <textarea
            id="journal-entry"
            rows={capacity === 'low' ? 5 : 8}
            placeholder={journalMock.placeholder}
            className="mt-4 w-full resize-none rounded-control border border-line-subtle bg-surface-1 p-4 text-sm leading-6 text-text-primary outline-none placeholder:text-text-muted focus:border-accent/55 focus:ring-2 focus:ring-accent/25"
          />
          <ActionButton className="mt-4 w-full">Spara reflektion</ActionButton>
        </CalmCard>
      )}

      {visibleSections.has('recent-entries') && (
        <CalmCard className="module-card" depth={depth}>
          <div className="mb-4 flex items-center gap-2">
            <BookOpenText aria-hidden="true" size={18} className="text-accent" />
            <h2 className="font-semibold">Senaste inlägg</h2>
          </div>
          <ul className="divide-y divide-line-subtle">
            {journalMock.entries.slice(0, entryLimit[capacity]).map((entry) => (
              <li key={entry.id} className="flex min-h-12 items-center justify-between py-3 text-sm">
                <span>{entry.title}</span>
                <span className="text-xs text-text-muted">›</span>
              </li>
            ))}
          </ul>
        </CalmCard>
      )}

      <div className="shrink-0 h-24" aria-hidden="true" />
      <FloatingDock active="home" />
    </SuperModuleShell>
  );
}
