import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCaption } from '../../_components/lifecycle/caption';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleFootnote } from '../../_components/lifecycle/footnote';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface EmailVerificationProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  verifyUrl?: string;
  expiresIn?: string;
}

export function EmailVerification({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  verifyUrl,
  expiresIn,
}: EmailVerificationProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Confirm your email to activate your workspace."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Confirm your email</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — one step left. Verify your email to unlock billing, team invites, and
        workspace automation.
      </LifecycleLede>
      <LifecycleCta href={verifyUrl} label="Verify email" />
      {expiresIn ? <LifecycleCaption>Link expires in {expiresIn}.</LifecycleCaption> : null}
      <LifecycleFootnote>Didn&apos;t sign up? Ignore this email.</LifecycleFootnote>
    </LifecycleLayout>
  );
}

export default EmailVerification;
