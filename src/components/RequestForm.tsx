import { Send } from 'lucide-react';
import { type FormEvent, useEffect, useMemo, useRef, useState } from 'react';

import { findRequestOption, requestCatalog, urgencyOptions } from '../data/site-content';
import {
  buildWhatsAppRequestUrl,
  type WebsiteRequestErrors,
  type WebsiteRequestInput,
  validateWebsiteRequest,
} from '../lib/intake';

const emptyRequest: WebsiteRequestInput = {
  name: '',
  company: '',
  item: '',
  detail: '',
  quantity: '',
  urgency: '',
  website: '',
};

const groups = ['Produtos', 'Serviços'] as const;

function FieldError({ message }: { message?: string }) {
  return message ? <span className="field-error">{message}</span> : null;
}

export function RequestForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [data, setData] = useState(emptyRequest);
  const [errors, setErrors] = useState<WebsiteRequestErrors>({});
  const validation = useMemo(() => validateWebsiteRequest(data), [data]);

  /**
   * Páginas de solução e de produto linkam para /contato/?item=<slug>. Em
   * efeito, não na renderização: ler window.location durante o render daria
   * markup diferente do pré-renderizado e quebraria a hidratação.
   */
  useEffect(() => {
    const item = new URLSearchParams(window.location.search).get('item');
    if (!findRequestOption(item)) return;

    // Leitura única da URL no mount; o SSR não vê a query string.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData((current) => (current.item ? current : { ...current, item: item ?? '' }));
  }, []);

  const update = (field: keyof WebsiteRequestInput, value: string) => {
    setData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validation.isBot) return;

    if (!validation.success) {
      setErrors(validation.errors);
      const firstInvalid = Object.keys(validation.errors)[0];
      window.requestAnimationFrame(() => {
        formRef.current
          ?.querySelector<HTMLElement>(`[data-field="${firstInvalid}"]`)
          ?.focus();
      });
      return;
    }

    window.open(buildWhatsAppRequestUrl(data), '_blank', 'noopener,noreferrer');
  };

  return (
    <form
      ref={formRef}
      className="request-form request-form--compact"
      aria-label="Pedido Pronto"
      noValidate
      onSubmit={submit}
    >
      <header className="request-form__head">
        <div>
          <span className="technical-code">PEDIDO PRONTO · WHATSAPP</span>
          <h2>Item, medida e urgência. O pedido chega pronto.</h2>
        </div>
        <span className="request-form__status">
          <i aria-hidden="true" />
          Direto para a equipe
        </span>
      </header>

      <div className="form-grid request-form__fields">
        <label className="form-grid__wide">
          Item ou serviço
          <select
            data-field="item"
            aria-label="Item ou serviço"
            value={data.item}
            onChange={(event) => update('item', event.target.value)}
          >
            <option value="">Escolha o item</option>
            {groups.map((group) => (
              <optgroup key={group} label={group}>
                {requestCatalog
                  .filter((option) => option.group === group)
                  .map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
              </optgroup>
            ))}
          </select>
          <FieldError message={errors.item} />
        </label>
        <label className="form-grid__wide">
          Sistema, modelo ou dimensão
          <input
            data-field="detail"
            aria-label="Sistema, modelo ou dimensão"
            placeholder="Ex.: diâmetro do tubo, modelo da estação ou da lixadeira"
            value={data.detail}
            onChange={(event) => update('detail', event.target.value)}
          />
          <FieldError message={errors.detail} />
        </label>
        <label>
          Quantidade
          <input
            data-field="quantity"
            aria-label="Quantidade"
            inputMode="numeric"
            placeholder="Opcional"
            value={data.quantity}
            onChange={(event) => update('quantity', event.target.value)}
          />
        </label>
        <label>
          Urgência
          <select
            data-field="urgency"
            aria-label="Urgência"
            value={data.urgency}
            onChange={(event) => update('urgency', event.target.value)}
          >
            <option value="">Escolha</option>
            {urgencyOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <FieldError message={errors.urgency} />
        </label>
        <label>
          Nome
          <input
            data-field="name"
            aria-label="Nome"
            autoComplete="name"
            value={data.name}
            onChange={(event) => update('name', event.target.value)}
          />
          <FieldError message={errors.name} />
        </label>
        <label>
          Empresa ou planta
          <input
            data-field="company"
            aria-label="Empresa ou planta"
            autoComplete="organization"
            value={data.company}
            onChange={(event) => update('company', event.target.value)}
          />
          <FieldError message={errors.company} />
        </label>
      </div>

      <label className="honeypot" aria-hidden="true">
        Website
        <input
          tabIndex={-1}
          autoComplete="off"
          value={data.website}
          onChange={(event) => update('website', event.target.value)}
        />
      </label>

      <div className="request-form__actions">
        <div className="request-form__feedback">
          <p>O WhatsApp abre com o pedido escrito. Nada é enviado antes de você confirmar lá.</p>
        </div>
        <button className="button" type="submit">
          Enviar pelo WhatsApp
          <Send aria-hidden="true" size={17} />
        </button>
      </div>
    </form>
  );
}
