import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface FirstActionCelebrationProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  actionUrl?: string;
}

export function FirstActionCelebration({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  actionUrl,
}: FirstActionCelebrationProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="You completed your first key action successfully."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Nice first step</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — great start. Your first workflow run completed, and your team now sees live
        activity.
      </LifecycleLede>
      <LifecycleCta href={actionUrl} label="Create second workflow" />
    </LifecycleLayout>
  );
}

export default FirstActionCelebration;
