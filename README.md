# EduHub

[![Deploy](https://github.com/raazkhnl/EduHub/actions/workflows/deploy.yml/badge.svg)](https://github.com/raazkhnl/EduHub/actions/workflows/deploy.yml)
[![License: CC BY 4.0](https://img.shields.io/badge/license-CC%20BY%204.0-0F766E)](https://creativecommons.org/licenses/by/4.0/)

**Smart study, simplified.** A scholarly-minimalist academic portal for Nepali
engineering curricula — **IOE, CTEVT, TU**. Built with Docusaurus 3.

🔗 **Live site:** [eduhub.khanalrajesh.com.np](https://eduhub.khanalrajesh.com.np)

---

## What's inside

```
.
├── docs/                                  # Content tree (the taxonomy)
│   ├── ioe/                               # Institute of Engineering, TU
│   │   ├── msncs/                         # M.Sc. — Networks & Cybersecurity
│   │   │   ├── year-1-part-1/
│   │   │   │   ├── next-gen-networks/
│   │   │   │   │   ├── notes/             # ← chapter MDX files live here
│   │   │   │   │   ├── _category_.json
│   │   │   │   │   └── index.mdx
│   │   │   │   └── cryptography/
│   │   │   └── year-1-part-2/ …
│   │   ├── bct/ bce/ bel/ bex/
│   ├── ctevt/                             # CTEVT diplomas
│   └── tu/                                # TU Faculty of Science programs
├── src/
│   ├── components/                        # ResourceCard, SidebarItem, ProgressTracker…
│   ├── theme/                             # MDXComponents + Layout wrapper
│   ├── pages/                             # Homepage, About, Contribute
│   └── css/custom.css                     # The Scholarly-Minimalist theme
├── static/                                # Public assets
│   ├── CNAME                              # eduhub.khanalrajesh.com.np
│   ├── manifest.json                      # PWA
│   ├── files/                             # Downloadable PDFs / slides
│   └── img/                               # Logo, favicon, social card
├── scripts/migrate-msncs.sh               # One-time content migration
├── .github/workflows/                     # CI + GitHub Pages deploy
├── docusaurus.config.js
├── sidebars.js
└── package.json
```

---

## Local development

Requires **Node 18.19+** (Node 20 LTS recommended; CI uses 20).

```bash
npm ci                 # install (honors lockfile)
npm run start          # dev server at http://localhost:3000
npm run build          # production build (auto-runs `prebuild` → icon generation)
npm run serve          # serve the production build at :3000
npm run icons          # regenerate PWA + social-card PNGs from SVG sources
npm run clear          # nuke the .docusaurus/ cache
npm run lint           # ESLint 9 flat-config check (src/, plugins/, scripts/)
npm run lint:fix       # auto-fix lint issues where possible
npm run format         # Prettier format every JS/JSX/MD/MDX/CSS/JSON file
npm run format:check   # check formatting without writing (used by CI)
```

The `prebuild` script regenerates PWA icons and the OG social card from
[`static/img/logo.svg`](./static/img/logo.svg) and
[`static/img/social-card.svg`](./static/img/social-card.svg) via
[`scripts/generate-pwa-icons.mjs`](./scripts/generate-pwa-icons.mjs). The
generated PNGs are git-ignored — the SVGs are the source of truth.

---

## Adding content

Read [`CONTRIBUTING.md`](./CONTRIBUTING.md). The short version: drop an MDX
file into the right taxonomy folder, give it frontmatter, push.

Templates live under [`docs/_templates/`](./docs/_templates/) — copy and edit.

---

## Deployment

See [**DEPLOY.md**](./DEPLOY.md) for the full end-to-end checklist, DNS setup,
verification steps, and a troubleshooting section.

**TL;DR for GitHub Pages:**

```
1. Push the repo to GitHub
2. Repo → Settings → Pages → Source: GitHub Actions
3. DNS:  CNAME  eduhub  →  <github-username>.github.io.
4. Repo → Settings → Pages → Custom domain → eduhub.khanalrajesh.com.np
5. Push to main — the workflow at .github/workflows/deploy.yml does the rest
```

The `static/CNAME` file already pins the custom domain on every deploy.

**Anywhere else** (Netlify, Vercel, Cloudflare Pages, S3+CloudFront): the
`npm run build` output is a static site under `build/`. Set the build command
to `npm run build` and the publish directory to `build`. Add the env vars
listed in DEPLOY.md if you want Algolia / GA.

**Building for the GH Pages preview URL** (no custom domain yet): set
`DEPLOY_TARGET=ghpages` — this switches `baseUrl` to `/EduHub/`, points `url`
at `raazkhnl.github.io`, and omits `CNAME` from the build. See DEPLOY.md §1
for the full toggle and the "site did not load properly" error explained.

---

## Tech

- **Framework:** Docusaurus 3 (classic preset)
- **Search:** Algolia DocSearch when configured, local-search fallback otherwise
- **Math:** KaTeX via `remark-math` + `rehype-katex`
- **Diagrams:** Mermaid
- **PWA:** `@docusaurus/plugin-pwa` (offline + installable)
- **Typography:** Lora (serif) + Inter (sans) + JetBrains Mono
- **Lint / format:** ESLint 9 (flat config) + Prettier 3
- **CI/CD:** GitHub Actions → GitHub Pages (lint + build on PR, deploy on `main`)

## Reader-facing features

| Feature              | What it does                                                                   | Toggle (in `docusaurus.config.js → customFields.features`) | Shortcut            |
| -------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------- | ------------------- |
| **Bundle Builder**   | Pick chapters across any curriculum, export as Markdown / ZIP / printable PDF. | `bundleBuilder`                                            | —                   |
| **Progress Tracker** | LocalStorage syllabus checklist with sparkle on 100% completion.               | `progressTracker`                                          | —                   |
| **Focus Mode**       | Hides navbar, sidebar, footer for distraction-free reading.                    | `focusMode`                                                | `Shift + F` / `Esc` |
| **Scroll Progress**  | Hairline bar under the navbar showing how far through a chapter you are.       | `scrollProgress`                                           | —                   |
| **Reading Time**     | Per-chapter estimate at the bottom of every doc page.                          | `readingTime`                                              | —                   |
| **Keyboard Help**    | Modal listing every shortcut.                                                  | `keyboardHelp`                                             | `?`                 |
| **Search**           | Site-wide full-text. Algolia DocSearch if keyed, local index otherwise.        | (always on)                                                | `⌘ K` / `Ctrl K`    |
| **PWA / Offline**    | Cache every chapter for offline reading; installable app shell.                | (always on)                                                | —                   |

Toggle any of the above by editing `docusaurus.config.js`:

```js
customFields: {
  features: {
    bundleBuilder:   true,
    focusMode:       true,
    progressTracker: true,
    scrollProgress:  true,
    keyboardHelp:    true,
    readingTime:     true,
  },
},
```

A `false` makes the component render `null` — no code change required.

---

## Licence

Original site content is **CC BY 4.0** — © Rajesh Khanal
([@raazkhnl](https://github.com/raazkhnl)). See [LICENSE](./LICENSE) for the
full notice. Third-party content (syllabus extracts, past papers) retains its
original licence; we link to the source where required.

---

## Security

The current npm dep tree resolves `serialize-javascript@6.0.2` (patched) via
an `overrides` block in [`package.json`](./package.json). `npm audit` may still
flag 21 high-severity advisories because the audit DB matches against
**declared** version ranges, not against override-resolved versions —
this is a [known npm bug](https://github.com/npm/cli/issues/4998). The
underlying CVEs (`GHSA-5c6j-r48x-rmvq`, `GHSA-qj8w-gfj5-8c6v`) are build-time
only and cannot reach deployed-site visitors.

Run `npm ls serialize-javascript` to confirm the override is active — every
match should read `6.0.2 overridden` or `6.0.2 deduped`.

## Acknowledgements

- [Department of Electronics & Computer Engineering, IOE Pulchowk](https://doece.pcampus.edu.np/) for publishing the MSNCS course outlines.
- [CTEVT](https://ctevt.org.np/) for publishing diploma curricula.
- [Docusaurus](https://docusaurus.io/) for the platform that makes this practical for a single maintainer.
