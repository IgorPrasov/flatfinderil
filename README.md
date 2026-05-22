# FlatFinder IL — Monorepo

Israel real estate platform: Telegram Mini App + Marketing Website.

## Structure

| Path | Description |
|------|-------------|
| `apps/miniapp` | Telegram Mini App (React + Vite + Tailwind v4) |
| `apps/web` | Marketing website (static HTML) |
| `packages/types` | Shared TypeScript types |
| `packages/api-client` | Shared API client (axios) |

## Quick Start

```bash
# Install dependencies
pnpm install

# Run Mini App locally
pnpm dev:miniapp     # http://localhost:5173

# Run Website locally  
pnpm dev:web         # http://localhost:3000
```

## Deploy

Auto-deploys on push to `main` via GitHub Actions.

| Target | URL | Cloudflare Project |
|--------|-----|-------------------|
| Website | https://flatfinderil-preview.pages.dev | flatfinderil-preview |
| Mini App | https://flatfinderil-miniapp.pages.dev | flatfinderil-miniapp |

## GitHub Secrets Required

| Secret | Value |
|--------|-------|
| `CLOUDFLARE_API_TOKEN` | From dash.cloudflare.com → API Tokens |
| `CLOUDFLARE_ACCOUNT_ID` | `6050e760353c3e169946676dbf613457` |
| `VITE_API_URL` | `https://flatfinderil-bot-production.up.railway.app` |

## Bot (Python)

The Telegram bot lives in a separate repo: `IgorPrasov/flatfinderil-bot` and is deployed to Railway. It is NOT part of this monorepo.
