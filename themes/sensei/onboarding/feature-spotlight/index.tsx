import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface FeatureSpotlightProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  featureName?: string;
  timeSaved?: string;
  actionUrl?: string;
}

export function FeatureSpotlight({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  featureName,
  timeSaved,
  actionUrl,
}: FeatureSpotlightProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview={featureName ? `Feature spotlight: ${featureName}.` : 'Feature spotlight for you.'}
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>
        Feature spotlight{featureName ? `: ${featureName}` : ''}
      </LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — try {featureName ?? 'this feature'} to route incoming work to the right owner
        without manual triage.
      </LifecycleLede>
      <LifecycleDataCard rows={[{ label: 'Time saved', value: timeSaved ?? '' }]} />
      <LifecycleCta
        href={actionUrl}
        label={featureName ? `Explore ${featureName}` : 'Explore feature'}
      />
    </LifecycleLayout>
  );
}

export default FeatureSpotlight;
