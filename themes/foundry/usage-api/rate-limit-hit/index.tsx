import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface RateLimitHitProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  rateLimit?: string;
  actionUrl?: string;
}

export function RateLimitHit({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  rateLimit,
  actionUrl,
}: RateLimitHitProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Burst traffic exceeded your allowed requests per minute."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Rate limit reached</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — your integration hit request limits. Add retry with backoff to avoid
        temporary blocks.
      </LifecycleLede>
      <LifecycleDataCard rows={[{ label: 'Limit', value: rateLimit ?? '' }]} />
      <LifecycleCta href={actionUrl} label="See rate limit policy" />
    </LifecycleLayout>
  );
}

export default RateLimitHit;
