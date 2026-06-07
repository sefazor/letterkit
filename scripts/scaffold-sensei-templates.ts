import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { TEMPLATE_CONTRACT } from '../packages/theme/src/contract.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const themeRoot = join(__dirname, '../themes/sensei');

function toPascalCase(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
}

function toTitleCase(slug: string): string {
  return slug.split('-').join(' ');
}

const CATEGORY_SECTION: Record<string, string> = {
  auth: 'Account security',
  billing: 'Billing details',
  onboarding: 'Getting started',
  transactional: 'Order details',
  notification: 'Activity details',
  team: 'Workspace details',
  lifecycle: 'Account details',
  'product-update': 'Update details',
};

function stubIndex(category: string, name: string): string {
  const component = toPascalCase(name);
  const title = toTitleCase(name);
  const section = CATEGORY_SECTION[category] ?? 'Details';

  return `import { EmailBodyText } from '../../_components/body';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailDataSection } from '../../_components/data-section';
import { EmailDivider } from '../../_components/divider';
import { EmailGreeting } from '../../_components/greeting';
import { EmailHighlight } from '../../_components/highlight';
import { EmailLayout } from '../../_components/layout';
import { EmailLinkFallback } from '../../_components/link-fallback';
import { sensei } from '../../theme.config';

export interface ${component}Props {
  appName: string;
  userName: string;
  headline: string;
  body: string;
  actionUrl: string;
  actionLabel?: string;
  logoUrl?: string;
  logoAlt?: string;
}

/**
 * ${title} email for the Sensei theme.
 * // TODO: full implementation — add domain-specific props and content.
 */
export function ${component}({
  appName,
  userName,
  headline,
  body,
  actionUrl,
  actionLabel = 'Continue',
  logoUrl,
  logoAlt,
}: ${component}Props) {
  const { tokens } = sensei;

  return (
    <EmailLayout
      tokens={tokens}
      preview={headline}
      appName={appName}
      logoUrl={logoUrl}
      logoAlt={logoAlt}
    >
      <EmailGreeting tokens={tokens}>Hi {userName}</EmailGreeting>
      <EmailBodyText tokens={tokens}>{body}</EmailBodyText>
      <EmailDivider tokens={tokens} />
      <EmailHighlight tokens={tokens} label="Summary" value={headline} />
      <EmailDivider tokens={tokens} />
      <EmailCtaSection tokens={tokens} href={actionUrl} label={actionLabel} />
      <EmailDataSection
        tokens={tokens}
        title="${section}"
        rows={[
          { label: 'Workspace', value: appName },
          { label: 'Recipient', value: userName },
        ]}
      />
      <EmailLinkFallback tokens={tokens} url={actionUrl} />
    </EmailLayout>
  );
}

export default ${component};
`;
}

function previewTsx(name: string): string {
  const title = toTitleCase(name);
  return `export const previewProps = {
  appName: 'Sensei',
  userName: 'Alex',
  headline: '${title}',
  body: 'This is a preview of the ${title} email for your SaaS workspace.',
  actionUrl: 'https://app.sensei.dev/action',
  actionLabel: 'Continue',
};
`;
}

function metaJson(category: string, name: string): string {
  const title = toTitleCase(name);
  return JSON.stringify(
    {
      category,
      name,
      description: `${title} email for the Sensei SaaS theme.`,
      dependencies: ['@react-email/components'],
      registryDependencies: [],
    },
    null,
    2,
  );
}

for (const [category, names] of Object.entries(TEMPLATE_CONTRACT)) {
  for (const name of names) {
    const dir = join(themeRoot, category, name);
    mkdirSync(dir, { recursive: true });

    writeFileSync(join(dir, 'index.tsx'), stubIndex(category, name));
    writeFileSync(join(dir, 'preview.tsx'), previewTsx(name));
    writeFileSync(join(dir, 'meta.json'), `${metaJson(category, name)}\n`);
  }
}

console.log(`Scaffolded ${Object.values(TEMPLATE_CONTRACT).flat().length} Sensei templates`);
