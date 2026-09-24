import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import App from './App';

describe('Policápsula site', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    window.history.replaceState({}, '', '/');
  });

  it('renders the home positioning, the client strip and the five fronts', () => {
    render(<App initialPath="/" />);

    expect(
      screen.getByRole('heading', { level: 1, name: /da corrida ao laboratório/i })
    ).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /montar pedido/i }).length).toBeGreaterThan(0);
    expect(screen.getByRole('navigation', { name: /principal/i })).toBeInTheDocument();
    expect(screen.getByAltText('Logotipo ArcelorMittal')).toBeInTheDocument();
    expect(document.querySelectorAll('.solution-card')).toHaveLength(5);
    expect(document.querySelector('.home-hero__visual img')).toHaveAttribute(
      'src',
      '/media/hero-aciaria.jpg'
    );
  });

  it('renders a solution page with its services and own products', () => {
    render(<App initialPath="/solucoes/preparacao-de-amostras/" />);

    expect(
      screen.getByRole('heading', { level: 1, name: /sem risco para a mão de quem prepara/i })
    ).toBeInTheDocument();
    const productList = document.querySelector('.product-list');
    expect(productList).toHaveTextContent('Dispositivo Policápsula para lixadeiras');
    expect(productList?.querySelectorAll('li')).toHaveLength(7);
    expect(screen.getByText('Equipamentos que atendem à NR10 e à NR12')).toBeInTheDocument();
  });

  it('lists the ten products in the catalog', () => {
    render(<App initialPath="/produtos/" />);

    expect(document.querySelectorAll('.product-grid article')).toHaveLength(10);
  });

  it('renders the not found page for unknown paths', () => {
    render(<App initialPath="/contato-antigo/" />);

    expect(screen.getByRole('heading', { level: 1, name: /página não encontrada/i })).toBeInTheDocument();
  });

  it('validates the Pedido Pronto before opening WhatsApp', () => {
    const open = vi.fn();
    vi.stubGlobal('open', open);
    render(<App initialPath="/contato/" />);

    fireEvent.click(screen.getByRole('button', { name: /enviar pelo whatsapp/i }));

    expect(open).not.toHaveBeenCalled();
    expect(screen.getByText('Escolha o item ou o serviço.')).toBeInTheDocument();
    expect(screen.getByText('Escolha a urgência.')).toBeInTheDocument();
  });

  it('opens WhatsApp with the full request and never calls a server', () => {
    const open = vi.fn();
    const fetchSpy = vi.fn();
    vi.stubGlobal('open', open);
    vi.stubGlobal('fetch', fetchSpy);
    render(<App initialPath="/contato/" />);

    fireEvent.change(screen.getByLabelText('Item ou serviço'), {
      target: { value: 'capsulas-torpedos' },
    });
    fireEvent.change(screen.getByLabelText('Sistema, modelo ou dimensão'), {
      target: { value: 'Tubo do laboratório químico' },
    });
    fireEvent.change(screen.getByLabelText('Quantidade'), { target: { value: '12' } });
    fireEvent.change(screen.getByLabelText('Urgência'), { target: { value: 'Nesta semana' } });
    fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'Ana Souza' } });
    fireEvent.change(screen.getByLabelText('Empresa ou planta'), {
      target: { value: 'Usina Exemplo' },
    });
    fireEvent.click(screen.getByRole('button', { name: /enviar pelo whatsapp/i }));

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(open).toHaveBeenCalledTimes(1);
    const url = new URL(open.mock.calls[0][0] as string);
    expect(url.origin + url.pathname).toBe('https://wa.me/5531987887665');
    const text = url.searchParams.get('text') ?? '';
    expect(text).toContain('Item: Cápsulas (torpedos) industriais');
    expect(text).toContain('Quantidade: 12');
    expect(text).toContain('Urgência: Nesta semana');
    expect(text).toContain('Empresa / planta: Usina Exemplo');
  });

  it('prefills the item from the query string after mount', () => {
    window.history.replaceState({}, '', '/contato/?item=lixadeira-policapsula');
    render(<App initialPath="/contato/" />);

    expect(screen.getByLabelText('Item ou serviço')).toHaveValue('lixadeira-policapsula');
  });
});
