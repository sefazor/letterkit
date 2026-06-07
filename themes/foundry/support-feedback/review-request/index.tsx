import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface ReviewRequestProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  actionUrl?: string;
}

export function ReviewRequest({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  actionUrl,
}: ReviewRequestProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="If we help your team, your review means a lot."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Would you leave a quick review?</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — a short public review helps other teams discover {brand.appName} and helps
        us grow responsibly.
      </LifecycleLede>
      <LifecycleCta href={actionUrl} label="Write a review" />
    </LifecycleLayout>
  );
}

export default ReviewRequest;
