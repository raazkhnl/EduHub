# Deployment guide

End-to-end instructions for getting EduHub live at
`eduhub.khanalrajesh.com.np` (or any other domain). Assumes a fresh clone.

## 0. Prerequisites

- Node 18.19 or later (Node 20 LTS recommended; CI uses 20).
- A GitHub account with the repository pushed to `github.com/<org>/<repo>`.
- DNS control over the apex / parent domain (`khanalrajesh.com.np` in our case).

## 1. Local build dry-run

```bash
npm ci            # honors lockfile, fails on drift — use this in CI too
npm run lint      # ESLint 9 flat config — must be clean before merge
npm run start     # http://localhost:3000 — smoke-test in a browser
npm run build     # production build into build/
npm run serve     # serve the production output for a final check
```

CI runs `npm run lint` and `npm run build` on every PR (see
[`.github/workflows/ci.yml`](.github/workflows/ci.yml)); both must pass.

If `npm run build` fails:

- **`fatal: your current branch '…' does not have any commits yet`** — Docusaurus
  is reading the git "last updated" stamp. Locally, the build _gates that on
  `process.env.CI`_ (see `docusaurus.config.js`), so this should only happen in
  CI. If it does, ensure the workflow checkout step uses `fetch-depth: 0`.
- **Plugin "rehype-katex" is not a valid MDX plugin config** — the build was
  bootstrapped against an ESM-only build of `rehype-katex`. We pull `.default`
  defensively; if you upgrade `rehype-katex`, verify the import in
  `docusaurus.config.js` still works.
- **Duplicate routes** — usually means a folder has both an `index.mdx` _and_ a
  `_category_.json` with `link.type: 'generated-index'` claiming the same slug.
  Pick one (we use explicit `index.mdx` per institution and program).

## 2. GitHub Pages — first-time setup

1. Push the repo to GitHub.
2. **Settings → Pages** → set **Source: GitHub Actions**.
   - Do **not** select "Deploy from a branch" — we use the modern Actions flow.
3. (Optional) **Settings → Environments → github-pages** → require approval
   from yourself for deployments. Adds a one-click safety gate.
4. Push to `main` — the workflow at `.github/workflows/deploy.yml` builds and
   deploys. First deploy typically takes ~3–5 minutes.

### Building for the GitHub Pages **preview** URL

The default build (`npm run build`) targets the custom domain
(`eduhub.khanalrajesh.com.np`, `baseUrl=/`) and ships `static/CNAME`. If you
haven't set up DNS yet and want to test on the GH Pages preview URL
(`raazkhnl.github.io/EduHub/`), build with `DEPLOY_TARGET=ghpages`:

```bash
DEPLOY_TARGET=ghpages npm run build
```

That swaps `baseUrl` to `/EduHub/`, points `url` at `raazkhnl.github.io`, and
omits the `CNAME` file from the build output so GitHub Pages won't redirect
to the custom domain. Override individually with `SITE_URL=` or `BASE_URL=`
if you're hosting under a different path.

If you ever see the Docusaurus error _"Your Docusaurus site did not load
properly … Current configured baseUrl = / … We suggest trying baseUrl =
/EduHub/"_, that's exactly this mismatch: the served URL has a path prefix
that the build wasn't told about.

## 3. Custom domain (eduhub.khanalrajesh.com.np)

Two DNS records, both at your registrar / DNS host:

| Type    | Name                             | Value                              | Notes                                                          |
| ------- | -------------------------------- | ---------------------------------- | -------------------------------------------------------------- |
| `CNAME` | `eduhub`                         | `<github-username>.github.io.`     | Required. Trailing dot.                                        |
| `TXT`   | `_github-pages-challenge-<user>` | (value from GitHub Pages settings) | If GitHub asks for domain verification — see Settings → Pages. |

After DNS propagates (5 min – 24 h):

1. **Settings → Pages → Custom domain** → enter `eduhub.khanalrajesh.com.np`.
2. Wait for the green check. GitHub provisions a Let's Encrypt cert
   automatically once DNS resolves.
3. Tick **Enforce HTTPS**.

The repo already ships `static/CNAME` so every build pins the domain. If you
_don't_ want a custom domain, delete `static/CNAME` and update `url` /
`baseUrl` in `docusaurus.config.js`.

## 4. Optional integrations (set as repo secrets)

Add at **Settings → Secrets and variables → Actions → New repository secret**:

| Secret            | What it does                                           |
| ----------------- | ------------------------------------------------------ |
| `ALGOLIA_APP_ID`  | Switches search from local index to Algolia DocSearch. |
| `ALGOLIA_API_KEY` | Public search-only API key (NOT the admin key).        |
| `ALGOLIA_INDEX`   | Algolia index name. Defaults to `eduhub`.              |
| `GA_TRACKING_ID`  | Google Analytics 4 measurement ID, e.g. `G-XXXXXXX`.   |

Local search works without any of these — Algolia is purely an upgrade.

## 5. Verify after first deploy

Open the live URL and confirm in this order. Anything in the **must-pass**
column blocks the release; **should-pass** items just file a follow-up.

| Check                     | Pass criterion                                                 | Severity    |
| ------------------------- | -------------------------------------------------------------- | ----------- |
| Home page renders         | `/` returns 200, branded                                       | must-pass   |
| Doc page renders          | `/ioe/msncs/year-1-part-1/cryptography/notes/ch01` returns 200 | must-pass   |
| Search opens              | ⌘K / CtrlK opens the search modal                              | must-pass   |
| Math renders              | Inline `$E=mc^2$` shows as KaTeX, not raw text                 | must-pass   |
| Dark mode toggles         | Click sun/moon — colours flip without reload                   | must-pass   |
| Edit on GitHub link       | Clicking it lands on the correct file in the GH editor         | must-pass   |
| 404 page                  | `/this-does-not-exist` shows the branded 404                   | must-pass   |
| PWA installable           | DevTools → Application → Manifest shows all icons, no warnings | should-pass |
| Bundle Builder            | `/bundle` lists 29 docs; selecting + Markdown export downloads | should-pass |
| Focus Mode                | Shift+F hides chrome, Esc restores                             | should-pass |
| OG image preview          | Paste URL in Slack / Discord — see the social card             | should-pass |
| Lighthouse score          | Performance ≥ 90, SEO ≥ 95, Best-practices ≥ 95, A11y ≥ 95     | should-pass |
| Last-updated stamp on doc | Shows date + author (CI builds only)                           | should-pass |

## 6. Rolling forward

- **Every push to `main`** rebuilds + redeploys via the Actions workflow.
- **Pull requests** run CI (`.github/workflows/ci.yml`) which only builds — no
  deploy. Catches breakages before merge.
- **Concurrency control** is set in the workflow: a new push cancels an
  in-progress build, so you never deploy a stale version.

## 7. Rolling back

There is no automatic rollback. If a deploy goes sideways:

```bash
git revert <bad-sha>
git push origin main
```

The revert triggers a fresh build/deploy with the previous content. Typically
recovered in 4 minutes end-to-end.

## 8. Troubleshooting

### The site builds locally but fails in CI

- Check `fetch-depth: 0` is set in the checkout step (we need full git history
  for the "last updated" stamp, which is gated to CI).
- Check Node version matches: both local and CI should be on 20.x.

### Math doesn't render

- Confirm `katex.min.css` is loaded — DevTools → Network → filter "katex".
- If KaTeX itself loaded but display math is broken: check the chapter file
  uses `$$ … $$` on its own line, not `$$…$$` inline.

### PWA install button doesn't appear

- Chrome only offers install once `manifest.json`, `sw.js`, AND a valid 192×192
  PNG are all reachable AND the site is HTTPS. Run `npm run icons` if you
  cleaned the static/img/icons directory.
- DevTools → Application → Manifest will list what's missing.

### The Bundle Builder shows "Could not load the bundle manifest"

- Confirm `/_bundle/manifest.json` returns 200 (DevTools → Network).
- The manifest is produced by `plugins/bundle-manifest` at build time (and at
  `loadContent` for dev). If the file is missing, restart the dev server.

### Algolia search isn't activating

- Confirm all three secrets (`ALGOLIA_APP_ID`, `ALGOLIA_API_KEY`, `ALGOLIA_INDEX`)
  are present and exposed in the **Build site** step of `deploy.yml`.
- `HAS_ALGOLIA` in `docusaurus.config.js` is a build-time check — if the env
  vars aren't visible to the build, the site falls back to local search.

### `npm audit` reports vulnerabilities

- Run `npm ls serialize-javascript` — every match should be `6.0.2 overridden`
  or `6.0.2 deduped`. The overrides in `package.json` patch the build-time-only
  CVEs the audit DB flags. See [README.md → Security](README.md#security).

### A page's slug changed and breaks bookmarks

- Add a redirect via `@docusaurus/plugin-client-redirects`. We don't ship it by
  default — install it and add a `redirects:` block to `docusaurus.config.js`.

### `npm run lint` fails in CI but is clean locally

- Confirm both machines run Node 20.x (the lockfile pins ESLint 9.x; older
  Node may resolve a transitive dep at a different version).
- The flat config lives at [`eslint.config.js`](eslint.config.js); ESLint 9
  ignores `.eslintrc.*` files entirely, so legacy configs from a fork would
  be silently inert. Delete any `.eslintrc*` you find.

### Prettier and ESLint disagree on formatting

- ESLint here is configured for _correctness_, not style — Prettier owns
  formatting. Run `npm run format` (writes) or `npm run format:check`
  (verifies). If a rule ever conflicts, change the ESLint rule, not Prettier.

### Cloudflare / CDN in front of GitHub Pages

- Set the CDN to "DNS only" (grey cloud) for the apex/root, "Proxied" for the
  subdomain if you want CDN caching.
- Disable Cloudflare's "Rocket Loader" — it rewrites JS in ways Docusaurus
  doesn't like.
