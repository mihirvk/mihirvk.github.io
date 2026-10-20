import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'parse5';

const root = path.resolve('dist');
function files(dir) { return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? files(path.join(dir, entry.name)) : [path.join(dir, entry.name)]); }
function nodes(node) { return [node, ...(node.childNodes ?? []).flatMap(nodes)]; }
function attr(node, name) { return node.attrs?.find(a => a.name === name)?.value; }
const documents = new Map();
const redirects = new Map([['about/index.html', '/#background'], ['research/index.html', '/publications/'], ['projects/index.html', '/course_list/#projects']]);
for (const file of files(root).filter(file => file.endsWith('.html'))) documents.set(file, nodes(parse(fs.readFileSync(file, 'utf8'))));
const failures = [];
for (const [file, all] of documents) {
  const relative = path.relative(root, file).split(path.sep).join('/');
  const route = relative === 'index.html' ? '/' : relative.replace(/index\.html$/, '');
  if (redirects.has(relative)) {
    const target = redirects.get(relative);
    assert.ok(all.some(n => n.tagName === 'meta' && attr(n, 'http-equiv') === 'refresh' && attr(n, 'content') === `0;url=${target}`), `${route}: compatibility redirect`);
    assert.ok(all.some(n => n.tagName === 'link' && attr(n, 'rel') === 'canonical' && attr(n, 'href') === new URL(target, 'https://mihirvk.github.io').href), `${route}: redirect destination`);
    continue;
  }
  assert.equal(all.filter(n => n.tagName === 'h1').length, 1, `${route}: one main heading`);
  assert.ok(all.some(n => n.tagName === 'main'), `${route}: main landmark`);
  assert.ok(all.some(n => n.tagName === 'link' && attr(n, 'rel') === 'canonical'), `${route}: canonical URL`);
  const ids = all.map(n => attr(n, 'id')).filter(Boolean);
  assert.equal(new Set(ids).size, ids.length, `${route}: unique IDs`);
  for (const node of all) {
    if (node.tagName === 'img') assert.notEqual(attr(node, 'alt'), undefined, `${route}: image alternative text`);
    for (const name of ['href', 'src']) {
      const value = attr(node, name);
      if (!value || /^(https?:|mailto:|data:|tel:)/.test(value)) continue;
      const url = new URL(value, `https://mihirvk.github.io/${route}`);
      let target = path.resolve(root, '.' + decodeURIComponent(url.pathname));
      if (target !== root && !target.startsWith(root + path.sep)) { failures.push(`${route}: path outside dist: ${value}`); continue; }
      if (fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target, 'index.html');
      if (!fs.existsSync(target)) { failures.push(`${route}: missing ${value}`); continue; }
      if (url.hash && target.endsWith('.html')) {
        const targetNodes = documents.get(target);
        if (!targetNodes?.some(n => attr(n, 'id') === decodeURIComponent(url.hash.slice(1)) || attr(n, 'name') === decodeURIComponent(url.hash.slice(1)))) failures.push(`${route}: missing anchor ${value}`);
      }
    }
  }
  const html = fs.readFileSync(file, 'utf8');
  assert.ok(!html.includes('site.url') && !html.includes('polyfill.io'), `${route}: no legacy templates/scripts`);
  assert.ok(!html.includes('On transparency') && !html.includes('On mental health'), `${route}: unpublished article sections excluded`);
}
assert.deepEqual(failures, [], failures.join('\n'));
for (const route of ['publications', 'cv', 'course_list', 'internships', 'blog_post']) assert.ok(fs.existsSync(path.join(root, route, 'index.html')), `Preserved ${route}`);
assert.equal(fs.readFileSync('public/assets/pdfs/Mihir_Kavishwar_Academic_CV.pdf').equals(fs.readFileSync('dist/assets/pdfs/Mihir_Kavishwar_Academic_CV.pdf')), true, 'CV remains unchanged in output');
const article = fs.readFileSync('dist/blog_post/index.html', 'utf8');
for (const anchor of ['background', 'what', 'logistics']) assert.ok(article.includes(`id="${anchor}"`), `Legacy ${anchor} anchor`);
const home = fs.readFileSync('dist/index.html', 'utf8');
assert.ok(home.includes('user=sKpCcWgAAAAJ'), 'Google Scholar profile on homepage');
console.log(`Validated ${documents.size} pages: internal links, assets, anchors, headings, legacy routes, and unpublished-content exclusion.`);
