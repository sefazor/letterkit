import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleFootnote } from '../../_components/lifecycle/footnote';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { LifecycleStrong } from '../../_components/lifecycle/strong';
import { foundryBrand } from '../../brand.config';

export interface SuspiciousActivityAlertProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  securityUrl?: string;
  ipAddress?: string;
  location?: string;
  blockedAt?: string;
}

export function SuspiciousActivityAlert({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  securityUrl,
  ipAddress,
  location,
  blockedAt,
}: SuspiciousActivityAlertProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="We blocked a suspicious sign-in on your account."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Suspicious sign-in blocked</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — we blocked a sign-in
        {location ? (
          <>
            {' '}
            from <LifecycleStrong>{location}</LifecycleStrong>
          </>
        ) : null}{' '}
        before it reached your account.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Status', badge: 'Blocked', badgeVariant: 'danger' },
          { label: 'IP address', value: ipAddress ?? '' },
          { label: 'Location', value: location ?? '' },
          { label: 'Time', value: blockedAt ?? '' },
        ]}
      />
      <LifecycleCta href={securityUrl} label="Run security check" />
      <LifecycleFootnote>
        Enable 2FA and rotate your password if you haven&apos;t recently.
      </LifecycleFootnote>
    </LifecycleLayout>
  );
}

export default SuspiciousActivityAlert;
