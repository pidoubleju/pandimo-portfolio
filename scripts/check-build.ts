import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';

import { type DefaultTreeAdapterMap, parse } from 'parse5';

type Element = DefaultTreeAdapterMap['element'];
type Node = DefaultTreeAdapterMap['node'];

function elements(node: Node): Element[] {
  const own = 'tagName' in node ? [node] : [];
  const children =
    'childNodes' in node ? node.childNodes.flatMap(elements) : [];
  return [...own, ...children];
}

function attribute(element: Element, name: string): string | undefined {
  return element.attrs.find((attr) => attr.name === name)?.value;
}

const output = resolve('dist');
const base = process.env['BASE_PATH'] ?? '/';
assert(
  base.startsWith('/') && base.endsWith('/'),
  'BASE_PATH must start and end with /'
);
assert(!base.startsWith('//'), 'BASE_PATH must be a local path');
const origin = new URL(process.env['SITE_URL'] ?? 'https://example.com').origin;
const files = await readdir(output, { recursive: true });
assert(files.includes('index.html'), 'Homepage is missing');
assert(files.includes('404.html'), 'Static 404 page is missing');

const pages = new Map<string, { url: URL; nodes: Element[] }>();
for (const file of files.filter((file) => file.endsWith('.html'))) {
  const html = await readFile(join(output, file), 'utf8');
  pages.set(file, {
    url: new URL(`${base}${file.replace(/index\.html$/, '')}`, origin),
    nodes: elements(parse(html)),
  });
}

for (const [file, { url, nodes }] of pages) {
  assert.equal(
    nodes.filter((node) => node.tagName === 'h1').length,
    1,
    `${file}: expected one h1`
  );
  assert(
    nodes.some(
      (node) => node.tagName === 'html' && attribute(node, 'lang') === 'en'
    ),
    `${file}: missing language`
  );
  assert(
    nodes.some(
      (node) =>
        node.tagName === 'meta' &&
        attribute(node, 'name') === 'description' &&
        attribute(node, 'content')
    ),
    `${file}: missing description`
  );
  assert(
    nodes.some(
      (node) =>
        node.tagName === 'title' &&
        node.childNodes.some((child) => 'value' in child && child.value.trim())
    ),
    `${file}: missing page title`
  );
  if (file !== '404.html') {
    assert(
      nodes.some(
        (node) =>
          node.tagName === 'link' &&
          attribute(node, 'rel') === 'canonical' &&
          attribute(node, 'href') === url.href
      ),
      `${file}: wrong canonical URL`
    );
  }

  for (const node of nodes) {
    assert(node.tagName !== 'astro-island', `${file}: client hydration found`);
    if (node.tagName === 'script') {
      assert(
        attribute(node, 'type') === 'module' &&
          attribute(node, 'src')?.startsWith(`${base}_astro/`) &&
          node.childNodes.length === 0,
        `${file}: only local bundled enhancement modules are permitted`
      );
    }
    assert(
      !node.attrs.some((attr) => /^on/i.test(attr.name)),
      `${file}: inline event handler found`
    );
    if (node.tagName === 'img') {
      assert(
        attribute(node, 'alt')?.trim(),
        `${file}: missing image description`
      );
    }

    for (const name of ['href', 'src']) {
      const value = attribute(node, name);
      if (!value) continue;
      const target = new URL(value, url);
      assert(
        ['https:', 'http:', 'mailto:', 'tel:'].includes(target.protocol),
        `${file}: unexpected URL protocol in ${value}`
      );
      if (target.origin !== origin) continue;
      assert(
        target.pathname.startsWith(base),
        `${file}: ${value} escapes the configured base`
      );

      const relative = decodeURIComponent(target.pathname.slice(base.length));
      const targetFile =
        relative.endsWith('/') || relative === ''
          ? `${relative}index.html`
          : relative;
      assert(
        (await stat(join(output, targetFile))).isFile(),
        `${file}: broken local URL ${value}`
      );
      if (target.hash) {
        const targetPage = pages.get(targetFile);
        const id = decodeURIComponent(target.hash.slice(1));
        assert(
          targetPage?.nodes.some((element) => attribute(element, 'id') === id),
          `${file}: missing fragment ${value}`
        );
      }
    }
  }
}

const notFound = pages.get('404.html');
assert(
  notFound?.nodes.some(
    (node) =>
      node.tagName === 'meta' &&
      attribute(node, 'name') === 'robots' &&
      attribute(node, 'content') === 'noindex'
  ),
  '404 must not be indexed'
);
console.log(
  `Verified ${String(pages.size)} static pages at ${origin}${base}: local links, assets, fragments, metadata, and local enhancement scripts.`
);
