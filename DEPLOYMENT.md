# Maison Temps — GitHub Pages Deployment Guide

This frontend has been configured and deployed to GitHub Pages.

## ✅ What was done

1. **Vite base path fixed** (`vite.config.js`):
   ```js
   base: '/M-Project/'
   ```
   Required because GitHub Pages serves the site at `https://monssef203.github.io/M-Project/`.

2. **Asset URLs fixed** (`src/main.jsx`):
   - Added `const BASE = import.meta.env.BASE_URL`
   - Changed all `/watch-*.png` to `${BASE}watch-*.png`
   - This ensures images load correctly under `/M-Project/`.

3. **Build tested**:
   ```bash
   npm ci
   npm run build
   # dist/ contains index.html + assets with correct /M-Project/ prefix
   ```

4. **Immediate deployment via `gh-pages` branch**:
   - Built `dist/` was pushed to branch `gh-pages` (orphan branch with only built files + `.nojekyll`).
   - You can enable it **right now** without any workflow:
     - Go to **Settings → Pages**
     - **Build and deployment → Source**: `Deploy from a branch`
     - **Branch**: `gh-pages` / `root`
     - Save. Site will be live at **https://monssef203.github.io/M-Project/** within ~1-2 minutes.

## 🚀 Recommended: GitHub Actions Deployment (CI/CD)

For automatic deployments on every push to `main`:

### Step 1: Create the workflow file manually (required due to permission limits)

The bot cannot push files inside `.github/workflows/` directly. You must create it via GitHub UI:

1. Open: https://github.com/monssef203/M-Project/new/main?filename=.github/workflows/deploy.yml
   Or go to repo → Add file → Create new file → path `.github/workflows/deploy.yml`
2. Copy the full content from `GITHUB_PAGES_DEPLOY_WORKFLOW.yml` (in repo root) **starting from `name: Deploy to GitHub Pages`** or use this:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ "main", "arena/01a0299b-m-project" ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

3. Commit directly to `main` (or `arena/01a0299b-m-project`).

### Step 2: Enable Pages with Actions

- Go to **Settings → Pages**
- **Build and deployment → Source**: `GitHub Actions`

### Step 3: Trigger deploy

- Push to `main` or run workflow manually via **Actions → Deploy to GitHub Pages → Run workflow**.

Your site will be at: **https://monssef203.github.io/M-Project/**

## 📂 Project Structure

- `index.html` → entry
- `src/main.jsx` → React app (Maison Temps watch store, bilingual fr/ar)
- `public/watch-*.png` → watch images (copied to dist root on build)
- `vite.config.js` → base `/M-Project/` + host config for preview
- `dist/` → build output (gitignored, deployed via gh-pages branch or Actions artifact)

## 🔧 Local Development

```bash
npm install
npm run dev   # http://localhost:5173
npm run build
npm run preview
```

## 📝 Notes

- The previous placeholder workflow `.github/workflows/blank.yml` was removed.
- `gh-pages` branch already contains a working build and can be used immediately.
- If you switch to GitHub Actions source, you can delete the `gh-pages` branch later if you want.
