import type { ReactNode } from 'react';
import type { DensityMode, DepthMode } from '@/design-system/tokens';

type SuperModuleShellProps = {
  title: string;
  eyebrow: string;
  children: ReactNode;
  density: DensityMode;
  depth: DepthMode;
};

export function SuperModuleShell({
  title,
  eyebrow,
  children,
  density,
  depth,
}: SuperModuleShellProps) {
  const densityClass = {
    calm: 'space-y-5 [&_.module-card]:p-5',
    balanced: 'space-y-3 [&_.module-card]:p-4',
    full: 'space-y-2 [&_.module-card]:p-3',
  }[density];

  const depthClass = {
    flat: '[&_.module-card]:shadow-none',
    'soft-3d': '[&_.module-card]:shadow-calm',
    instrument: '[&_.module-card]:shadow-raised [&_.module-card]:border-line-strong',
  }[depth];

  return (
    <div
      data-density={density}
      data-depth={depth}
      className={['mx-auto min-h-full max-w-md bg-canvas px-4 pb-28 pt-8', depthClass].join(' ')}
    >
      <header className="mb-7">
        <p className="mb-2 text-xs uppercase tracking-[0.24em] text-accent">{eyebrow}</p>
        <h1 className="font-display text-4xl leading-none text-text-primary">{title}</h1>
      </header>
      <div className={densityClass}>{children}</div>
    </div>
  );
}
