// Serves the prerendered build the way Vercel does (see vercel.json): real files first, then
// <path>/index.html, then the redirects, then the SPA fallback for any other URL.
// `vite preview` can't do this, so it would show the home page for every route.
import { createServer } from 'node:http';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';

const root = 'build/client';
const port = Number(process.env.PORT) || 4173;
const { redirects } = JSON.parse(readFileSync('vercel.json', 'utf8'));
const types = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml', '.xml': 'application/xml', '.txt': 'text/plain',
};
const matches = (source, path) => new RegExp(`^${source.replace(/:path\*/g, '.*')}$`).test(path);
const isFile = (file) => existsSync(file) && statSync(file).isFile();

createServer((req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url ?? '/', 'http://localhost').pathname));
  const send = (file) => {
    res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' });
    res.end(readFileSync(file));
  };
  if (isFile(join(root, path))) return send(join(root, path));
  if (isFile(join(root, path, 'index.html'))) return send(join(root, path, 'index.html'));
  const redirect = redirects.find((r) => matches(r.source, path));
  if (redirect) {
    res.writeHead(308, { location: redirect.destination });
    return res.end();
  }
  return send(join(root, '__spa-fallback.html'));
}).listen(port, () => console.log(`Previewing ${root} at http://localhost:${port}`));
