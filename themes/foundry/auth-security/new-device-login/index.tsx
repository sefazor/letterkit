import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleFootnote } from '../../_components/lifecycle/footnote';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import type { AtlasBadgeVariant } from '../../_components/lifecycle/tokens';
import { foundryBrand } from '../../brand.config';

function riskBadgeVariant(riskLevel?: string): AtlasBadgeVariant {
  if (riskLevel?.toLowerCase() === 'high') return 'danger';
  if (riskLevel?.toLowerCase() === 'medium') return 'warning';
  return 'success';
}

export interface NewDeviceLoginProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  activityUrl?: string;
  device?: string;
  ipAddress?: string;
  location?: string;
  loggedInAt?: string;
  riskLevel?: string;
}

export function NewDeviceLogin({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  activityUrl,
  device,
  ipAddress,
  location,
  loggedInAt,
  riskLevel,
}: NewDeviceLoginProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="New device signed in to your account."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>New device sign-in</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — a new device just signed in to your account.
        {riskLevel ? ` Risk level: ${riskLevel}.` : null}
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          ...(riskLevel
            ? [{ label: 'Risk', badge: riskLevel, badgeVariant: riskBadgeVariant(riskLevel) }]
            : []),
          { label: 'Device', value: device ?? '' },
          { label: 'IP address', value: ipAddress ?? '' },
          { label: 'Location', value: location ?? '' },
          { label: 'Time', value: loggedInAt ?? '' },
        ]}
      />
      <LifecycleCta href={activityUrl} label="Review all sessions" />
      <LifecycleFootnote>
        Don&apos;t recognize this? Sign out other sessions and reset your password.
      </LifecycleFootnote>
    </LifecycleLayout>
  );
}

export default NewDeviceLogin;
