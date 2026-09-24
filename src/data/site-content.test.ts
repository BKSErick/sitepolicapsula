/// <reference types="vite/client" />
import { describe, expect, it } from 'vitest';

import * as content from './site-content';

/** Arquivos de public/, listados pelo Vite sem carregar nenhum deles. */
const publicFiles = new Set(
  Object.keys(import.meta.glob('/public/**/*.{jpg,png,svg}')).map((path) =>
    path.replace(/^\/public/, '')
  )
);

const {
  clients,
  company,
  findRoute,
  home,
  media,
  products,
  requestCatalog,
  solutions,
  staticRoutes,
} = content;

describe('Policápsula content contract', () => {
  it('keeps the home statement in two intentional lines', () => {
    expect(home.heroLines).toEqual(['Da corrida ao', 'laboratório.']);
  });

  it('keeps the route map in reading order', () => {
    expect(staticRoutes.map((route) => route.path)).toEqual([
      '/',
      '/empresa/',
      '/solucoes/',
      '/solucoes/consultoria/',
      '/solucoes/transporte-pneumatico/',
      '/solucoes/capsulas/',
      '/solucoes/estacoes-e-amortecedores/',
      '/solucoes/preparacao-de-amostras/',
      '/solucoes/engenharia-de-manutencao/',
      '/produtos/',
      '/contato/',
      '/privacidade/',
    ]);
  });

  it('resolves paths with or without the trailing slash', () => {
    expect(findRoute('/produtos')?.kind).toBe('products');
    expect(findRoute('/nao-existe/')).toBeUndefined();
  });

  it('has six fronts and the ten products of the published catalog', () => {
    expect(solutions).toHaveLength(6);
    expect(solutions[0].slug).toBe('consultoria');
    expect(products).toHaveLength(10);
    expect(new Set(products.map((product) => product.slug)).size).toBe(10);
    for (const product of products) {
      expect(solutions.some((solution) => solution.slug === product.solutionSlug)).toBe(true);
    }
    expect(requestCatalog).toHaveLength(16);
    expect(new Set(requestCatalog.map((option) => option.short)).size).toBe(16);
  });

  it('gives every front a substantial and specific institutional narrative', () => {
    for (const solution of solutions) {
      expect(solution.institutional.heading.length).toBeGreaterThanOrEqual(55);
      expect(solution.institutional.paragraphs).toHaveLength(2);
      expect(solution.institutional.paragraphs.every((paragraph) => paragraph.length >= 140)).toBe(true);
      expect(solution.institutional.pillars.map((pillar) => pillar.label)).toEqual([
        'Entender',
        'Organizar',
        'Construir',
      ]);
    }

    expect(new Set(solutions.map((solution) => solution.institutional.heading)).size).toBe(6);
  });

  it('shows the eight clients the company itself publishes', () => {
    expect(clients.map((client) => client.name)).toEqual([
      'ArcelorMittal',
      'Vallourec',
      'Usiminas',
      'Villares Metals',
      'Aperam',
      'FLSmidth',
      'Gerdau',
      'Ternium',
    ]);
  });

  it('gives every route a unique title and a useful description', () => {
    const titles = staticRoutes.map((route) => route.meta.title);
    const descriptions = staticRoutes.map((route) => route.meta.description);
    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);
    for (const description of descriptions) {
      expect(description.length).toBeGreaterThanOrEqual(80);
    }
  });

  it('points WhatsApp to the Policápsula number', () => {
    expect(company.whatsapp.number).toBe('5531987887665');
  });

  it('keeps the verified address and map in the content source of truth', () => {
    expect(company.address.label).toBe('Rua Colina, 302, letra A');
    expect(company.address.region).toBe('Sion · João Monlevade/MG · CEP 35931-440');
    expect(company.address.mapEmbedUrl).toContain('google.com/maps');
    expect(company.address.mapEmbedUrl).toContain('output=embed');
  });

  it('references only media that exists in public/', () => {
    const sources = [
      ...Object.values(media).map((asset) => asset.src),
      ...solutions.map((solution) => solution.image.src),
      ...products.flatMap((product) => (product.image ? [product.image.src] : [])),
      ...clients.map((client) => `/brand/clientes/${client.slug}.png`),
      '/brand/policapsula-logo.png',
      '/brand/policapsula-logo-white.png',
      '/og-policapsula.jpg',
    ];
    for (const src of sources) {
      expect(publicFiles.has(src), src).toBe(true);
    }
  });

  it('keeps unproven claims and leftovers out of the copy', () => {
    const serialized = JSON.stringify(content);
    expect(serialized).not.toContain('—');
    expect(serialized).not.toMatch(/jotta/i);
    expect(serialized).not.toMatch(/\biso\b/i);
    expect(serialized).not.toMatch(/garantia|garantido|líder/i);
  });
});
