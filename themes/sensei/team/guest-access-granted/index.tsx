import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface GuestAccessGrantedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  guestEmail?: string;
  permission?: string;
  actionUrl?: string;
}

export function GuestAccessGranted({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  guestEmail,
  permission,
  actionUrl,
}: GuestAccessGrantedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="A guest user now has limited access to your workspace."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Guest access granted</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — guest access was enabled with read-only permissions for selected projects.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Guest', value: guestEmail ?? '' },
          { label: 'Permission', value: permission ?? '' },
        ]}
      />
      <LifecycleCta href={actionUrl} label="Review guest permissions" />
    </LifecycleLayout>
  );
}

export default GuestAccessGranted;
