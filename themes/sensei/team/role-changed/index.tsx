import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface RoleChangedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  memberName?: string;
  previousRole?: string;
  newRole?: string;
  actionUrl?: string;
}

export function RoleChanged({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  memberName,
  previousRole,
  newRole,
  actionUrl,
}: RoleChangedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="A team member role changed."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Role updated</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — permissions were updated and the member now has adjusted workspace access.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Member', value: memberName ?? '' },
          { label: 'Previous role', value: previousRole ?? '' },
          { label: 'New role', value: newRole ?? '' },
        ]}
      />
      <LifecycleCta href={actionUrl} label="View role matrix" />
    </LifecycleLayout>
  );
}

export default RoleChanged;
