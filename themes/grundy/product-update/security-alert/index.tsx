import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialGrundyTokens } from '../../tokens.config';
import { grundyBrand } from '../../brand.config';
import { EmailCallout } from '../../_components/callout';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailInfoCard } from '../../_components/info-card';
import { EmailLayout } from '../../_components/layout';

export interface SecurityAlertProps {
  brand?: EmailBrandProps;
  tokens?: PartialGrundyTokens;
  recipientEmail?: string;
  advisoryId: string;
  advisoryTitle: string;
  advisorySummary: string;
  severity: string;
  advisoryUrl: string;
}

/**
 * Security advisory alert template for the Grundy theme.
 */
export function SecurityAlert({
  brand = grundyBrand,
  tokens,
  recipientEmail,
  advisoryId,
  advisoryTitle,
  advisorySummary,
  severity,
  advisoryUrl,
}: SecurityAlertProps) {
  const appName = brand.appName;

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={`Security advisory: ${advisoryTitle}`}
      headerTagline="Security"
    >
      <EmailEyebrow>Security advisory</EmailEyebrow>
      <EmailHeading subtitle={`Advisory ${advisoryId}`}>
        {advisoryTitle}
      </EmailHeading>
      <EmailBodyText>
        We&apos;re writing to inform you about a security matter affecting {appName}. {advisorySummary}
      </EmailBodyText>
      <EmailInfoCard
        rows={[
          { label: 'Advisory ID', value: advisoryId },
          { label: 'Severity', value: severity },
          { label: 'Status', value: 'Mitigated' },
        ]}
      />
      <EmailCallout title="Action required">
        Review the advisory for affected versions and recommended steps. No account compromise has been
        detected, but we recommend updating to the latest version.
      </EmailCallout>
      <EmailCtaSection
        href={advisoryUrl}
        label="Review advisory"
        caption="Full details, timeline, and remediation steps."
      />
    </EmailLayout>
  );
}

export default SecurityAlert;
