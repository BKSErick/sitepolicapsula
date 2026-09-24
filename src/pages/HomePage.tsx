import { ArrowLink } from '../components/ArrowLink';
import { ClientRow } from '../components/ClientRow';
import { FrontList } from '../components/FrontList';
import { HomeHero } from '../components/Heroes';
import { SamplePath } from '../components/SamplePath';
import { TechnicalContact } from '../components/TechnicalContact';
import type { PublicRoute } from '../data/site-content';

export function HomePage({ route }: { route: PublicRoute }) {
  return (
    <>
      <HomeHero route={route} />
      <ClientRow />

      <section className="path-section">
        <div className="container">
          <div className="path-section__head" data-reveal="up">
            <div>
              <span className="eyebrow">O CAMINHO DA AMOSTRA</span>
              <h2>Entre a corrida e o resultado, a amostra não pode ficar no caminho.</h2>
            </div>
            <p>
              Na cadeia do aço, a análise da amostra orienta decisões de produção. Uma cápsula
              que trava, uma estação que recebe com impacto ou uma preparação insegura param
              mais do que um equipamento. A Policápsula projeta, fabrica e mantém as peças
              desse caminho.
            </p>
          </div>
          <SamplePath variant="full" />
        </div>
      </section>

      <section className="fronts-section">
        <div className="container">
          <div className="fronts-section__head" data-reveal="up">
            <span className="eyebrow">SEIS FRENTES TÉCNICAS</span>
            <h2>Da consultoria à manutenção, o caminho inteiro.</h2>
          </div>
          <FrontList />
        </div>
      </section>

      <section className="highlights">
        <div className="container">
          <div className="highlights__head" data-reveal="up">
            <span className="eyebrow">PONTOS CRÍTICOS DA OPERAÇÃO</span>
            <h2>Engenharia aplicada onde o processo exige controle.</h2>
            <p>Duas respostas objetivas para riscos recorrentes entre o transporte e a preparação da amostra.</p>
          </div>
          <div className="highlights__grid">
          <article className="highlight" data-reveal="up">
            <span className="highlight__index" aria-hidden="true">01</span>
            <div className="highlight__body">
              <span className="eyebrow">SEGURANÇA NA BANCADA</span>
              <h3>Distância segura entre a mão do operador e a lixa.</h3>
              <p>O dispositivo se adapta a diferentes modelos de politriz e reduz a exposição direta durante a preparação de amostras.</p>
              <dl className="highlight__spec">
                <div><dt>Problema</dt><dd>Contato próximo à lixa</dd></div>
                <div><dt>Resposta</dt><dd>Dispositivo adaptável</dd></div>
              </dl>
              <ArrowLink href="/solucoes/preparacao-de-amostras/" variant="text">
                Ver preparação de amostras
              </ArrowLink>
            </div>
          </article>
          <article className="highlight" data-reveal="up">
            <span className="highlight__index" aria-hidden="true">02</span>
            <div className="highlight__body">
              <span className="eyebrow">ENGENHARIA E FABRICAÇÃO</span>
              <h3>Cápsula dimensionada para o sistema, não para a prateleira.</h3>
              <p>Cada peça considera dimensão e peso do sistema. Em operações existentes, a nacionalização também abre espaço para revisar o projeto.</p>
              <dl className="highlight__spec">
                <div><dt>Entrada</dt><dd>Dimensão e peso do sistema</dd></div>
                <div><dt>Entrega</dt><dd>Peça fabricada e revisada</dd></div>
              </dl>
              <ArrowLink href="/solucoes/capsulas/" variant="text">
                Ver cápsulas
              </ArrowLink>
            </div>
          </article>
          </div>
        </div>
      </section>

      <section className="contact-section contact-section--home">
        <div className="container">
          <TechnicalContact />
        </div>
      </section>
    </>
  );
}
