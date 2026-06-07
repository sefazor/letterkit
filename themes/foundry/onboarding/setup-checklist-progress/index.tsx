import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface SetupChecklistProgressProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  progress?: string;
  actionUrl?: string;
}

export function SetupChecklistProgress({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  progress,
  actionUrl,
}: SetupChecklistProgressProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Onboarding is moving well — 3 of 5 tasks are complete."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Your setup checklist progress</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — you are very close to a fully configured workspace. Complete the next
        items to unlock all defaults.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Progress', value: progress ?? '' },
          {
            label: 'Invite first teammate',
            badge: 'Done',
            badgeVariant: 'success',
          },
          {
            label: 'Connect billing profile',
            badge: 'Done',
            badgeVariant: 'success',
          },
          {
            label: 'Set notification rules',
            badge: 'In progress',
            badgeVariant: 'warning',
          },
          {
            label: 'Create first workflow',
            badge: 'Pending',
            badgeVariant: 'neutral',
          },
        ]}
      />
      <LifecycleCta href={actionUrl} label="Continue setup" />
    </LifecycleLayout>
  );
}

export default SetupChecklistProgress;
