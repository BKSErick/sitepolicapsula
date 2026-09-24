/**
 * Smoke visual do build: todas as rotas em desktop e celular, sem erro de
 * console, sem imagem quebrada, sem rolagem horizontal, e o Pedido Pronto
 * abrindo o WhatsApp com o texto certo sem chamar servidor.
 *
 *   npm run build && npm run smoke:visual
 *
 * Chrome: usa CHROME_PATH ou o chromium baixado pelo Playwright.
 */
import { existsSync } from 'node:fs';

import { chromium } from 'playwright';

import { startDistServer } from './serve-dist.mjs';

const PORT = 4187;
const BASE = `http://127.0.0.1:${PORT}`;
const ROUTES = [
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
];
const VIEWPORTS = [
  ['desktop', { width: 1440, height: 900 }],
  ['mobile', { width: 390, height: 844 }],
];

const executablePath = [
  process.env.CHROME_PATH,
  `${process.env.LOCALAPPDATA}/ms-playwright/chromium-1234/chrome-win64/chrome.exe`,
].find((path) => path && existsSync(path));

const failures = [];
const fail = (message) => failures.push(message);

const server = await startDistServer({ port: PORT });
const browser = await chromium.launch(executablePath ? { executablePath } : {});

try {
  for (const [label, viewport] of VIEWPORTS) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    const errors = [];
    page.on('console', (message) => message.type() === 'error' && errors.push(message.text()));
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('request', (request) => {
      if (new URL(request.url()).pathname.startsWith('/api/')) fail(`${label}: request para ${request.url()}`);
    });

    for (const route of ROUTES) {
      errors.length = 0;
      const response = await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle' });
      if (response?.status() !== 200) fail(`${label} ${route}: status ${response?.status()}`);
      if ((await page.locator('h1').count()) !== 1) fail(`${label} ${route}: precisa de exatamente um h1`);

      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 700) {
          window.scrollTo(0, y);
          await new Promise((resolve) => setTimeout(resolve, 40));
        }
      });
      await page.waitForLoadState('networkidle');

      const broken = await page.$$eval('img', (images) =>
        images.filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.src)
      );
      if (broken.length) fail(`${label} ${route}: imagem quebrada ${broken.join(', ')}`);

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      if (overflow > 1) fail(`${label} ${route}: rolagem horizontal de ${overflow}px`);
      if (errors.length) fail(`${label} ${route}: console ${errors.join(' | ')}`);
    }

    // Pedido Pronto: preenche, envia e confere a URL do WhatsApp.
    await page.goto(`${BASE}/contato/?item=capsulas-torpedos`, { waitUntil: 'networkidle' });
    await page.getByRole('radio', { name: 'Nesta semana' }).check({ force: true });
    await page.fill('[data-field="detail"]', 'Tubo do laboratório químico');
    await page.fill('[data-field="name"]', 'Teste Smoke');
    await page.fill('[data-field="company"]', 'Usina Teste');
    const [popup] = await Promise.all([
      context.waitForEvent('page'),
      page.click('.builder__submit'),
    ]);
    const opened = popup.url();
    await popup.close();
    const text = new URL(opened).searchParams.get('text') ?? '';
    if (!opened.startsWith('https://wa.me/5531987887665') && !opened.includes('whatsapp')) {
      fail(`${label}: Pedido Pronto abriu ${opened}`);
    }
    if (opened.startsWith('https://wa.me/') && !text.includes('Item: Cápsulas (torpedos) industriais')) {
      fail(`${label}: texto do pedido incompleto`);
    }

    await context.close();
  }

  const notFound = await fetch(`${BASE}/nao-existe/`);
  if (notFound.status !== 404) fail(`404 devolveu ${notFound.status}`);
  const robots = await (await fetch(`${BASE}/robots.txt`)).text();
  if (!robots.includes('Disallow: /')) fail('robots.txt não bloqueia a prévia');
  const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
  const urls = sitemap.match(/<loc>/g)?.length ?? 0;
  if (urls !== ROUTES.length) fail(`sitemap com ${urls} URLs, esperado ${ROUTES.length}`);
} finally {
  await browser.close();
  server.close();
}

if (failures.length) {
  console.error(`Smoke visual falhou (${failures.length}):`);
  failures.forEach((failure) => console.error(`  x ${failure}`));
  process.exit(1);
}

console.log(`Smoke visual ok: ${ROUTES.length} rotas x ${VIEWPORTS.length} telas, Pedido Pronto, 404, robots e sitemap.`);
