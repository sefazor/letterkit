import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface OnboardingCompleteProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  completion?: string;
  actionUrl?: string;
}

export function OnboardingComplete({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  completion,
  actionUrl,
}: OnboardingCompleteProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Your workspace is fully configured and ready to scale."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Onboarding complete</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — excellent work. You completed setup milestones and your team can now run
        production workflows.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          {
            label: 'Completion',
            badge: completion ?? '',
            badgeVariant: 'success',
          },
        ]}
      />
      <LifecycleCta href={actionUrl} label="Open live dashboard" />
    </LifecycleLayout>
  );
}

export default OnboardingComplete;
