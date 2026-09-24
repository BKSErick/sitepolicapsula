import { Breadcrumbs } from '../components/Breadcrumbs';
import { PageConversion } from '../components/PageConversion';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { SolutionGrid } from '../components/SolutionGrid';
import type { PublicRoute } from '../data/site-content';

export function SolutionsPage({ route }: { route: PublicRoute }) {
  return (
    <>
      <Breadcrumbs current={route.label} />
      <PageHero route={route} />
      <section className="section">
        <div className="container">
          <SectionHeading
            index="01"
            eyebrow="MAPA DAS FRENTES"
            title="Escolha a frente para ver serviços e produtos."
            body="Se o pedido envolver mais de uma frente, como cápsula e estação do mesmo sistema, descreva tudo num pedido só."
          />
          <SolutionGrid />
        </div>
      </section>
      <PageConversion
        heading="Não sabe em qual frente o pedido entra?"
        body="Escolha o item mais próximo e descreva a aplicação. A equipe técnica continua a conversa com você."
      />
    </>
  );
}
