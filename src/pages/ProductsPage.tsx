import type { CSSProperties } from 'react';

import { ArrowLink } from '../components/ArrowLink';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PageConversion } from '../components/PageConversion';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { findSolution, products, type PublicRoute } from '../data/site-content';

export function ProductsPage({ route }: { route: PublicRoute }) {
  return (
    <>
      <Breadcrumbs current={route.label} />
      <PageHero route={route} marker="PC / CATÁLOGO" />
      <section className="section">
        <div className="container">
          <SectionHeading
            index="01"
            eyebrow="CATÁLOGO POLICÁPSULA"
            title="Dez produtos próprios, do tubo à bancada."
            body="Cada produto é desenvolvido de acordo com o sistema, a amostra e a necessidade de cada cliente."
          />
          <div className="product-grid">
            {products.map((product, index) => {
              const solution = findSolution(product.solutionSlug);
              return (
                <article
                  key={product.slug}
                  data-reveal="up"
                  style={{ '--reveal-delay': `${(index % 4) * 60}ms` } as CSSProperties}
                >
                  <header>
                    <span>{product.number}</span>
                    {solution ? (
                      <a className="technical-code" href={`/solucoes/${solution.slug}/`}>
                        {solution.shortName}
                      </a>
                    ) : null}
                  </header>
                  <h2>{product.name}</h2>
                  <p>{product.summary}</p>
                  <ArrowLink href={`/contato/?item=${product.slug}`} variant="text">
                    Pedir este item
                  </ArrowLink>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <PageConversion
        heading="Precisa de uma variação do produto para a sua amostra?"
        body="Informe o item mais próximo e descreva a amostra ou o sistema. O desenvolvimento segue a necessidade de cada cliente."
      />
    </>
  );
}
