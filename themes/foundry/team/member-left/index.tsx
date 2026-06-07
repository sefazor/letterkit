import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface MemberLeftProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  memberName?: string;
  actionUrl?: string;
}

export function MemberLeft({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  memberName,
  actionUrl,
}: MemberLeftProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="A team member left your workspace."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Member left workspace</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — {memberName ?? 'A member'} left the workspace by their own action.
      </LifecycleLede>
      <LifecycleCta href={actionUrl} label="Review access" />
    </LifecycleLayout>
  );
}

export default MemberLeft;
