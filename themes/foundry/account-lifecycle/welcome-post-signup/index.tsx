import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { foundryBrand } from '../../brand.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { LifecycleStrong } from '../../_components/lifecycle/strong';

export interface WelcomePostSignupProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  workspaceName: string;
  recipientEmail: string;
  actionUrl: string;
  planName?: string;
}

export function WelcomePostSignup({
  brand = foundryBrand,
  tokens,
  userName,
  workspaceName,
  recipientEmail,
  actionUrl,
  planName = 'Trial',
}: WelcomePostSignupProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview={`Welcome to ${workspaceName} — your workspace is ready`}
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Welcome to {brand.appName}</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — <LifecycleStrong>{workspaceName}</LifecycleStrong>{' '}
        is set up and ready. Invite your team, connect your tools, and start shipping.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Status', badge: 'Active', badgeVariant: 'success' },
          { label: 'Workspace', value: workspaceName },
          { label: 'Plan', value: planName },
        ]}
      />
      <LifecycleCta href={actionUrl} label="Open workspace" />
    </LifecycleLayout>
  );
}

export default WelcomePostSignup;
