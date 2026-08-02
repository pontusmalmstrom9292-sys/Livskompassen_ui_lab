import { useState } from 'react';
import { BookOpenCheck, LockKeyhole, ShieldCheck } from 'lucide-react';
import { FloatingDock } from '@/components/FloatingDock';
import { ActionButton } from '@/design-system/components/ActionButton';
import { CalmCard } from '@/design-system/components/CalmCard';
import type { CapacityMode, DensityMode, DepthMode } from '@/design-system/tokens';
import { vaultMock, type VaultTabId } from '@/mock-data/vault';
import { SuperModuleShell } from '@/supermodules/core/SuperModuleShell';
import { getVisibleSectionIds } from '@/supermodules/core/visibility';
import { vaultManifest } from '@/supermodules/manifests/vault';

type VaultScreenProps = {
  capacity: CapacityMode;
  density: DensityMode;
  depth: DepthMode;
};

export function VaultScreen({ capacity, density, depth }: VaultScreenProps) {
  const [activeTabId, setActiveTabId] = useState<VaultTabId>('patterns');
  const visibleSections = getVisibleSectionIds(vaultManifest, capacity);
  const activeTab = vaultMock.tabs.find((tab) => tab.id === activeTabId) ?? vaultMock.tabs[0];

  return (
    <SuperModuleShell title="Valvet" eyebrow="Valvet" density={density} depth={depth}>
      <div className="flex min-h-12 items-center gap-2 rounded-control border border-line-strong bg-surface-1 px-3 text-xs text-text-secondary">
        <LockKeyhole aria-hidden="true" className="shrink-0 text-accent" size={17} />
        <span>{vaultMock.separationNotice}</span>
      </div>

      {visibleSections.has('promotion-gate') && (
        <CalmCard className="module-card" depth={depth}>
          <div className="flex items-center gap-2">
            <ShieldCheck aria-hidden="true" className="text-accent" size={18} />
            <h2 className="font-semibold">Manuell kontroll före promovering</h2>
          </div>
          <p className="mt-3 text-sm leading-6 text-text-secondary">{vaultMock.promotionGuidance}</p>
          <ActionButton className="mt-4 w-full">{vaultManifest.primaryAction?.label}</ActionButton>
        </CalmCard>
      )}

      {visibleSections.has('vault-tabs') && (
        <section aria-labelledby="vault-tabs-title">
          <div className="mb-3 flex items-center gap-2">
            <BookOpenCheck aria-hidden="true" className="text-accent" size={18} />
            <h2 id="vault-tabs-title" className="text-sm font-semibold">
              Valvets evidens
            </h2>
          </div>
          <div role="tablist" aria-label="Valvets flikar" className="grid grid-cols-2 gap-2">
            {vaultMock.tabs.map((tab) => {
              const selected = tab.id === activeTabId;
              return (
                <button
                  key={tab.id}
                  id={`vault-tab-${tab.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="vault-tab-panel"
                  onClick={() => setActiveTabId(tab.id)}
                  className={[
                    'min-h-12 rounded-control border px-3 py-2 text-left text-sm transition',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70',
                    selected
                      ? 'border-accent/55 bg-accent/10 text-accent'
                      : 'border-line-subtle bg-surface-2 text-text-secondary hover:border-line-strong hover:text-text-primary',
                  ].join(' ')}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
          <CalmCard
            id="vault-tab-panel"
            role="tabpanel"
            aria-labelledby={`vault-tab-${activeTab.id}`}
            className="module-card mt-3"
            depth={depth}
          >
            <p className="text-sm leading-6 text-text-secondary">{activeTab.detail}</p>
          </CalmCard>
        </section>
      )}

      {visibleSections.has('evidence-summary') && (
        <div className="rounded-control border border-line-subtle bg-surface-1 p-3">
          <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Nästa trygga steg</p>
          <p className="mt-2 text-sm font-semibold text-text-primary">{vaultMock.nextReview}</p>
        </div>
      )}

      <div className="shrink-0 h-24" aria-hidden="true" />
      <FloatingDock active="vault" />
    </SuperModuleShell>
  );
}
