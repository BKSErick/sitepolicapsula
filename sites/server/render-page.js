/**
 * Montagem do documento HTML usada pelo pré-render do build (scripts/prerender.mjs).
 * Um lugar só para meta tags, Open Graph e JSON-LD.
 */

export const DEFAULT_SITE_URL = 'https://policapsula.com';
export const TEMPLATE_TITLE = '<title>Policápsula</title>';

export function siteUrlFrom(env = {}) {
  return (env.SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, '');
}

export function isIndexableFrom(env = {}) {
  return env.PUBLIC_INDEXING === 'true';
}

export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

/**
 * JSON seguro dentro de <script>: "<" vira a sequência de escape unicode, então
 * um texto com "</script>" não fecha a tag antes da hora. JSON.parse desfaz.
 */
const LT_ESCAPE = `${String.fromCharCode(92)}u003c`;
export function serializeForScript(value) {
  return JSON.stringify(value).replaceAll('<', LT_ESCAPE);
}

function organization(siteUrl) {
  return {
    '@type': 'Organization',
    name: 'Policápsula',
    url: siteUrl,
    logo: `${siteUrl}/brand/policapsula-logo.png`,
    email: 'contato@policapsula.com',
    telephone: '+55-31-4141-4278',
  };
}

function schemaFor(route, canonical, siteUrl) {
  if (route.kind === 'home') {
    return { '@context': 'https://schema.org', ...organization(siteUrl) };
  }
  return {
    '@context': 'https://schema.org',
    '@type': route.kind === 'solution' ? 'Service' : 'WebPage',
    name: route.meta.title,
    description: route.meta.description,
    url: canonical,
    provider: route.kind === 'solution' ? organization(siteUrl) : undefined,
  };
}

/** <head> de uma rota pública. options: { siteUrl, isIndexable } */
export function pageHead(route, { siteUrl = DEFAULT_SITE_URL, isIndexable = false } = {}) {
  const canonical = `${siteUrl}${route.path}`;
  const schema = schemaFor(route, canonical, siteUrl);
  const robotsContent = isIndexable ? 'index,follow' : 'noindex,nofollow';
  const image = `${siteUrl}/og-policapsula.jpg`;

  return `
    <meta name="description" content="${escapeHtml(route.meta.description)}" />
    <meta name="robots" content="${robotsContent}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="pt_BR" />
    <meta property="og:site_name" content="Policápsula" />
    <meta property="og:title" content="${escapeHtml(route.meta.title)}" />
    <meta property="og:description" content="${escapeHtml(route.meta.description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="${escapeHtml(image)}" />
    <script type="application/ld+json">${serializeForScript(schema)}</script>
    <title>${escapeHtml(route.meta.title)}</title>`;
}

export function notFoundHead() {
  return '<meta name="robots" content="noindex,nofollow" /><title>Página não encontrada | Policápsula</title>';
}

/** Encaixa head e markup no template do Vite. O título do template sai para não duplicar. */
export function renderDocument(template, { head, html }) {
  return template
    .replace('<!--app-head-->', head)
    .replace(TEMPLATE_TITLE, '')
    .replace('<!--app-html-->', html);
}

export function sitemapXml(entries) {
  const urls = entries.map(({ loc }) => `  <url><loc>${escapeHtml(loc)}</loc></url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
