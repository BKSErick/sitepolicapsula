import { findRequestOption, whatsappUrl } from '../data/site-content';

function compact(value: unknown): string {
  return typeof value === 'string' ? value.trim().replace(/\s+/g, ' ') : '';
}

export interface TechnicalContactInput {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  details: string;
  website: string;
}

export type TechnicalContactErrors = Partial<Record<keyof TechnicalContactInput, string>>;

export interface TechnicalContactValidation {
  success: boolean;
  isBot: boolean;
  errors: TechnicalContactErrors;
}

export function normalizeTechnicalContact(
  input: Partial<TechnicalContactInput>
): TechnicalContactInput {
  return {
    name: compact(input.name),
    company: compact(input.company),
    email: compact(input.email).toLowerCase(),
    phone: compact(input.phone),
    service: compact(input.service),
    details: compact(input.details),
    website: compact(input.website),
  };
}

export function validateTechnicalContact(
  input: Partial<TechnicalContactInput>
): TechnicalContactValidation {
  const contact = normalizeTechnicalContact(input);
  const errors: TechnicalContactErrors = {};

  if (contact.website) {
    return { success: false, isBot: true, errors };
  }

  if (contact.name.length < 3) errors.name = 'Informe seu nome.';
  if (contact.company.length < 2) errors.company = 'Informe a empresa ou a planta.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
    errors.email = 'Informe um e-mail válido.';
  }
  if (contact.phone.replace(/\D/g, '').length < 10) {
    errors.phone = 'Informe um telefone com DDD.';
  }
  if (!findRequestOption(contact.service)) {
    errors.service = 'Selecione o tipo de demanda.';
  }

  return {
    success: Object.keys(errors).length === 0,
    isBot: false,
    errors,
  };
}

export function buildContactMessage(input: Partial<TechnicalContactInput>): string {
  const contact = normalizeTechnicalContact(input);
  const service = findRequestOption(contact.service)?.short ?? contact.service;

  return [
    'Olá, Policápsula! Solicitação técnica pelo site:',
    '',
    `Nome: ${contact.name}`,
    `Empresa / planta: ${contact.company}`,
    `E-mail: ${contact.email}`,
    `Telefone: ${contact.phone}`,
    `Demanda: ${service}`,
    ...(contact.details ? [`Contexto: ${contact.details}`] : []),
  ].join('\n');
}

export function buildContactWhatsAppUrl(input: Partial<TechnicalContactInput>): string {
  return whatsappUrl(buildContactMessage(input));
}
