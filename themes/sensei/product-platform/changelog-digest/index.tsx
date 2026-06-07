import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface ChangelogDigestProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  actionUrl?: string;
}

export function ChangelogDigest({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  actionUrl,
}: ChangelogDigestProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="New features and fixes shipped this week."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Changelog digest</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — here is your curated release digest from the product team.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Workflow templates', badge: 'New', badgeVariant: 'success' },
          { label: 'Audit export', badge: 'Improved', badgeVariant: 'neutral' },
          { label: 'Mobile notifications', badge: 'Fixed', badgeVariant: 'success' },
        ]}
      />
      <LifecycleCta href={actionUrl} label="Read full changelog" />
    </LifecycleLayout>
  );
}

export default ChangelogDigest;
