import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialGrundyTokens } from '../../tokens.config';
import { grundyBrand } from '../../brand.config';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailInfoCard } from '../../_components/info-card';
import { EmailLayout } from '../../_components/layout';

export interface BackInStockProps {
  brand?: EmailBrandProps;
  tokens?: PartialGrundyTokens;
  recipientEmail?: string;
  customerName: string;
  productName: string;
  productPrice: string;
  productUrl: string;
}

/**
 * Back in stock notification template for the Grundy theme.
 */
export function BackInStock({
  brand = grundyBrand,
  tokens,
  recipientEmail,
  customerName,
  productName,
  productPrice,
  productUrl,
}: BackInStockProps) {
  const appName = brand.appName;

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={`${productName} is back in stock`}
      headerTagline="Order update"
    >
      <EmailEyebrow>Back in stock</EmailEyebrow>
      <EmailHeading subtitle={productPrice}>
        {productName} is available again
      </EmailHeading>
      <EmailBodyText>
        Hi {customerName}, good news — the item you were watching is back in stock at {appName}.
        Quantities are limited, so grab it while you can.
      </EmailBodyText>
      <EmailInfoCard
        rows={[
          { label: 'Product', value: productName },
          { label: 'Price', value: productPrice },
          { label: 'Availability', value: 'In stock' },
        ]}
      />
      <EmailCtaSection
        href={productUrl}
        label="Shop now"
        caption="You asked to be notified when this item returned."
      />
    </EmailLayout>
  );
}

export default BackInStock;
