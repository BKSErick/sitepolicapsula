import { describe, expect, it } from 'vitest';

import {
  buildContactMessage,
  buildContactWhatsAppUrl,
  validateTechnicalContact,
} from './intake';

const validContact = {
  name: 'Ana Souza',
  company: 'Usina Exemplo',
  email: 'ana@usina.com.br',
  phone: '(31) 99999-9999',
  service: 'transporte-pneumatico',
  details: 'Precisamos revisar a estação de recebimento.',
  website: '',
};

describe('Contato técnico', () => {
  it('accepts a complete technical contact', () => {
    expect(validateTechnicalContact(validContact)).toEqual({
      success: true,
      isBot: false,
      errors: {},
    });
  });

  it('rejects invalid email, phone and service', () => {
    const result = validateTechnicalContact({
      ...validContact,
      email: 'ana@',
      phone: '123',
      service: 'inexistente',
    });

    expect(result.success).toBe(false);
    expect(Object.keys(result.errors).sort()).toEqual(['email', 'phone', 'service']);
  });

  it('keeps the honeypot fail closed', () => {
    expect(validateTechnicalContact({ ...validContact, website: 'spam.example' }).isBot).toBe(true);
  });

  it('builds a complete WhatsApp message without a server', () => {
    const message = buildContactMessage(validContact);
    const url = new URL(buildContactWhatsAppUrl(validContact));

    expect(message).toContain('Demanda: Transporte pneumático');
    expect(message).toContain('E-mail: ana@usina.com.br');
    expect(message).toContain('Contexto: Precisamos revisar a estação de recebimento.');
    expect(url.origin + url.pathname).toBe('https://wa.me/5531987887665');
    expect(url.searchParams.get('text')).toBe(message);
  });
});
