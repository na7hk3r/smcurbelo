#!/usr/bin/env node
/**
 * Site-contract regression probe (site-renewal round: S1-S7).
 *
 * Sibling of regression-boot.mjs, same idea: run the repo's production build
 * through a real browser over the Chrome DevTools Protocol and assert the
 * contract without trusting any application code. Boot behaviour stays in
 * regression-boot.mjs; this file owns the site's own promises.
 *
 *   work-artifact   the first viewport carries a work artifact: a card naming
 *                   the featured project, showing its image, linking to its
 *                   real URL, and fully inside the viewport at 1440x900 and
 *                   at 390x844 — the owner's brief, measured, not assumed.
 *   hero-intact     the control: greeting, name, role, both CTAs and the
 *                   portrait are still there. A card that pushed them out
 *                   would be a failure, not a feature.
 *   cv-reachable    PRODUCT.md:28 — contact and CV recognizable immediately.
 *                   The nav carries the CV, the footer carries the CV and the
 *                   email, each with a visible label, each in both languages.
 *   img-dims        every rendered image declares width/height, and where the
 *                   image actually loaded, the declared ratio matches the
 *                   natural one. Hardening: CLS measured 0.00 before this.
 *   hero-preload    the hero image is not fetched where it is never shown:
 *                   no request at 390x844, still requested (High) at 1440x900.
 *   logos-local     no third-party host serves the tool logos, and every logo
 *                   still renders — a vendored path that 404s fails here.
 *   targets         WCAG 2.2 SC 2.5.8: the named controls answer to a 24x24
 *                   pointer target or larger.
 *
 * Needs a Chromium started with --remote-debugging-port=9222.
 * Usage: node scripts/site-contract.mjs [distDir]
 */
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';

const DIST = resolve(process.argv[2] || 'dist');
const CDP = process.env.CDP_BASE || 'http://127.0.0.1:9222';
const PORT = 4291;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.pdf': 'application/pdf', '.xml': 'application/xml', '.txt': 'text/plain', '.woff': 'font/woff', '.woff2': 'font/woff2' };

function fileFor(pathname) {
  const f = join(DIST, pathname === '/' ? 'index.html' : decodeURIComponent(pathname));
  return f.startsWith(DIST) && existsSync(f) && !statSync(f).isDirectory() ? f : null;
}
function serve(port) {
  return createServer((req, res) => {
    const f = fileFor(new URL(req.url, 'http://x').pathname);
    if (!f) { res.writeHead(404); res.end('nf'); return; }
    res.writeHead(200, { 'content-type': TYPES[extname(f)] || 'application/octet-stream' });
    res.end(readFileSync(f));
  }).listen(port);
}

const EMAIL = 'sergiomcurbelo5@gmail.com';
const LABELS = {
  'desktop-en': { navCv: 'CV', footCv: 'Download CV', footMail: EMAIL },
  'desktop-es': { navCv: 'CV', footCv: 'Descargar CV', footMail: EMAIL },
  'mobile-en': { navCv: 'CV', footCv: 'Download CV', footMail: EMAIL },
};
const SCENARIOS = [
  { id: 'desktop-en', width: 1440, height: 900, mobile: false, q: null },
  { id: 'desktop-es', width: 1440, height: 900, mobile: false, q: 'es' },
  { id: 'mobile-en', width: 390, height: 844, mobile: true, q: null },
];

async function withTab(fn) {
  const tab = await (await fetch(`${CDP}/json/new?about:blank`, { method: 'PUT' })).json();
  const ws = new WebSocket(tab.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.addEventListener('open', res); ws.addEventListener('error', () => rej(new Error('CDP websocket failed'))); });
  let id = 0; const pending = new Map(); const events = [];
  ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.reject(new Error(JSON.stringify(m.error))) : p.resolve(m.result); } else if (m.method) events.push(m); });
  const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, { resolve: res, reject: rej }); ws.send(JSON.stringify({ id: i, method, params })); });
  try { return await fn(send, events); } finally { ws.close(); await fetch(`${CDP}/json/close/${tab.id}`).catch(() => {}); }
}

async function inspect(build, scenario) {
  return withTab(async (send, events) => {
    await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable');
    await send('Emulation.setDeviceMetricsOverride', { width: scenario.width, height: scenario.height, deviceScaleFactor: scenario.mobile ? 3 : 1, mobile: scenario.mobile });
    await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: 'light' }] });
    await send('Page.addScriptToEvaluateOnNewDocument', { source: `try { localStorage.clear(); } catch (e) {}` });
    await send('Page.navigate', { url: build.url(scenario.q) });
    for (let i = 0; i < 80; i++) { await sleep(100); const n = (await send('Runtime.evaluate', { expression: `(document.getElementById('root')||{}).children?document.getElementById('root').children.length:0`, returnByValue: true })).result.value; if (n > 0) break; }
    await sleep(1500);

    // Walk the page so lazy images and the lazy ProjectCard chunk are real by
    // the time the checks read them; then come back to the top, because the
    // first-viewport checks must run in the real first-viewport condition.
    await send('Runtime.evaluate', { expression: `(async () => { document.documentElement.style.scrollBehavior = 'auto'; const step = Math.round(innerHeight * 0.8); const h = () => document.documentElement.scrollHeight; let y = 0; while (y < h()) { scrollTo(0, y); y += step; await new Promise((r) => setTimeout(r, 330)); } scrollTo(0, 0); await new Promise((r) => setTimeout(r, 500)); return 'ok'; })()`, awaitPromise: true, returnByValue: true });
    await sleep(4000);

    const probe = async (expr) => {
      const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
      return r.result.value === undefined ? null : JSON.parse(r.result.value);
    };
    const expected = LABELS[scenario.id];
    const dom = await probe(`(function () {
      var out = {};
      var card = document.querySelector('.hero__work');
      var r = card ? card.getBoundingClientRect() : null;
      var link = card ? card.querySelector('a[href]') : null;
      var img = card ? card.querySelector('img') : null;
      out.work = { exists: !!card, inViewport: !!r && r.top >= 0 && r.bottom <= innerHeight + 1 && r.left >= 0 && r.right <= innerWidth + 1,
        names: !!card && /Nora OS/.test(card.textContent), img: !!(img && /\\.?\\/?images\\/nora_os/.test(img.getAttribute('src') || '')),
        link: !!(link && /nora-os/.test(link.getAttribute('href') || '')), text: card ? card.textContent.replace(/\\s+/g, ' ').trim().slice(0, 90) : null };
      out.hero = { greeting: !!document.querySelector('.hero__greeting'), name: !!(document.querySelector('.hero__name') || {}).textContent,
        role: !!document.querySelector('.hero__role'), ctas: document.querySelectorAll('.hero__btn').length, portrait: !!document.querySelector('.hero__bg-image img') };
      var nav = document.querySelector('nav'), foot = document.querySelector('footer');
      var navCv = nav ? nav.querySelector('a[href$="Curbelo_2026.pdf"]') : null;
      var footCv = foot ? foot.querySelector('a[href$="Curbelo_2026.pdf"]') : null;
      var footMail = foot ? foot.querySelector('a[href^="mailto:"]') : null;
      out.cv = { navCv: !!(navCv && navCv.textContent.trim()), navCvLabel: navCv ? navCv.textContent.trim() : null,
        footCv: !!(footCv && footCv.textContent.trim()), footCvLabel: footCv ? footCv.textContent.trim() : null,
        footMail: !!(footMail && (footMail.getAttribute('href') || '').indexOf('${EMAIL}') > -1), footMailLabel: footMail ? footMail.textContent.trim() : null };
      var imgs = Array.prototype.slice.call(document.images);
      var missing = [], mismatch = [], ratioChecked = 0, unloaded = 0;
      imgs.forEach(function (i) {
        var w = i.getAttribute('width'), h = i.getAttribute('height');
        if (!w || !h) { missing.push((i.getAttribute('src') || '').replace(/^.*\\//, '')); return; }
        if (!i.naturalWidth || !i.naturalHeight) { unloaded++; return; }
        ratioChecked++;
        var declared = Number(w) / Number(h), natural = i.naturalWidth / i.naturalHeight;
        if (Math.abs(declared - natural) / natural > 0.01) mismatch.push((i.getAttribute('src') || '').replace(/^.*\\//, '') + ' ' + declared.toFixed(3) + ' vs ' + natural.toFixed(3));
      });
      out.imgs = { total: imgs.length, missing: missing, mismatch: mismatch, ratioChecked: ratioChecked, unloaded: unloaded, broken: imgs.filter(function (i) { return i.complete && i.naturalWidth === 0; }).map(function (i) { return (i.getAttribute('src') || '').replace(/^.*\\//, ''); }) };
      var small = [];
      ['.project__expand-btn', '.course__cert-link', 'nav .nav-list a'].forEach(function (sel) {
        Array.prototype.slice.call(document.querySelectorAll(sel)).forEach(function (el) {
          var b = el.getBoundingClientRect(); var cs = getComputedStyle(el);
          if (b.width === 0 || b.height === 0 || cs.display === 'none' || cs.visibility === 'hidden') return;
          if (b.width < 24 || b.height < 24) small.push(sel + ' ' + Math.round(b.width) + 'x' + Math.round(b.height));
        });
      });
      out.small = small;
      return JSON.stringify(out);
    })()`);

    const requests = events.filter((e) => e.method === 'Network.requestWillBeSent').map((e) => ({
      url: e.params.request.url, initiator: (e.params.initiator || {}).type || '?', priority: e.params.request.initialPriority || '?',
    }));
    const heroReqs = requests.filter((r) => r.url.indexOf('home_img') > -1);
    // The font hosts are a known, documented exception (out of scope for this
    // round: the round owns the tool logos). Anything else third-party fails.
    const OUT_OF_SCOPE_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];
    const thirdParty = {};
    for (const r of requests) {
      try {
        const u = new URL(r.url);
        if (u.host !== `localhost:${PORT}` && u.host !== 'localhost' && u.protocol !== 'data:' && OUT_OF_SCOPE_HOSTS.indexOf(u.host) === -1) thirdParty[u.host] = (thirdParty[u.host] || 0) + 1;
      } catch {}
    }

    const checks = {
      'S1 work artifact exists': dom.work.exists,
      'S1 work artifact fully in the first viewport': dom.work.inViewport,
      'S1 work artifact names the featured project': dom.work.names,
      'S1 work artifact shows its image': dom.work.img,
      'S1 work artifact links to its real URL': dom.work.link,
      'S1 control: hero kept greeting/name/role/CTAs/portrait': !!(dom.hero.greeting && dom.hero.name && dom.hero.role && dom.hero.ctas >= 2 && dom.hero.portrait),
      'S2 nav carries the CV with a visible label': dom.cv.navCv && dom.cv.navCvLabel === expected.navCv,
      'S2 footer carries the CV with a visible label': dom.cv.footCv && dom.cv.footCvLabel === expected.footCv,
      'S2 footer carries the email with a visible label': dom.cv.footMail && dom.cv.footMailLabel === expected.footMail,
      'S3 every image declares width/height': dom.imgs.missing.length === 0,
      'S3 declared ratio matches the natural one': dom.imgs.mismatch.length === 0,
      'S3 no image is broken': dom.imgs.broken.length === 0,
      'S5 no third-party request is made': Object.keys(thirdParty).length === 0,
      'S6 named controls reach 24x24': dom.small.length === 0,
    };
    if (scenario.mobile) checks['S4 the hero image is not fetched where it is never shown'] = heroReqs.length === 0;
    else checks['S4 the hero image is still fetched with priority'] = heroReqs.length > 0 && heroReqs.every((r) => r.priority === 'High');

    return {
      id: scenario.id,
      pass: Object.values(checks).every(Boolean),
      checks,
      observed: { work: dom.work, hero: dom.hero, cv: dom.cv, imgs: { total: dom.imgs.total, missing: dom.imgs.missing, mismatch: dom.imgs.mismatch, ratioChecked: dom.imgs.ratioChecked, unloaded: dom.imgs.unloaded, broken: dom.imgs.broken }, small: dom.small, heroReqs, thirdParty },
    };
  });
}

const server = serve(PORT);
const build = { url: (q) => `http://localhost:${PORT}/${q ? `?lang=${q}` : ''}` };
let failures = 0;
let total = 0;
try {
  for (const scenario of SCENARIOS) {
    let r;
    try { r = await inspect(build, scenario); } catch (e) { r = { id: scenario.id, pass: false, checks: { 'probe ran': false }, error: String(e), observed: {} }; }
    total += Object.keys(r.checks).length;
    if (!r.pass) failures++;
    console.log(`${r.pass ? 'ok  ' : 'FAIL'} [scenario-${r.id}]${r.pass ? '' : ' :: ' + JSON.stringify({ failed: Object.entries(r.checks).filter(([, v]) => !v).map(([k]) => k), observed: r.observed, error: r.error })}`);
  }
} finally {
  server.close();
  console.log(`\n${failures === 0 ? 'PASS' : 'FAIL'} — ${total} checks, ${failures} failing, against ${DIST}`);
  process.exit(failures === 0 ? 0 : 1);
}
