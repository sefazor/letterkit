import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialBeaconTokens } from '../../tokens.config';
import { beaconBrand } from '../../brand.config';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailInfoCard } from '../../_components/info-card';
import { EmailLayout } from '../../_components/layout';

export interface SystemAlertProps {
  brand?: EmailBrandProps;
  tokens?: PartialBeaconTokens;
  recipientEmail?: string;
  recipientName: string;
  alertName: string;
  metricLabel: string;
  metricValue: string;
  triggeredAt: string;
  alertUrl: string;
}

/**
 * System alert notification template for the Beacon theme.
 */
export function SystemAlert({
  brand = beaconBrand,
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
      preview={`Incident: ${alertName}`}
    >
      <EmailEyebrow>Incident</EmailEyebrow>
      <EmailHeading subtitle={triggeredAt}>{alertName}</EmailHeading>
      <EmailBodyText>
        Hi {recipientName}, a monitoring rule in {appName} crossed its threshold. Inspect the signal
        below and confirm whether action is required.
      </EmailBodyText>
      <EmailInfoCard
        rows={[
          { label: 'Alert', value: alertName },
          { label: metricLabel, value: metricValue },
          { label: 'Detected', value: triggeredAt },
        ]}
      />
      <EmailCtaSection
        href={alertUrl}
        label="View incident"
        caption="See logs, recent deploys, and on-call runbooks."
      />
    </EmailLayout>
  );
}

export default SystemAlert;
