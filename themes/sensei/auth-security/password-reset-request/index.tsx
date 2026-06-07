import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleFootnote } from '../../_components/lifecycle/footnote';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface PasswordResetRequestProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  resetUrl?: string;
  expiresIn?: string;
  ipAddress?: string;
  location?: string;
  requestedAt?: string;
}

export function PasswordResetRequest({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  resetUrl,
  expiresIn,
  ipAddress,
  location,
  requestedAt,
}: PasswordResetRequestProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Reset your password — link expires soon."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Reset your password</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — we got a request to reset your password.
        {expiresIn ? ` The link below expires in ${expiresIn}.` : null}
      </LifecycleLede>
      <LifecycleCta href={resetUrl} label="Reset password" />
      <LifecycleDataCard
        rows={[
          { label: 'IP address', value: ipAddress ?? '' },
          { label: 'Location', value: location ?? '' },
          { label: 'Requested at', value: requestedAt ?? '' },
        ]}
      />
      <LifecycleFootnote>
        Wasn&apos;t you? Ignore this email — your password won&apos;t change.
      </LifecycleFootnote>
    </LifecycleLayout>
  );
}

export default PasswordResetRequest;
