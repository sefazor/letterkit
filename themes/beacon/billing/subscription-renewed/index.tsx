import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialBeaconTokens } from '../../tokens.config';
import { beaconBrand } from '../../brand.config';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailInfoCard } from '../../_components/info-card';
import { EmailLayout } from '../../_components/layout';

export interface SubscriptionRenewedProps {
  brand?: EmailBrandProps;
  tokens?: PartialBeaconTokens;
  recipientEmail?: string;
  customerName: string;
  plan: string;
  workspace: string;
  amount: string;
  nextInvoice: string;
  invoiceUrl: string;
}

/**
 * Subscription renewed template for the Beacon theme.
 */
export function SubscriptionRenewed({
  brand = beaconBrand,
  tokens,
  recipientEmail,
  customerName,
  plan,
  workspace,
  amount,
  nextInvoice,
  invoiceUrl,
}: SubscriptionRenewedProps) {
  const appName = brand.appName;

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={`${plan} renewed — ${amount}`}
    >
      <EmailEyebrow>Renewal confirmed</EmailEyebrow>
      <EmailHeading subtitle={`${amount} charged successfully`}>
        Subscription renewed
      </EmailHeading>
      <EmailBodyText>
        Hi {customerName}, your {appName} {plan} subscription has been renewed. Your workspace stays
        active with no interruption.
      </EmailBodyText>
      <EmailInfoCard
        rows={[
          { label: 'Plan', value: plan },
          { label: 'Workspace', value: workspace },
          { label: 'Amount', value: amount },
          { label: 'Next renewal', value: nextInvoice },
        ]}
      />
      <EmailCtaSection
        href={invoiceUrl}
        label="View invoice"
        caption="Download a PDF receipt for your records."
      />
    </EmailLayout>
  );
}

export default SubscriptionRenewed;
