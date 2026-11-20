#!/usr/bin/env node
/**
 * Post-build steps GitHub Pages needs and Vite does not know about.
 *
 * 1. dist/<route>/index.html — one shell per real route, so a deep link is a
 *    found page rather than a missing one that happens to render.
 * 2. dist/404.html — the SPA fallback.
 * 3. dist/.nojekyll — stops Pages running Jekyll over the output.
 * 4. sitemap, robots, an AI catalog, llms.txt and a feed — all generated from
 *    the content tree, so a new page appears in each without a hand edit.
 *
 * Derived from le.gume's postbuild: the shell/404/nojekyll/feed logic was kept;
 * the deck, the child-seed rules file, the satire routes and every le.gume
 * description were replaced with this site's own.
 */
import { writeFile, mkdir, readdir, readFile, access, rm } from 'node:fs/promises'
import { join, relative } from 'node:path'

const SITE = 'https://jamesgibson.co'
const NAME = 'James Gibson'
const DIST = 'dist'
const CONTENT = 'src/content'
const LEGACY_ROUTES = ['cv-technical', 'cv-executive', 'contact']
const index = join(DIST, 'index.html')

try {
  await access(index)
} catch {
  console.error('postbuild: dist/index.html is missing — run vite build first')
  process.exit(1)
}

async function walk(dir) {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walk(full)))
    else out.push(full)
  }
  return out
}

const sectionDirs = (await readdir(CONTENT, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)

const contentRoutes = (await walk(CONTENT))
  .filter((f) => f.endsWith('.md'))
  .map((f) => relative(CONTENT, f).replace(/\.md$/, ''))

const routes = [...sectionDirs, ...contentRoutes]
const allRoutes = [...routes, ...LEGACY_ROUTES]

// --- shells ---------------------------------------------------------------
const template = await readFile(index, 'utf8')
const PRERENDER = join(DIST, '.prerender')
const markup = new Map()
try {
  for (const file of await readdir(PRERENDER)) {
    markup.set(file.replace(/\.html$/, ''), await readFile(join(PRERENDER, file), 'utf8'))
  }
} catch {
  console.warn('postbuild: no prerendered markup — shells will be empty')
}

const shellFor = (key) => {
  const content = markup.get(key)
  return content ? template.replace('<div id="root"></div>', `<div id="root">${content}</div>`) : template
}

const pageTitles = new Map()
for (const file of await walk(CONTENT)) {
  if (!file.endsWith('.md')) continue
  const source = await readFile(file, 'utf8')
  const title = /^title:\s*(.+)$/m.exec(source)?.[1]?.trim().replace(/^["']|["']$/g, '')
  if (title) pageTitles.set(relative(CONTENT, file).replace(/\.md$/, ''), title)
}

const LEGACY_TITLES = {
  'cv-technical': 'about/cv-technical',
  'cv-executive': 'about/cv-executive',
  contact: 'contact/details',
}

const titleFor = (route) => {
  if (!route) return null
  const pageRoute = LEGACY_TITLES[route] ?? route
  if (pageTitles.has(pageRoute)) {
    const pageTitle = pageTitles.get(pageRoute)
    // The profile page is already named after the site; don't echo it.
    return pageTitle === NAME ? NAME : `${pageTitle} · ${NAME}`
  }
  if (route === '404') return `Not found · ${NAME}`
  const section = route.split('/')[0]
  if (!route.includes('/') && section) {
    return `${section.charAt(0).toUpperCase()}${section.slice(1)} · ${NAME}`
  }
  return null
}

const withTitle = (html, route) => {
  const title = titleFor(route)
  if (!title) return html
  return html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`)
}

for (const route of allRoutes) {
  const dir = join(DIST, route)
  await mkdir(dir, { recursive: true })
  await writeFile(
    join(dir, 'index.html'),
    withTitle(shellFor(route.replace(/\//g, '__')), route),
    'utf8',
  )
}

await writeFile(join(DIST, 'index.html'), shellFor('home'), 'utf8')
await writeFile(join(DIST, '404.html'), withTitle(shellFor('404'), '404'), 'utf8')
await writeFile(join(DIST, '.nojekyll'), '')
await rm(PRERENDER, { recursive: true, force: true })

// --- sitemap and crawl policy ---------------------------------------------
const sitemapUrls = ['', ...allRoutes.map((route) => `${route}/`)]
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sitemapUrls.map((route) => `  <url><loc>${route ? `${SITE}/${route}` : `${SITE}/`}</loc></url>`),
  '</urlset>',
  '',
].join('\n')
await writeFile(join(DIST, 'sitemap.xml'), sitemap, 'utf8')

await writeFile(
  join(DIST, 'robots.txt'),
  ['User-agent: *', 'Allow: /', '', `Sitemap: ${SITE}/sitemap.xml`, ''].join('\n'),
  'utf8',
)

const catalog = {
  name: NAME,
  url: `${SITE}/`,
  description: 'James Gibson — Node.js Platform Architect in Denver. Work, approach and contact.',
  entries: [
    { type: 'text/plain', url: `${SITE}/llms.txt`, name: 'llms.txt' },
    { type: 'application/xml', url: `${SITE}/sitemap.xml`, name: 'sitemap.xml' },
    { type: 'text/html', url: `${SITE}/`, name: 'home' },
  ],
}
await mkdir(join(DIST, '.well-known'), { recursive: true })
await writeFile(join(DIST, '.well-known', 'ai-catalog.json'), `${JSON.stringify(catalog, null, 2)}\n`, 'utf8')

// --- llms.txt -------------------------------------------------------------
function frontmatter(source) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(source)
  const data = {}
  if (!match) return data
  for (const line of match[1].split(/\r?\n/)) {
    const at = line.indexOf(':')
    if (at <= 0) continue
    data[line.slice(0, at).trim()] = line
      .slice(at + 1)
      .trim()
      .replace(/^["']|["']$/g, '')
  }
  return data
}

const LABELS = { about: 'About', work: 'Work', contact: 'Contact' }
const pages = []
for (const file of await walk(CONTENT)) {
  if (!file.endsWith('.md')) continue
  const route = relative(CONTENT, file).replace(/\.md$/, '')
  const data = frontmatter(await readFile(file, 'utf8'))
  pages.push({
    route,
    section: route.split('/')[0],
    title: data.title || route,
    description: data.description || '',
    order: Number(data.order ?? 999),
    updated: data.updated || '',
  })
}
pages.sort(
  (a, b) =>
    a.section.localeCompare(b.section) || a.order - b.order || a.title.localeCompare(b.title),
)

const lines = [
  `# ${NAME}`,
  '',
  '> Node.js Platform Architect in Denver. Work, approach and contact.',
  '',
  `Live: ${SITE}/`,
  'Repo: https://github.com/james-gibson/jamesgibson-site',
  'Stack: React 19, Vite, Tailwind CSS v4. Static output, no runtime services.',
  'Source of truth: src/content/<section>/<slug>.md — the file path is the URL.',
  '',
  '## Publish',
  '',
  'Push to main. The Pages workflow runs `npm ci && npm run build` and publishes',
  'dist/. There is no release step. The custom domain is jamesgibson.co and the',
  'CNAME file in the repo root must stay.',
  '',
  '## Build and verify',
  '',
  '    npm ci',
  '    npm run build    # tsc, vite, prerender, route shells, llms.txt, publish guard',
  '    npm run smoke    # renders every route server-side; fails if one throws',
  '',
  'The guard refuses placeholders, absolute local paths, credentials, a base path',
  'that disagrees with package.json homepage, a route without its shell, or a page',
  'that never reached the bundle — locally and in CI. A failure publishes nothing.',
  '',
  '## Invariants',
  '',
  '- Navigation, section indexes, table of contents, previous/next and counts are',
  '  derived from the content tree. There is no nav array to edit.',
  '- Router links are basename-relative; raw href strings use import.meta.env.BASE_URL.',
  '- Content is Markdown, never MDX. A live widget is a route under src/pages/.',
  '- This file is generated at build time; editing it in dist/ changes nothing.',
  '',
]

for (const id of [...new Set(pages.map((p) => p.section))].sort()) {
  const list = pages.filter((p) => p.section === id)
  if (!list.length) continue
  lines.push(`## ${LABELS[id] ?? id}`, '')
  for (const page of list) {
    lines.push(`- [${page.title}](${SITE}/${page.route}/): ${page.description}`)
  }
  lines.push('')
}

lines.push(
  '## For agents',
  '',
  `- Start with [James Gibson](${SITE}/about/james/): the short version.`,
  `- [Approach](${SITE}/about/approach/): leadership, enablement and architecture.`,
  `- [Work](${SITE}/work/): the public projects, one page each.`,
  `- [Contact](${SITE}/contact/details/): email, GitHub and LinkedIn.`,
  '',
)

await writeFile(join(DIST, 'llms.txt'), lines.join('\n'), 'utf8')

// --- feed.xml -------------------------------------------------------------
const xml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const newest = pages.filter((page) => page.updated).sort((a, b) => b.updated.localeCompare(a.updated))
const feed = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<rss version="2.0">',
  '  <channel>',
  `    <title>${NAME}</title>`,
  `    <link>${SITE}/</link>`,
  '    <description>Node.js Platform Architect in Denver. Work, approach and contact.</description>',
  '    <language>en</language>',
  ...newest.flatMap((page) => [
    '    <item>',
    `      <title>${xml(page.title)}</title>`,
    `      <link>${SITE}/${page.route}/</link>`,
    `      <guid isPermaLink="true">${SITE}/${page.route}/</guid>`,
    `      <description>${xml(page.description)}</description>`,
    `      <pubDate>${new Date(`${page.updated}T00:00:00Z`).toUTCString()}</pubDate>`,
    '    </item>',
  ]),
  '  </channel>',
  '</rss>',
  '',
].join('\n')
await writeFile(join(DIST, 'feed.xml'), feed, 'utf8')

console.log(
  `postbuild: wrote ${allRoutes.length} shells, 404.html, sitemap.xml, robots.txt, ai-catalog.json, llms.txt (${pages.length} pages)`,
)
