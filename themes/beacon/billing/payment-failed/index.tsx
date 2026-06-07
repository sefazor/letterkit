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

export interface PaymentFailedProps {
  brand?: EmailBrandProps;
  tokens?: PartialBeaconTokens;
  recipientEmail?: string;
  customerName: string;
  amount: string;
  retryUrl: string;
  supportEmail: string;
  nextRetryDate?: string;
}

/**
 * Payment failed template for the Beacon theme.
 */
export function PaymentFailed({
  brand = beaconBrand,
  tokens,
  recipientEmail,
  customerName,
  amount,
  retryUrl,
  supportEmail,
  nextRetryDate,
}: PaymentFailedProps) {
  const appName = brand.appName;

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
     
      recipientEmail={recipientEmail}
      preview={`Action required: payment of ${amount} failed`}
    >
      <EmailEyebrow>Action required</EmailEyebrow>
      <EmailHeading subtitle="Your subscription may be interrupted">
        We couldn&apos;t process your payment
      </EmailHeading>
      <EmailBodyText>
        Hi {customerName}, we attempted to charge {amount} to your payment method on file, but the
        transaction didn&apos;t go through.
      </EmailBodyText>
      <EmailInfoCard
       
        rows={[
          { label: 'Amount', value: amount },
          { label: 'Status', value: 'Failed' },
          ...(nextRetryDate ? [{ label: 'Next retry', value: nextRetryDate }] : []),
        ]}
      />
      <EmailCallout title="What happens next">
        Update your payment method within 7 days to keep your {appName} subscription active. After
        that, your account may be downgraded to the free plan.
      </EmailCallout>
      <EmailCtaSection
       
        href={retryUrl}
        label="Update payment method"
        caption="Takes less than a minute. Your data stays safe."
      />
      <EmailBodyText muted compact>
        If you believe this is an error, contact us at {supportEmail} and we&apos;ll help sort it out.
      </EmailBodyText>
    </EmailLayout>
  );
}

export default PaymentFailed;
