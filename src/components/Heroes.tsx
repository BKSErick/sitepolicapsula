import {
  company,
  home,
  media,
  solutions,
  type PublicRoute,
  type Solution,
} from '../data/site-content';
import { ArrowUpRight } from 'lucide-react';
import { ArrowLink } from './ArrowLink';
import { SamplePath } from './SamplePath';

/** Home: grafite, título grande e a foto da aciaria recortada em cápsula. */
export function HomeHero({ route }: { route: PublicRoute }) {
  return (
    <section className="hero-home">
      <div className="container hero-home__grid">
        <div className="hero-home__copy" data-reveal-text="">
          <span className="eyebrow">{route.eyebrow}</span>
          <h1 aria-label={route.heading}>
            {home.heroLines.map((line) => (
              <span aria-hidden="true" key={line}>
                {line}
              </span>
            ))}
          </h1>
          <p>{route.introduction}</p>
          <div className="hero-actions">
            <ArrowLink href="#contato-tecnico">Solicitar análise</ArrowLink>
            <ArrowLink href="/solucoes/" variant="ghost">
              Ver as seis frentes
            </ArrowLink>
          </div>
          <ul className="fact-pills" aria-label="Destaques">
            {home.heroFacts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>
        <div className="hero-home__visual">
          <figure className="capsule-photo capsule-photo--large">
            <img src={media.hero.src} alt={media.hero.alt} width={media.hero.width} height={media.hero.height} />
          </figure>
          <figure className="capsule-photo capsule-photo--small">
            <img
              src={media.thumbCapsula.src}
              alt={media.thumbCapsula.alt}
              width={media.thumbCapsula.width}
              height={media.thumbCapsula.height}
            />
          </figure>
          <span className="hero-home__stamp" aria-hidden="true">
            POLI
          </span>
        </div>
      </div>
    </section>
  );
}

/** Empresa: foto das faíscas em toda a largura. */
export function CompanyHero({ route }: { route: PublicRoute }) {
  return (
    <section className="hero-photo">
      <img className="hero-photo__bg" src={media.faiscas.src} alt="" width={media.faiscas.width} height={media.faiscas.height} />
      <div className="container hero-photo__copy" data-reveal-text="">
        <span className="eyebrow">{route.eyebrow}</span>
        <h1>{route.heading}</h1>
        <p>{route.introduction}</p>
        <ul className="fact-pills fact-pills--light">
          {company.values.map((value) => (
            <li key={value}>{value}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Soluções: o caminho da amostra é o próprio cabeçalho, com as frentes em pílulas. */
export function SolutionsHero({ route }: { route: PublicRoute }) {
  return (
    <section className="hero-paper">
      <div className="container" data-reveal-text="">
        <div className="hero-paper__top">
          <div>
            <span className="eyebrow">{route.eyebrow}</span>
            <h1>{route.heading}</h1>
          </div>
          <div className="hero-paper__intro">
            <span className="technical-code">DIRETÓRIO TÉCNICO / 06 FRENTES</span>
            <p className="hero-paper__lead">{route.introduction}</p>
          </div>
        </div>
        <nav className="front-pills" aria-label="Frentes técnicas">
          {solutions.map((solution) => (
            <a key={solution.slug} href={`/solucoes/${solution.slug}/`}>
              <span>{solution.number}</span>
              <div>
                <strong>{solution.shortName}</strong>
                <small>{solution.introduction}</small>
              </div>
              <ArrowUpRight aria-hidden="true" size={20} />
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}

/** Frente: claro, com o trilho aceso na etapa da frente e a foto arredondada. */
export function SolutionHero({ route, solution }: { route: PublicRoute; solution: Solution }) {
  return (
    <section className="hero-split">
      <div className="container">
        <SamplePath active={solution.pathSteps} />
        <div className="hero-split__grid">
          <div data-reveal-text="">
            <span className="eyebrow">{route.eyebrow}</span>
            <h1>{route.heading}</h1>
            <p>{route.introduction}</p>
            <div className="hero-actions">
              <ArrowLink href={`/contato/?item=${solution.slug}#contato-tecnico`}>Solicitar análise</ArrowLink>
              <ArrowLink href="/produtos/" variant="secondary">
                Ver produtos
              </ArrowLink>
            </div>
          </div>
          <figure className="rounded-photo" data-reveal="left">
            <img
              src={solution.image.src}
              alt={solution.image.alt}
              width={solution.image.width}
              height={solution.image.height}
            />
          </figure>
        </div>
      </div>
    </section>
  );
}

/** Contato: abertura curta, com a sequência de atendimento como prova de processo. */
export function ContactHero({ route }: { route: PublicRoute }) {
  return (
    <section className="hero-contact">
      <div className="container hero-contact__grid">
        <div data-reveal-text="">
          <span className="eyebrow">{route.eyebrow}</span>
          <h1>{route.heading}</h1>
          <p>{route.introduction}</p>
        </div>
        <ol className="contact-sequence" aria-label="Fluxo do atendimento">
          <li><span>01</span> Contexto</li>
          <li><span>02</span> Análise</li>
          <li><span>03</span> Retorno técnico</li>
        </ol>
      </div>
    </section>
  );
}

/** Página de texto (privacidade). */
export function SimpleHero({ route }: { route: PublicRoute }) {
  return (
    <section className="hero-simple">
      <div className="container" data-reveal-text="">
        <span className="eyebrow">{route.eyebrow}</span>
        <h1>{route.heading}</h1>
        <p>{route.introduction}</p>
      </div>
    </section>
  );
}
