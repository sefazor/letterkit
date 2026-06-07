import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleFootnote } from '../../_components/lifecycle/footnote';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface PaymentFailedFinalProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  actionUrl?: string;
}

export function PaymentFailedFinal({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  actionUrl,
}: PaymentFailedFinalProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Your account is at risk of suspension."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Final payment attempt failed</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — final collection attempt failed. Immediate action is required to keep
        service active.
      </LifecycleLede>
      <LifecycleCta href={actionUrl} label="Pay invoice now" />
      <LifecycleFootnote>
        Service will be restricted if payment is not resolved today.
      </LifecycleFootnote>
    </LifecycleLayout>
  );
}

export default PaymentFailedFinal;
