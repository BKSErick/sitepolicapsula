import {
  ArrowUpRight,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';
import { type FormEvent, useEffect, useMemo, useRef, useState } from 'react';

import { company, findRequestOption, requestCatalog, whatsappUrl } from '../data/site-content';
import {
  buildContactWhatsAppUrl,
  type TechnicalContactErrors,
  type TechnicalContactInput,
  validateTechnicalContact,
} from '../lib/intake';

const emptyContact: TechnicalContactInput = {
  name: '',
  company: '',
  email: '',
  phone: '',
  service: '',
  details: '',
  website: '',
};

function FieldError({ message }: { message?: string }) {
  return message ? (
    <span className="field-error" role="alert">
      {message}
    </span>
  ) : null;
}

export function TechnicalContact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [data, setData] = useState(emptyContact);
  const [errors, setErrors] = useState<TechnicalContactErrors>({});
  const validation = useMemo(() => validateTechnicalContact(data), [data]);

  useEffect(() => {
    const item = new URLSearchParams(window.location.search).get('item');
    if (!findRequestOption(item)) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData((current) => (current.service ? current : { ...current, service: item ?? '' }));
  }, []);

  const update = (field: keyof TechnicalContactInput, value: string) => {
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
          ?.querySelector<HTMLElement>(`[data-contact-field="${firstInvalid}"]`)
          ?.focus();
      });
      return;
    }

    window.open(buildContactWhatsAppUrl(data), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="technical-contact" id="contato-tecnico">
      <div className="technical-contact__channels" data-reveal="right">
        <div className="technical-contact__section-head">
          <span className="technical-code">CANAIS DIRETOS / 01</span>
          <h2>Fale com quem entende do processo.</h2>
          <p>Use o canal mais direto para sua demanda. O formulário já organiza o contexto para a conversa técnica.</p>
        </div>

        <address className="contact-channels">
          <a className="contact-channel" href={company.address.mapsUrl} target="_blank" rel="noreferrer">
            <MapPin aria-hidden="true" />
            <span>
              <small>Endereço</small>
              <strong>{company.address.label}</strong>
              <em>{company.address.region}</em>
            </span>
            <ArrowUpRight aria-hidden="true" />
          </a>
          <a className="contact-channel" href={whatsappUrl()} target="_blank" rel="noreferrer">
            <MessageCircle aria-hidden="true" />
            <span>
              <small>WhatsApp técnico</small>
              <strong>{company.whatsapp.label}</strong>
              <em>Conversa direta com a equipe</em>
            </span>
            <ArrowUpRight aria-hidden="true" />
          </a>
          <a className="contact-channel" href={company.phone.href}>
            <Phone aria-hidden="true" />
            <span>
              <small>Telefone comercial</small>
              <strong>{company.phone.label}</strong>
              <em>{company.hours}</em>
            </span>
            <ArrowUpRight aria-hidden="true" />
          </a>
          <a className="contact-channel" href={`mailto:${company.email}`}>
            <Mail aria-hidden="true" />
            <span>
              <small>E-mail</small>
              <strong>{company.email}</strong>
              <em>Orçamentos, desenhos e especificações</em>
            </span>
            <ArrowUpRight aria-hidden="true" />
          </a>
          <div className="contact-channel contact-channel--hours">
            <Clock3 aria-hidden="true" />
            <span>
              <small>Atendimento</small>
              <strong>Segunda a sexta</strong>
              <em>08h30 às 17h30</em>
            </span>
          </div>
        </address>

        <div className="contact-map">
          <iframe
            title="Mapa da Policápsula"
            src={company.address.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <a href={company.address.mapsUrl} target="_blank" rel="noreferrer">
            Abrir rota no Google Maps <ArrowUpRight aria-hidden="true" size={16} />
          </a>
        </div>
      </div>

      <form
        ref={formRef}
        className="technical-contact__form"
        aria-label="Contato técnico"
        noValidate
        onSubmit={submit}
        data-reveal="left"
      >
        <header>
          <div>
            <span className="technical-code">ANÁLISE TÉCNICA / 02</span>
            <h2>Envie sua demanda.</h2>
          </div>
          <span className="technical-contact__status">
            <i aria-hidden="true" /> Equipe online
          </span>
        </header>

        <div className="technical-contact__grid">
          <label>
            <span className="technical-contact__field-label">
              Nome completo <i aria-hidden="true">*</i>
            </span>
            <input
              aria-label="Nome completo"
              data-contact-field="name"
              autoComplete="name"
              placeholder="Nome e sobrenome"
              value={data.name}
              onChange={(event) => update('name', event.target.value)}
            />
            <FieldError message={errors.name} />
          </label>
          <label>
            <span className="technical-contact__field-label">
              Empresa ou planta <i aria-hidden="true">*</i>
            </span>
            <input
              aria-label="Empresa ou planta"
              data-contact-field="company"
              autoComplete="organization"
              placeholder="Razão social ou unidade"
              value={data.company}
              onChange={(event) => update('company', event.target.value)}
            />
            <FieldError message={errors.company} />
          </label>
          <label>
            <span className="technical-contact__field-label">
              E-mail técnico <i aria-hidden="true">*</i>
            </span>
            <input
              aria-label="E-mail técnico"
              data-contact-field="email"
              type="email"
              autoComplete="email"
              placeholder="engenharia@empresa.com.br"
              value={data.email}
              onChange={(event) => update('email', event.target.value)}
            />
            <FieldError message={errors.email} />
          </label>
          <label>
            <span className="technical-contact__field-label">
              Telefone <i aria-hidden="true">*</i>
            </span>
            <input
              aria-label="Telefone"
              data-contact-field="phone"
              type="tel"
              autoComplete="tel"
              placeholder="(31) 99999-9999"
              value={data.phone}
              onChange={(event) => update('phone', event.target.value)}
            />
            <FieldError message={errors.phone} />
          </label>
          <label className="technical-contact__full">
            <span className="technical-contact__field-label">
              Serviço desejado <i aria-hidden="true">*</i>
            </span>
            <select
              aria-label="Serviço desejado"
              data-contact-field="service"
              value={data.service}
              onChange={(event) => update('service', event.target.value)}
            >
              <option value="">Selecione o tipo de demanda...</option>
              {requestCatalog.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <FieldError message={errors.service} />
          </label>
          <label className="technical-contact__full">
            Contexto técnico
            <textarea
              aria-label="Contexto técnico"
              data-contact-field="details"
              rows={5}
              placeholder="Descreva o sistema, a medida, o equipamento ou a situação da operação."
              value={data.details}
              onChange={(event) => update('details', event.target.value)}
            />
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

        <p className="technical-contact__privacy">
          Ao continuar, você concorda com a nossa <a href="/privacidade/">Política de Privacidade</a> e autoriza o contato da equipe técnica.
        </p>
        <button className="technical-contact__submit" type="submit">
          Continuar pelo WhatsApp <Send aria-hidden="true" size={18} />
        </button>
      </form>
    </div>
  );
}
