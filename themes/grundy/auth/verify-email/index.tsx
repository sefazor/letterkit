import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialGrundyTokens } from '../../tokens.config';
import { grundyBrand } from '../../brand.config';
import { EmailCallout } from '../../_components/callout';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailLayout } from '../../_components/layout';
import { EmailLinkFallback } from '../../_components/link-fallback';

export interface VerifyEmailProps {
  brand?: EmailBrandProps;
  tokens?: PartialGrundyTokens;
  recipientEmail?: string;
  userName: string;
  verifyUrl: string;
  expiresIn: string;
  supportEmail?: string;
}

/**
 * Email verification template for the Grundy theme.
 */
export function VerifyEmail({
  brand = grundyBrand,
  tokens,
  recipientEmail,
  userName,
  verifyUrl,
  expiresIn,
  supportEmail,
}: VerifyEmailProps) {
  const appName = brand.appName;

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
     
      recipientEmail={recipientEmail}
      preview={`Verify your ${appName} email address`}
      headerTagline="Account security"
      helpEmail={supportEmail}
    >
      <EmailEyebrow>Authentication</EmailEyebrow>
      <EmailHeading subtitle={`Complete your ${appName} registration`}>
        Verify your email
      </EmailHeading>
      <EmailBodyText>
        Hi {userName}, welcome aboard. We&apos;re glad you&apos;re here — one quick step left before
        you can access your workspace.
      </EmailBodyText>
      <EmailBodyText>
        Click the button below to confirm your email address. For your security, this link expires in{' '}
        {expiresIn}.
      </EmailBodyText>
      <EmailCtaSection
       
        href={verifyUrl}
        label="Verify email address"
        caption="You'll be redirected to your dashboard after confirmation."
      />
      <EmailCallout title="Didn't sign up?">
        If you didn&apos;t create an account, you can safely ignore this email. No action is required.
      </EmailCallout>
      <EmailLinkFallback url={verifyUrl} />
    </EmailLayout>
  );
}

export default VerifyEmail;
