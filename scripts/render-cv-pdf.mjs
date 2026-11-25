// Render the built CV page (/cv/) to an A4 PDF with the site's print stylesheet.
// Usage: node scripts/render-cv-pdf.mjs <site dir> <output pdf>
// Requires the `playwright` package and a Chromium it can launch
// (CI: npm install playwright && npx playwright install --with-deps chromium).
import { chromium } from 'playwright';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const [, , siteDir = '_site', out = '_site/assets/cv/yuyeol-choi-cv.pdf'] = process.argv;
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg' };

// Serve the built site over HTTP so root-relative links and assets resolve.
const server = http.createServer((req, res) => {
  let file = path.join(siteDir, decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': mime[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const port = server.address().port;

const browser = await chromium.launch(process.env.PLAYWRIGHT_CHROMIUM ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM } : {});
try {
  const page = await browser.newPage();
  await page.goto(`http://127.0.0.1:${port}/cv/`, { waitUntil: 'networkidle' });
  await page.emulateMedia({ media: 'print' });
  await page.evaluate(() => document.fonts.ready);
  const name = await page.evaluate(() => document.querySelector('h1')?.textContent.trim() || 'Curriculum vitae');
  const date = new Date().toISOString().slice(0, 10);
  const footer = `<div style="width:100%;padding:0 1.3cm;box-sizing:border-box;display:flex;justify-content:space-between;font-family:Georgia,serif;font-size:7.5pt;color:#555;">`
    + `<span>${name}, curriculum vitae, generated ${date}</span>`
    + `<span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>`;
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await page.pdf({
    path: out,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate: footer,
    margin: { top: '1.3cm', right: '1.3cm', bottom: '1.6cm', left: '1.3cm' },
  });
  console.log(`wrote ${out} (${fs.statSync(out).size} bytes)`);
} finally {
  await browser.close();
  server.close();
}
