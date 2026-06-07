import { mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { type TemplateDef, SENSEI_TEMPLATES } from './sensei-template-data.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const themeRoot = join(__dirname, '../themes/sensei');

function toPascalCase(slug: string): string {
  const normalized = slug.replace(/^2fa-/, 'two-fa-').replace(/^2fa$/, 'two-fa');
  return normalized
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
}

function escapeJs(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n');
}

/** JSX preview attribute — expression form when string contains quotes. */
function jsxPreviewAttr(str: string): string {
  if (str.includes('"') || str.includes("'")) {
    return `preview={'${escapeJs(str)}'}`;
  }
  return `preview="${escapeJs(str)}"`;
}

function propsInterface(def: TemplateDef): string {
  const lines = [
    '  appName: string;',
    '  userName?: string;',
    '  logoUrl?: string;',
    '  logoAlt?: string;',
  ];
  if (def.highlight) lines.push('  highlightValue?: string;');
  if (def.highlight2) lines.push('  highlight2Value?: string;');
  if (def.ctaLabel) lines.push('  actionUrl?: string;');
  if (def.quote) lines.push('  quote?: string;');
  return lines.join('\n');
}

function previewProps(def: TemplateDef): string {
  const props: Record<string, unknown> = {
    appName: 'Acme',
    userName: 'Ece',
  };
  if (def.highlight) props.highlightValue = def.highlight.value;
  if (def.highlight2) props.highlight2Value = def.highlight2.value;
  if (def.ctaLabel) props.actionUrl = def.ctaUrl ?? 'https://app.acme.com/action';
  if (def.quote) props.quote = def.quote;
  const entries = Object.entries(props)
    .map(([k, v]) => `  ${k}: ${typeof v === 'string' ? `'${escapeJs(v)}'` : v},`)
    .join('\n');
  return `export const previewProps = {\n${entries}\n};\n`;
}

function generateIndex(def: TemplateDef): string {
  const component = toPascalCase(def.name);
  const imports = new Set([
    "import { EmailBodyText } from '../../_components/body';",
    "import { EmailLayout } from '../../_components/layout';",
    "import { EmailGreeting } from '../../_components/greeting';",
    "import { EmailDivider } from '../../_components/divider';",
    "import { sensei } from '../../theme.config';",
  ]);

  if (def.highlight || def.highlight2) {
    imports.add("import { EmailHighlight } from '../../_components/highlight';");
  }
  if (def.ctaLabel) {
    imports.add("import { EmailCtaSection } from '../../_components/cta-section';");
  }
  if (def.dataRows?.length) {
    imports.add("import { EmailDataSection } from '../../_components/data-section';");
  }
  if (def.lineItems?.length) {
    imports.add("import { EmailLineItems } from '../../_components/line-items';");
  }
  if (def.totals?.length) {
    imports.add("import { EmailTotals } from '../../_components/totals';");
  }
  if (def.notice) {
    imports.add("import { EmailNotice } from '../../_components/notice';");
  }
  if (def.linkFallback && def.ctaUrl) {
    imports.add("import { EmailLinkFallback } from '../../_components/link-fallback';");
  }

  const hl1 = def.highlight
    ? `      <EmailHighlight tokens={tokens} label="${escapeJs(def.highlight.label)}" value={highlightValue ?? '${escapeJs(def.highlight.value)}'}${def.highlight.large ? ' large' : ''} />\n`
    : '';
  const hl2 = def.highlight2
    ? `      <EmailHighlight tokens={tokens} label="${escapeJs(def.highlight2.label)}" value={highlight2Value ?? '${escapeJs(def.highlight2.value)}'}${def.highlight2.large ? ' large' : ''} />\n`
    : '';

  const dataRows = def.dataRows
    ?.map(
      (r) =>
        `          { label: '${escapeJs(r.label)}', value: '${escapeJs(r.value)}'${r.highlight ? ', highlight: true' : ''} },`,
    )
    .join('\n');

  const lineItems = def.lineItems
    ?.map(
      (i) =>
        `          { name: '${escapeJs(i.name)}', detail: '${escapeJs(i.detail ?? '')}', amount: '${escapeJs(i.amount)}' },`,
    )
    .join('\n');

  const totals = def.totals
    ?.map(
      (t) =>
        `          { label: '${escapeJs(t.label)}', value: '${escapeJs(t.value)}'${t.emphasis ? ', emphasis: true' : ''} },`,
    )
    .join('\n');

  const destructuring = [
    'appName',
    "userName = 'Ece'",
    'logoUrl',
    'logoAlt',
    def.highlight ? "highlightValue = '" + escapeJs(def.highlight.value) + "'" : null,
    def.highlight2 ? "highlight2Value = '" + escapeJs(def.highlight2.value) + "'" : null,
    def.ctaLabel ? "actionUrl = '" + escapeJs(def.ctaUrl ?? 'https://app.acme.com/action') + "'" : null,
    def.quote ? "quote = '" + escapeJs(def.quote) + "'" : null,
  ]
    .filter(Boolean)
    .join(',\n  ');

  const body = `import ${'{'} ${[...imports].join('\n').replace(/import /g, '').replace(/;/g, '')} ${'}'};

export interface ${component}Props {
${propsInterface(def)}
}

export function ${component}({
  ${destructuring},
}: ${component}Props) {
  const { tokens } = sensei;

  return (
    <EmailLayout
      tokens={tokens}
      ${jsxPreviewAttr(def.preview)}
      appName={appName}
      logoUrl={logoUrl}
      logoAlt={logoAlt}
    >
      <EmailGreeting tokens={tokens}>${def.greeting} {userName}</EmailGreeting>
      <EmailBodyText tokens={tokens}>${def.body.replace(/'/g, "\\'")}</EmailBodyText>
${def.quote ? `      <EmailDivider tokens={tokens} />\n      <EmailBodyText tokens={tokens} muted={false}>&ldquo;{quote}&rdquo;</EmailBodyText>\n` : ''}${def.highlight || def.highlight2 ? '      <EmailDivider tokens={tokens} />\n' : ''}${hl1}${hl2}${def.dataRows?.length ? `      <EmailDivider tokens={tokens} />\n      <EmailDataSection\n        tokens={tokens}\n        title="${escapeJs(def.dataTitle ?? 'Details')}"\n        rows={[\n${dataRows}\n        ]}\n      />\n` : ''}${def.lineItems?.length ? `      <EmailLineItems\n        tokens={tokens}\n        title="${escapeJs(def.lineItemsTitle ?? 'Summary')}"\n        items={[\n${lineItems}\n        ]}\n      />\n` : ''}${def.totals?.length ? `      <EmailTotals\n        tokens={tokens}\n        rows={[\n${totals}\n        ]}\n      />\n` : ''}${def.ctaLabel ? `      <EmailCtaSection tokens={tokens} href={actionUrl!} label="${escapeJs(def.ctaLabel)}"${def.ctaCaption ? ` caption="${escapeJs(def.ctaCaption)}"` : ''} />\n` : ''}${def.notice ? `      <EmailNotice tokens={tokens}>${def.notice.replace(/'/g, "\\'")}</EmailNotice>\n` : ''}${def.linkFallback && def.ctaUrl ? '      <EmailLinkFallback tokens={tokens} url={actionUrl!} />\n' : ''}    </EmailLayout>
  );
}

export default ${component};
`;

  // Fix broken import syntax from template above - rewrite imports properly
  const importLines = [...imports].sort().join('\n');
  return `${importLines}

export interface ${component}Props {
${propsInterface(def)}
}

export function ${component}({
  ${destructuring},
}: ${component}Props) {
  const { tokens } = sensei;

  return (
    <EmailLayout
      tokens={tokens}
      ${jsxPreviewAttr(def.preview)}
      appName={appName}
      logoUrl={logoUrl}
      logoAlt={logoAlt}
    >
      <EmailGreeting tokens={tokens}>${def.greeting} {userName}</EmailGreeting>
      <EmailBodyText tokens={tokens}>${def.body.replace(/'/g, "\\'")}</EmailBodyText>
${def.quote ? `      <EmailDivider tokens={tokens} />\n      <EmailBodyText tokens={tokens} muted={false}>&ldquo;{quote}&rdquo;</EmailBodyText>\n` : ''}${def.highlight || def.highlight2 ? '      <EmailDivider tokens={tokens} />\n' : ''}${hl1}${hl2}${def.dataRows?.length ? `      <EmailDivider tokens={tokens} />\n      <EmailDataSection\n        tokens={tokens}\n        title="${escapeJs(def.dataTitle ?? 'Details')}"\n        rows={[\n${dataRows}\n        ]}\n      />\n` : ''}${def.lineItems?.length ? `      <EmailLineItems\n        tokens={tokens}\n        title="${escapeJs(def.lineItemsTitle ?? 'Summary')}"\n        items={[\n${lineItems}\n        ]}\n      />\n` : ''}${def.totals?.length ? `      <EmailTotals\n        tokens={tokens}\n        rows={[\n${totals}\n        ]}\n      />\n` : ''}${def.ctaLabel ? `      <EmailCtaSection tokens={tokens} href={actionUrl!} label="${escapeJs(def.ctaLabel)}"${def.ctaCaption ? ` caption="${escapeJs(def.ctaCaption)}"` : ''} />\n` : ''}${def.notice ? `      <EmailNotice tokens={tokens}>${def.notice.replace(/'/g, "\\'")}</EmailNotice>\n` : ''}${def.linkFallback && def.ctaUrl ? '      <EmailLinkFallback tokens={tokens} url={actionUrl!} />\n' : ''}    </EmailLayout>
  );
}

export default ${component};
`;
}

function metaJson(def: TemplateDef): string {
  return JSON.stringify(
    {
      category: def.category,
      name: def.name,
      description: `${def.title} — Sensei SaaS email.`,
      dependencies: ['@react-email/components'],
      registryDependencies: [],
    },
    null,
    2,
  );
}

// Remove old template directories (keep _components + theme.config.ts)
const keep = new Set(['_components', 'theme.config.ts']);
for (const entry of readdirSync(themeRoot)) {
  const full = join(themeRoot, entry);
  if (!keep.has(entry) && statSync(full).isDirectory()) {
    rmSync(full, { recursive: true, force: true });
  }
}

// Re-create from scratch each run — categories are nested under theme root

/** Hand-crafted premium templates — do not overwrite. */
const HAND_CRAFTED = new Set([
  'account-lifecycle',
  'auth-security',
  'billing',
  'commerce',
  'integrations',
  'notifications',
  'onboarding',
  'product-platform',
  'support-feedback',
  'team',
  'usage-api',
]);

for (const def of SENSEI_TEMPLATES) {
  if (HAND_CRAFTED.has(def.category)) continue;

  const dir = join(themeRoot, def.category, def.name);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.tsx'), generateIndex(def));
  writeFileSync(join(dir, 'preview.tsx'), previewProps(def));
  writeFileSync(join(dir, 'meta.json'), `${metaJson(def)}\n`);
}

console.log(`Generated ${SENSEI_TEMPLATES.length} Sensei SaaS templates`);
