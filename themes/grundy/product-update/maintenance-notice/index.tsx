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

export interface MaintenanceNoticeProps {
  brand?: EmailBrandProps;
  tokens?: PartialGrundyTokens;
  recipientEmail?: string;
  maintenanceWindow: string;
  expectedDuration: string;
  affectedServices?: string;
  statusUrl: string;
}

/**
 * Scheduled maintenance notice template for the Grundy theme.
 */
export function MaintenanceNotice({
  brand = grundyBrand,
  tokens,
  recipientEmail,
  maintenanceWindow,
  expectedDuration,
  affectedServices = 'All services',
  statusUrl,
}: MaintenanceNoticeProps) {
  const appName = brand.appName;

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={`Scheduled maintenance on ${appName}`}
      headerTagline="Product update"
    >
      <EmailEyebrow>Maintenance</EmailEyebrow>
      <EmailHeading subtitle={maintenanceWindow}>
        Scheduled maintenance notice
      </EmailHeading>
      <EmailBodyText>
        We&apos;re performing scheduled maintenance on {appName}. During this window, some features
        may be temporarily unavailable.
      </EmailBodyText>
      <EmailInfoCard
        rows={[
          { label: 'Window', value: maintenanceWindow },
          { label: 'Expected duration', value: expectedDuration },
          { label: 'Affected', value: affectedServices },
        ]}
      />
      <EmailCallout title="What to expect">
        Your data is safe. We&apos;ll post real-time updates on our status page as work progresses.
      </EmailCallout>
      <EmailCtaSection
        href={statusUrl}
        label="View maintenance details"
        caption="Subscribe for live updates during the window."
      />
    </EmailLayout>
  );
}

export default MaintenanceNotice;
