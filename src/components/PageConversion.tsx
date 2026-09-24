import { ArrowLink } from './ArrowLink';

interface PageConversionProps {
  heading?: string;
  body?: string;
  href?: string;
  cta?: string;
}

export function PageConversion({
  heading = 'Pedido com item, medida e urgência começa a conversa no ponto certo.',
  body = 'Informe o item, o sistema ou a dimensão, a quantidade e a urgência. O pedido chega pronto no WhatsApp da Policápsula.',
  href = '/contato/',
  cta = 'Montar pedido',
}: PageConversionProps) {
  return (
    <section className="page-conversion">
      {/* Fundo é degradê + textura, sem foto. Ver --gradient-conversion. */}
      <div className="container page-conversion__inner">
        <div data-reveal-text="">
          <span className="technical-code">PRÓXIMO PASSO · PEDIDO PRONTO</span>
          <h2>{heading}</h2>
        </div>
        <div className="page-conversion__action" data-reveal="up">
          <p>{body}</p>
          <ArrowLink href={href}>{cta}</ArrowLink>
          <small>Nada é enviado antes de você confirmar no WhatsApp.</small>
        </div>
      </div>
    </section>
  );
}
