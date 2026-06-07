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

export interface TrialEndingProps {
  brand?: EmailBrandProps;
  tokens?: PartialBeaconTokens;
  recipientEmail?: string;
  customerName: string;
  daysRemaining: number;
  trialEndsAt: string;
  planAfterTrial: string;
  upgradeUrl: string;
}

/**
 * Trial ending reminder template for the Beacon theme.
 */
export function TrialEnding({
  brand = beaconBrand,
  tokens,
  recipientEmail,
  customerName,
  daysRemaining,
  trialEndsAt,
  planAfterTrial,
  upgradeUrl,
}: TrialEndingProps) {
  const appName = brand.appName;
  const dayLabel = daysRemaining === 1 ? 'day' : 'days';

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={`${daysRemaining} ${dayLabel} left in your ${appName} trial`}
    >
      <EmailEyebrow>Trial ending soon</EmailEyebrow>
      <EmailHeading subtitle={`Your trial ends on ${trialEndsAt}`}>
        {daysRemaining} {dayLabel} left in your trial
      </EmailHeading>
      <EmailBodyText>
        Hi {customerName}, your {appName} trial is almost over. Upgrade now to keep your workspace,
        projects, and team data without interruption.
      </EmailBodyText>
      <EmailInfoCard
        rows={[
          { label: 'Trial ends', value: trialEndsAt },
          { label: 'Days remaining', value: String(daysRemaining) },
          { label: 'After trial', value: planAfterTrial },
        ]}
      />
      <EmailCallout title="What happens next">
        When your trial ends, you&apos;ll move to the {planAfterTrial} plan. Upgrade anytime to unlock
        full features and higher limits.
      </EmailCallout>
      <EmailCtaSection
        href={upgradeUrl}
        label="Choose a plan"
        caption="No interruption — your data stays exactly where it is."
      />
    </EmailLayout>
  );
}

export default TrialEnding;
