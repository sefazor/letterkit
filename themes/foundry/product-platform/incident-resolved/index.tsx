import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface IncidentResolvedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  actionUrl?: string;
}

export function IncidentResolved({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  actionUrl,
}: IncidentResolvedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Service health is back to normal."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Incident resolved</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — the previously reported incident is resolved and systems are stable.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[{ label: 'Status', badge: 'Resolved', badgeVariant: 'success' }]}
      />
      <LifecycleCta href={actionUrl} label="Read resolution notes" />
    </LifecycleLayout>
  );
}

export default IncidentResolved;
