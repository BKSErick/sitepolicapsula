import { ArrowLink } from './ArrowLink';

interface OrderBarProps {
  text?: string;
  href?: string;
  cta?: string;
}

/** Fecho das páginas internas que leva ao contato técnico. */
export function OrderBar({
  text = 'Envie o contexto da demanda para análise direta da equipe técnica.',
  href = '/contato/#contato-tecnico',
  cta = 'Solicitar análise',
}: OrderBarProps) {
  return (
    <section className="order-bar-section">
      <div className="container">
        <div className="order-bar" data-reveal="up">
          <p>{text}</p>
          <ArrowLink href={href} variant="ghost">
            {cta}
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}
