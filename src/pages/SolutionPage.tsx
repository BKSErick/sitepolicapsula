import type { CSSProperties } from 'react';

import { Breadcrumbs } from '../components/Breadcrumbs';
import { SolutionHero } from '../components/Heroes';
import { OrderBar } from '../components/OrderBar';
import { ProductCard } from '../components/ProductCatalog';
import { productsFor, type PublicRoute, type Solution } from '../data/site-content';

export function SolutionPage({ route, solution }: { route: PublicRoute; solution: Solution }) {
  const products = productsFor(solution.slug);

  return (
    <>
      <Breadcrumbs current={solution.shortName} parent={{ label: 'Soluções', href: '/solucoes/' }} />
      <SolutionHero route={route} solution={solution} />
      <section className="solution-institutional">
        <div className="container">
          <div className="solution-institutional__lead">
            <header data-reveal="up">
              <span className="technical-code">VISÃO DA FRENTE / {solution.number}</span>
              <h2>{solution.institutional.heading}</h2>
            </header>
            <div className="solution-institutional__copy" data-reveal="up">
              {solution.institutional.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="solution-institutional__pillars">
            {solution.institutional.pillars.map((pillar, index) => (
              <article className="solution-institutional__pillar" key={pillar.label} data-reveal="up">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{pillar.label}</h3>
                <p>{pillar.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="solution-body">
        <div className="container solution-body__grid">
          <div data-reveal="up">
            <span className="eyebrow">O QUE ENTRA NESTA FRENTE</span>
            <p className="solution-body__context">{solution.context}</p>
          </div>
          <ul className="service-list">
            {solution.services.map((item, index) => (
              <li
                key={item}
                data-reveal="up"
                style={{ '--reveal-delay': `${index * 55}ms` } as CSSProperties}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
      {products.length ? (
        <section className="catalog catalog--inline">
          <div className="container">
            <span className="eyebrow">PRODUTOS PRÓPRIOS DESTA FRENTE</span>
            <div className="catalog__grid">
              {products.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <OrderBar
        text={`Envie a demanda de ${solution.shortName.toLowerCase()} com o contexto da aplicação.`}
        href={`/contato/?item=${solution.slug}#contato-tecnico`}
        cta={solution.cta}
      />
    </>
  );
}
