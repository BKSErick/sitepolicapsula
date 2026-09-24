/**
 * Servidor estático local do build, no mesmo formato da Vercel (dist/client,
 * 404.html para rota inexistente). O smoke visual usa este servidor.
 *
 *   npm run build && npm run preview:dist          (porta 4187)
 */
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const clientDir = resolve('.', 'dist/client');

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

async function fileFor(pathname) {
  const clean = normalize(decodeURIComponent(pathname)).replace(/^([/\\])+/, '');
  const candidate = join(clientDir, clean);
  if (!candidate.startsWith(clientDir)) return null;
  try {
    const info = await stat(candidate);
    if (info.isFile()) return candidate;
    if (info.isDirectory()) {
      const index = join(candidate, 'index.html');
      if ((await stat(index)).isFile()) return index;
    }
  } catch {
    // não existe
  }
  return null;
}

export function startDistServer({ port = 4187, logger = console } = {}) {
  const server = createServer(async (req, res) => {
    const url = new URL(req.url ?? '/', `http://127.0.0.1:${port}`);
    try {
      const file = await fileFor(url.pathname);
      if (!file) {
        res.writeHead(404, { 'content-type': TYPES['.html'] });
        createReadStream(join(clientDir, '404.html')).pipe(res);
        return;
      }
      res.writeHead(200, {
        'content-type': TYPES[extname(file).toLowerCase()] ?? 'application/octet-stream',
      });
      createReadStream(file).pipe(res);
    } catch (error) {
      logger.error(error);
      res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' });
      res.end('erro no servidor local');
    }
  });

  return new Promise((resolveStart) => {
    server.listen(port, '127.0.0.1', () => resolveStart(server));
  });
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const port = Number(process.env.PORT ?? 4187);
  await startDistServer({ port });
  console.log(`Build servido em http://127.0.0.1:${port}`);
}
