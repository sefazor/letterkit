import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialBeaconTokens } from '../../tokens.config';
import { beaconBrand } from '../../brand.config';
import { EmailCallout } from '../../_components/callout';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailLayout } from '../../_components/layout';
import { EmailLineItems } from '../../_components/line-items';

export interface FeatureAnnouncementProps {
  brand?: EmailBrandProps;
  tokens?: PartialBeaconTokens;
  recipientEmail?: string;
  featureName: string;
  featureDescription: string;
  learnMoreUrl: string;
  highlights?: string[];
}

/**
 * Feature announcement template for the Beacon theme.
 */
export function FeatureAnnouncement({
  brand = beaconBrand,
  tokens,
  recipientEmail,
  featureName,
  featureDescription,
  learnMoreUrl,
  highlights = [],
}: FeatureAnnouncementProps) {
  const appName = brand.appName;

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
     
      recipientEmail={recipientEmail}
      preview={`Introducing ${featureName}`}
    >
      <EmailEyebrow>New feature</EmailEyebrow>
      <EmailHeading subtitle="Shipped this week">
        {featureName}
      </EmailHeading>
      <EmailBodyText>{featureDescription}</EmailBodyText>
      {highlights.length > 0 ? (
        <EmailLineItems
         
          title="What you get"
          items={highlights.map((h) => ({ name: h, amount: '✓' }))}
        />
      ) : null}
      <EmailCallout title="Available now">
        This feature is live for all {appName} users. No action required — just open the app and look
        for the new option in your sidebar.
      </EmailCallout>
      <EmailCtaSection
       
        href={learnMoreUrl}
        label="Read the announcement"
        secondaryHref={learnMoreUrl}
        secondaryLabel="View changelog"
      />
    </EmailLayout>
  );
}

export default FeatureAnnouncement;
