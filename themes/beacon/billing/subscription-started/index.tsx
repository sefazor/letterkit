import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialBeaconTokens } from '../../tokens.config';
import { beaconBrand } from '../../brand.config';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailInfoCard } from '../../_components/info-card';
import { EmailLayout } from '../../_components/layout';

export interface SubscriptionStartedProps {
  brand?: EmailBrandProps;
  tokens?: PartialBeaconTokens;
  recipientEmail?: string;
  customerName: string;
  plan: string;
  workspace: string;
  nextInvoice: string;
  billingUrl: string;
}

/**
 * Subscription started template for the Beacon theme.
 */
export function SubscriptionStarted({
  brand = beaconBrand,
  tokens,
  recipientEmail,
  customerName,
  plan,
  workspace,
  nextInvoice,
  billingUrl,
}: SubscriptionStartedProps) {
  const appName = brand.appName;

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={`Your ${plan} subscription is active`}
    >
      <EmailEyebrow>Subscription active</EmailEyebrow>
      <EmailHeading subtitle={`Welcome to ${plan}`}>
        Subscription started
      </EmailHeading>
      <EmailBodyText>
        Hi {customerName}, your {appName} subscription is now active. You have full access to everything
        included in your plan.
      </EmailBodyText>
      <EmailInfoCard
        rows={[
          { label: 'Plan', value: plan },
          { label: 'Workspace', value: workspace },
          { label: 'Next invoice', value: nextInvoice },
        ]}
      />
      <EmailCtaSection
        href={billingUrl}
        label="View plan details"
        caption="Manage billing, invoices, and payment methods anytime."
      />
    </EmailLayout>
  );
}

export default SubscriptionStarted;
