import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface CsatSurveyProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  actionUrl?: string;
}

export function CsatSurvey({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  actionUrl,
}: CsatSurveyProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Tell us how helpful the latest support interaction was."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Rate your support experience</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — we read every CSAT response and use it to coach support quality.
      </LifecycleLede>
      <LifecycleCta href={actionUrl} label="Submit CSAT" />
    </LifecycleLayout>
  );
}

export default CsatSurvey;
