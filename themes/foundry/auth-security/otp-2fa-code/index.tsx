import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCodeDisplay } from '../../_components/lifecycle/code-display';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleFootnote } from '../../_components/lifecycle/footnote';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface Otp2faCodeProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  verificationCode?: string;
  expiresIn?: string;
  ipAddress?: string;
  location?: string;
  attemptedAt?: string;
}

export function Otp2faCode({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  verificationCode,
  expiresIn,
  ipAddress,
  location,
  attemptedAt,
}: Otp2faCodeProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview={verificationCode ? `Your sign-in code is ${verificationCode}` : 'Your sign-in code'}
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Your sign-in code</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — enter this code to finish signing in. {brand.appName} will never ask you to
        share it.
      </LifecycleLede>
      <LifecycleCodeDisplay code={verificationCode} expiresIn={expiresIn} />
      <LifecycleDataCard
        rows={[
          { label: 'IP address', value: ipAddress ?? '' },
          { label: 'Location', value: location ?? '' },
          { label: 'Time', value: attemptedAt ?? '' },
        ]}
      />
      <LifecycleFootnote>Didn&apos;t try to sign in? Change your password immediately.</LifecycleFootnote>
    </LifecycleLayout>
  );
}

export default Otp2faCode;
