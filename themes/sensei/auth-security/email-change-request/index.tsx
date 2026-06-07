import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleFootnote } from '../../_components/lifecycle/footnote';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface EmailChangeRequestProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  confirmUrl?: string;
  fromEmail?: string;
  toEmail?: string;
}

export function EmailChangeRequest({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  confirmUrl,
  fromEmail,
  toEmail,
}: EmailChangeRequestProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Confirm your new email address."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Confirm your new email</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — confirm the email change below. Once confirmed, sign in with your new
        address.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Current', value: fromEmail ?? '' },
          { label: 'New', value: toEmail ?? '' },
        ]}
      />
      <LifecycleCta href={confirmUrl} label="Confirm new email" />
      <LifecycleFootnote>
        Didn&apos;t request this? Someone may have access to your account.
      </LifecycleFootnote>
    </LifecycleLayout>
  );
}

export default EmailChangeRequest;
