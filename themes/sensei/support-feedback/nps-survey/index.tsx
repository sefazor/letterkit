import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface NpsSurveyProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  actionUrl?: string;
}

export function NpsSurvey({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  actionUrl,
}: NpsSurveyProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Quick NPS survey — takes about 10 seconds."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>How likely are you to recommend us?</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — your feedback helps us prioritize product and support improvements.
      </LifecycleLede>
      <LifecycleCta href={actionUrl} label="Answer NPS survey" />
    </LifecycleLayout>
  );
}

export default NpsSurvey;
