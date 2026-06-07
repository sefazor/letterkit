import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { LifecycleStrong } from '../../_components/lifecycle/strong';
import { senseiBrand } from '../../brand.config';

export interface FeatureAnnouncementProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  featureName?: string;
  actionUrl?: string;
}

export function FeatureAnnouncement({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  featureName,
  actionUrl,
}: FeatureAnnouncementProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview={featureName ? `New feature: ${featureName}.` : 'A new feature is available.'}
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>
        New feature{featureName ? `: ${featureName}` : ''}
      </LifecycleTitle>
      <LifecycleLede>
        Hi {userName} —{' '}
        {featureName ? (
          <LifecycleStrong>{featureName}</LifecycleStrong>
        ) : (
          'This feature'
        )}{' '}
        lets your team test workflow outcomes safely in draft mode.
      </LifecycleLede>
      <LifecycleCta href={actionUrl} label="Try new feature" />
    </LifecycleLayout>
  );
}

export default FeatureAnnouncement;
