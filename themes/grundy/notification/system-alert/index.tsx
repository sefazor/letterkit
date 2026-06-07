import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialGrundyTokens } from '../../tokens.config';
import { grundyBrand } from '../../brand.config';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailInfoCard } from '../../_components/info-card';
import { EmailLayout } from '../../_components/layout';

export interface SystemAlertProps {
  brand?: EmailBrandProps;
  tokens?: PartialGrundyTokens;
  recipientEmail?: string;
  recipientName: string;
  alertName: string;
  metricLabel: string;
  metricValue: string;
  triggeredAt: string;
  alertUrl: string;
}

/**
 * System alert notification template for the Grundy theme.
 */
export function SystemAlert({
  brand = grundyBrand,
  tokens,
  recipientEmail,
  recipientName,
  alertName,
  metricLabel,
  metricValue,
  triggeredAt,
  alertUrl,
}: SystemAlertProps) {
  const appName = brand.appName;

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={`Alert: ${alertName}`}
      headerTagline="System alert"
    >
      <EmailEyebrow>Alert triggered</EmailEyebrow>
      <EmailHeading subtitle={`Triggered at ${triggeredAt}`}>
        {alertName}
      </EmailHeading>
      <EmailBodyText>
        Hi {recipientName}, a monitoring alert fired in {appName}. Review the details below and take
        action if needed.
      </EmailBodyText>
      <EmailInfoCard
        rows={[
          { label: 'Alert', value: alertName },
          { label: metricLabel, value: metricValue },
          { label: 'Triggered', value: triggeredAt },
        ]}
      />
      <EmailCtaSection
        href={alertUrl}
        label="Inspect alert details"
        caption="View logs, metrics, and recent changes."
      />
    </EmailLayout>
  );
}

export default SystemAlert;
