import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { LifecycleTotals } from '../../_components/lifecycle/totals';
import { foundryBrand } from '../../brand.config';

export interface RefundIssuedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  originalCharge?: string;
  refundedAmount?: string;
  actionUrl?: string;
}

export function RefundIssued({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  originalCharge,
  refundedAmount,
  actionUrl,
}: RefundIssuedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview={
        refundedAmount
          ? `A refund for ${refundedAmount} has been processed.`
          : 'A refund has been processed.'
      }
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Refund issued</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — your refund was approved and sent back to the original payment method.
      </LifecycleLede>
      <LifecycleTotals
        rows={[
          { label: 'Original charge', value: originalCharge ?? '' },
          { label: 'Refunded amount', value: refundedAmount ?? '', emphasis: true },
        ]}
      />
      <LifecycleCta href={actionUrl} label="View refund details" />
    </LifecycleLayout>
  );
}

export default RefundIssued;
