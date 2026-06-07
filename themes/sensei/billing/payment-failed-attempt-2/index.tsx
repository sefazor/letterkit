import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface PaymentFailedAttempt2Props {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  finalRetry?: string;
  actionUrl?: string;
}

export function PaymentFailedAttempt2({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  finalRetry,
  actionUrl,
}: PaymentFailedAttempt2Props) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="We could not collect your outstanding invoice yet."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Second payment attempt failed</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — second retry failed. Update your card now to avoid service interruption.
      </LifecycleLede>
      <LifecycleDataCard rows={[{ label: 'Final retry', value: finalRetry ?? '' }]} />
      <LifecycleCta href={actionUrl} label="Resolve payment issue" />
    </LifecycleLayout>
  );
}

export default PaymentFailedAttempt2;
