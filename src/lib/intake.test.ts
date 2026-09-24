import { describe, expect, it } from 'vitest';

import { buildRequestMessage, buildWhatsAppRequestUrl, validateWebsiteRequest } from './intake';

const valid = {
  name: 'Ana Souza',
  company: 'Usina Exemplo',
  item: 'estacoes-envio-recebimento',
  detail: 'Estação do laboratório químico',
  quantity: '',
  urgency: 'Neste mês',
  website: '',
};

describe('Pedido Pronto', () => {
  it('accepts a complete request', () => {
    expect(validateWebsiteRequest(valid)).toEqual({ success: true, isBot: false, errors: {} });
  });

  it('flags missing item, detail and urgency', () => {
    const result = validateWebsiteRequest({ ...valid, item: 'inexistente', detail: '', urgency: '' });
    expect(result.success).toBe(false);
    expect(Object.keys(result.errors).sort()).toEqual(['detail', 'item', 'urgency']);
  });

  it('treats the honeypot as a bot', () => {
    expect(validateWebsiteRequest({ ...valid, website: 'spam.example' }).isBot).toBe(true);
  });

  it('writes the item label and marks an empty quantity as a definir', () => {
    const message = buildRequestMessage(valid);
    expect(message).toContain('Item: Estações de envio e recebimento');
    expect(message).toContain('Quantidade: a definir');
  });

  it('builds a wa.me link with the encoded message', () => {
    const url = new URL(buildWhatsAppRequestUrl(valid));
    expect(url.href.startsWith('https://wa.me/5531987887665?text=')).toBe(true);
    expect(url.searchParams.get('text')).toContain('Nome: Ana Souza');
  });
});
