import type { Metadata } from 'next';
import Link from 'next/link';
import { CommandLine } from '@/components/marketing/command-line';
import { createSiteMetadata } from '@/lib/site';
import { getAllThemes } from '@/lib/themes';

export const metadata: Metadata = createSiteMetadata({
  title: 'Documentation',
  description:
    'Install letterkit themes with the CLI. Init your project, add themes or single templates, and customize React Email blocks in your codebase.',
  path: '/docs',
  keywords: [
    'letterkit cli',
    'react email cli',
    'email template install',
    'npx letterkit',
  ],
});

const COMMANDS = [
  {
    comment: 'Create letterkit.json in your project',
    command: 'npx @letterkit/cli@latest init',
  },
  {
    comment: 'Install a full theme with all templates (+ peer deps)',
    command: 'npx @letterkit/cli@latest theme add sensei',
  },
  {
    comment: 'Add a single template',
    command: 'npx @letterkit/cli@latest add sensei/onboarding/we-miss-you',
  },
  {
    comment: 'List available themes (after install: letterkit list)',
    command: 'npx @letterkit/cli@latest list',
  },
  {
    comment: 'List templates in a theme',
    command: 'npx @letterkit/cli@latest list --theme sensei',
  },
] as const;

const CLI_REFERENCE = [
  {
    name: 'letterkit init',
    description: 'Creates letterkit.json with defaultTheme and component paths.',
  },
  {
    name: 'letterkit list',
    description: 'Lists available themes.',
  },
  {
    name: 'letterkit list --theme <id>',
    description: 'Lists all templates in a theme, grouped by category.',
  },
  {
    name: 'letterkit theme add <theme-id>',
    description: 'Installs all templates and shared components from a theme.',
  },
  {
    name: 'letterkit add <category>/<name>',
    description: 'Adds one template using defaultTheme from letterkit.json.',
  },
  {
    name: 'letterkit add <theme>/<category>/<name>',
    description: 'Adds one template from a specific theme.',
  },
] as const;

export default function DocsPage() {
  const themes = getAllThemes();

  return (
    <div className="mx-auto max-w-3xl px-6 pb-20">
      <section className="mb-12 max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight">Documentation</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Install letterkit themes into your React Email project with the CLI.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold tracking-tight">Quick start</h2>
        <div className="space-y-3">
          {COMMANDS.map((item) => (
            <CommandLine key={item.command} comment={item.comment} command={item.command} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold tracking-tight">CLI reference</h2>
        <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
          {CLI_REFERENCE.map((item) => (
            <div key={item.name} className="px-5 py-4">
              <p className="font-mono text-sm">{item.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold tracking-tight">Themes</h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          Each theme implements the same template contract across auth, billing, onboarding,
          transactional, notification, team, lifecycle, and product categories. Shared layout
          components and design tokens live under{' '}
          <code className="rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-xs">
            themes/&lt;id&gt;/_components
          </code>
          .
        </p>
        <p className="mt-4 text-sm">
          <Link href="/themes" className="font-medium text-foreground hover:text-foreground/70">
            Browse {themes.length} themes →
          </Link>
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold tracking-tight">Contributing</h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          Want to add a theme? See{' '}
          <a
            href="https://github.com/sefazor/letterkit/blob/main/CONTRIBUTING.md"
            className="font-medium text-foreground hover:text-foreground/70"
            target="_blank"
            rel="noreferrer"
          >
            CONTRIBUTING.md
          </a>{' '}
          for guidelines.
        </p>
      </section>
    </div>
  );
}
