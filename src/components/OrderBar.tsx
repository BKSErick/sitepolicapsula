import { ArrowLink } from './ArrowLink';

interface OrderBarProps {
  text?: string;
  href?: string;
  cta?: string;
}

/** Fecho das páginas internas: uma pílula laranja que leva ao Pedido Pronto. */
export function OrderBar({
  text = 'Monte o pedido com item, medida e urgência. Ele chega pronto no WhatsApp da equipe técnica.',
  href = '/contato/#pedido',
  cta = 'Montar pedido',
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
