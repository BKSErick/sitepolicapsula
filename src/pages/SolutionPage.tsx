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
        text={`Leve o pedido de ${solution.shortName.toLowerCase()} já com item e medida.`}
        href={`/contato/?item=${solution.slug}#pedido`}
        cta={solution.cta}
      />
    </>
  );
}
