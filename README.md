<!-- HERO_IMAGE -->

# letterkit

**Copy-paste transactional email themes for React Email.**

[![npm version](https://img.shields.io/npm/v/@letterkit/cli.svg)](https://www.npmjs.com/package/@letterkit/cli)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![stars](https://img.shields.io/github/stars/letterkit/letterkit.svg)](https://github.com/letterkit/letterkit)
[![discord](https://img.shields.io/badge/discord-join-5865F2.svg)](https://discord.gg/letterkit)

## ✨ Features

- **Complete themes** — 52 templates per theme across 8 categories
- **Copy, don't install** — templates live in your repo, fully editable
- **React Email + Tailwind** — modern DX with email-client-safe styling
- **Registry-driven CLI** — install a full theme or individual templates
- **Shared components** — consistent layout, header, footer per theme
- **Contract-enforced** — every theme implements the same 52-template spec

## 🚀 Quickstart

```bash
npx @letterkit/cli init
npx @letterkit/cli theme add grundy
pnpm add @react-email/components
```

## 🎨 Themes

| Theme   | Templates | Tier | Description                                      |
| ------- | --------- | ---- | ------------------------------------------------ |
| Grundy  | 52        | free | Quiet, confident, modern. Cream & terracotta.      |

More themes coming soon.

Browse themes at [letterkit.dev/themes](https://letterkit.dev/themes).

### 52-template contract

Every theme includes templates across:

- **auth** (7) — verify-email, magic-link, password-reset, …
- **billing** (8) — invoice-receipt, payment-failed, subscription-started, …
- **onboarding** (6) — welcome, getting-started, product-tour, …
- **transactional** (8) — order-confirmation, shipping-confirmation, …
- **notification** (8) — mention-alert, digest-weekly, …
- **team** (5) — team-invitation, role-changed, …
- **lifecycle** (5) — account-created, goodbye, …
- **product-update** (5) — feature-announcement, security-alert, …

## 📦 CLI

```bash
letterkit list                          # list themes
letterkit list --theme grundy           # list templates in a theme
letterkit theme add grundy              # install all 52 templates
letterkit add auth/verify-email         # add single template (uses defaultTheme)
letterkit add grundy/auth/verify-email  # explicit theme path
```

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for dev setup, theme authoring, and PR guidelines.

## 📄 License

MIT © [letterkit contributors](./LICENSE)
