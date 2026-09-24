import { Breadcrumbs } from '../components/Breadcrumbs';
import { OrderBar } from '../components/OrderBar';
import { ProductCatalog } from '../components/ProductCatalog';
import type { PublicRoute } from '../data/site-content';

export function ProductsPage({ route }: { route: PublicRoute }) {
  return (
    <>
      <Breadcrumbs current={route.label} />
      <ProductCatalog route={route} />
      <OrderBar text="Precisa de uma variação para a sua amostra? Escolha o item mais próximo e descreva a aplicação." />
    </>
  );
}
