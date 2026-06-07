import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialBeaconTokens } from '../../tokens.config';
import { beaconBrand } from '../../brand.config';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailInfoCard } from '../../_components/info-card';
import { EmailLayout } from '../../_components/layout';

export interface ProductTourProps {
  brand?: EmailBrandProps;
  tokens?: PartialBeaconTokens;
  recipientEmail?: string;
  userName: string;
  featureName: string;
  featureDescription: string;
  timeSaved?: string;
  tourUrl: string;
}

/**
 * Product tour spotlight template for the Beacon theme.
 */
export function ProductTour({
  brand = beaconBrand,
  tokens,
  recipientEmail,
  userName,
  featureName,
  featureDescription,
  timeSaved,
  tourUrl,
}: ProductTourProps) {
  const appName = brand.appName;

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={`Discover ${featureName} in ${appName}`}
    >
      <EmailEyebrow>Feature spotlight</EmailEyebrow>
      <EmailHeading subtitle={`A quick tour of ${featureName}`}>
        Have you tried {featureName}?
      </EmailHeading>
      <EmailBodyText>
        Hi {userName}, {featureDescription}
      </EmailBodyText>
      {timeSaved ? (
        <EmailInfoCard
          rows={[{ label: 'Time saved', value: timeSaved }]}
        />
      ) : null}
      <EmailCtaSection
        href={tourUrl}
        label={`Explore ${featureName}`}
        caption="A 2-minute walkthrough — no setup required."
      />
    </EmailLayout>
  );
}

export default ProductTour;
