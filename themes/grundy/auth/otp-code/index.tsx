import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialGrundyTokens } from '../../tokens.config';
import { grundyBrand } from '../../brand.config';
import { EmailCallout } from '../../_components/callout';
import { EmailCodeDisplay } from '../../_components/code-display';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailInfoCard } from '../../_components/info-card';
import { EmailLayout } from '../../_components/layout';

export interface OtpCodeProps {
  brand?: EmailBrandProps;
  tokens?: PartialGrundyTokens;
  recipientEmail?: string;
  userName: string;
  verificationCode: string;
  expiresIn: string;
  ipAddress?: string;
  location?: string;
  attemptedAt?: string;
}

/**
 * One-time passcode template for the Grundy theme.
 */
export function OtpCode({
  brand = grundyBrand,
  tokens,
  recipientEmail,
  userName,
  verificationCode,
  expiresIn,
  ipAddress,
  location,
  attemptedAt,
}: OtpCodeProps) {
  const appName = brand.appName;

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={`Your ${appName} sign-in code`}
      headerTagline="Secure sign-in"
    >
      <EmailEyebrow>Verification code</EmailEyebrow>
      <EmailHeading subtitle="Enter this code to continue">
        Your sign-in code
      </EmailHeading>
      <EmailBodyText>
        Hi {userName}, use the code below to verify your identity and sign in to {appName}. Never
        share this code with anyone.
      </EmailBodyText>
      <EmailCodeDisplay code={verificationCode} expiresIn={expiresIn} />
      {ipAddress || location || attemptedAt ? (
        <EmailInfoCard
          title="Sign-in attempt"
          rows={[
            ...(attemptedAt ? [{ label: 'When', value: attemptedAt }] : []),
            ...(ipAddress ? [{ label: 'IP address', value: ipAddress }] : []),
            ...(location ? [{ label: 'Location', value: location }] : []),
          ]}
        />
      ) : null}
      <EmailCallout title="Didn't try to sign in?">
        If you didn&apos;t request this code, ignore this email. Your account remains secure and the
        code will expire automatically.
      </EmailCallout>
    </EmailLayout>
  );
}

export default OtpCode;
