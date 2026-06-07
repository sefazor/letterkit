import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialGrundyTokens } from '../../tokens.config';
import { grundyBrand } from '../../brand.config';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailLayout } from '../../_components/layout';
import { EmailLineItems } from '../../_components/line-items';
import { EmailTotals } from '../../_components/totals';

export interface CartItem {
  name: string;
  quantity: number;
  price: string;
}

export interface AbandonedCartProps {
  brand?: EmailBrandProps;
  tokens?: PartialGrundyTokens;
  recipientEmail?: string;
  customerName: string;
  items: CartItem[];
  total: string;
  cartUrl: string;
}

/**
 * Abandoned cart reminder template for the Grundy theme.
 */
export function AbandonedCart({
  brand = grundyBrand,
  tokens,
  recipientEmail,
  customerName,
  items,
  total,
  cartUrl,
}: AbandonedCartProps) {
  const appName = brand.appName;

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={`You left items in your ${appName} cart`}
      headerTagline="Order update"
    >
      <EmailEyebrow>Cart reminder</EmailEyebrow>
      <EmailHeading subtitle={`${items.length} item${items.length === 1 ? '' : 's'} waiting`}>
        Still thinking it over?
      </EmailHeading>
      <EmailBodyText>
        Hi {customerName}, you left a few things in your cart. They&apos;re saved and ready whenever
        you are — no need to start over.
      </EmailBodyText>
      <EmailLineItems
        title="Your cart"
        items={items.map((item) => ({
          name: item.name,
          detail: `Qty ${item.quantity}`,
          amount: item.price,
        }))}
      />
      <EmailTotals rows={[{ label: 'Cart total', value: total, emphasis: true }]} />
      <EmailCtaSection
        href={cartUrl}
        label="Complete your order"
        caption="Items are reserved for a limited time."
      />
    </EmailLayout>
  );
}

export default AbandonedCart;
