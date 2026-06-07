import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialGrundyTokens } from '../../tokens.config';
import { grundyBrand } from '../../brand.config';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailLayout } from '../../_components/layout';

export interface ReviewRequestProps {
  brand?: EmailBrandProps;
  tokens?: PartialGrundyTokens;
  recipientEmail?: string;
  customerName: string;
  productName: string;
  reviewUrl: string;
}

/**
 * Review request template for the Grundy theme.
 */
export function ReviewRequest({
  brand = grundyBrand,
  tokens,
  recipientEmail,
  customerName,
  productName,
  reviewUrl,
}: ReviewRequestProps) {
  const appName = brand.appName;

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={`How was your ${productName}?`}
      headerTagline="Order update"
    >
      <EmailEyebrow>Your feedback</EmailEyebrow>
      <EmailHeading subtitle="It only takes a minute">
        How was your {productName}?
      </EmailHeading>
      <EmailBodyText>
        Hi {customerName}, we hope you&apos;re enjoying your recent purchase from {appName}. Your
        honest review helps other shoppers and helps us improve.
      </EmailBodyText>
      <EmailCtaSection
        href={reviewUrl}
        label="Write a review"
        caption="Share a photo, a rating, or just a few words."
      />
    </EmailLayout>
  );
}

export default ReviewRequest;
