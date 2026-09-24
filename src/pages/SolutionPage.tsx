import type { CSSProperties } from 'react';

import { ArrowLink } from '../components/ArrowLink';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PageConversion } from '../components/PageConversion';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { productsFor, type PublicRoute, type Solution } from '../data/site-content';

export function SolutionPage({ route, solution }: { route: PublicRoute; solution: Solution }) {
  const products = productsFor(solution.slug);

  return (
    <>
      <Breadcrumbs current={solution.shortName} parent={{ label: 'Soluções', href: '/solucoes/' }} />
      <PageHero route={route} marker={`PC / FRENTE ${solution.number}`} />
      <section className="section">
        <div className="container split-editorial">
          <SectionHeading index="01" eyebrow="O QUE ENTRA NESTA FRENTE" title={solution.shortName} />
          <p className="lead-copy" data-reveal="up">
            {solution.context}
          </p>
        </div>
      </section>
      <section className="section section--solution-media">
        <div className="container">
          <figure className="solution-media" data-reveal="up">
            <img
              src={solution.image.src}
              alt={solution.image.alt}
              width={solution.image.width}
              height={solution.image.height}
              loading="lazy"
            />
            {solution.image.caption ? <figcaption>{solution.image.caption}</figcaption> : null}
          </figure>
        </div>
      </section>
      <section className="section section--blueprint">
        <div className={`container blueprint-grid${products.length ? '' : ' blueprint-grid--single'}`}>
          <div data-reveal="right">
            <span className="technical-code">SERVIÇOS</span>
            <h2>O que a Policápsula executa</h2>
            <ul className="indexed-list">
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
          {products.length ? (
            <div data-reveal="left">
              <span className="technical-code">PRODUTOS PRÓPRIOS</span>
              <h2>Do catálogo Policápsula</h2>
              <ul className="product-list">
                {products.map((product) => (
                  <li key={product.slug}>
                    <strong>{product.name}</strong>
                    <p>{product.summary}</p>
                    <ArrowLink href={`/contato/?item=${product.slug}`} variant="text">
                      Pedir este item
                    </ArrowLink>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>
      <section className="section">
        <div className="container process-band">
          {['Engenharia', 'Fabricação', 'Instalação', 'Manutenção', 'Melhoria'].map((item, index) => (
            <div
              key={item}
              data-reveal="up"
              style={{ '--reveal-delay': `${index * 70}ms` } as CSSProperties}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{item}</strong>
            </div>
          ))}
        </div>
      </section>
      <PageConversion
        heading={`Leve o pedido de ${solution.shortName.toLowerCase()} já com item e medida.`}
        body="Informe o item, o sistema ou a dimensão, a quantidade e a urgência. O pedido chega pronto no WhatsApp da equipe técnica."
        href={`/contato/?item=${solution.slug}`}
        cta={solution.cta}
      />
    </>
  );
}
