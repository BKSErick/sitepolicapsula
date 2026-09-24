import { Breadcrumbs } from '../components/Breadcrumbs';
import { FrontList } from '../components/FrontList';
import { SolutionsHero } from '../components/Heroes';
import { OrderBar } from '../components/OrderBar';
import { SamplePath } from '../components/SamplePath';
import type { PublicRoute } from '../data/site-content';

export function SolutionsPage({ route }: { route: PublicRoute }) {
  return (
    <>
      <Breadcrumbs current={route.label} />
      <SolutionsHero route={route} />
      <section className="path-section path-section--compact">
        <div className="container">
          <SamplePath variant="full" />
        </div>
      </section>
      <section className="fronts-section">
        <div className="container">
          <div className="fronts-section__head" data-reveal="up">
            <span className="eyebrow">MAPA DAS FRENTES</span>
            <h2>Escolha a frente para ver serviços e produtos.</h2>
            <p>
              Se o pedido envolver mais de uma frente, como cápsula e estação do mesmo sistema,
              descreva tudo num pedido só.
            </p>
          </div>
          <FrontList />
        </div>
      </section>
      <OrderBar text="Não sabe em qual frente o pedido entra? Escolha o item mais próximo e descreva a aplicação." />
    </>
  );
}
