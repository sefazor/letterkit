import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialBeaconTokens } from '../../tokens.config';
import { beaconBrand } from '../../brand.config';
import { EmailCallout } from '../../_components/callout';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailInfoCard } from '../../_components/info-card';
import { EmailLayout } from '../../_components/layout';

export interface PaymentMethodUpdatedProps {
  brand?: EmailBrandProps;
  tokens?: PartialBeaconTokens;
  recipientEmail?: string;
  customerName: string;
  paymentMethod: string;
  updatedAt: string;
  billingUrl: string;
}

/**
 * Payment method updated template for the Beacon theme.
 */
export function PaymentMethodUpdated({
  brand = beaconBrand,
  tokens,
  recipientEmail,
  customerName,
  paymentMethod,
  updatedAt,
  billingUrl,
}: PaymentMethodUpdatedProps) {
  const appName = brand.appName;

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={`Payment method updated on ${appName}`}
    >
      <EmailEyebrow>Billing update</EmailEyebrow>
      <EmailHeading subtitle="Your default payment method changed">
        Payment method updated
      </EmailHeading>
      <EmailBodyText>
        Hi {customerName}, the payment method on your {appName} account was updated successfully.
        Future charges will use the new card on file.
      </EmailBodyText>
      <EmailInfoCard
        rows={[
          { label: 'New method', value: paymentMethod },
          { label: 'Updated', value: updatedAt },
        ]}
      />
      <EmailCallout title="Didn't make this change?">
        If you didn&apos;t update your payment method, review your billing settings immediately and
        contact support.
      </EmailCallout>
      <EmailCtaSection
        href={billingUrl}
        label="Review billing settings"
        caption="View payment history and manage your subscription."
      />
    </EmailLayout>
  );
}

export default PaymentMethodUpdated;
