import { ArrowLink } from '../components/ArrowLink';
import { ClientRow } from '../components/ClientRow';
import { FrontList } from '../components/FrontList';
import { HomeHero } from '../components/Heroes';
import { RequestBuilder } from '../components/RequestBuilder';
import { SamplePath } from '../components/SamplePath';
import { media, type PublicRoute } from '../data/site-content';

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
        <div className="container highlights__grid">
          <article className="highlight" data-reveal="up">
            <figure className="rounded-photo">
              <img
                src={media.dispositivo.src}
                alt={media.dispositivo.alt}
                width={media.dispositivo.width}
                height={media.dispositivo.height}
                loading="lazy"
              />
            </figure>
            <span className="eyebrow">SEGURANÇA NA BANCADA</span>
            <h3>O dispositivo que tira o dedo do operador de perto da lixa.</h3>
            <p>
              Adaptável a vários modelos de lixadeira (politriz). Com ele, o colaborador elimina
              o risco de lixamento dos dedos na preparação de amostras.
            </p>
            <ArrowLink href="/solucoes/preparacao-de-amostras/" variant="text">
              Ver preparação de amostras
            </ArrowLink>
          </article>
          <article className="highlight" data-reveal="up">
            <div className="highlight__pair">
              <figure className="rounded-photo">
                <img
                  src={media.thumbCapsula.src}
                  alt={media.thumbCapsula.alt}
                  width={media.thumbCapsula.width}
                  height={media.thumbCapsula.height}
                  loading="lazy"
                />
              </figure>
              <figure className="rounded-photo">
                <img
                  src={media.thumbAcondicionamento.src}
                  alt={media.thumbAcondicionamento.alt}
                  width={media.thumbAcondicionamento.width}
                  height={media.thumbAcondicionamento.height}
                  loading="lazy"
                />
              </figure>
            </div>
            <span className="eyebrow">ENGENHARIA + FABRICAÇÃO</span>
            <h3>Cápsula fabricada para o seu sistema, com o projeto revisado.</h3>
            <p>
              Cada cápsula segue a dimensão e o peso do sistema do cliente. Quando o sistema já
              está em operação, a Policápsula nacionaliza a peça e aproveita para melhorar o
              projeto existente.
            </p>
            <ArrowLink href="/solucoes/capsulas/" variant="text">
              Ver cápsulas
            </ArrowLink>
          </article>
        </div>
      </section>

      <section className="builder-section">
        <div className="container">
          <div className="builder-section__head" data-reveal="up">
            <span className="eyebrow">PEDIDO PRONTO</span>
            <h2>Monte o pedido. Veja a mensagem antes de enviar.</h2>
            <p>
              Em vez de um formulário genérico, o pedido já sai com o que a equipe técnica
              precisa para responder no primeiro contato.
            </p>
          </div>
          <RequestBuilder />
        </div>
      </section>
    </>
  );
}
