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

export interface PasskeyAddedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  passkeysUrl?: string;
  passkeyName?: string;
  addedFrom?: string;
  ipAddress?: string;
}

export function PasskeyAdded({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  passkeysUrl,
  passkeyName,
  addedFrom,
  ipAddress,
}: PasskeyAddedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="A new passkey was added to your account."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Passkey added</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — passwordless sign-in is ready
        {passkeyName ? (
          <>
            {' '}
            on{' '}
            <LifecycleStrong>&ldquo;{passkeyName}&rdquo;</LifecycleStrong>
          </>
        ) : null}
        .
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Passkey', value: passkeyName ?? '' },
          { label: 'Added from', value: addedFrom ?? '' },
          { label: 'IP address', value: ipAddress ?? '' },
        ]}
      />
      <LifecycleCta href={passkeysUrl} label="Manage passkeys" />
      <LifecycleFootnote>
        Didn&apos;t add this? Remove it from Security settings immediately.
      </LifecycleFootnote>
    </LifecycleLayout>
  );
}

export default PasskeyAdded;
