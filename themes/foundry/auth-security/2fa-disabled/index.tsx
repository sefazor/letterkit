import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface TwoFaDisabledProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  twoFaUrl?: string;
}

export function TwoFaDisabled({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  twoFaUrl,
}: TwoFaDisabledProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Two-factor authentication was turned off."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Two-factor authentication disabled</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — two-factor authentication is off. Your account signs in with password only
        now.
      </LifecycleLede>
      <LifecycleLede>
        If that wasn&apos;t intentional, turn 2FA back on — it takes under a minute.
      </LifecycleLede>
      <LifecycleCta href={twoFaUrl} label="Turn 2FA back on" />
    </LifecycleLayout>
  );
}

export default TwoFaDisabled;
