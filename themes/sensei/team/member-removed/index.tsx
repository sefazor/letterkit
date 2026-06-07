import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface MemberRemovedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  memberName?: string;
  actionUrl?: string;
}

export function MemberRemoved({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  memberName,
  actionUrl,
}: MemberRemovedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="A member was removed by workspace admin."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Member removed</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — admin action removed a user from workspace resources and channels.
      </LifecycleLede>
      {memberName ? (
        <LifecycleDataCard rows={[{ label: 'Removed member', value: memberName }]} />
      ) : null}
      <LifecycleCta href={actionUrl} label="Audit member actions" />
    </LifecycleLayout>
  );
}

export default MemberRemoved;
