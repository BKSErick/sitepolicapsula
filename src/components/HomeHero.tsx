import { MoveDownRight } from 'lucide-react';

import { home, media, type PublicRoute } from '../data/site-content';
import { ArrowLink } from './ArrowLink';

export function HomeHero({ route }: { route: PublicRoute }) {
  return (
    <section className="home-hero">
      <div className="container home-hero__main">
        <div className="home-hero__copy" data-reveal-text="">
          <span className="eyebrow">{route.eyebrow}</span>
          <h1 aria-label={route.heading}>
            {home.heroLines.map((line) => (
              <span aria-hidden="true" key={line}>
                {line}
              </span>
            ))}
          </h1>
          <p>{route.introduction}</p>
          <div className="home-hero__actions">
            <ArrowLink href="/contato/">Montar pedido</ArrowLink>
            <ArrowLink href="/solucoes/" variant="text">
              Ver as cinco frentes
            </ArrowLink>
          </div>
          <dl className="home-hero__facts">
            {home.heroFacts.map(([term, value]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="home-hero__visual">
          <img
            src={media.hero.src}
            alt={media.hero.alt}
            width={media.hero.width}
            height={media.hero.height}
          />
          <div className="home-hero__visual-note">
            <MoveDownRight aria-hidden="true" />
            <span>
              {home.heroNote.map((item, index) => (
                <span key={item}>
                  {item}
                  {index < home.heroNote.length - 1 ? <br /> : null}
                </span>
              ))}
            </span>
          </div>
        </figure>
      </div>
    </section>
  );
}
