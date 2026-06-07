import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface PostIncidentReportProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  actionUrl?: string;
}

export function PostIncidentReport({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  actionUrl,
}: PostIncidentReportProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Root cause analysis and action items are published."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Post-incident report available</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — we published a detailed report including timeline, root cause, and
        prevention steps.
      </LifecycleLede>
      <LifecycleCta href={actionUrl} label="Read full report" />
    </LifecycleLayout>
  );
}

export default PostIncidentReport;
