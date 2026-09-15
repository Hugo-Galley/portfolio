#!/usr/bin/env node
/**
 * Pre-rendering script for the portfolio SPA.
 * 
 * Starts a local static server, uses Puppeteer to visit each route,
 * waits for React to render, then saves the rendered HTML back to /build.
 * This allows search engines to index the full content without executing JS.
 * 
 * Usage: node scripts/prerender.mjs (called automatically via postbuild)
 */

import puppeteer from 'puppeteer';
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BUILD_DIR = join(__dirname, '..', 'build');
const PORT = 45678;

const ROUTES = [
  '/',
  '/cartography',
  '/instagram-clone',
  '/sport-app',
  '/admin-interface',
  '/platformer-game',
  '/ransomware',
  '/gmail-ai-sort',
  '/sync-crd-crm',
  '/phantom',
  '/easyworkenv',
];

/**
 * Simple static file server that serves from the build directory.
 * Falls back to index.html for SPA routing (like GitHub Pages does).
 */
function startServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      const url = req.url.split('?')[0];
      let filePath = join(BUILD_DIR, url);

      // Try the exact file, then index.html in that dir, then fallback to root index.html
      if (!existsSync(filePath) || !filePath.includes('.')) {
        const indexInDir = join(filePath, 'index.html');
        if (existsSync(indexInDir)) {
          filePath = indexInDir;
        } else {
          filePath = join(BUILD_DIR, 'index.html');
        }
      }

      try {
        const content = readFileSync(filePath);
        const ext = filePath.split('.').pop();
        const mimeTypes = {
          html: 'text/html',
          js: 'application/javascript',
          css: 'text/css',
          json: 'application/json',
          png: 'image/png',
          jpg: 'image/jpeg',
          webp: 'image/webp',
          ico: 'image/x-icon',
          svg: 'image/svg+xml',
          ttf: 'font/ttf',
          woff: 'font/woff',
          woff2: 'font/woff2',
        };
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
        res.end(content);
      } catch {
        res.writeHead(404);
        res.end('Not found');
      }
    });

    server.listen(PORT, () => {
      console.log(`📦 Static server running on http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

async function prerenderRoute(browser, route) {
  const page = await browser.newPage();

  // Block external requests (analytics, fonts, etc.) to speed up rendering
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const url = req.url();
    if (
      url.includes('analytics.galleyhugo.com') ||
      url.includes('fonts.googleapis.com') ||
      url.includes('fonts.gstatic.com') ||
      url.includes('cloudflareinsights.com')
    ) {
      req.abort();
    } else {
      req.continue();
    }
  });

  const url = `http://localhost:${PORT}${route}`;
  console.log(`  🔄 Pre-rendering ${route}...`);

  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

  // Wait a bit for React to fully hydrate and Helmet to inject meta tags
  await page.waitForSelector('#root > *', { timeout: 10000 });
  await new Promise((r) => setTimeout(r, 1000));

  // Get the full rendered HTML
  let html = await page.content();

  // Clean up: remove any scripts injected by Cloudflare or other services at runtime
  html = html.replace(/<script[^>]*cloudflareinsights[^>]*>.*?<\/script>/gi, '');

  // Ensure the doctype is present
  if (!html.startsWith('<!')) {
    html = '<!DOCTYPE html>' + html;
  }

  // Save the pre-rendered HTML
  const outputDir = join(BUILD_DIR, route === '/' ? '' : route);
  if (route !== '/') {
    mkdirSync(outputDir, { recursive: true });
  }

  const outputFile = route === '/'
    ? join(BUILD_DIR, 'index.html')
    : join(outputDir, 'index.html');

  writeFileSync(outputFile, html, 'utf-8');
  console.log(`  ✅ Saved ${outputFile.replace(BUILD_DIR, '/build')}`);

  await page.close();
}

async function main() {
  console.log('\n🚀 Starting pre-rendering...\n');

  const server = await startServer();
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    for (const route of ROUTES) {
      await prerenderRoute(browser, route);
    }
    console.log(`\n✨ Pre-rendered ${ROUTES.length} pages successfully!\n`);
  } catch (error) {
    console.error('❌ Pre-rendering failed:', error);
    process.exit(1);
  } finally {
    await browser.close();
    server.close();
  }
}

main();
