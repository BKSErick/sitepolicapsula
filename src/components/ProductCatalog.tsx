import {
  ArrowLeftRight,
  CircleDot,
  Cog,
  Disc,
  Hand,
  Magnet,
  Pen,
  Pill,
  Plus,
  ShieldCheck,
  Wind,
} from 'lucide-react';
import { useState } from 'react';

import {
  findSolution,
  media,
  products,
  solutions,
  type Product,
  type ProductIcon,
  type PublicRoute,
} from '../data/site-content';
import { ArrowLink } from './ArrowLink';

const productIcons: Record<ProductIcon, typeof Wind> = {
  wind: Wind,
  hand: Hand,
  pill: Pill,
  arrows: ArrowLeftRight,
  shield: ShieldCheck,
  disc: Disc,
  magnet: Magnet,
  pen: Pen,
  cog: Cog,
  circle: CircleDot,
};

/** Só as frentes que têm produto próprio viram filtro. */
const filters = solutions.filter((solution) =>
  products.some((product) => product.solutionSlug === solution.slug)
);

export function ProductCard({ product }: { product: Product }) {
  const Icon = productIcons[product.icon];
  const solution = findSolution(product.solutionSlug);

  return (
    <article className="product-card">
      <div className="product-card__media">
        {product.image ? (
          <img
            src={product.image.src}
            alt={product.image.alt}
            width={product.image.width}
            height={product.image.height}
            loading="lazy"
          />
        ) : (
          <div className="product-card__icon" aria-hidden="true">
            <Icon size={46} strokeWidth={1.3} />
          </div>
        )}
        <span className="product-card__number">{product.number}</span>
      </div>
      <div className="product-card__body">
        {solution ? (
          <a className="product-card__tag" href={`/solucoes/${solution.slug}/`}>
            {solution.shortName}
          </a>
        ) : null}
        <h3>{product.name}</h3>
        <p>{product.summary}</p>
        <a className="product-card__add" href={`/contato/?item=${product.slug}#contato-tecnico`}>
          <Plus aria-hidden="true" size={16} />
          Solicitar análise
        </a>
      </div>
    </article>
  );
}

/**
 * Cabeçalho e catálogo juntos: o filtro mora no cabeçalho. O HTML
 * pré-renderizado mostra os dez produtos; o filtro só age depois da hidratação,
 * com "todos" como estado inicial igual ao do servidor.
 */
export function ProductCatalog({ route }: { route: PublicRoute }) {
  const [filter, setFilter] = useState('todos');
  const visible = filter === 'todos' ? products : products.filter((p) => p.solutionSlug === filter);
  const featured = products.find((product) => product.slug === 'dispositivo-lixadeira');

  return (
    <>
      <section className="hero-catalog">
        <div className="container">
          <div className="hero-catalog__head" data-reveal-text="">
            <span className="eyebrow">{route.eyebrow}</span>
            <h1>{route.heading}</h1>
            <p>{route.introduction}</p>
          </div>
          <div className="filter-chips" role="group" aria-label="Filtrar por frente">
            <button
              type="button"
              aria-pressed={filter === 'todos'}
              onClick={() => setFilter('todos')}
            >
              Todos <span>{products.length}</span>
            </button>
            {filters.map((solution) => (
              <button
                key={solution.slug}
                type="button"
                aria-pressed={filter === solution.slug}
                onClick={() => setFilter(solution.slug)}
              >
                {solution.shortName}{' '}
                <span>{products.filter((p) => p.solutionSlug === solution.slug).length}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {featured && filter === 'todos' ? (
        <section className="catalog-featured">
          <div className="container catalog-featured__grid">
            <figure className="rounded-photo">
              <img
                src={media.dispositivo.src}
                alt={media.dispositivo.alt}
                width={media.dispositivo.width}
                height={media.dispositivo.height}
                loading="lazy"
              />
            </figure>
            <div>
              <span className="eyebrow">DESTAQUE DO CATÁLOGO · SEGURANÇA NA BANCADA</span>
              <h2>{featured.name}</h2>
              <p>{featured.summary}</p>
              <ArrowLink href={`/contato/?item=${featured.slug}#contato-tecnico`}>Solicitar análise</ArrowLink>
            </div>
          </div>
        </section>
      ) : null}

      <section className="catalog">
        <div className="container">
          <p className="catalog__count" aria-live="polite">
            {visible.length} {visible.length === 1 ? 'produto' : 'produtos'}
          </p>
          <div className="catalog__grid">
            {visible.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
