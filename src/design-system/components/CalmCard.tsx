import type { HTMLAttributes, ReactNode } from 'react';

type CalmCardProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  as?: 'section' | 'article' | 'div';
  depth?: 'flat' | 'soft-3d' | 'instrument';
};

export function CalmCard({
  children,
  as: Element = 'section',
  depth = 'soft-3d',
  className = '',
  ...props
}: CalmCardProps) {
  const depthClass = {
    flat: 'shadow-none',
    'soft-3d': 'shadow-calm',
    instrument: 'shadow-raised border-line-strong',
  }[depth];

  return (
    <Element
      className={[
        'rounded-card border border-line-subtle bg-surface-2 p-5',
        depthClass,
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </Element>
  );
}
