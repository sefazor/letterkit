import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialGrundyTokens } from '../../tokens.config';
import { grundyBrand } from '../../brand.config';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailLayout } from '../../_components/layout';
import { EmailLineItems } from '../../_components/line-items';

export interface ProductUpdateProps {
  brand?: EmailBrandProps;
  tokens?: PartialGrundyTokens;
  recipientEmail?: string;
  updateTitle: string;
  updateSummary: string;
  highlights: string[];
  learnMoreUrl: string;
}

/**
 * Product update announcement template for the Grundy theme.
 */
export function ProductUpdate({
  brand = grundyBrand,
  tokens,
  recipientEmail,
  updateTitle,
  updateSummary,
  highlights,
  learnMoreUrl,
}: ProductUpdateProps) {
  const appName = brand.appName;

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={updateTitle}
      headerTagline="Product update"
    >
      <EmailEyebrow>What&apos;s new</EmailEyebrow>
      <EmailHeading subtitle={`Updates in ${appName}`}>
        {updateTitle}
      </EmailHeading>
      <EmailBodyText>{updateSummary}</EmailBodyText>
      {highlights.length > 0 ? (
        <EmailLineItems
          title="Highlights"
          items={highlights.map((h) => ({ name: h, amount: '•' }))}
        />
      ) : null}
      <EmailCtaSection
        href={learnMoreUrl}
        label="Read the full update"
        caption="See screenshots, details, and migration notes."
      />
    </EmailLayout>
  );
}

export default ProductUpdate;
