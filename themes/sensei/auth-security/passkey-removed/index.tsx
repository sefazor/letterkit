import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleFootnote } from '../../_components/lifecycle/footnote';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { LifecycleStrong } from '../../_components/lifecycle/strong';
import { senseiBrand } from '../../brand.config';

export interface PasskeyRemovedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  passkeysUrl?: string;
  passkeyName?: string;
  remainingPasskeys?: number;
}

export function PasskeyRemoved({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  passkeysUrl,
  passkeyName,
  remainingPasskeys,
}: PasskeyRemovedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="A passkey was removed from your account."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Passkey removed</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} —{' '}
        {passkeyName ? (
          <LifecycleStrong>&ldquo;{passkeyName}&rdquo;</LifecycleStrong>
        ) : (
          'A passkey'
        )}{' '}
        was removed from your account.
      </LifecycleLede>
      {remainingPasskeys !== undefined ? (
        <LifecycleDataCard
          rows={[{ label: 'Passkeys remaining', value: String(remainingPasskeys) }]}
        />
      ) : null}
      {remainingPasskeys !== undefined ? (
        <LifecycleLede>
          {remainingPasskeys === 0
            ? 'Add a new passkey to keep passwordless sign-in available.'
            : 'You can still sign in with your remaining passkeys or your password.'}
        </LifecycleLede>
      ) : null}
      <LifecycleCta href={passkeysUrl} label="Review passkeys" />
      <LifecycleFootnote>
        Didn&apos;t remove this? Secure your account and add a new passkey.
      </LifecycleFootnote>
    </LifecycleLayout>
  );
}

export default PasskeyRemoved;
