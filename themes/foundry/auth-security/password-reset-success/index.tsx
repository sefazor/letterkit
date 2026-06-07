import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface PasswordResetSuccessProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  sessionsUrl?: string;
}

export function PasswordResetSuccess({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  sessionsUrl,
}: PasswordResetSuccessProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Your password has been updated."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Password updated</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — done. Your password is updated. Sign in with your new credentials on any
        device.
      </LifecycleLede>
      <LifecycleLede>While you&apos;re here, check which sessions are still active.</LifecycleLede>
      <LifecycleCta href={sessionsUrl} label="Review active sessions" />
    </LifecycleLayout>
  );
}

export default PasswordResetSuccess;
