// @ts-check
// EduHub — Docusaurus 3 configuration.
// All knobs centralised here so contributors never need to hunt across files.

const { themes } = require('prism-react-renderer');

// remark-math and rehype-katex are ESM-only — when loaded via require() they
// return a Module wrapper, not the function itself. Pull the default out.
const remarkMath = require('remark-math').default || require('remark-math');
const rehypeKatex = require('rehype-katex').default || require('rehype-katex');

const GITHUB_ORG = 'raazkhnl'; // edit if forked
const GITHUB_REPO = 'EduHub'; // GitHub repo name (case-sensitive!)
const EDIT_BRANCH = 'main';

// ────────────────────────────────────────────────────────────────────────────
// URL + baseUrl resolution
// ────────────────────────────────────────────────────────────────────────────
// We support two deployment targets from the same build pipeline:
//
//   1. Custom domain (default)        → eduhub.khanalrajesh.com.np
//      url      = https://eduhub.khanalrajesh.com.np
//      baseUrl  = /
//
//   2. GitHub Pages preview URL       → raazkhnl.github.io/EduHub/
//      url      = https://raazkhnl.github.io
//      baseUrl  = /EduHub/
//
// The Pages preview URL is what you see *before* the custom-domain CNAME +
// DNS propagation finishes. Without these two values matching the served
// origin, Docusaurus shows the classic "site did not load properly" error
// because every asset path is off by one prefix.
//
// To build for the preview URL, set DEPLOY_TARGET=ghpages (or set BASE_URL
// and SITE_URL explicitly). For local builds and the custom-domain deploy,
// no env vars are needed.
const DEPLOY_TARGET = process.env.DEPLOY_TARGET; // 'ghpages' | undefined
const USING_GH_PREVIEW = DEPLOY_TARGET === 'ghpages';

const SITE_URL =
  process.env.SITE_URL ||
  (USING_GH_PREVIEW ? `https://${GITHUB_ORG}.github.io` : 'https://eduhub.khanalrajesh.com.np');
const BASE_URL = process.env.BASE_URL || (USING_GH_PREVIEW ? `/${GITHUB_REPO}/` : '/');

// Algolia is optional. If env keys are not set we fall back to local search.
const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;
const ALGOLIA_API_KEY = process.env.ALGOLIA_API_KEY;
const ALGOLIA_INDEX = process.env.ALGOLIA_INDEX || 'eduhub';
const HAS_ALGOLIA = Boolean(ALGOLIA_APP_ID && ALGOLIA_API_KEY);

// Reader-facing feature flags. The same object is exposed via
// `customFields.features` to runtime components, and read at build time by
// the navbar/footer below so disabling a feature also removes its nav item.
const FEATURES = {
  bundleBuilder: true, // multi-chapter combine + download
  focusMode: true, // Shift+F distraction-free reading
  progressTracker: true, // syllabus checklists
  scrollProgress: true, // top-of-page scroll bar on doc pages
  keyboardHelp: true, // `?` opens shortcut modal
  readingTime: true, // auto-rendered estimate
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'EduHub',
  tagline: 'Smart study, simplified.',
  favicon: 'img/favicon.svg',

  url: SITE_URL,
  baseUrl: BASE_URL,
  trailingSlash: false,

  organizationName: GITHUB_ORG,
  projectName: GITHUB_REPO,
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'warn',
  onDuplicateRoutes: 'warn',

  i18n: { defaultLocale: 'en', locales: ['en'] },

  markdown: {
    mermaid: true,
    format: 'detect',
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  // ────────────────────────────────────────────────────────────────────────────
  // Preset: docs-only-style site (docs at root, optional blog under /journal).
  // ────────────────────────────────────────────────────────────────────────────
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'docs',
          routeBasePath: '/', // docs at site root
          sidebarPath: require.resolve('./sidebars.js'),
          // Git-based "last updated" is shown in CI (where we fetch full
          // history). Disabled locally so a fresh clone with no commits still
          // builds cleanly; frontmatter `last_update:` on each chapter is the
          // canonical source either way.
          showLastUpdateAuthor: !!process.env.CI,
          showLastUpdateTime: !!process.env.CI,
          editUrl: `https://github.com/${GITHUB_ORG}/${GITHUB_REPO}/edit/${EDIT_BRANCH}/`,
          breadcrumbs: true,
          remarkPlugins: [remarkMath],
          rehypePlugins: [[rehypeKatex, { strict: false, throwOnError: false }]],
          sidebarCollapsible: true,
          sidebarCollapsed: true,
        },
        blog: false, // disabled by default; add later if needed
        theme: { customCss: require.resolve('./src/css/custom.css') },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.6,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
        gtag: process.env.GA_TRACKING_ID
          ? { trackingID: process.env.GA_TRACKING_ID, anonymizeIP: true }
          : undefined,
      }),
    ],
  ],

  // External stylesheets — KaTeX (math rendering) and Google Fonts (Lora,
  // Inter, JetBrains Mono). Listed here (rather than @import-ed inside our
  // CSS) so Docusaurus emits the <link> tag in <head> at parse time and the
  // browser can issue parallel requests instead of waiting for CSS parsing.
  // We don't pin a Subresource Integrity (SRI) hash on the KaTeX CSS because
  // jsDelivr serves the file over HTTPS (TLS already guarantees integrity)
  // and a stale SRI hash silently breaks math rendering during minor patch
  // bumps. If hard SRI is required, regenerate via `curl <url> | openssl dgst
  // -sha384 -binary | openssl base64 -A` and pin a specific version.
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css',
      type: 'text/css',
      crossorigin: 'anonymous',
    },
    'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap',
  ],

  // Preconnect to font hosts so the TLS+TCP handshake happens in parallel
  // with HTML parsing.
  headTags: [
    { tagName: 'link', attributes: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
    },
    {
      tagName: 'link',
      attributes: { rel: 'preconnect', href: 'https://cdn.jsdelivr.net', crossorigin: 'anonymous' },
    },
  ],

  themes: ['@docusaurus/theme-mermaid'],

  // Feature flags — toggle without code changes. Read by components via
  // useDocusaurusContext().siteConfig.customFields.features.
  customFields: {
    features: FEATURES,
    requestFormUrl: '', // Set to your Tally / Google Form embed URL; empty = mailto fallback
    githubOrg: GITHUB_ORG,
    githubRepo: GITHUB_REPO,
  },

  plugins: [
    // ── CNAME gate ───────────────────────────────────────────────────────────
    // `static/CNAME` pins the custom domain on every deploy. When building for
    // the GitHub Pages preview URL we *must* not ship it (its presence forces
    // a 301 to the custom domain, which is what we're trying to bypass).
    USING_GH_PREVIEW &&
      function stripCnamePlugin() {
        return {
          name: 'eduhub-strip-cname',
          async postBuild({ outDir }) {
            const fs = require('fs');
            const path = require('path');
            const cname = path.join(outDir, 'CNAME');
            if (fs.existsSync(cname)) fs.unlinkSync(cname);
          },
        };
      },

    // ── Bundle manifest ──────────────────────────────────────────────────────
    require.resolve('./plugins/bundle-manifest'),

    // ── Search ───────────────────────────────────────────────────────────────
    !HAS_ALGOLIA && [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexDocs: true,
        indexBlog: false,
        indexPages: true,
        docsRouteBasePath: '/',
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      },
    ],

    // ── Ideal Image (responsive images for hero/og) ─────────────────────────
    [
      '@docusaurus/plugin-ideal-image',
      { quality: 78, max: 1280, min: 640, steps: 3, disableInDev: true },
    ],

    // ── PWA (offline + installable) ─────────────────────────────────────────
    [
      '@docusaurus/plugin-pwa',
      {
        debug: false,
        offlineModeActivationStrategies: ['appInstalled', 'standalone', 'queryString'],
        pwaHead: [
          { tagName: 'link', rel: 'icon', href: '/img/favicon.svg', type: 'image/svg+xml' },
          {
            tagName: 'link',
            rel: 'icon',
            href: '/img/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          { tagName: 'link', rel: 'manifest', href: '/manifest.json' },
          {
            tagName: 'link',
            rel: 'apple-touch-icon',
            href: '/img/icons/apple-touch-icon.png',
            sizes: '180x180',
          },
          { tagName: 'link', rel: 'mask-icon', href: '/img/favicon.svg', color: '#0F766E' },
          { tagName: 'meta', name: 'theme-color', content: '#0F766E' },
          { tagName: 'meta', name: 'apple-mobile-web-app-capable', content: 'yes' },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-status-bar-style',
            content: 'black-translucent',
          },
          { tagName: 'meta', name: 'apple-mobile-web-app-title', content: 'EduHub' },
          { tagName: 'meta', name: 'msapplication-TileColor', content: '#0F766E' },
        ],
      },
    ],
  ].filter(Boolean),

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/social-card.png',
      metadata: [
        {
          name: 'keywords',
          content:
            'IOE, CTEVT, MSNCS, BCT, Tribhuvan University, Nepal engineering notes, Pulchowk, syllabus, past papers',
        },
        { name: 'author', content: 'RaaZ Khanal' },
        { name: 'theme-color', content: '#0F766E' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'EduHub' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      navbar: {
        title: 'EduHub',
        hideOnScroll: true,
        logo: {
          alt: 'EduHub mark',
          src: 'img/logo.svg',
          srcDark: 'img/logo-dark.svg',
          width: 28,
          height: 28,
        },
        items: [
          { type: 'docSidebar', sidebarId: 'ioe', label: 'IOE', position: 'left' },
          { type: 'docSidebar', sidebarId: 'ctevt', label: 'CTEVT', position: 'left' },
          { type: 'docSidebar', sidebarId: 'tu', label: 'TU', position: 'left' },
          // Bundle link is gated on the feature flag. Build-time array filter
          // removes the item if the feature is disabled, so flipping the flag
          // alone is enough — no dead link.
          ...(FEATURES.bundleBuilder ? [{ to: '/bundle', label: 'Bundle', position: 'left' }] : []),
          { to: '/about', label: 'About', position: 'left' },
          { to: '/contribute', label: 'Contribute', position: 'left' },
          { to: '/roadmap', label: 'Roadmap', position: 'right' },
          {
            href: `https://github.com/${GITHUB_ORG}/${GITHUB_REPO}`,
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Curricula',
            items: [
              { label: 'IOE — Bachelor (BCT, BCE, BEX, BEL, BME)', to: '/ioe' },
              { label: "IOE — Master's (MSNCS, MSCSKE, MSCE)", to: '/ioe/msncs' },
              { label: 'CTEVT — Diploma', to: '/ctevt' },
              { label: 'TU — Faculty of Science', to: '/tu' },
            ],
          },
          {
            title: 'Community',
            items: [
              { label: 'Contribute', to: '/contribute' },
              { label: 'Request a resource', to: '/contribute#request' },
              { label: 'GitHub', href: `https://github.com/${GITHUB_ORG}/${GITHUB_REPO}` },
            ],
          },
          {
            title: 'Author',
            items: [
              { label: 'RaaZ Khanal', href: 'https://khanalrajesh.com.np' },
              { label: '@raazkhnl on GitHub', href: 'https://github.com/raazkhnl' },
              { label: 'License: CC BY 4.0', href: 'https://creativecommons.org/licenses/by/4.0/' },
            ],
          },
        ],
        copyright: `
          <div class="eh-copyline">© ${new Date().getFullYear()} RaaZ Khanal · Content licensed CC BY 4.0 · Built with Docusaurus.</div>
          <div class="eh-credit">Made with <span class="eh-heart" aria-label="love" role="img">ꨄ︎</span> by <a class="eh-credit-link" href="https://khanalrajesh.com.np" target="_blank" rel="noopener noreferrer">@raazkhnl</a></div>
        `,
      },
      prism: {
        theme: themes.github,
        darkTheme: themes.dracula,
        additionalLanguages: [
          'bash',
          'json',
          'yaml',
          'python',
          'rust',
          'go',
          'java',
          'cpp',
          'sql',
          'docker',
          'nginx',
        ],
      },
      mermaid: {
        theme: { light: 'neutral', dark: 'dark' },
      },
      announcementBar: {
        id: 'beta-1',
        content:
          '<span class="eh-announce-dot" aria-hidden="true"></span> <strong>EduHub</strong> is in active development — content is being migrated curriculum-by-curriculum. <a href="/contribute">Help expand it →</a>',
        // Colours intentionally omitted — CSS in custom.css handles both light
        // and dark themes via the standard --ifm-color-* variables.
        isCloseable: true,
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },
      ...(HAS_ALGOLIA && {
        algolia: {
          appId: ALGOLIA_APP_ID,
          apiKey: ALGOLIA_API_KEY,
          indexName: ALGOLIA_INDEX,
          contextualSearch: true,
          searchPagePath: 'search',
        },
      }),
    }),
};

module.exports = config;
