import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
};

export function ActionButton({
  children,
  variant = 'primary',
  className = '',
  ...props
}: ActionButtonProps) {
  const variantClass = {
    primary:
      'border-accent/40 bg-accent text-text-on-accent shadow-calm hover:brightness-105',
    secondary:
      'border-line-strong bg-surface-3 text-text-primary hover:border-accent/45',
    ghost:
      'border-transparent bg-transparent text-text-secondary hover:bg-surface-2 hover:text-text-primary',
  }[variant];

  return (
    <button
      className={[
        'min-h-12 rounded-control border px-4 py-3 text-sm font-semibold',
        'transition duration-150 focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-accent/70 disabled:cursor-not-allowed disabled:opacity-45',
        variantClass,
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}
