# YouTube Banner (2560×1440)

## Generate PNG (pick one)

```bat
run_create_banner.bat
```

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\create_banner.ps1
```

```bash
py -3 create_banner.py
# or without Pillow (stdlib fallback):
py -3 create_banner.py
```

```bash
node render-banner-pure.mjs
```

```bash
npm i
npx playwright install chromium
node render-banner.mjs
```

## Outputs

- `youtube-banner-2560x1440.png` — primary
- `youtube-banner.png` — safe copy
- Max 6 MB, 2560×1440, dark teal professional design
