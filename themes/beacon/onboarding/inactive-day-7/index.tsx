import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialBeaconTokens } from '../../tokens.config';
import { beaconBrand } from '../../brand.config';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailLayout } from '../../_components/layout';

export interface InactiveDay7Props {
  brand?: EmailBrandProps;
  tokens?: PartialBeaconTokens;
  recipientEmail?: string;
  userName: string;
  templateName: string;
  templateUrl: string;
  trialEndsAt?: string;
}

/**
 * Day 7 inactive user nudge template for the Beacon theme.
 */
export function InactiveDay7({
  brand = beaconBrand,
  tokens,
  recipientEmail,
  userName,
  templateName,
  templateUrl,
  trialEndsAt,
}: InactiveDay7Props) {
  const appName = brand.appName;

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={trialEndsAt ? `Your ${appName} trial ends soon` : `Your ${appName} workspace is waiting`}
    >
      <EmailEyebrow>Still here for you</EmailEyebrow>
      <EmailHeading subtitle={trialEndsAt ? `Trial ends ${trialEndsAt}` : 'Pick up where you left off'}>
        {trialEndsAt ? 'Your trial is waiting' : 'We saved your spot'}
      </EmailHeading>
      <EmailBodyText>
        Hi {userName}, it&apos;s been a week since you signed up for {appName}. We picked a template
        that matches what most teams start with — one click and you&apos;re back in. Try the{' '}
        <strong>{templateName}</strong> template to see how {appName} fits your workflow.
      </EmailBodyText>
      <EmailCtaSection
        href={templateUrl}
        label="Use recommended template"
        caption="Pre-configured and ready to customize."
      />
    </EmailLayout>
  );
}

export default InactiveDay7;
