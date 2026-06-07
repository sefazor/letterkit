import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface ApiKeyRotatedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  oldKeyExpiry?: string;
  actionUrl?: string;
}

export function ApiKeyRotated({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  oldKeyExpiry,
  actionUrl,
}: ApiKeyRotatedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Your previous key was replaced with a new credential."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>API key rotated</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — rotation completed successfully. Update your backend secrets to the new key.
      </LifecycleLede>
      <LifecycleDataCard rows={[{ label: 'Old key status', value: oldKeyExpiry ?? '' }]} />
      <LifecycleCta href={actionUrl} label="View rotation log" />
    </LifecycleLayout>
  );
}

export default ApiKeyRotated;
