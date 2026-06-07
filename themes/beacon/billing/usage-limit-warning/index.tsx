import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialBeaconTokens } from '../../tokens.config';
import { beaconBrand } from '../../brand.config';
import { EmailCallout } from '../../_components/callout';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailInfoCard } from '../../_components/info-card';
import { EmailLayout } from '../../_components/layout';

export interface UsageLimitWarningProps {
  brand?: EmailBrandProps;
  tokens?: PartialBeaconTokens;
  recipientEmail?: string;
  customerName: string;
  usagePercent: number;
  used: string;
  limit: string;
  usageUrl: string;
}

/**
 * Usage limit warning template for the Beacon theme.
 */
export function UsageLimitWarning({
  brand = beaconBrand,
  tokens,
  recipientEmail,
  customerName,
  usagePercent,
  used,
  limit,
  usageUrl,
}: UsageLimitWarningProps) {
  const appName = brand.appName;

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={`You've used ${usagePercent}% of your ${appName} plan`}
    >
      <EmailEyebrow>Usage alert</EmailEyebrow>
      <EmailHeading subtitle={`${used} of ${limit} used`}>
        Approaching your plan limit
      </EmailHeading>
      <EmailBodyText>
        Hi {customerName}, your {appName} workspace is at {usagePercent}% of its plan limit. Consider
        upgrading or reducing usage to avoid interruptions.
      </EmailBodyText>
      <EmailInfoCard
        rows={[
          { label: 'Usage', value: `${usagePercent}%` },
          { label: 'Used', value: used },
          { label: 'Limit', value: limit },
        ]}
      />
      <EmailCallout title="What happens at 100%">
        New requests may be throttled or blocked until your usage resets or you upgrade your plan.
      </EmailCallout>
      <EmailCtaSection
        href={usageUrl}
        label="View usage report"
        caption="See a breakdown by project and time period."
      />
    </EmailLayout>
  );
}

export default UsageLimitWarning;
