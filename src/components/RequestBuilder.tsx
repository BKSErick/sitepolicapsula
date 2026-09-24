import { Minus, Plus, Send } from 'lucide-react';
import { type FormEvent, useEffect, useMemo, useRef, useState } from 'react';

import { findRequestOption, requestCatalog, urgencyOptions } from '../data/site-content';
import {
  buildRequestMessage,
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
  return message ? (
    <span className="field-error" role="alert">
      {message}
    </span>
  ) : null;
}

/**
 * Pedido Pronto: o comprador monta o pedido em três passos e vê, ao lado, a
 * mensagem exata que vai chegar no WhatsApp da Policápsula. Nada passa por
 * servidor.
 */
export function RequestBuilder({ id = 'pedido' }: { id?: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [data, setData] = useState(emptyRequest);
  const [errors, setErrors] = useState<WebsiteRequestErrors>({});
  const validation = useMemo(() => validateWebsiteRequest(data), [data]);
  // Campo ainda vazio aparece como reticências na prévia, em vez de linha cortada.
  const preview = useMemo(() => buildRequestMessage(data).replace(/: $/gm, ': …'), [data]);

  /**
   * Páginas de produto e de frente linkam para /contato/?item=<slug>. Em
   * efeito, não na renderização: o SSR não vê a query string, e divergir do
   * markup pré-renderizado quebraria a hidratação.
   */
  useEffect(() => {
    const item = new URLSearchParams(window.location.search).get('item');
    if (!findRequestOption(item)) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData((current) => (current.item ? current : { ...current, item: item ?? '' }));
  }, []);

  const update = (field: keyof WebsiteRequestInput, value: string) => {
    setData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const stepQuantity = (delta: number) => {
    const current = Number.parseInt(data.quantity, 10);
    const next = Math.max(1, (Number.isFinite(current) ? current : 0) + delta);
    update('quantity', String(next));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validation.isBot) return;

    if (!validation.success) {
      setErrors(validation.errors);
      const firstInvalid = Object.keys(validation.errors)[0];
      window.requestAnimationFrame(() => {
        formRef.current?.querySelector<HTMLElement>(`[data-field="${firstInvalid}"]`)?.focus();
      });
      return;
    }

    window.open(buildWhatsAppRequestUrl(data), '_blank', 'noopener,noreferrer');
  };

  return (
    <form
      ref={formRef}
      id={id}
      className="builder"
      aria-label="Pedido Pronto"
      noValidate
      onSubmit={submit}
    >
      <div className="builder__steps">
        <fieldset className="builder__step">
          <legend>
            <span>01</span> O que você precisa?
          </legend>
          {groups.map((group) => (
            <div className="chip-group" key={group}>
              <p className="chip-group__label">{group}</p>
              <div className="chips" role="radiogroup" aria-label={group}>
                {requestCatalog
                  .filter((option) => option.group === group)
                  .map((option, index) => (
                    <label className="chip" key={option.value}>
                      <input
                        type="radio"
                        name="item"
                        value={option.value}
                        checked={data.item === option.value}
                        onChange={() => update('item', option.value)}
                        {...(group === 'Produtos' && index === 0 ? { 'data-field': 'item' } : {})}
                      />
                      <span>{option.short}</span>
                    </label>
                  ))}
              </div>
            </div>
          ))}
          <FieldError message={errors.item} />
        </fieldset>

        <fieldset className="builder__step">
          <legend>
            <span>02</span> Medida e urgência
          </legend>
          <label className="builder__field">
            Sistema, modelo ou dimensão
            <input
              data-field="detail"
              placeholder="Ex.: diâmetro do tubo, modelo da estação ou da lixadeira"
              value={data.detail}
              onChange={(event) => update('detail', event.target.value)}
            />
            <FieldError message={errors.detail} />
          </label>
          <div className="builder__row">
            <div className="builder__field">
              <span id={`${id}-quantidade`}>Quantidade</span>
              <div className="stepper">
                <button type="button" aria-label="Diminuir quantidade" onClick={() => stepQuantity(-1)}>
                  <Minus size={16} aria-hidden="true" />
                </button>
                <input
                  data-field="quantity"
                  aria-labelledby={`${id}-quantidade`}
                  inputMode="numeric"
                  placeholder="A definir"
                  value={data.quantity}
                  onChange={(event) => update('quantity', event.target.value)}
                />
                <button type="button" aria-label="Aumentar quantidade" onClick={() => stepQuantity(1)}>
                  <Plus size={16} aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="builder__field">
              <span id={`${id}-urgencia`}>Urgência</span>
              <div className="segmented" role="radiogroup" aria-labelledby={`${id}-urgencia`}>
                {urgencyOptions.map((option, index) => (
                  <label key={option}>
                    <input
                      type="radio"
                      name="urgency"
                      value={option}
                      checked={data.urgency === option}
                      onChange={() => update('urgency', option)}
                      {...(index === 0 ? { 'data-field': 'urgency' } : {})}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              <FieldError message={errors.urgency} />
            </div>
          </div>
        </fieldset>

        <fieldset className="builder__step">
          <legend>
            <span>03</span> Quem está pedindo
          </legend>
          <div className="builder__row">
            <label className="builder__field">
              Nome
              <input
                data-field="name"
                autoComplete="name"
                value={data.name}
                onChange={(event) => update('name', event.target.value)}
              />
              <FieldError message={errors.name} />
            </label>
            <label className="builder__field">
              Empresa ou planta
              <input
                data-field="company"
                autoComplete="organization"
                value={data.company}
                onChange={(event) => update('company', event.target.value)}
              />
              <FieldError message={errors.company} />
            </label>
          </div>
        </fieldset>

        <label className="honeypot" aria-hidden="true">
          Website
          <input
            tabIndex={-1}
            autoComplete="off"
            value={data.website}
            onChange={(event) => update('website', event.target.value)}
          />
        </label>
      </div>

      <aside className="builder__preview" aria-label="Prévia da mensagem">
        <div className="chat">
          <header className="chat__head">
            <span className="chat__avatar" aria-hidden="true" />
            <div>
              <strong>Policápsula</strong>
              <small>Equipe técnica · WhatsApp</small>
            </div>
          </header>
          <div className="chat__body">
            <p className="chat__bubble" data-testid="pedido-previa">
              {preview}
            </p>
          </div>
        </div>
        <button className="builder__submit" type="submit">
          Enviar pelo WhatsApp
          <Send aria-hidden="true" size={17} />
        </button>
        <p className="builder__note">O WhatsApp abre com o pedido escrito. Nada é enviado antes de você confirmar lá.</p>
      </aside>
    </form>
  );
}
