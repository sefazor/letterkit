import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialGrundyTokens } from '../../tokens.config';
import { grundyBrand } from '../../brand.config';
import { EmailCallout } from '../../_components/callout';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailLayout } from '../../_components/layout';
import { EmailLineItems } from '../../_components/line-items';

export interface AccountCreatedProps {
  brand?: EmailBrandProps;
  tokens?: PartialGrundyTokens;
  recipientEmail?: string;
  userName: string;
  dashboardUrl: string;
  checklist?: string[];
}

/**
 * Account created lifecycle template for the Grundy theme.
 */
export function AccountCreated({
  brand = grundyBrand,
  tokens,
  recipientEmail,
  userName,
  dashboardUrl,
  checklist = ['Verify your email', 'Set up your profile', 'Explore the dashboard'],
}: AccountCreatedProps) {
  const appName = brand.appName;

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
     
      recipientEmail={recipientEmail}
      preview={`Your ${appName} account is ready`}
      headerTagline="Account"
    >
      <EmailEyebrow>Account created</EmailEyebrow>
      <EmailHeading subtitle="Everything is set up and waiting">
        Welcome to {appName}, {userName}
      </EmailHeading>
      <EmailBodyText>
        Your account was created successfully. Here&apos;s a quick checklist to make the most of your
        first session.
      </EmailBodyText>
      <EmailLineItems
       
        title="Get started"
        items={checklist.map((item, i) => ({
          name: item,
          detail: `0${i + 1}`,
          amount: '○',
        }))}
      />
      <EmailCtaSection
       
        href={dashboardUrl}
        label="Go to dashboard"
        caption="Your workspace is ready. No credit card required."
      />
      <EmailCallout title="Need help?">
        Our docs cover setup, integrations, and best practices. Or reply to this email — we read every
        message.
      </EmailCallout>
    </EmailLayout>
  );
}

export default AccountCreated;
