import type { CSSProperties } from 'react';

import { Breadcrumbs } from '../components/Breadcrumbs';
import { ClientRow } from '../components/ClientRow';
import { CompanyHero, SimpleHero } from '../components/Heroes';
import { OrderBar } from '../components/OrderBar';
import { company, media, type PublicRoute } from '../data/site-content';

/** Missão, visão e valores como a própria empresa publica. */
const identityPillars = [
  { label: 'MISSÃO', text: company.mission },
  { label: 'VISÃO', text: company.vision },
  { label: 'VALORES', text: `${company.values.join(', ')}.` },
];

function CompanyContent() {
  return (
    <>
      <section className="company-story">
        <div className="container company-story__grid">
          <div data-reveal="up">
            <span className="eyebrow">QUEM SOMOS</span>
            <h2>Engenharia do ciclo da amostra, dentro da cadeia do aço.</h2>
          </div>
          <div className="company-story__text">
            {company.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
      <section className="company-commitment">
        <div className="container company-commitment__grid">
          <figure className="rounded-photo" data-reveal="right">
            <img
              src={media.thumbEstacao.src}
              alt={media.thumbEstacao.alt}
              width={media.thumbEstacao.width}
              height={media.thumbEstacao.height}
              loading="lazy"
            />
          </figure>
          <div data-reveal="left">
            <span className="eyebrow">COMPROMISSO</span>
            <h2>Segurança e qualidade de pessoas, máquinas e equipamentos.</h2>
            <p>
              É o critério que orienta cada produto: da cápsula que chega amortecida na estação
              ao dispositivo que protege a mão de quem prepara a amostra.
            </p>
          </div>
        </div>
      </section>
      <section className="identity">
        <div className="container">
          <span className="eyebrow">IDENTIDADE</span>
          <div className="identity__grid">
            {identityPillars.map((pillar, index) => (
              <article
                key={pillar.label}
                data-reveal="up"
                style={{ '--reveal-delay': `${index * 80}ms` } as CSSProperties}
              >
                <span>{pillar.label}</span>
                <p>{pillar.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <ClientRow title="Grandes grupos da siderurgia e da indústria de base." />
    </>
  );
}

function PrivacyContent() {
  return (
    <section className="legal">
      <div className="container legal-copy">
        <p className="legal-copy__notice">
          Documento institucional em homologação. O texto final deve ser validado pela
          Policápsula antes da troca do domínio oficial.
        </p>
        <h2>O que o site coleta</h2>
        <p>
          O Pedido Pronto não grava os dados em nenhum servidor do site. As informações
          digitadas montam uma mensagem que abre no WhatsApp da Policápsula, e o envio só
          acontece quando o visitante confirma lá.
        </p>
        <h2>Uso das informações</h2>
        <p>
          Os dados recebidos pelo WhatsApp, pelo telefone ou pelo e-mail são usados para
          identificar o contato, entender a necessidade e responder ao pedido.
        </p>
        <h2>Direitos do titular</h2>
        <p>
          Pedidos de acesso, correção ou exclusão de dados podem ser enviados para{' '}
          <a href={`mailto:${company.email}`}>{company.email}</a>.
        </p>
      </div>
    </section>
  );
}

export function InstitutionalPage({ route }: { route: PublicRoute }) {
  if (route.kind === 'legal') {
    return (
      <>
        <Breadcrumbs current={route.label} />
        <SimpleHero route={route} />
        <PrivacyContent />
      </>
    );
  }

  return (
    <>
      <Breadcrumbs current={route.label} />
      <CompanyHero route={route} />
      <CompanyContent />
      <OrderBar />
    </>
  );
}
