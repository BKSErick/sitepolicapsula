import { Breadcrumbs } from '../components/Breadcrumbs';
import { ContactHero } from '../components/Heroes';
import { RequestBuilder } from '../components/RequestBuilder';
import type { PublicRoute } from '../data/site-content';

export function ContactPage({ route }: { route: PublicRoute }) {
  return (
    <>
      <Breadcrumbs current={route.label} />
      <ContactHero route={route} />
      <section className="builder-section builder-section--contact">
        <div className="container">
          <RequestBuilder />
        </div>
      </section>
    </>
  );
}
