import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface TermsPrivacyUpdateProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  effectiveDate?: string;
  actionUrl?: string;
}

export function TermsPrivacyUpdate({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  effectiveDate,
  actionUrl,
}: TermsPrivacyUpdateProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Important policy updates effective next month."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Terms and privacy update</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — we updated our Terms and Privacy documents to clarify data retention and
        subprocessors.
      </LifecycleLede>
      <LifecycleDataCard rows={[{ label: 'Effective', value: effectiveDate ?? '' }]} />
      <LifecycleCta href={actionUrl} label="Read policy updates" />
    </LifecycleLayout>
  );
}

export default TermsPrivacyUpdate;
