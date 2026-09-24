import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { findRoute, findSolution } from './data/site-content';
import { usePageMotion } from './hooks/usePageMotion';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { InstitutionalPage } from './pages/InstitutionalPages';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductsPage } from './pages/ProductsPage';
import { SolutionPage } from './pages/SolutionPage';
import { SolutionsPage } from './pages/SolutionsPage';

interface AppProps {
  initialPath?: string;
}

export default function App({ initialPath }: AppProps) {
  const pathname =
    initialPath ?? (typeof window !== 'undefined' ? window.location.pathname : '/');
  usePageMotion(pathname);
  const route = findRoute(pathname);

  let page;

  if (!route) {
    page = <NotFoundPage />;
  } else if (route.kind === 'home') {
    page = <HomePage route={route} />;
  } else if (route.kind === 'solutions') {
    page = <SolutionsPage route={route} />;
  } else if (route.kind === 'solution') {
    const solution = findSolution(route.solutionSlug);
    page = solution ? <SolutionPage route={route} solution={solution} /> : <NotFoundPage />;
  } else if (route.kind === 'products') {
    page = <ProductsPage route={route} />;
  } else if (route.kind === 'contact') {
    page = <ContactPage route={route} />;
  } else {
    page = <InstitutionalPage route={route} />;
  }

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <SiteHeader />
      <main id="conteudo">{page}</main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
