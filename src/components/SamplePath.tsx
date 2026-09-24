import type { CSSProperties } from 'react';

import { samplePath, type PathStepKey } from '../data/site-content';

interface SamplePathProps {
  /** `track` = trilho compacto de pílulas (cabeçalhos). `full` = seção da home com o tubo. */
  variant?: 'track' | 'full';
  /** Etapas acesas em laranja. Sem valor, todas ficam neutras. */
  active?: PathStepKey[];
}

export function SamplePath({ variant = 'track', active = [] }: SamplePathProps) {
  if (variant === 'track') {
    return (
      <ol className="path-track" aria-label="Caminho da amostra">
        {samplePath.map((step) => (
          <li key={step.key} className={active.includes(step.key) ? 'is-active' : undefined}>
            {step.label}
          </li>
        ))}
      </ol>
    );
  }

  return (
    <div className="path-line">
      <div className="path-line__tube" aria-hidden="true">
        <span className="path-line__capsule" />
      </div>
      <ol className="path-line__steps">
        {samplePath.map((step, index) => (
          <li
            key={step.key}
            data-reveal="up"
            style={{ '--reveal-delay': `${index * 70}ms` } as CSSProperties}
          >
            <i aria-hidden="true" />
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{step.label}</strong>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
