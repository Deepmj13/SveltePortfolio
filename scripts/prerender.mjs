import { chromium } from 'playwright';
import { writeFileSync, readFileSync } from 'fs';
import { createServer } from 'http';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const distDir = join(root, 'dist');

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
};

function startServer(port) {
  const server = createServer((req, res) => {
    let filePath = join(distDir, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
    const ext = extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    try {
      const content = readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    } catch {
      res.writeHead(404);
      res.end('Not found');
    }
  });
  return new Promise(resolve => server.listen(port, () => resolve(server)));
}

async function prerender() {
  const PORT = 4173;
  console.log('Starting preview server...');
  const server = await startServer(PORT);

  try {
    console.log('Launching browser...');
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

    await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle' });

    console.log('Waiting for content to render...');
    await page.waitForSelector('main', { timeout: 15000 });
    await page.waitForTimeout(3000);

    const html = await page.content();
    writeFileSync(join(distDir, 'index.html'), html);
    console.log('✓ Prerendered index.html saved to dist/');

    await browser.close();
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
}

prerender().catch(err => {
  console.error('Prerendering failed:', err);
  process.exit(1);
});
