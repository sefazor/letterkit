import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface DailyDigestProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  mentions?: string;
  tasksCompleted?: string;
  pendingApprovals?: string;
  actionUrl?: string;
}

export function DailyDigest({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  mentions,
  tasksCompleted,
  pendingApprovals,
  actionUrl,
}: DailyDigestProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Today: mentions, task updates, and approvals."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Your daily digest</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — here is a compact summary of today&apos;s important workspace activity.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Mentions', value: mentions ?? '' },
          { label: 'Tasks completed', value: tasksCompleted ?? '' },
          { label: 'Pending approvals', value: pendingApprovals ?? '' },
        ]}
      />
      <LifecycleCta href={actionUrl} label="Open activity feed" />
    </LifecycleLayout>
  );
}

export default DailyDigest;
