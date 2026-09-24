import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import App from './App';

function fillRequest() {
  fireEvent.click(screen.getByRole('radio', { name: 'Cápsulas (torpedos)' }));
  fireEvent.change(screen.getByLabelText('Sistema, modelo ou dimensão'), {
    target: { value: 'Tubo do laboratório químico' },
  });
  fireEvent.change(screen.getByLabelText('Quantidade'), { target: { value: '12' } });
  fireEvent.click(screen.getByRole('radio', { name: 'Nesta semana' }));
  fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'Ana Souza' } });
  fireEvent.change(screen.getByLabelText('Empresa ou planta'), {
    target: { value: 'Usina Exemplo' },
  });
}

describe('Policápsula site', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    window.history.replaceState({}, '', '/');
  });

  it('renders the home positioning, clients, the six fronts and the order builder', () => {
    render(<App initialPath="/" />);

    expect(
      screen.getByRole('heading', { level: 1, name: /da corrida ao laboratório/i })
    ).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /montar pedido/i }).length).toBeGreaterThan(0);
    expect(screen.getByAltText('Logotipo ArcelorMittal')).toBeInTheDocument();
    expect(document.querySelectorAll('.front-list li')).toHaveLength(6);
    expect(screen.getByRole('form', { name: 'Pedido Pronto' })).toBeInTheDocument();
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

  it('validates the Pedido Pronto before opening WhatsApp', () => {
    const open = vi.fn();
    vi.stubGlobal('open', open);
    render(<App initialPath="/contato/" />);

    fireEvent.click(screen.getByRole('button', { name: /enviar pelo whatsapp/i }));

    expect(open).not.toHaveBeenCalled();
    expect(screen.getByText('Escolha o item ou o serviço.')).toBeInTheDocument();
    expect(screen.getByText('Escolha a urgência.')).toBeInTheDocument();
  });

  it('shows the live preview and opens WhatsApp with the full request', () => {
    const open = vi.fn();
    const fetchSpy = vi.fn();
    vi.stubGlobal('open', open);
    vi.stubGlobal('fetch', fetchSpy);
    render(<App initialPath="/contato/" />);

    fillRequest();
    const preview = screen.getByTestId('pedido-previa');
    expect(preview).toHaveTextContent('Item: Cápsulas (torpedos) industriais');
    expect(preview).toHaveTextContent('Urgência: Nesta semana');

    fireEvent.click(screen.getByRole('button', { name: /enviar pelo whatsapp/i }));

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(open).toHaveBeenCalledTimes(1);
    const url = new URL(open.mock.calls[0][0] as string);
    expect(url.origin + url.pathname).toBe('https://wa.me/5531987887665');
    const text = url.searchParams.get('text') ?? '';
    expect(text).toContain('Item: Cápsulas (torpedos) industriais');
    expect(text).toContain('Quantidade: 12');
    expect(text).toContain('Empresa / planta: Usina Exemplo');
  });

  it('steps the quantity with the plus and minus buttons', () => {
    render(<App initialPath="/contato/" />);

    fireEvent.click(screen.getByRole('button', { name: 'Aumentar quantidade' }));
    fireEvent.click(screen.getByRole('button', { name: 'Aumentar quantidade' }));
    fireEvent.click(screen.getByRole('button', { name: 'Diminuir quantidade' }));
    expect(screen.getByLabelText('Quantidade')).toHaveValue('1');
  });

  it('prefills the item from the query string after mount', () => {
    window.history.replaceState({}, '', '/contato/?item=lixadeira-policapsula');
    render(<App initialPath="/contato/" />);

    expect(screen.getByRole('radio', { name: 'Lixadeira' })).toBeChecked();
  });
});
