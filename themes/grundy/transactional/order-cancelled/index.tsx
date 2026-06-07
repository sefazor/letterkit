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

export interface OrderCancelledProps {
  brand?: EmailBrandProps;
  tokens?: PartialGrundyTokens;
  recipientEmail?: string;
  customerName: string;
  orderNumber: string;
  cancelledAt: string;
  refundAmount?: string;
  orderUrl: string;
}

/**
 * Order cancelled template for the Grundy theme.
 */
export function OrderCancelled({
  brand = grundyBrand,
  tokens,
  recipientEmail,
  customerName,
  orderNumber,
  cancelledAt,
  refundAmount,
  orderUrl,
}: OrderCancelledProps) {
  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={`Order ${orderNumber} cancelled`}
      headerTagline="Order update"
    >
      <EmailEyebrow>Order cancelled</EmailEyebrow>
      <EmailHeading subtitle={`Cancelled on ${cancelledAt}`}>
        Your order has been cancelled
      </EmailHeading>
      <EmailBodyText>
        Hi {customerName}, your order {orderNumber} has been cancelled as requested. No further action
        is needed on your end.
      </EmailBodyText>
      <EmailInfoCard
        rows={[
          { label: 'Order', value: orderNumber },
          { label: 'Cancelled', value: cancelledAt },
          { label: 'Status', value: 'Cancelled' },
        ]}
      />
      {refundAmount ? (
        <EmailTotals rows={[{ label: 'Refund amount', value: refundAmount, emphasis: true }]} />
      ) : null}
      <EmailCtaSection
        href={orderUrl}
        label="View order details"
        caption={refundAmount ? 'Refunds typically appear within 5–10 business days.' : undefined}
      />
    </EmailLayout>
  );
}

export default OrderCancelled;
