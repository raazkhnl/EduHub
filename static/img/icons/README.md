# PWA icon set

The PWA plugin and `manifest.json` reference three PNG icons that live here:

| File                | Size      | Purpose      |
| ------------------- | --------- | ------------ |
| `icon-192.png`      | 192×192   | any          |
| `icon-512.png`      | 512×512   | any          |
| `maskable-512.png`  | 512×512   | maskable     |

Generate them once from `static/img/logo.svg` with any tool (recommendation:
[**pwa-asset-generator**](https://github.com/onderceylan/pwa-asset-generator)):

```bash
npx pwa-asset-generator static/img/logo.svg static/img/icons \
  --background "#FBF8F2" --padding "12%" \
  --icon-only --opaque false --type png
```

Then rename the outputs to match the table above and commit. These files are
not produced automatically because the source-of-truth is the SVG mark.
