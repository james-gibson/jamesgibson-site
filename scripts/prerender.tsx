/**
 * Prerender every route to static HTML.
 *
 * The answer has to be in the initial HTML: a single-page app fails that by
 * construction, so each route is rendered to a string here and `postbuild`
 * writes the shells from this output. The app still boots and replaces the
 * markup; the markup is what a reader without JavaScript gets.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { App } from '../src/App'
import { PAGES, SECTIONS } from '../src/lib/content'

const BASE = '/'
const OUT = 'dist/.prerender'

const routes = [
  { file: 'home', path: '/' },
  ...SECTIONS.map((section) => ({ file: section.id, path: `/${section.id}` })),
  ...PAGES.map((page) => ({
    file: `${page.section}/${page.slug}`.replace(/\//g, '__'),
    path: `/${page.section}/${page.slug}`,
  })),
  // Old portfolio URLs keep their own shells and render the same page.
  { file: 'cv-technical', path: '/cv-technical' },
  { file: 'cv-executive', path: '/cv-executive' },
  { file: 'contact', path: '/contact' },
  { file: '404', path: '/this-route-does-not-exist' },
]

await mkdir(OUT, { recursive: true })

let failures = 0
for (const route of routes) {
  try {
    const html = renderToString(
      <StaticRouter basename={BASE} location={route.path}>
        <App />
      </StaticRouter>,
    )
    await writeFile(join(OUT, `${route.file}.html`), html, 'utf8')
  } catch (error) {
    failures += 1
    console.error(`prerender: ${route.path} failed — ${(error as Error).message}`)
  }
}

if (failures) {
  console.error(`prerender: ${failures} of ${routes.length} routes failed`)
  process.exit(1)
}

console.log(`prerender: ${routes.length} routes rendered to ${OUT}`)
