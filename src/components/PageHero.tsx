import type { PublicRoute } from '../data/site-content';
import { ArrowLink } from './ArrowLink';

interface PageHeroProps {
  route: PublicRoute;
  cta?: boolean;
  marker?: string;
}

/** O caminho da amostra, que é o que toda frente da Policápsula atende. */
const proofSteps = [
  ['01', 'Envio', 'Sistema e cápsula'],
  ['02', 'Chegada', 'Estação e amortecimento'],
  ['03', 'Bancada', 'Preparação segura'],
];

export function PageHero({ route, cta = true, marker = 'PC / CICLO DA AMOSTRA' }: PageHeroProps) {
  return (
    <section className={`page-hero page-hero--${route.kind}`}>
      {/* Fundo é degradê + textura, sem foto. Ver --gradient-hero em tokens.css. */}
      <div className="page-hero__shade" aria-hidden="true" />
      <div className="container page-hero__inner">
        <div className="page-hero__copy" data-reveal-text="">
          <span className="eyebrow">{route.eyebrow}</span>
          <h1>{route.heading}</h1>
          <p>{route.introduction}</p>
          {cta && (
            <div className="page-hero__actions">
              <ArrowLink href="/contato/">Montar pedido</ArrowLink>
              <ArrowLink href="/produtos/" variant="secondary">
                Ver produtos
              </ArrowLink>
            </div>
          )}
        </div>

        <aside className="page-hero__console" data-reveal="left">
          <div className="page-hero__console-head">
            <span className="technical-code">{marker}</span>
            <i aria-hidden="true" />
          </div>
          <strong>{route.label}</strong>
          <div className="page-hero__proof">
            {proofSteps.map(([number, label, description]) => (
              <div key={label}>
                <span>{number}</span>
                <p>
                  <b>{label}</b>
                  {description}
                </p>
              </div>
            ))}
          </div>
        </aside>
      </div>
      <div className="page-hero__ticker" aria-hidden="true">
        CORRIDA / CÁPSULA / TUBO / ESTAÇÃO / BANCADA / LABORATÓRIO
      </div>
    </section>
  );
}
