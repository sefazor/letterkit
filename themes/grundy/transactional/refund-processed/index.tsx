import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialGrundyTokens } from '../../tokens.config';
import { grundyBrand } from '../../brand.config';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailInfoCard } from '../../_components/info-card';
import { EmailLayout } from '../../_components/layout';
import { EmailTotals } from '../../_components/totals';

export interface RefundProcessedProps {
  brand?: EmailBrandProps;
  tokens?: PartialGrundyTokens;
  recipientEmail?: string;
  customerName: string;
  orderNumber: string;
  refundAmount: string;
  refundDate: string;
  paymentMethod: string;
  orderUrl: string;
}

/**
 * Order refund processed template for the Grundy theme.
 */
export function RefundProcessed({
  brand = grundyBrand,
  tokens,
  recipientEmail,
  customerName,
  orderNumber,
  refundAmount,
  refundDate,
  paymentMethod,
  orderUrl,
}: RefundProcessedProps) {
  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={`Refund of ${refundAmount} processed for order ${orderNumber}`}
      headerTagline="Order update"
    >
      <EmailEyebrow>Refund processed</EmailEyebrow>
      <EmailHeading subtitle={`Order ${orderNumber}`}>
        Your refund is on its way
      </EmailHeading>
      <EmailBodyText>
        Hi {customerName}, we&apos;ve processed your refund. It may take 5–10 business days to appear
        on your {paymentMethod} statement.
      </EmailBodyText>
      <EmailTotals rows={[{ label: 'Refund amount', value: refundAmount, emphasis: true }]} />
      <EmailInfoCard
        rows={[
          { label: 'Order', value: orderNumber },
          { label: 'Refund date', value: refundDate },
          { label: 'Refunded to', value: paymentMethod },
        ]}
      />
      <EmailCtaSection
        href={orderUrl}
        label="View order"
        caption="See the full refund and order history."
      />
    </EmailLayout>
  );
}

export default RefundProcessed;
