import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/cn';

type Variant = 'primary' | 'brand' | 'secondary' | 'whatsapp' | 'light' | 'outline-light' | 'sky';
type Size = 'md' | 'lg' | 'sm';

const base =
  'inline-flex items-center justify-center gap-2 rounded font-semibold transition-[background-color,border-color,color,box-shadow] duration-200 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 text-center leading-tight';

const variants: Record<Variant, string> = {
  primary: 'bg-navy text-white hover:bg-navy-700 shadow-sm',
  brand: 'bg-azure text-white hover:bg-azure-600 shadow-[0_8px_20px_-8px_rgba(8,120,209,0.6)]',
  sky: 'bg-sky-600 text-white hover:bg-sky-700 shadow-sm',
  secondary: 'border border-navy/25 bg-white text-navy hover:border-navy hover:bg-ivory',
  whatsapp: 'border border-leaf/35 bg-white text-navy hover:border-leaf hover:bg-leaf-50',
  light: 'bg-white text-navy hover:bg-sky-50',
  'outline-light': 'border border-white/50 bg-white/5 text-white hover:border-white hover:bg-white/15',
};

const sizes: Record<Size, string> = {
  sm: 'min-h-[40px] px-4 py-2 text-sm',
  md: 'min-h-[48px] px-5 py-2.5 text-[0.9375rem]',
  lg: 'min-h-[54px] px-6 py-3 text-base sm:px-7',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonAsLink = CommonProps & { to: string; href?: never } & Omit<ComponentPropsWithoutRef<typeof Link>, 'to' | 'className' | 'children'>;
type ButtonAsAnchor = CommonProps & { href: string; to?: never; external?: boolean } & Omit<ComponentPropsWithoutRef<'a'>, 'href' | 'className' | 'children'>;
type ButtonAsButton = CommonProps & { to?: never; href?: never } & Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'>;

export type ButtonProps = ButtonAsLink | ButtonAsAnchor | ButtonAsButton;

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ('to' in props && props.to !== undefined) {
    const { variant: _v, size: _s, className: _c, children: _ch, to, ...rest } = props;
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if ('href' in props && props.href !== undefined) {
    const { variant: _v, size: _s, className: _c, children: _ch, href, external, ...rest } = props;
    const ext = external ?? /^https?:/.test(href);
    return (
      <a
        href={href}
        className={classes}
        {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, type, ...rest } = props as ButtonAsButton;
  return (
    <button type={type ?? 'button'} className={classes} {...rest}>
      {children}
    </button>
  );
}
