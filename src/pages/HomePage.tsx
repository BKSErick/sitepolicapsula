import type { CSSProperties } from 'react';

import { ArrowLink } from '../components/ArrowLink';
import { BrandStrip } from '../components/BrandStrip';
import { HomeHero } from '../components/HomeHero';
import { RequestForm } from '../components/RequestForm';
import { SectionHeading } from '../components/SectionHeading';
import { SolutionGrid } from '../components/SolutionGrid';
import { home, media, type PublicRoute } from '../data/site-content';

const pathSteps = [
  ['Corrida', 'A amostra é retirada na área de produção.'],
  ['Cápsula', 'Segue protegida, no tamanho e no peso do sistema.'],
  ['Tubo', 'O sistema pneumático leva a cápsula até o destino.'],
  ['Estação', 'Chega amortecida, com intertravamento mecânico.'],
  ['Bancada', 'É preparada com a mão do operador protegida.'],
  ['Laboratório', 'Segue para a análise.'],
];

export function HomePage({ route }: { route: PublicRoute }) {
  return (
    <>
      <HomeHero route={route} />
      <section className="evidence-strip" aria-label="A Policápsula em números do próprio catálogo">
        <div className="container evidence-strip__grid">
          {home.evidence.map(([value, label]) => (
            <div key={label} className={value.length > 4 ? 'is-long' : undefined}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="brand-strip" aria-labelledby="principais-clientes">
        <div className="container brand-strip__inner">
          <div className="brand-strip__intro">
            <span className="technical-code">PRINCIPAIS CLIENTES</span>
            <h2 id="principais-clientes">Parceira de grandes grupos da siderurgia e da indústria.</h2>
            <ArrowLink href="/empresa/" variant="text">
              Conhecer a empresa
            </ArrowLink>
          </div>
          <BrandStrip />
        </div>
      </section>

      <section className="section section--statement">
        <div className="container statement-grid">
          <SectionHeading
            index="01"
            eyebrow="O CAMINHO DA AMOSTRA"
            title="Entre a corrida e o resultado, a amostra não pode ficar no caminho."
          />
          <div className="statement-copy">
            <p>
              Na cadeia do aço, a análise da amostra orienta decisões de produção. Por isso
              ela viaja por tubo pneumático até o laboratório, e por isso uma cápsula que
              trava, uma estação que recebe com impacto ou uma preparação insegura param
              mais do que um equipamento.
            </p>
            <p>
              A Policápsula projeta, fabrica e mantém as peças desse caminho: o sistema, a
              cápsula, a estação, o amortecedor e os dispositivos da bancada de preparação.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--path">
        <div className="container">
          <ol className="sample-path">
            {pathSteps.map(([title, text], index) => (
              <li
                key={title}
                data-reveal="up"
                style={{ '--reveal-delay': `${index * 60}ms` } as CSSProperties}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{title}</strong>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section home-request-section" id="pedido">
        <div className="container home-request">
          <aside className="home-request__context">
            <span className="technical-code">PEDIDO PRONTO</span>
            <h2>Informe o item e a medida. A conversa começa no ponto.</h2>
            <p>
              Em vez de um formulário genérico, o pedido já sai com o que a equipe técnica
              precisa para responder.
            </p>
            <ol>
              <li>
                <span>01</span>
                <strong>Item ou serviço</strong>
              </li>
              <li>
                <span>02</span>
                <strong>Sistema, modelo ou dimensão</strong>
              </li>
              <li>
                <span>03</span>
                <strong>Quantidade</strong>
              </li>
              <li>
                <span>04</span>
                <strong>Urgência</strong>
              </li>
            </ol>
            <small>O envio abre o WhatsApp da Policápsula com o pedido escrito.</small>
          </aside>
          <RequestForm />
        </div>
      </section>

      <section className="section section--solutions">
        <div className="container">
          <SectionHeading
            index="02"
            eyebrow="FRENTES TÉCNICAS"
            title="Cinco frentes. Um mesmo caminho da amostra."
            body="Do tubo pneumático à bancada de preparação, escolha a frente mais próxima da sua necessidade."
          />
          <SolutionGrid />
        </div>
      </section>

      <section className="section section--photo">
        <div className="container photo-panel">
          <figure>
            <img
              src={media.dispositivo.src}
              alt={media.dispositivo.alt}
              width={media.dispositivo.width}
              height={media.dispositivo.height}
              loading="lazy"
            />
            <figcaption>{media.dispositivo.caption}</figcaption>
          </figure>
          <div>
            <span className="eyebrow">SEGURANÇA NA BANCADA</span>
            <h2>O dispositivo que tira o dedo do operador de perto da lixa.</h2>
            <p>
              O Dispositivo Policápsula se adapta a vários modelos de lixadeira (politriz).
              Com ele, o colaborador elimina o risco de lixamento dos dedos na preparação de
              amostras.
            </p>
            <ArrowLink href="/solucoes/preparacao-de-amostras/" variant="text">
              Ver preparação de amostras
            </ArrowLink>
          </div>
        </div>
      </section>

      <section className="section section--photo">
        <div className="container photo-panel photo-panel--reverse photo-panel--wide">
          <figure>
            <img
              src={media.capsulasProjeto.src}
              alt={media.capsulasProjeto.alt}
              width={media.capsulasProjeto.width}
              height={media.capsulasProjeto.height}
              loading="lazy"
            />
            <figcaption>{media.capsulasProjeto.caption}</figcaption>
          </figure>
          <div>
            <span className="eyebrow">ENGENHARIA + FABRICAÇÃO</span>
            <h2>Cápsula fabricada para o seu sistema, com o projeto revisado.</h2>
            <p>
              Cada cápsula segue a dimensão e o peso do sistema do cliente. Quando o sistema
              já está em operação, a Policápsula nacionaliza a peça e aproveita para melhorar
              o projeto existente.
            </p>
            <ArrowLink href="/solucoes/capsulas/" variant="text">
              Ver cápsulas
            </ArrowLink>
          </div>
        </div>
      </section>

      <section className="section section--final-cta">
        <div className="container final-cta">
          <div className="final-cta__action">
            <span className="technical-code">PEDIDO PRONTO</span>
            <ArrowLink href="/contato/">Montar pedido</ArrowLink>
          </div>
          <h2>Qual peça do caminho da amostra precisa de atenção?</h2>
          <p>
            Sistema, cápsula, estação, bancada ou máquina: informe o item e a urgência e fale
            com quem conhece o caminho inteiro.
          </p>
        </div>
      </section>
    </>
  );
}
