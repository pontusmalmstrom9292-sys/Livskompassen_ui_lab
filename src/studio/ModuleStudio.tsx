import { useState } from 'react';
import { HomeScreen } from '@/screens/home/HomeScreen';
import { JournalScreen } from '@/screens/journal/JournalScreen';
import { PlanningScreen } from '@/screens/planning/PlanningScreen';
import type { CapacityMode, DensityMode, DepthMode } from '@/design-system/tokens';

type ModuleId = 'home' | 'planning' | 'journal';

type ControlOption<T extends string> = {
  value: T;
  label: string;
};

const moduleOptions = [
  { value: 'home', label: 'Home' },
  { value: 'planning', label: 'Planning' },
  { value: 'journal', label: 'Journal' },
] as const satisfies readonly ControlOption<ModuleId>[];

const capacityOptions = [
  { value: 'low', label: 'Låg' },
  { value: 'normal', label: 'Normal' },
  { value: 'high', label: 'Hög' },
] as const satisfies readonly ControlOption<CapacityMode>[];

const densityOptions = [
  { value: 'calm', label: 'Lugn' },
  { value: 'balanced', label: 'Balanserad' },
  { value: 'full', label: 'Full' },
] as const satisfies readonly ControlOption<DensityMode>[];

const depthOptions = [
  { value: 'flat', label: 'Platt' },
  { value: 'soft-3d', label: 'Mjuk 3D' },
  { value: 'instrument', label: 'Instrument' },
] as const satisfies readonly ControlOption<DepthMode>[];

export function ModuleStudio() {
  const [moduleId, setModuleId] = useState<ModuleId>('home');
  const [capacity, setCapacity] = useState<CapacityMode>('normal');
  const [density, setDensity] = useState<DensityMode>('calm');
  const [depth, setDepth] = useState<DepthMode>('soft-3d');

  const status = `${moduleId} · ${capacity} · ${density} · ${depth}`;

  const preview = {
    home: <HomeScreen capacity={capacity} density={density} depth={depth} />,
    planning: <PlanningScreen capacity={capacity} density={density} depth={depth} />,
    journal: <JournalScreen capacity={capacity} density={density} depth={depth} />,
  }[moduleId];

  return (
    <div className="min-h-screen bg-canvas text-text-primary lg:grid lg:grid-cols-[320px_1fr]">
      <aside className="border-b border-line-subtle bg-surface-1 p-5 lg:min-h-screen lg:border-b-0 lg:border-r">
        <p className="text-xs uppercase tracking-[0.22em] text-accent">Supermodule Studio</p>
        <h1 className="mt-2 font-display text-3xl">Livskompassen UI Lab</h1>
        <p className="mt-3 text-sm leading-6 text-text-secondary">
          Växla modul, kapacitetsläge, täthet och visuellt djup i realtid.
        </p>

        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
          <ControlGroup
            label="Modul"
            value={moduleId}
            options={moduleOptions}
            onChange={setModuleId}
          />
          <ControlGroup
            label="Kapacitet"
            value={capacity}
            options={capacityOptions}
            onChange={setCapacity}
          />
          <ControlGroup
            label="Täthet"
            value={density}
            options={densityOptions}
            onChange={setDensity}
          />
          <ControlGroup
            label="Djup"
            value={depth}
            options={depthOptions}
            onChange={setDepth}
          />
        </div>

        <p
          aria-live="polite"
          className="mt-8 rounded-control border border-line-subtle bg-surface-2 p-3 text-xs text-text-muted"
        >
          {status}
        </p>
      </aside>

      <main aria-label="Telefonpreview" className="min-w-0 overflow-auto p-3 sm:p-8">
        <div className="mx-auto w-full max-w-[390px] overflow-hidden rounded-[38px] border border-line-strong bg-canvas shadow-floating [transform:translateZ(0)]">
          <div className="h-[min(820px,calc(100dvh-2rem))] min-h-[620px] w-full overflow-y-auto overscroll-contain">
            {preview}
          </div>
        </div>
      </main>
    </div>
  );
}

type ControlGroupProps<T extends string> = {
  label: string;
  value: T;
  options: readonly ControlOption<T>[];
  onChange: (value: T) => void;
};

function ControlGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: ControlGroupProps<T>) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold">{label}</legend>
      <div className="grid gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={option.value === value}
            onClick={() => onChange(option.value)}
            className={[
              'min-h-12 rounded-control border px-3 text-left text-sm transition',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70',
              option.value === value
                ? 'border-accent/55 bg-accent/10 text-accent'
                : 'border-line-subtle bg-surface-2 text-text-secondary hover:border-line-strong hover:text-text-primary',
            ].join(' ')}
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
