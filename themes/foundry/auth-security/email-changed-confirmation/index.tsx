import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { LifecycleStrong } from '../../_components/lifecycle/strong';
import { foundryBrand } from '../../brand.config';

export interface EmailChangedConfirmationProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  profileUrl?: string;
  newEmail?: string;
}

export function EmailChangedConfirmation({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  profileUrl,
  newEmail,
}: EmailChangedConfirmationProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Your login email has been updated."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Login email updated</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — your login email is updated. Use it the next time you sign in.
      </LifecycleLede>
      {newEmail ? (
        <LifecycleDataCard rows={[{ label: 'New login email', value: newEmail }]} />
      ) : null}
      <LifecycleLede>
        Billing receipts and security alerts will go to{' '}
        {newEmail ? (
          <LifecycleStrong>{newEmail}</LifecycleStrong>
        ) : (
          'this address'
        )}{' '}
        too.
      </LifecycleLede>
      <LifecycleCta href={profileUrl} label="Review account profile" />
    </LifecycleLayout>
  );
}

export default EmailChangedConfirmation;
