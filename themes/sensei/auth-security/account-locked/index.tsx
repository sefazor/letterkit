import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleFootnote } from '../../_components/lifecycle/footnote';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface AccountLockedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  unlockUrl?: string;
  autoUnlockIn?: string;
  lockReason?: string;
}

export function AccountLocked({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  unlockUrl,
  autoUnlockIn,
  lockReason,
}: AccountLockedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Your account is temporarily locked."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Account locked</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — we locked your account after repeated failed sign-ins. Unlock now or wait it
        out.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Status', badge: 'Locked', badgeVariant: 'danger' },
          { label: 'Reason', value: lockReason ?? '' },
          { label: 'Auto unlock', value: autoUnlockIn ?? '' },
        ]}
      />
      <LifecycleCta href={unlockUrl} label="Unlock account now" />
      <LifecycleFootnote>
        Didn&apos;t try to sign in? Reset your password once you regain access.
      </LifecycleFootnote>
    </LifecycleLayout>
  );
}

export default AccountLocked;
