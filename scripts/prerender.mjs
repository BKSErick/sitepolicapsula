import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

import {
  isIndexableFrom,
  notFoundHead,
  pageHead,
  renderDocument,
  siteUrlFrom,
  sitemapXml,
} from '../sites/server/render-page.js';

const root = resolve('.');
const clientDir = resolve(root, 'dist/client');
const ssrDir = resolve(root, 'dist/ssr');
const entryPath = resolve(ssrDir, 'entry-server.js');
const template = await readFile(resolve(clientDir, 'index.html'), 'utf8');
const { staticRoutes, render } = await import(pathToFileURL(entryPath).href);

const siteUrl = siteUrlFrom(process.env);
const isIndexable = isIndexableFrom(process.env);

/**
 * Todo caminho de asset local que o HTML pré-renderizado pede, para conferência
 * depois: imagem quebrada não passa pelo build.
 */
const referencedAssets = new Map();

function collectAssets(html, routePath) {
  const pattern = /(?:src|href)="(\/[^"?#]+\.(?:jpg|jpeg|png|svg|webp|avif|mp4|webm|woff2?|pdf|ico))"/g;
  for (const [, asset] of html.matchAll(pattern)) {
    if (!referencedAssets.has(asset)) referencedAssets.set(asset, routePath);
  }
}

async function writePage(route) {
  const { html } = render(route.path);
  collectAssets(html, route.path);
  const output = renderDocument(template, { head: pageHead(route, { siteUrl, isIndexable }), html });
  const outputPath =
    route.path === '/'
      ? resolve(clientDir, 'index.html')
      : resolve(clientDir, route.path.slice(1), 'index.html');

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, output, 'utf8');
}

for (const route of staticRoutes) {
  await writePage(route);
}

const { html: notFoundHtml } = render('/pagina-nao-encontrada/');
await writeFile(
  resolve(clientDir, '404.html'),
  renderDocument(template, { head: notFoundHead(), html: notFoundHtml }),
  'utf8'
);
collectAssets(notFoundHtml, '/404');

const missingAssets = [];
for (const [asset, routePath] of referencedAssets) {
  try {
    await access(resolve(clientDir, asset.slice(1)));
  } catch {
    missingAssets.push(`${asset}  (referenciado em ${routePath})`);
  }
}

if (missingAssets.length) {
  console.error(`\nAssets referenciados que não existem em dist/client (${missingAssets.length}):`);
  missingAssets.forEach((entry) => console.error(`  x ${entry}`));
  process.exit(1);
}

await writeFile(
  resolve(clientDir, 'sitemap.xml'),
  sitemapXml(staticRoutes.map((route) => ({ loc: `${siteUrl}${route.path}` }))),
  'utf8'
);
await writeFile(
  resolve(clientDir, 'robots.txt'),
  isIndexable
    ? `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`
    : 'User-agent: *\nDisallow: /\n',
  'utf8'
);

console.log(`Pré-render concluído: ${staticRoutes.length} rotas + 404.`);
