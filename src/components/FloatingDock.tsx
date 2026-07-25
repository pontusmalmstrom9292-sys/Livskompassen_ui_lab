import { Heart, Home, Infinity, LockKeyhole, Waypoints } from 'lucide-react';

type FloatingDockProps = {
  active: 'home' | 'family' | 'fyren' | 'everyday' | 'vault';
};

const items = [
  { id: 'home', label: 'Hjärtat', Icon: Home },
  { id: 'family', label: 'Familjen', Icon: Infinity },
  { id: 'fyren', label: 'Fyren', Icon: Waypoints },
  { id: 'everyday', label: 'Vardagen', Icon: Heart },
  { id: 'vault', label: 'Valvet', Icon: LockKeyhole },
] as const;

export function FloatingDock({ active }: FloatingDockProps) {
  return (
    <nav
      aria-label="Huvudnavigation"
      data-testid="floating-dock"
      className="sticky bottom-1 z-20 mt-auto flex items-center justify-around rounded-full border border-line-strong bg-surface-1/95 px-3 py-0.5 shadow-floating backdrop-blur-xl"
    >
      {items.map(({ id, label, Icon }) => {
        const selected = id === active;
        return (
          <button
            key={id}
            type="button"
            aria-current={selected ? 'page' : undefined}
            aria-label={label}
            className={[
              'flex min-h-12 min-w-12 flex-col items-center justify-center rounded-full px-2 text-[10px] transition',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70',
              selected
                ? 'bg-accent text-text-on-accent'
                : 'text-text-secondary hover:bg-surface-3 hover:text-text-primary',
              id === 'fyren' ? 'scale-110 border border-line-strong' : '',
            ].join(' ')}
          >
            <Icon size={18} aria-hidden="true" />
            <span className="mt-1">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
