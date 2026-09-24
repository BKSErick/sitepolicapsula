import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import App from './App';

describe('Policápsula site', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    window.history.replaceState({}, '', '/');
  });

  it('renders the home positioning, six fronts and the direct technical contact', () => {
    render(<App initialPath="/" />);

    expect(
      screen.getByRole('heading', { level: 1, name: /da corrida ao laboratório/i })
    ).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /solicitar análise/i }).length).toBeGreaterThan(0);
    expect(screen.getByAltText('Logotipo ArcelorMittal')).toBeInTheDocument();
    expect(document.querySelectorAll('.front-list li')).toHaveLength(6);
    expect(screen.getByRole('form', { name: 'Contato técnico' })).toBeInTheDocument();
    expect(screen.queryByRole('form', { name: 'Pedido Pronto' })).not.toBeInTheDocument();
    expect(screen.queryByText(/monte o pedido\. veja a mensagem/i)).not.toBeInTheDocument();
    expect(screen.getByTitle('Mapa da Policápsula')).toBeInTheDocument();
    expect(document.querySelectorAll('.highlights img')).toHaveLength(0);
    expect(document.querySelectorAll('.highlight__index')).toHaveLength(2);
    expect(document.querySelector('.hero-home .capsule-photo--large img')).toHaveAttribute(
      'src',
      '/media/hero-aciaria.jpg'
    );
    expect(screen.getByRole('link', { name: /conversar no whatsapp/i })).toHaveAttribute(
      'href',
      expect.stringContaining('https://wa.me/5531987887665')
    );
  });

  it('renders the consulting front with the whole sample path lit', () => {
    render(<App initialPath="/solucoes/consultoria/" />);

    expect(
      screen.getByRole('heading', { level: 1, name: /consultoria para o caminho inteiro/i })
    ).toBeInTheDocument();
    expect(document.querySelectorAll('.path-track li.is-active')).toHaveLength(6);
    expect(
      screen.getByRole('heading', {
        name: /antes de fabricar uma peça, é preciso compreender o sistema/i,
      })
    ).toBeInTheDocument();
    expect(document.querySelectorAll('.solution-institutional__pillar')).toHaveLength(3);
  });

  it('renders the six solutions as an expanded technical directory', () => {
    render(<App initialPath="/solucoes/" />);

    expect(document.querySelectorAll('.front-pills a')).toHaveLength(6);
    expect(document.querySelectorAll('.front-pills small')).toHaveLength(6);
  });

  it('renders a solution page with its services and own products', () => {
    render(<App initialPath="/solucoes/preparacao-de-amostras/" />);

    expect(
      screen.getByRole('heading', { level: 1, name: /sem risco para a mão de quem prepara/i })
    ).toBeInTheDocument();
    expect(document.querySelectorAll('.catalog__grid .product-card')).toHaveLength(7);
    expect(screen.getByText('Equipamentos que atendem à NR10 e à NR12')).toBeInTheDocument();
    expect(document.querySelectorAll('.path-track li.is-active')).toHaveLength(1);
  });

  it('lists the ten products and filters them by front', () => {
    render(<App initialPath="/produtos/" />);

    expect(document.querySelectorAll('.catalog__grid .product-card')).toHaveLength(10);
    fireEvent.click(screen.getByRole('button', { name: /preparação de amostras/i }));
    expect(document.querySelectorAll('.catalog__grid .product-card')).toHaveLength(7);
    fireEvent.click(screen.getByRole('button', { name: /todos/i }));
    expect(document.querySelectorAll('.catalog__grid .product-card')).toHaveLength(10);
  });

  it('renders the not found page for unknown paths', () => {
    render(<App initialPath="/contato-antigo/" />);

    expect(screen.getByRole('heading', { level: 1, name: /página não encontrada/i })).toBeInTheDocument();
  });

  it('renders the technical contact, address and map', () => {
    render(<App initialPath="/contato/" />);

    expect(screen.getByRole('form', { name: 'Contato técnico' })).toBeInTheDocument();
    expect(screen.getByText('Rua Colina, 302, letra A')).toBeInTheDocument();
    expect(screen.getByTitle('Mapa da Policápsula')).toHaveAttribute(
      'src',
      expect.stringContaining('output=embed')
    );
  });

  it('validates the technical contact before opening WhatsApp', () => {
    const open = vi.fn();
    vi.stubGlobal('open', open);
    render(<App initialPath="/contato/" />);

    fireEvent.click(screen.getByRole('button', { name: /continuar pelo whatsapp/i }));

    expect(open).not.toHaveBeenCalled();
    expect(screen.getByText('Informe seu nome.')).toBeInTheDocument();
    expect(screen.getByText('Informe um e-mail válido.')).toBeInTheDocument();
  });

  it('opens WhatsApp with the complete technical contact', () => {
    const open = vi.fn();
    vi.stubGlobal('open', open);
    render(<App initialPath="/contato/" />);

    fireEvent.change(screen.getByLabelText('Nome completo'), { target: { value: 'Ana Souza' } });
    fireEvent.change(screen.getByLabelText('Empresa ou planta'), { target: { value: 'Usina Exemplo' } });
    fireEvent.change(screen.getByLabelText('E-mail técnico'), { target: { value: 'ana@usina.com.br' } });
    fireEvent.change(screen.getByLabelText('Telefone'), { target: { value: '(31) 99999-9999' } });
    fireEvent.change(screen.getByLabelText('Serviço desejado'), {
      target: { value: 'transporte-pneumatico' },
    });
    fireEvent.change(screen.getByLabelText('Contexto técnico'), {
      target: { value: 'Revisar estação de recebimento' },
    });
    fireEvent.click(screen.getByRole('button', { name: /continuar pelo whatsapp/i }));

    expect(open).toHaveBeenCalledTimes(1);
    const url = new URL(open.mock.calls[0][0] as string);
    expect(url.searchParams.get('text')).toContain('Demanda: Transporte pneumático');
    expect(url.searchParams.get('text')).toContain('E-mail: ana@usina.com.br');
  });

  it('prefills the contact demand from the query string after mount', () => {
    window.history.replaceState({}, '', '/contato/?item=lixadeira-policapsula');
    render(<App initialPath="/contato/" />);

    expect(screen.getByLabelText('Serviço desejado')).toHaveValue('lixadeira-policapsula');
  });
});
