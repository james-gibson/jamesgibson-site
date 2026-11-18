---
title: For agents
description: The operating contract — what to read, what to run, what must stay true, and where the machine entry lives.
order: 7
updated: 2026-11-11
tags: agents, llms, operations
seeds: agent-operations
---

# For agents

This page is the contract for an agent picking the site up cold. It assumes you can read the
repository, run Node, and push to `main`. Everything below is verifiable from the files.

The machine-readable version of this page — a flat list of every route, the build commands and
the invariants — is generated at build time at [`/llms.txt`](/llms.txt). Read it first when you
only need the map; read this page when you need the reasoning.

## Read in this order

1. [`/llms.txt`](/llms.txt) — every page, one line each, the publish path and the invariants.
2. [Quickstart](/docs/quickstart) — the six files, or the clone, and the deploy.
3. [Site anatomy](/docs/site-anatomy) — the file map, annotated.
4. [Content model](/docs/content-model) — frontmatter, ordering, headings.
5. [Twelve factors](/factors/start-here) — the rules as lessons, including the three this site declines.

You do not need the source to answer a question about the site: `llms.txt` plus the page you are
reading is usually enough. You do need the source to change it.

If you are running inside OpenCode, the repository ships the standard placements — instructions,
a skill and one command — described in [OpenCode, out of the box](/docs/opencode).

## The loop

**The shortest path to a published site is a push, not a clone.** Three ways in, and the first two
do not involve this repository at all:

1. **Write it.** Six files publish a small site: `index.html`, `src/main.tsx`, `src/App.tsx`,
   `package.json` (with `homepage`), `vite.config.ts` (with `base`), and
   `.github/workflows/deploy.yml`. Copy `scripts/postbuild.mjs` and `scripts/verify-publish.mjs` —
   the shells and the guard are what make those six a seed rather than a bundle. For a site with
   three pages, writing them is faster than reading this one.
2. **Push it.** `gh repo create <name> --source=. --push`, then set Pages to "GitHub Actions". The
   workflow runs `npm ci && npm run build` and publishes the result. There is no release branch,
   nothing to upload, no environment to promote, and **no local build required** — CI is the
   machine that must pass, and its log is the honest answer.
3. **Work on it.** Clone when you are changing the site, the content model or the guard:

```bash
git clone https://github.com/james-gibson/le.gume my-site
cd my-site && npm install
npm run dev          # read it
# … edit src/content/<section>/<slug>.md …
npm run build        # type-check, bundle, deck, prerender, shells, llms.txt, guard
npm run smoke        # every route rendered server-side
git commit -am "content: …" && git push
```

If the guard refuses, nothing shipped — locally or in CI, because it is the same command.

### Paths, not mandates

Those are three routes, not an order. What this seed adds is that a route **exists and can be
checked**; which one an agent takes is its own call, and the second one is often the only one a
small site needs.

That distinction matters for the checks too. The guard enforces what *this* site claims. A
three-page site may claim less and copy fewer checks; what it may not do is claim a check it does
not run.

There is a real cost to forcing every rule into a small space: a site that inherits all of them
can never show what breaking one looks like. Accessibility is the clearest case. Wire
[the accessibility recapture](/docs/accessible-recapture) into a six-file site and the site cannot
be inaccessible — so the builder never sees the failure, never prices it, and never learns to
decide for themselves. A check is worth more as a path than as a condition of validity, and the
smallest honest claim is the one the builder chose.

Before your first push, read [the licence, for agents](/docs/agent-licence): keep the notices,
publish when you serve, and send improvements upstream rather than carrying them alone.

## Invariants — breaking one is a bug

- **Navigation is derived.** Every nav surface reads `src/content/**/*.md`. Do not add a nav
  array, a route manifest, or a hand-written index. A page that does not appear is a file in the
  wrong folder or with broken frontmatter.
- **The path is the URL.** `src/content/docs/deploy.md` is `/docs/deploy`. Renaming the file
  changes the public URL; grep for the old path before you do.
- **Router links are basename-relative.** `<Link to="/docs">` is right; a raw `href` needs
  `${import.meta.env.BASE_URL}docs` because production mounts at `/le.gume/`.
- **Content is Markdown.** No MDX, no imported components. If a page needs a live widget, it is a
  route in `src/pages/`, like `/design`.
- **`llms.txt` is generated.** It is written by `scripts/postbuild.mjs` from the content tree. Do
  not hand-edit `dist/llms.txt`, and do not add a page without rebuilding it.
- **The guard is the gate.** `scripts/verify-publish.mjs` runs inside `npm run build`. Weakening a
  check to get a green build is the one change that invalidates the rest of this page.

## Adding content, in full

```markdown
---
title: Rate limits
description: One line, reused as the nav subtitle and the llms.txt entry.
order: 8
updated: 2026-11-12
tags: api, limits
---

# Rate limits

Body. `##` and `###` become the table of contents; `#` does not.
```

Sections are `docs`, `seeds`, `factors`, `isotopes`, `guides`, `pitch`, `writing`. A page declares
which seeds it belongs to (`seeds: starter, agent-operations`); the seed pages derive their contents
from that, so a seed cannot claim a page that does not claim it back. A new section is an entry in `SECTIONS`
(`src/lib/content.ts`) plus a folder — header, footer, section index, 404 and `llms.txt` follow.

## What "done" means

- `npm run build` prints `guard: clean`.
- `npm run smoke` renders every route, including the intentional miss.
- The page appears in its section index, in the right position.
- One deep link works on the deployed site after the Actions run, not just the homepage.
- If you used a new component, `/design` shows it with the props you used.

## Handing the site over

`/design#handoff` carries a QR code whose payload is an instruction: read `/llms.txt`, then run
`npm ci && npm run build`. It is the shortest path from a phone to a working checkout, and it is
generated by `src/components/AgentHandoff.tsx` — pass a different `instructions` string and it is a
handoff for anything else. The same text is printed beside the code, because a QR is not readable
aloud and a desktop reader cannot scan its own screen.

### Resolving a shortcut

A payload may instead be an **isotope shortcut**: `…/isotopes/<nn>-<slug>/?slot=value`. That is a
compound — a named procedure plus the slots already decided. To resolve it:

1. Fetch the page.
2. Read its **Agent prompt** block.
3. Ask the user for every slot whose query-string value is empty, one question at a time.
4. Only then write anything.

The canonical slot list for every isotope is in [`/llms.txt`](/llms.txt) under *Isotope shortcuts*,
so an agent that starts there does not need to guess the protocol. `src/lib/isotopes.ts` is the
single source for the shortcuts the site itself generates.

## What you cannot infer

The editorial voice is a judgement call: dry, specific, willing to state the cost. The legume
idioms in the titles are ordinary English as far as this site is concerned, and no page explains
them. If a draft starts to explain the connection, cut that sentence.
