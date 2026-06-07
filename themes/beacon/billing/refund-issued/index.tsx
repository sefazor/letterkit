import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialBeaconTokens } from '../../tokens.config';
import { beaconBrand } from '../../brand.config';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailInfoCard } from '../../_components/info-card';
import { EmailLayout } from '../../_components/layout';
import { EmailTotals } from '../../_components/totals';

export interface RefundIssuedProps {
  brand?: EmailBrandProps;
  tokens?: PartialBeaconTokens;
  recipientEmail?: string;
  customerName: string;
  originalCharge: string;
  refundedAmount: string;
  refundDate: string;
  refundUrl: string;
}

/**
 * Refund issued template for the Beacon theme.
 */
export function RefundIssued({
  brand = beaconBrand,
  tokens,
  recipientEmail,
  customerName,
  originalCharge,
  refundedAmount,
  refundDate,
  refundUrl,
}: RefundIssuedProps) {
  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={`Refund of ${refundedAmount} issued`}
    >
      <EmailEyebrow>Refund processed</EmailEyebrow>
      <EmailHeading subtitle={`Issued on ${refundDate}`}>
        Refund issued
      </EmailHeading>
      <EmailBodyText>
        Hi {customerName}, we&apos;ve processed a refund to your original payment method. It may take
        5–10 business days to appear on your statement.
      </EmailBodyText>
      <EmailTotals
        rows={[
          { label: 'Original charge', value: originalCharge },
          { label: 'Refunded', value: refundedAmount, emphasis: true },
        ]}
      />
      <EmailInfoCard
        rows={[{ label: 'Refund date', value: refundDate }]}
      />
      <EmailCtaSection
        href={refundUrl}
        label="View refund details"
        caption="See the full transaction history in your billing portal."
      />
    </EmailLayout>
  );
}

export default RefundIssued;
