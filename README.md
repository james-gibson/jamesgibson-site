# jamesgibson.co

The source for [jamesgibson.co](https://jamesgibson.co) — James Gibson's public site: his work,
his approach to platform engineering, and how to reach him.

This repository was derived from [le.gume](https://github.com/james-gibson/le.gume) as a **seed**,
not copied as a template. The content model, the publish guard and the Pages workflow were kept
because they are true of this site; the inherited pages, the seed/isotope registry, the offline
deck and the documentation prose were removed because they described le.gume, not this site.

## What is kept from the seed

| File | Why |
| --- | --- |
| `src/lib/content.ts` | One content model; navigation is derived from the file tree |
| `src/lib/markdown.tsx` | Article typography used by every page |
| `scripts/verify-publish.mjs` | Fails the build on placeholders, leaks, bad base paths or broken routes |
| `scripts/postbuild.mjs` | Per-route shells, `404.html`, `.nojekyll`, feeds and the machine entry |
| `.github/workflows/deploy.yml` | Push to `main` publishes; no manual release step |

## Commands

```bash
npm ci
npm run dev       # vite
npm run build     # tsc, vite, prerender, postbuild, guard  <- what CI runs
npm run smoke     # render every route server-side
npm run guard     # the guard alone, against an existing dist/
```

`npm run build` is the gate. The guard refuses to publish when the base path disagrees with
`package.json.homepage`, when a route has no shell, when content never reached the bundle, or
when output contains a placeholder, a local path or a credential. Do not weaken a check to make
a build pass — fix the output.

## Content

One page is one Markdown file under `src/content/<section>/<slug>.md`, with `title` and
`description` in frontmatter (plus optional `order`, `updated`, `tags`). The navigation, section
indexes, table of contents, previous/next links and counts are derived from the file tree. There
is no nav array to edit.

Internal links in Markdown are written root-absolute (`/about/experience`). The renderer prefixes
`import.meta.env.BASE_URL`, so they resolve on the deployed site.

## Deploy

Push to `main`. Pages is configured with `build_type: workflow`, the custom domain is
`jamesgibson.co`, and `CNAME` in the repo root must stay. The deploy builds from `main:/` and
publishes `dist/`. After a push, verify the public URL, a deep link and the certificate — a green
workflow is not proof that the site is reachable.

## License

AGPL-3.0-only, inherited from the seed whose code this site still uses.
