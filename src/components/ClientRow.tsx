import { clients } from '../data/site-content';

interface ClientRowProps {
  title?: string;
  eyebrow?: string;
}

/** Os oito clientes que a Policápsula publica, numa linha de blocos arredondados. */
export function ClientRow({
  eyebrow = 'PRINCIPAIS CLIENTES',
  title = 'Parceira de grandes grupos da siderurgia e da indústria.',
}: ClientRowProps) {
  return (
    <section className="client-row" aria-labelledby="clientes-titulo">
      <div className="container">
        <span className="eyebrow">{eyebrow}</span>
        <h2 id="clientes-titulo">{title}</h2>
        <ul>
          {clients.map((client) => (
            <li key={client.slug}>
              <img
                alt={`Logotipo ${client.name}`}
                height={40}
                loading="lazy"
                src={`/brand/clientes/${client.slug}.png`}
                width={195}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
