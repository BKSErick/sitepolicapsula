import type { CSSProperties } from 'react';

import { BrandStrip } from '../components/BrandStrip';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PageConversion } from '../components/PageConversion';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
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
      <section className="section section--company-story">
        <div className="container split-editorial">
          <SectionHeading
            index="01"
            eyebrow="QUEM SOMOS"
            title="Engenharia do ciclo da amostra, dentro da cadeia do aço."
          />
          <div className="lead-stack">
            {company.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--photo">
        <div className="container photo-panel photo-panel--reverse photo-panel--wide">
          <figure data-reveal="right">
            <img
              src={media.faiscas.src}
              alt={media.faiscas.alt}
              width={media.faiscas.width}
              height={media.faiscas.height}
              loading="lazy"
            />
            <figcaption>Cadeia produtiva do aço</figcaption>
          </figure>
          <div data-reveal="left">
            <span className="eyebrow">COMPROMISSO</span>
            <h2>Segurança e qualidade de pessoas, máquinas e equipamentos.</h2>
            <p>
              É o critério que orienta cada produto: da cápsula que chega amortecida na
              estação ao dispositivo que protege a mão de quem prepara a amostra.
            </p>
          </div>
        </div>
      </section>
      <section className="section section--company-clients">
        <div className="container">
          <SectionHeading
            index="02"
            eyebrow="PRINCIPAIS CLIENTES"
            title="Grandes grupos da siderurgia e da indústria de base."
            body="Empresas em que a Policápsula atua com produtos e serviços."
          />
          <BrandStrip variant="grid" />
        </div>
      </section>
      <section className="section section--company-identity">
        <div className="container">
          <SectionHeading
            index="03"
            eyebrow="IDENTIDADE"
            title="Missão, visão e valores."
            body="Como a Policápsula declara o próprio destino e a própria conduta."
          />
          <div className="identity-grid">
            {identityPillars.map((pillar, index) => (
              <article
                key={pillar.label}
                data-reveal="up"
                style={{ '--reveal-delay': `${index * 80}ms` } as CSSProperties}
              >
                <span className="technical-code">{pillar.label}</span>
                <p>{pillar.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function PrivacyContent() {
  return (
    <section className="section">
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
  const isLegal = route.kind === 'legal';

  return (
    <>
      <Breadcrumbs current={route.label} />
      <PageHero route={route} cta={!isLegal} />
      {route.kind === 'company' && <CompanyContent />}
      {isLegal && <PrivacyContent />}
      {!isLegal && <PageConversion />}
    </>
  );
}
