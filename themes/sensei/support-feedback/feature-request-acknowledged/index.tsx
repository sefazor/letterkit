import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface FeatureRequestAcknowledgedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  actionUrl?: string;
}

export function FeatureRequestAcknowledged({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  actionUrl,
}: FeatureRequestAcknowledgedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Thanks for sharing your idea with us."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Feature request received</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — your feature request is logged and visible to the product team roadmap
        process.
      </LifecycleLede>
      <LifecycleCta href={actionUrl} label="Track request status" />
    </LifecycleLayout>
  );
}

export default FeatureRequestAcknowledged;
