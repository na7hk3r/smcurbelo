#!/usr/bin/env node
/**
 * Boot-resolution regression probe (S1-S5 of the theme/language boot review).
 *
 * Runs the repo's production build through a real browser (Chrome DevTools
 * Protocol) and asserts, without trusting any application code:
 *   S1  blocked localStorage: the app mounts, the boot overlay goes away, the
 *       page is clickable and nothing is thrown uncaught.
 *   S2  data-boot-theme / data-boot-lang never take two values in one page.
 *   S3  the resolved values follow the documented rule, cross-checked against
 *       the rendered nav label and document.documentElement.lang.
 *   S4  the same holds when the inline boot script is stripped from the HTML
 *       (script-src 'self'), where both attributes must be absent at
 *       DOMContentLoaded because the script did not run.
 *   S5  round-1 behaviour: skip link reachable by the first Tab, fixed and
 *       clear of the logo and navbar, still on screen after scrolling, hidden
 *       under the boot overlay; 2px accent focus ring on the theme switch with
 *       the switch's box unmoved; boot overlay paints the theme's logo variant.
 *
 * Needs: a production build (`npm run build`) and Chrome with
 * --remote-debugging-port=9222. Usage: node scripts/regression-boot.mjs [distDir]
 */
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';

const DIST = resolve(process.argv[2] || 'dist');
const CDP = process.env.CDP_BASE || 'http://127.0.0.1:9222';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.pdf': 'application/pdf', '.xml': 'application/xml', '.txt': 'text/plain', '.woff': 'font/woff', '.woff2': 'font/woff2' };

function fileFor(pathname) {
  const f = join(DIST, pathname === '/' ? 'index.html' : decodeURIComponent(pathname));
  return f.startsWith(DIST) && existsSync(f) && !statSync(f).isDirectory() ? f : null;
}
function serve(port, stripBoot) {
  return createServer((req, res) => {
    const f = fileFor(new URL(req.url, 'http://x').pathname);
    if (!f) { res.writeHead(404); res.end('nf'); return; }
    let body = readFileSync(f);
    if (f.endsWith('.html') && stripBoot) {
      const html = body.toString('utf8');
      const m = html.match(/<!--\s*Boot theme[\s\S]*?<\/script>/);
      if (!m) { console.warn('WARN: no boot-script block to strip in index.html'); }
      else body = Buffer.from(html.replace(m[0], '<!-- stripped -->'));
    }
    res.writeHead(200, { 'content-type': TYPES[extname(f)] || 'application/octet-stream' });
    res.end(body);
  }).listen(port);
}
const BOOT_CASES = [
  { id: 'theme-absent/light', theme: null, scheme: 'light' },
  { id: 'theme-absent/dark', theme: null, scheme: 'dark' },
  { id: 'theme-light/media-dark', theme: 'light', scheme: 'dark' },
  { id: 'theme-dark/media-light', theme: 'dark', scheme: 'light' },
  { id: 'theme-sepia/media-dark', theme: 'sepia', scheme: 'dark' },
  { id: 'theme-Dark/media-dark', theme: 'Dark', scheme: 'dark' },
];
const LANG_CASES = [
  { id: 'lang-none', q: null, lang: null },
  { id: 'lang-url-es', q: 'es', lang: null },
  { id: 'lang-url-en-beats-stored-es', q: 'en', lang: 'es' },
  { id: 'lang-url-fr-falls-to-stored-es', q: 'fr', lang: 'es' },
  { id: 'lang-url-EN-invalid-stored-es', q: 'EN', lang: 'es' },
  { id: 'lang-url-fr-nothing-stored', q: 'fr', lang: null },
  { id: 'lang-blocked-url-es', q: 'es', lang: null, blocked: true },
];
const CASES = [
  ...BOOT_CASES.map((c) => ({ ...c, q: null, lang: null, blocked: false })),
  ...LANG_CASES.map((c) => ({ scheme: 'light', ...c })),
  { id: 'blocked/light', theme: null, scheme: 'light', q: null, lang: null, blocked: true },
  { id: 'blocked/dark', theme: null, scheme: 'dark', q: null, lang: null, blocked: true },
  { id: 'market/theme-dark-lang-en', theme: 'dark', scheme: 'dark', q: 'fr', lang: 'en', blocked: false },
];
const rule = (c) => ({
  theme: c.theme === 'dark' ? 'dark' : c.theme === 'light' ? 'light' : c.scheme === 'dark' ? 'dark' : 'light',
  lang: c.q === 'en' || c.q === 'es' ? c.q : c.lang === 'en' || c.lang === 'es' ? c.lang : 'en',
});

async function withTab(fn) {
  const tab = await (await fetch(`${CDP}/json/new?about:blank`, { method: 'PUT' })).json();
  const ws = new WebSocket(tab.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.addEventListener('open', res); ws.addEventListener('error', () => rej(new Error('CDP websocket failed'))); });
  let id = 0; const pending = new Map(); const events = [];
  ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.reject(new Error(JSON.stringify(m.error))) : p.resolve(m.result); } else if (m.method) events.push(m); });
  const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, { resolve: res, reject: rej }); ws.send(JSON.stringify({ id: i, method, params })); });
  try { return await fn(send, events); } finally { ws.close(); await fetch(`${CDP}/json/close/${tab.id}`).catch(() => {}); }
}

async function runCase(base, mode, c) {
  return withTab(async (send, events) => {
    const exp = rule(c);
    await send('Page.enable'); await send('Runtime.enable');
    await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: c.scheme }] });
    if (c.blocked) await send('Page.addScriptToEvaluateOnNewDocument', { source: `Object.defineProperty(window,'localStorage',{configurable:true,get:function(){throw new DOMException('Access is denied for this document.','SecurityError');}});` });
    await send('Page.addScriptToEvaluateOnNewDocument', { source: `(function(){
      var P = window.__probe = { rec: [], labels: [], dcl: null };
      try { localStorage.clear();${c.theme ? ` localStorage.setItem('theme', ${JSON.stringify(c.theme)});` : ''}${c.lang ? ` localStorage.setItem('language', ${JSON.stringify(c.lang)});` : ''} } catch (e) {}
      var H = function () { return document.documentElement; };
      try { new MutationObserver(function (recs) { for (var i = 0; i < recs.length; i++) { var r = recs[i]; if (r.type === 'attributes') { var h = H(); if (h) P.rec.push({ attr: r.attributeName, old: r.oldValue, val: h.getAttribute(r.attributeName), ready: document.readyState, t: Math.round(performance.now()) }); } } }).observe(document, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['data-boot-theme', 'data-boot-lang'] }); } catch (e) {}
      document.addEventListener('DOMContentLoaded', function () { var h = H(); P.dcl = { t: Math.round(performance.now()), theme: h && h.getAttribute('data-boot-theme'), lang: h && h.getAttribute('data-boot-lang') }; });
      var n = 0, iv = setInterval(function () { var h = H(), l = document.getElementById('boot-loader');
        if (h && l && n < 40) { n++; var es = l.querySelector('.boot-loader__label--es'); P.labels.push((es && getComputedStyle(es).display !== 'none') ? 'es' : 'en'); }
        if (n >= 40) clearInterval(iv); }, 10);
    })();` });
    await send('Page.navigate', { url: base + (c.q ? `/?lang=${c.q}` : '/') });
    let mounted = false;
    for (let i = 0; i < 60 && !mounted; i++) { await sleep(100); const n = (await send('Runtime.evaluate', { expression: `(document.getElementById('root')||{}).children?document.getElementById('root').children.length:0`, returnByValue: true })).result.value; mounted = n > 0; }
    await sleep(1400);
    const st = JSON.parse((await send('Runtime.evaluate', { expression: `JSON.stringify((function(){ var h = document.documentElement, l = document.getElementById('boot-loader'), nav = document.querySelector('.nav-list a'), s = null;
      try { s = { keys: Object.keys(localStorage), theme: localStorage.getItem('theme'), language: localStorage.getItem('language') }; } catch (e) {}
      return { probe: window.__probe, theme: h.getAttribute('data-boot-theme'), lang: h.getAttribute('data-boot-lang'), dark: h.classList.contains('dark'), docLang: h.lang, nav: nav && nav.textContent.trim(), root: document.getElementById('root').children.length, loader: !!l, stored: s }; })())`, returnByValue: true })).result.value);
    const probeJson = async (expr) => { const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true }); return r.result.value === undefined ? null : JSON.parse(r.result.value); };
    const box = await probeJson(`(function(){ var a = document.querySelector('.nav-list a'); if (!a) return null; var r = a.getBoundingClientRect(); return JSON.stringify({ x: r.left + r.width / 2, y: r.top + r.height / 2 }); })()`);
    const hit = box ? await probeJson(`(function(){ var el = document.elementFromPoint(${box.x}, ${box.y}), a = document.querySelector('.nav-list a'); return JSON.stringify(!!(el && (el === a || a.contains(el)))); })()`) : false;
    let hash = null;
    if (box) {
      await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: box.x, y: box.y, button: 'left', clickCount: 1 });
      await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: box.x, y: box.y, button: 'left', clickCount: 1 });
      await sleep(250);
      hash = (await send('Runtime.evaluate', { expression: 'location.hash', returnByValue: true })).result.value;
    }
    const values = (attr) => [...new Set(st.probe.rec.filter((r) => r.attr === attr).flatMap((r) => [r.val, r.old]).filter((v) => v !== null))];
    const uncaught = events.filter((e) => e.method === 'Runtime.exceptionThrown').length;
    const checks = {
      'S1 mounts': st.root > 0 && mounted === true,
      'S1 loader removed': st.loader === false,
      'S1 interactive': hit === true && hash === '#hero',
      'S1 no uncaught': uncaught === 0,
      'S2 theme stable': values('data-boot-theme').length <= 1,
      'S2 lang stable': values('data-boot-lang').length <= 1,
      'S3 theme rule': st.theme === exp.theme && st.dark === (exp.theme === 'dark'),
      'S3 lang rule': st.lang === exp.lang && st.docLang === exp.lang,
      'S3 nav agrees': st.nav === (exp.lang === 'en' ? 'Home' : 'Inicio'),
      // Boot mode: the pre-paint label must already be right, on every frame.
      // Stripped mode: the inline script cannot run, so the loader label is the
      // markup's EN default until the provider publishes the attribute after
      // mount; only the settled value is asserted there (known cosmetic
      // transient of the script-stripped path, recorded as an advisory).
      'S3 loader label agrees': mode === 'boot'
        ? [...new Set(st.probe.labels)].every((v) => v === exp.lang)
        : st.probe.labels[st.probe.labels.length - 1] === exp.lang,
      'S3 storage format': st.stored === null || (['light', 'dark'].includes(st.stored.theme) && ['en', 'es'].includes(st.stored.language) && st.stored.keys.every((k) => k === 'theme' || k === 'language')),
    };
    if (mode === 'stripped') { checks['S4 attributes absent at DOMContentLoaded'] = st.probe.dcl.theme === null && st.probe.dcl.lang === null; }
    return { id: c.id, mode, exp, observed: { theme: st.theme, lang: st.lang, nav: st.nav, docLang: st.docLang, dcl: st.probe.dcl, writes: st.probe.rec }, checks, pass: Object.values(checks).every(Boolean) };
  });
}

async function round1Checks(base, scheme) {
  return withTab(async (send, events) => {
    await send('Page.enable'); await send('Runtime.enable');
    await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: scheme }] });
    await send('Page.addScriptToEvaluateOnNewDocument', { source: `(function(){ try { localStorage.clear(); localStorage.setItem('theme', ${JSON.stringify(scheme)}); } catch (e) {}
      window.__r1 = { marks: [], skip: [] };
      var iv = setInterval(function () { var l = document.getElementById('boot-loader'), h = document.documentElement;
        if (l && window.__r1.marks.length < 80) { var m = l.querySelector('.boot-loader__mark'), r = document.getElementById('root'), s = document.querySelector('.skip-link');
          window.__r1.marks.push({ root: r ? r.children.length : null, bg: m ? getComputedStyle(m).backgroundImage : null, skip: s ? getComputedStyle(s).display : null, theme: h && h.getAttribute('data-boot-theme') }); }
      }, 10); })();` });
    await send('Page.navigate', { url: base });
    let mounted = false;
    for (let i = 0; i < 60 && !mounted; i++) { await sleep(100); const n = (await send('Runtime.evaluate', { expression: `(document.getElementById('root')||{}).children?document.getElementById('root').children.length:0`, returnByValue: true })).result.value; mounted = n > 0; }
    await sleep(1200);
    const tabKey = async () => { await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 }); await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 }); await sleep(150); };
    const rect = (sel) => send('Runtime.evaluate', { expression: `(function(){ var e = document.querySelector(${JSON.stringify(sel)}); if (!e) return 'null'; var r = e.getBoundingClientRect(); return JSON.stringify({ x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height) }); })()`, returnByValue: true }).then((r) => JSON.parse(r.result.value));
    const logo = await rect('img.logo'); const nav = await rect('nav.navbar');
    const sliderBefore = await rect('.switch .slider');
    await tabKey();
    const firstTab = JSON.parse((await send('Runtime.evaluate', { expression: `JSON.stringify((function(){ var a = document.activeElement; var r = a.getBoundingClientRect(), c = getComputedStyle(a); return { cls: a.className, position: c.position, rect: { x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height) } }; })())`, returnByValue: true })).result.value);
    const overlaps = (a, b) => !!a && !!b && Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x) > 0 && Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y) > 0;
    await send('Runtime.evaluate', { expression: `document.documentElement.style.scrollBehavior='auto'; window.scrollTo(0,3000);` });
    await sleep(400);
    const scrolled = JSON.parse((await send('Runtime.evaluate', { expression: `JSON.stringify((function(){ var r = document.querySelector('.skip-link').getBoundingClientRect(); return { scrollY: Math.round(window.scrollY), y: Math.round(r.top), onScreen: r.top >= 0 && r.bottom <= window.innerHeight && r.left >= 0 && r.right <= window.innerWidth }; })())`, returnByValue: true })).result.value);
    await send('Runtime.evaluate', { expression: 'window.scrollTo(0,0);' }); await sleep(300);
    let ring = null;
    for (let i = 0; i < 14 && !ring; i++) {
      await tabKey();
      const s = JSON.parse((await send('Runtime.evaluate', { expression: `JSON.stringify((function(){ var a = document.activeElement, sl = document.querySelector('.switch .slider'), c = getComputedStyle(sl), r = sl.getBoundingClientRect(); return { type: a.getAttribute('type'), ring: { width: c.outlineWidth, style: c.outlineStyle, color: c.outlineColor, offset: c.outlineOffset }, rect: { x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height) } }; })())`, returnByValue: true })).result.value);
      if (s.type === 'checkbox') ring = s;
    }
    const r1 = JSON.parse((await send('Runtime.evaluate', { expression: 'JSON.stringify(window.__r1)', returnByValue: true })).result.value);
    const empty = r1.marks.filter((m) => m.root === 0);
    const accent = (await send('Runtime.evaluate', { expression: `getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()`, returnByValue: true })).result.value;
    const checks = {
      'S5 first Tab reaches skip link': firstTab.cls === 'skip-link' && firstTab.position === 'fixed',
      'S5 skip link clear of logo and navbar': !overlaps(firstTab.rect, logo) && !overlaps(firstTab.rect, nav),
      'S5 skip link visible after scrolling 3000px': scrolled.scrollY === 3000 && scrolled.onScreen,
      'S5 skip link hidden under the boot overlay': r1.marks.length > 0 && r1.marks.every((m) => m.skip === 'none'),
      'S5 switch ring on keyboard focus': !!ring && ring.ring.width === '2px' && ring.ring.style === 'solid' && ring.ring.color === rgbOf(accent),
      'S5 switch box unmoved by focus': !!ring && JSON.stringify(ring.rect) === JSON.stringify(sliderBefore),
      'S5 overlay paints the theme logo before mount': empty.length > 0 && empty.every((m) => m.bg.includes(scheme === 'dark' ? 'logo_black.webp' : 'logo_white.webp') && m.theme === scheme),
      'S5 overlay gone after mount': JSON.parse((await send('Runtime.evaluate', { expression: `JSON.stringify((function(){ var r = document.getElementById('root'), l = document.getElementById('boot-loader'); return { root: r.children.length, loader: !!l }; })())`, returnByValue: true })).result.value).loader === false,
    };
    return { scheme, checks, pass: Object.values(checks).every(Boolean), observed: { firstTab, logo, nav, scrolled, ring, sliderBefore, accent, marksWhileRootEmpty: empty.slice(0, 2) } };
  });
}
const rgbOf = (hex) => { const n = parseInt(hex.replace('#', ''), 16); return `rgb(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255})`; };

const PORT_A = 4351, PORT_B = 4352;
const sA = serve(PORT_A, false), sB = serve(PORT_B, true);
let failures = 0;
for (const [mode, port] of [['boot', PORT_A], ['stripped', PORT_B]]) {
  for (const c of CASES) {
    let r;
    try { r = await runCase(`http://localhost:${port}`, mode, c); } catch (e) { r = { id: c.id, mode, pass: false, checks: { 'probe ran': false }, error: String(e) }; }
    if (!r.pass) failures++;
    console.log(`${r.pass ? 'ok  ' : 'FAIL'} [${mode}] ${r.id}${r.pass ? '' : ' :: ' + JSON.stringify({ checks: r.checks, observed: r.observed, error: r.error })}`);
  }
}
for (const scheme of ['light', 'dark']) {
  const r = await round1Checks(`http://localhost:${PORT_A}`, scheme);
  if (!r.pass) failures++;
  console.log(`${r.pass ? 'ok  ' : 'FAIL'} [round1-${scheme}]${r.pass ? '' : ' :: ' + JSON.stringify({ checks: r.checks, observed: r.observed })}`);
}
console.log(`\n${failures === 0 ? 'PASS' : 'FAIL'} — ${CASES.length * 2 + 2} checks, ${failures} failing, against ${DIST}`);
sA.close(); sB.close();
process.exit(failures === 0 ? 0 : 1);
