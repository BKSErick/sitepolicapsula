import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';

interface ArrowLinkProps {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'text';
  /** Destinos externos abrem em nova aba sem perder a navegação do site. */
  external?: boolean;
}

export function ArrowLink({
  href,
  children,
  variant = 'primary',
  external = false,
}: ArrowLinkProps) {
  return (
    <a
      className={`arrow-link arrow-link--${variant}`}
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      <span>{children}</span>
      <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.8} />
    </a>
  );
}
