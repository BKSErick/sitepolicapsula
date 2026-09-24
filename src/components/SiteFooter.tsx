import { company, solutions, whatsappUrl } from '../data/site-content';
import { BrandMark } from './BrandMark';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__top">
        <div className="site-footer__brand">
          <BrandMark inverted />
          <p>
            Transporte pneumático e preparação de amostras para laboratórios da cadeia
            produtiva do aço.
          </p>
          <span className="technical-code">{company.signature.toUpperCase()}</span>
        </div>
        <div>
          <h2>Soluções</h2>
          <ul>
            {solutions.map((solution) => (
              <li key={solution.slug}>
                <a href={`/solucoes/${solution.slug}/`}>{solution.shortName}</a>
              </li>
            ))}
            <li>
              <a href="/produtos/">Produtos</a>
            </li>
          </ul>
        </div>
        <div>
          <h2>Contato</h2>
          <address>
            <a href={company.phone.href}>{company.phone.label}</a>
            <a href={whatsappUrl()}>WhatsApp {company.whatsapp.label}</a>
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <span>{company.hours}</span>
          </address>
        </div>
      </div>
      <div className="container site-footer__bottom">
        <span>© {new Date().getFullYear()} Policápsula</span>
        <div>
          <a href="/privacidade/">Privacidade</a>
        </div>
      </div>
    </footer>
  );
}
