# Contributing to letterkit

Thank you for helping build the copy-paste email block library for React Email.

## Dev setup

Requirements: Node 20+, pnpm 9.

```bash
git clone https://github.com/sefazor/letterkit.git
cd letterkit
pnpm install
pnpm build
pnpm dev
```

The docs site runs at [http://localhost:3000](http://localhost:3000).

### Useful commands

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `pnpm dev`        | Start docs site and watch packages   |
| `pnpm build`      | Build all packages and registry      |
| `pnpm lint`       | Run Biome lint checks                |
| `pnpm typecheck`  | TypeScript check across workspace    |
| `pnpm test`       | Run package smoke tests              |

## Adding a new block

Create a directory under `blocks/<category>/<block-name>/` with three files:

### `meta.json`

```json
{
  "description": "Short description of the block.",
  "dependencies": ["@react-email/components", "@letterkit/theme"],
  "registryDependencies": []
}
```

### `preview.tsx`

```ts
export const previewProps = {
  appName: 'Acme',
  // ...default props for preview rendering
};
```

### `index.tsx`

```tsx
import { Html, Body, /* ... */ } from '@react-email/components';
import { light, dark, type Theme } from '@letterkit/theme';

export interface MyBlockProps {
  appName: string;
  theme?: Theme;
}

/**
 * Block description with @example JSDoc.
 *
 * Plain-text fallback: mention required fields in JSDoc.
 */
export function MyBlock({ appName, theme = light }: MyBlockProps) {
  // ...
}

export default MyBlock;
```

### Block quality checklist

- [ ] Mobile-first layout (600px max width)
- [ ] Props for all brand-specific strings (no hardcoded copy)
- [ ] `<Preview>` preheader included
- [ ] Alt text on all images
- [ ] Dark mode via `@media (prefers-color-scheme: dark)` in `<Head>`
- [ ] JSDoc with usage example and plain-text fallback note
- [ ] Tailwind classes compatible with React Email

After adding files, run `pnpm build` to regenerate `registry.json`.

## Testing across email clients

Before submitting a block PR, verify rendering in:

- Gmail (web + mobile)
- Apple Mail (macOS + iOS)
- Outlook (Windows + web)
- Yahoo Mail

Use [Litmus](https://litmus.com) or [Email on Acid](https://www.emailonacid.com) if available, or send test emails to personal accounts on each provider.

## Commit conventions

Use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat(blocks): add welcome email block`
- `fix(cli): resolve registry fetch timeout`
- `docs(www): update theming guide`
- `chore(ci): bump Node to 20`

## Pull request checklist

- [ ] Block builds and appears in `letterkit list`
- [ ] Preview renders at `/blocks/<category>/<name>`
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` pass
- [ ] No `any` types introduced
- [ ] JSDoc on all public exports
- [ ] Tested in at least Gmail and one other client
