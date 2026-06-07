import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface InactiveDay7Props {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  actionUrl?: string;
}

export function InactiveDay7({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  actionUrl,
}: InactiveDay7Props) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="It has been a week — we prepared a shortcut setup for you."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Your trial is waiting</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — pick one recommended template and we&apos;ll pre-fill workflows, alerts, and
        dashboards.
      </LifecycleLede>
      <LifecycleCta href={actionUrl} label="Use recommended template" />
    </LifecycleLayout>
  );
}

export default InactiveDay7;
