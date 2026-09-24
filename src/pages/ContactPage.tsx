import { Breadcrumbs } from '../components/Breadcrumbs';
import { PageHero } from '../components/PageHero';
import { RequestForm } from '../components/RequestForm';
import { company, whatsappUrl, type PublicRoute } from '../data/site-content';

export function ContactPage({ route }: { route: PublicRoute }) {
  return (
    <>
      <Breadcrumbs current={route.label} />
      <PageHero route={route} cta={false} marker="PC / PEDIDO PRONTO" />
      <section className="section section--form">
        <div className="container contact-layout">
          <div className="contact-aside" data-reveal="right">
            <span className="technical-code">ANTES DE ENVIAR</span>
            <h2>Pedido com medida não volta com pergunta.</h2>
            <p className="contact-aside__lead">
              Quatro informações bastam para a equipe técnica saber o que você precisa e
              responder já no primeiro contato.
            </p>
            <ol>
              <li><span>01</span> Item ou serviço</li>
              <li><span>02</span> Sistema, modelo ou dimensão</li>
              <li><span>03</span> Quantidade</li>
              <li><span>04</span> Urgência</li>
            </ol>
            <span className="technical-code">CANAIS DIRETOS</span>
            <a href={company.phone.href}>{company.phone.label}</a>
            <a href={whatsappUrl()}>WhatsApp {company.whatsapp.label}</a>
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <p>{company.hours}.</p>
          </div>
          <div data-reveal="left">
            <RequestForm />
          </div>
        </div>
      </section>
    </>
  );
}
