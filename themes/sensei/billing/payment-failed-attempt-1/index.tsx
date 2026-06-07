import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface PaymentFailedAttempt1Props {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  retrySchedule?: string;
  actionUrl?: string;
}

export function PaymentFailedAttempt1({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  retrySchedule,
  actionUrl,
}: PaymentFailedAttempt1Props) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="First retry failed for your invoice."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Payment attempt failed</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — we could not process your latest payment. Please check card details and
        available balance.
      </LifecycleLede>
      <LifecycleDataCard rows={[{ label: 'Retry schedule', value: retrySchedule ?? '' }]} />
      <LifecycleCta href={actionUrl} label="Update payment method" />
    </LifecycleLayout>
  );
}

export default PaymentFailedAttempt1;
