const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

const rootDir = path.resolve(__dirname, '..');
const port = Number(process.env.PORT || process.argv[2] || 5173);
const host = process.env.HOST || '0.0.0.0';

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
};

function resolveRequestPath(urlPath) {
  const normalized = decodeURIComponent(urlPath.split('?')[0]);
  const relativePath = normalized === '/' ? '/web-preview/' : normalized;
  const targetPath = path.resolve(rootDir, `.${relativePath}`);
  const rootRelative = path.relative(rootDir, targetPath);

  if (rootRelative.startsWith('..') || path.isAbsolute(rootRelative)) {
    return null;
  }

  if (fs.existsSync(targetPath) && fs.statSync(targetPath).isDirectory()) {
    return path.join(targetPath, 'index.html');
  }

  return targetPath;
}

const server = http.createServer((request, response) => {
  if ((request.url || '').startsWith('/favicon.ico')) {
    response.writeHead(204, { 'cache-control': 'no-store' });
    response.end();
    return;
  }

  const filePath = resolveRequestPath(request.url || '/');

  if (!filePath || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }

  const extension = path.extname(filePath).toLowerCase();
  response.writeHead(200, {
    'content-type': contentTypes[extension] || 'application/octet-stream',
    'cache-control': 'no-store',
  });
  fs.createReadStream(filePath).pipe(response);
});

server.listen(port, host, () => {
  console.log(`Lost Kingdom web preview: http://localhost:${port}/web-preview/`);
  console.log(`Android emulator preview: http://10.0.2.2:${port}/web-preview/`);
});
