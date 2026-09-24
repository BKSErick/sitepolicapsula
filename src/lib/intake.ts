import { findRequestOption, whatsappUrl } from '../data/site-content';

/**
 * Pedido Pronto: o comprador informa item, sistema ou dimensão, quantidade e
 * urgência antes de chegar no WhatsApp. Nada passa por servidor: o envio monta
 * a mensagem e abre o WhatsApp da Policápsula com o texto preenchido.
 */
export interface WebsiteRequestInput {
  name: string;
  company: string;
  item: string;
  detail: string;
  quantity: string;
  urgency: string;
  website: string;
}

export type WebsiteRequestErrors = Partial<Record<keyof WebsiteRequestInput, string>>;

export interface WebsiteRequestValidation {
  success: boolean;
  isBot: boolean;
  errors: WebsiteRequestErrors;
}

function compact(value: unknown): string {
  return typeof value === 'string' ? value.trim().replace(/\s+/g, ' ') : '';
}

export function normalizeWebsiteRequest(
  input: Partial<WebsiteRequestInput>
): WebsiteRequestInput {
  return {
    name: compact(input.name),
    company: compact(input.company),
    item: compact(input.item),
    detail: compact(input.detail),
    quantity: compact(input.quantity),
    urgency: compact(input.urgency),
    website: compact(input.website),
  };
}

export function validateWebsiteRequest(
  input: Partial<WebsiteRequestInput>
): WebsiteRequestValidation {
  const request = normalizeWebsiteRequest(input);
  const errors: WebsiteRequestErrors = {};

  if (request.website) {
    return { success: false, isBot: true, errors };
  }

  if (request.name.length < 3) errors.name = 'Informe seu nome.';
  if (request.company.length < 2) errors.company = 'Informe a empresa ou a planta.';
  if (!findRequestOption(request.item)) errors.item = 'Escolha o item ou o serviço.';
  if (request.detail.length < 3) {
    errors.detail = 'Informe o sistema, o modelo ou a dimensão. Se não souber, descreva a aplicação.';
  }
  if (!request.urgency) errors.urgency = 'Escolha a urgência.';

  return {
    success: Object.keys(errors).length === 0,
    isBot: false,
    errors,
  };
}

export function buildRequestMessage(input: Partial<WebsiteRequestInput>): string {
  const request = normalizeWebsiteRequest(input);
  const item = findRequestOption(request.item)?.label ?? request.item;

  return [
    'Olá, Policápsula! Pedido pelo site:',
    '',
    `Item: ${item}`,
    `Sistema, modelo ou dimensão: ${request.detail}`,
    `Quantidade: ${request.quantity || 'a definir'}`,
    `Urgência: ${request.urgency}`,
    '',
    `Nome: ${request.name}`,
    `Empresa / planta: ${request.company}`,
  ].join('\n');
}

export function buildWhatsAppRequestUrl(input: Partial<WebsiteRequestInput>): string {
  return whatsappUrl(buildRequestMessage(input));
}
