import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialBeaconTokens } from '../../tokens.config';
import { beaconBrand } from '../../brand.config';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailLayout } from '../../_components/layout';

export interface GoodbyeProps {
  brand?: EmailBrandProps;
  tokens?: PartialBeaconTokens;
  recipientEmail?: string;
  userName: string;
  feedbackUrl: string;
}

/**
 * Goodbye churn lifecycle template for the Beacon theme.
 */
export function Goodbye({
  brand = beaconBrand,
  tokens,
  recipientEmail,
  userName,
  feedbackUrl,
}: GoodbyeProps) {
  const appName = brand.appName;

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={`Thanks for trying ${appName}`}
    >
      <EmailEyebrow>Farewell</EmailEyebrow>
      <EmailHeading subtitle="We hope to see you again">
        Thanks for trying {appName}
      </EmailHeading>
      <EmailBodyText>
        Hi {userName}, your {appName} account has been closed. We&apos;re sorry to see you go — your
        feedback helps us build something worth coming back to. If you ever want to return, your
        workspace can be restored within 30 days. After that, your data is permanently deleted.
      </EmailBodyText>
      <EmailCtaSection
        href={feedbackUrl}
        label="Share feedback"
        caption="Two minutes. Completely optional. Genuinely helpful."
      />
    </EmailLayout>
  );
}

export default Goodbye;
