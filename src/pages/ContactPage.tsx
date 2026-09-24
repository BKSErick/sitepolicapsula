import { Breadcrumbs } from '../components/Breadcrumbs';
import { ContactHero } from '../components/Heroes';
import { TechnicalContact } from '../components/TechnicalContact';
import type { PublicRoute } from '../data/site-content';

export function ContactPage({ route }: { route: PublicRoute }) {
  return (
    <>
      <Breadcrumbs current={route.label} />
      <ContactHero route={route} />
      <section className="contact-section">
        <div className="container">
          <TechnicalContact />
        </div>
      </section>
    </>
  );
}
