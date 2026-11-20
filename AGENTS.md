# Agent hints

## This repository

`jamesgibson-site` is the source for https://jamesgibson.co — James Gibson's public site. It was
derived from the `le.gume` seed: the content model, publish guard and Pages workflow were kept,
the inherited pages and seed/isotope machinery were removed. React 19 + Vite + Tailwind v4,
Markdown content, derived navigation, GitHub Pages on push.

Live: https://jamesgibson.co · Repo: `james-gibson/jamesgibson-site`

## Commands

```bash
npm run dev      # vite
npm run build    # tsc, vite, prerender, postbuild, guard   <- what CI runs
npm run smoke    # render every route (and the 404) to a string
npm run guard    # guard alone, against an existing dist/
```

`npm run build` is the gate. The guard fails on placeholders, leaked absolute paths or
credentials, a base path that disagrees with `package.json.homepage`, a missing `404.html` or
`.nojekyll`, source maps, a route without a shell, or content that never reached the bundle. Do
not weaken a check to make a build pass; fix the output.

## Deploy shape

Pages is `build_type: workflow` from `main:/`. The custom domain is attached to **this** repo —
`CNAME` in the root says `jamesgibson.co` and must not be deleted. `vite.config.ts` `base` is `/`
and `package.json.homepage` is `https://jamesgibson.co`; they must agree or the guard fails and
nothing is published. The old `jamesgibson.co` repository is not the Pages source; do not deploy
from it or move the domain without asking.

## Content

- One page = one file: `src/content/<section>/<slug>.md`, frontmatter `title` + `description`
  (plus optional `order`, `updated`, `tags`).
- The nav, section indexes, footer columns, TOC and counts are derived from the file tree.
- Markdown only. A live widget is a route under `src/pages/`.
- Internal links are written root-absolute; the renderer adds `import.meta.env.BASE_URL`.
- Voice: plain, specific, first person for James's own story. No invented traction, no
  superlatives without a measurement, no numbers without a date and the command that produced
  them. Canonical project names: `lezz.go`, `lezz.sea`, `local-time`, `smoke-alarm`, `adhd`,
  `isotope`, `tuner`, `lab-safety`.

## Design

Motion and components come from `fancy-ui-react`. Overlay effects need a `relative overflow-hidden`
parent with a size. Keep claims about the site checkable at a URL or in the repository.
