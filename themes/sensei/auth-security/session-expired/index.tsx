import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface SessionExpiredProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  signInUrl?: string;
}

export function SessionExpired({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  signInUrl,
}: SessionExpiredProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Your session expired — sign in to continue."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Session expired</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — you were signed out after inactivity. Your work is saved — sign back in to
        continue.
      </LifecycleLede>
      <LifecycleCta href={signInUrl} label="Sign in again" />
    </LifecycleLayout>
  );
}

export default SessionExpired;
