import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialBeaconTokens } from '../../tokens.config';
import { beaconBrand } from '../../brand.config';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailLayout } from '../../_components/layout';

export interface InactiveDay3Props {
  brand?: EmailBrandProps;
  tokens?: PartialBeaconTokens;
  recipientEmail?: string;
  userName: string;
  gettingStartedUrl: string;
}

/**
 * Day 3 inactive user nudge template for the Beacon theme.
 */
export function InactiveDay3({
  brand = beaconBrand,
  tokens,
  recipientEmail,
  userName,
  gettingStartedUrl,
}: InactiveDay3Props) {
  const appName = brand.appName;

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={`Need a hand getting started with ${appName}?`}
    >
      <EmailEyebrow>Quick check-in</EmailEyebrow>
      <EmailHeading subtitle="Your workspace is still waiting">
        Need a hand getting started?
      </EmailHeading>
      <EmailBodyText>
        Hi {userName}, we noticed you haven&apos;t been back to {appName} in a few days. No pressure
        — but your workspace is set up and ready whenever you are. Our starter wizard walks you through
        the basics in about five minutes. Most people finish their first project the same day.
      </EmailBodyText>
      <EmailCtaSection
        href={gettingStartedUrl}
        label="Open starter wizard"
        caption="Pick up right where you left off."
      />
    </EmailLayout>
  );
}

export default InactiveDay3;
