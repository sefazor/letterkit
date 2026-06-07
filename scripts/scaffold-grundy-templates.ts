import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { TEMPLATE_CONTRACT } from '../packages/theme/src/contract.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const themeRoot = join(__dirname, '../themes/grundy');

const FULL_IMPLEMENTATIONS = new Set([
  'auth/verify-email',
  'auth/magic-link',
  'billing/invoice-receipt',
  'billing/payment-failed',
  'onboarding/welcome',
  'transactional/order-confirmation',
  'transactional/shipping-confirmation',
  'notification/mention-alert',
  'notification/digest-weekly',
  'team/team-invitation',
  'lifecycle/account-created',
  'product-update/feature-announcement',
]);

function toPascalCase(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
}

function toTitleCase(slug: string): string {
  return slug.split('-').join(' ');
}

const CATEGORY_EYEBROW: Record<string, string> = {
  auth: 'Authentication',
  billing: 'Billing',
  onboarding: 'Onboarding',
  transactional: 'Order update',
  notification: 'Activity',
  team: 'Team',
  lifecycle: 'Account',
  'product-update': 'Product update',
};

function stubIndex(category: string, name: string): string {
  const component = toPascalCase(name);
  const title = toTitleCase(name);
  const eyebrow = CATEGORY_EYEBROW[category] ?? 'Update';
  return `import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialGrundyTokens } from '../../tokens.config';
import { grundyBrand } from '../../brand.config';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailLayout } from '../../_components/layout';
import { EmailLinkFallback } from '../../_components/link-fallback';

export interface ${component}Props {
  brand?: EmailBrandProps;
  tokens?: PartialGrundyTokens;
  recipientEmail?: string;
  userName: string;
  headline: string;
  body: string;
  actionUrl: string;
  actionLabel?: string;
}

/**
 * ${title} email template for the Grundy theme.
 * // TODO: full implementation — add domain-specific props and content.
 */
export function ${component}({
  brand = grundyBrand,
  tokens,
  recipientEmail,
  userName,
  headline,
  body,
  actionUrl,
  actionLabel = 'Take action',
}: ${component}Props) {
  const appName = brand.appName;

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={headline}
      headerTagline="${eyebrow}"
    >
      <EmailEyebrow>${eyebrow}</EmailEyebrow>
      <EmailHeading subtitle={\`\${appName} notification\`}>
        {headline}
      </EmailHeading>
      <EmailBodyText>Hi {userName}, {body}</EmailBodyText>
      <EmailCtaSection href={actionUrl} label={actionLabel} />
      <EmailLinkFallback url={actionUrl} />
    </EmailLayout>
  );
}

export default ${component};
`;
}

function previewTsx(name: string): string {
  const title = toTitleCase(name);
  return `export const previewProps = {
  recipientEmail: 'alex@company.com',
  userName: 'Alex',
  headline: '${title}',
  body: 'this is a preview of the ${title} email. Replace with production copy.',
  actionUrl: 'https://acme.com/action',
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
      description: `${title} email for the Grundy theme.`,
      dependencies: ['@react-email/components'],
      registryDependencies: [],
    },
    null,
    2,
  );
}

for (const [category, names] of Object.entries(TEMPLATE_CONTRACT)) {
  for (const name of names) {
    const key = `${category}/${name}`;
    if (FULL_IMPLEMENTATIONS.has(key)) continue;

    const dir = join(themeRoot, category, name);
    mkdirSync(dir, { recursive: true });

    writeFileSync(join(dir, 'index.tsx'), stubIndex(category, name));
    writeFileSync(join(dir, 'preview.tsx'), previewTsx(name));
    writeFileSync(join(dir, 'meta.json'), `${metaJson(category, name)}\n`);
  }
}

console.log(`Scaffolded ${Object.values(TEMPLATE_CONTRACT).flat().length - FULL_IMPLEMENTATIONS.size} stub templates`);
