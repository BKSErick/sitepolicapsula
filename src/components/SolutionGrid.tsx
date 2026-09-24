import { ArrowLeftRight, ArrowUpRight, FlaskConical, Pill, Wind, Wrench } from 'lucide-react';
import type { CSSProperties } from 'react';

import { solutions, type SolutionIcon } from '../data/site-content';

const icons: Record<SolutionIcon, typeof Wind> = {
  wind: Wind,
  pill: Pill,
  arrows: ArrowLeftRight,
  flask: FlaskConical,
  wrench: Wrench,
};

export function SolutionGrid() {
  return (
    <div className="solution-grid">
      {solutions.map((solution, index) => {
        const Icon = icons[solution.icon];
        return (
          <a
            className="solution-card"
            data-reveal="up"
            href={`/solucoes/${solution.slug}/`}
            key={solution.slug}
            style={{ '--reveal-delay': `${index * 55}ms` } as CSSProperties}
          >
            <div className="solution-card__top">
              <span>{solution.number}</span>
              <ArrowUpRight aria-hidden="true" size={20} strokeWidth={1.7} />
            </div>
            <Icon aria-hidden="true" className="solution-card__icon" size={52} strokeWidth={1.3} />
            <div>
              <span className="technical-code">{solution.eyebrow}</span>
              <h3>{solution.shortName}</h3>
              <p>{solution.introduction}</p>
            </div>
          </a>
        );
      })}
    </div>
  );
}
