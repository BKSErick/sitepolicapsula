import { clients } from '../data/site-content';

interface BrandStripProps {
  /** `strip` = faixa compacta de logos. `grid` = cartões com o nome do cliente. */
  variant?: 'strip' | 'grid';
}

export function BrandStrip({ variant = 'strip' }: BrandStripProps) {
  if (variant === 'grid') {
    return (
      <ul className="brand-grid">
        {clients.map((client) => (
          <li className="brand-grid__item" key={client.slug}>
            <img
              alt={`Logotipo ${client.name}`}
              height={48}
              loading="lazy"
              src={`/brand/clientes/${client.slug}.png`}
              width={234}
            />
            <strong>{client.name}</strong>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="brand-strip__list">
      {clients.map((client) => (
        <li key={client.slug}>
          <img
            alt={`Logotipo ${client.name}`}
            height={40}
            loading="lazy"
            src={`/brand/clientes/${client.slug}.png`}
            width={195}
          />
        </li>
      ))}
    </ul>
  );
}
