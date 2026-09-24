import { ArrowRight, ArrowLeftRight, Compass, FlaskConical, Pill, Wind, Wrench } from 'lucide-react';
import type { CSSProperties } from 'react';

import { solutions, type SolutionIcon } from '../data/site-content';

const solutionIcons: Record<SolutionIcon, typeof Wind> = {
  compass: Compass,
  wind: Wind,
  pill: Pill,
  arrows: ArrowLeftRight,
  flask: FlaskConical,
  wrench: Wrench,
};

/** As frentes em linhas: número grande, nome, uma linha e a seta em pílula. */
export function FrontList() {
  return (
    <ul className="front-list">
      {solutions.map((solution, index) => {
        const Icon = solutionIcons[solution.icon];
        return (
          <li
            key={solution.slug}
            data-reveal="up"
            style={{ '--reveal-delay': `${index * 50}ms` } as CSSProperties}
          >
            <a href={`/solucoes/${solution.slug}/`}>
              <span className="front-list__number">{solution.number}</span>
              <Icon aria-hidden="true" className="front-list__icon" size={30} strokeWidth={1.4} />
              <span className="front-list__text">
                <strong>{solution.shortName}</strong>
                <span>{solution.introduction}</span>
              </span>
              <span className="front-list__arrow" aria-hidden="true">
                <ArrowRight size={20} />
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
