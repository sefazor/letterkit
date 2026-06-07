import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface BugReportAcknowledgedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  actionUrl?: string;
}

export function BugReportAcknowledged({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  actionUrl,
}: BugReportAcknowledgedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Our engineers are reviewing your reported issue."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Bug report acknowledged</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — thanks for reporting this bug. We added it to our triage queue with
        priority.
      </LifecycleLede>
      <LifecycleCta href={actionUrl} label="View bug report" />
    </LifecycleLayout>
  );
}

export default BugReportAcknowledged;
