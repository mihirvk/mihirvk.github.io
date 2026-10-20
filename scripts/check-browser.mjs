import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright-core';

const base = process.env.PREVIEW_URL ?? 'http://127.0.0.1:4321';
const chromeCandidates = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].filter(Boolean);
const executablePath = chromeCandidates.find(candidate => fs.existsSync(candidate));
const browser = await chromium.launch({ ...(executablePath ? { executablePath } : {}), headless: true });
const output = '.preview';
fs.mkdirSync(output, { recursive: true });
const routes = ['/', '/publications/', '/projects/voice-activity-detection/', '/writing/', '/writing/princeton-to-uiuc/', '/updates/', '/cv/', '/internships/', '/course_list/', '/blog_post/'];
const errors = [];
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1100 } });
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  const axePath = path.resolve('node_modules/axe-core/axe.min.js');
  for (const theme of ['dark', 'light']) {
    for (const route of routes) {
      const response = await page.goto(base + route, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200, `${route} responds`);
      await page.evaluate(chosen => { document.documentElement.dataset.theme = chosen; localStorage.setItem('theme', chosen); }, theme);
      await page.addScriptTag({ path: axePath });
      const violations = await page.evaluate(async () => (await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } })).violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })));
      assert.deepEqual(violations, [], `${route}, ${theme}: ${JSON.stringify(violations)}`);
      for (const width of [320, 390, 768, 1440]) {
        await page.setViewportSize({ width, height: 1000 });
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `${route}: no horizontal overflow at ${width}px`);
      }
    }
  }
  await page.goto(base);
  await page.evaluate(() => localStorage.removeItem('theme'));
  await page.reload();
  assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark', 'Dark is the default');
  await page.getByRole('button', { name: 'Switch to light theme' }).click();
  await page.goto(base + '/publications/');
  assert.equal(await page.locator('html').getAttribute('data-theme'), 'light', 'Theme persists across navigation');
  await page.reload();
  assert.equal(await page.locator('html').getAttribute('data-theme'), 'light', 'Theme persists across reload');
  for (const [from, to] of [['/about/', '/#background'], ['/research/', '/publications/'], ['/projects/', '/course_list/#projects']]) {
    await page.goto(base + from);
    await page.waitForURL(base + to);
  }
  const keyboardPage = await context.newPage();
  await keyboardPage.goto(base);
  await keyboardPage.keyboard.press('Tab');
  assert.equal(await keyboardPage.locator(':focus').textContent(), 'Skip to content');
  await keyboardPage.keyboard.press('Enter');
  assert.equal(await keyboardPage.locator(':focus').getAttribute('id'), 'main', 'Skip link focuses main content');
  for (const [label, width, height, theme] of [['desktop-dark', 1440, 1100, 'dark'], ['desktop-light', 1440, 1100, 'light'], ['mobile-dark', 390, 844, 'dark'], ['mobile-light', 390, 844, 'light']]) {
    await page.setViewportSize({ width, height });
    await page.goto(base);
    await page.evaluate(chosen => { document.documentElement.dataset.theme = chosen; localStorage.setItem('theme', chosen); }, theme);
    await page.screenshot({ path: `${output}/final-${label}.png`, fullPage: true });
  }
  assert.deepEqual(errors, [], 'No browser runtime errors');
  const noJs = await browser.newContext({ javaScriptEnabled: false });
  const plain = await noJs.newPage();
  await plain.goto(base);
  assert.ok(await plain.getByRole('heading', { level: 1 }).isVisible());
  assert.ok(await plain.getByRole('link', { name: 'Publications', exact: true }).isVisible());
  assert.equal(await plain.locator('.theme-toggle').isVisible(), false);
  await noJs.close();
  await context.close();
  console.log(`Browser checks passed: ${routes.length} routes × 2 themes, 4 viewport widths, WCAG AA scans, theme persistence, keyboard navigation, and no-JS content.`);
} finally { await browser.close(); }
