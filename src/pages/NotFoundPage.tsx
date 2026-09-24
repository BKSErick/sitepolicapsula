import { ArrowLink } from '../components/ArrowLink';

export function NotFoundPage() {
  return (
    <section className="not-found">
      <div className="container">
        <span className="eyebrow">ERRO 404 · ROTA NÃO LOCALIZADA</span>
        <h1>Página não encontrada.</h1>
        <p>
          O endereço pode ter mudado durante a reorganização do conteúdo. Use a
          navegação ou retorne à página inicial.
        </p>
        <ArrowLink href="/">Voltar ao início</ArrowLink>
      </div>
    </section>
  );
}
