import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleFootnote } from '../../_components/lifecycle/footnote';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface MagicLinkLoginProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  signInUrl?: string;
  linkValidity?: string;
}

export function MagicLinkLogin({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  signInUrl,
  linkValidity,
}: MagicLinkLoginProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Your secure sign-in link is ready."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Your sign-in link</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — tap below to sign in to {brand.appName}.
        {linkValidity ? ` This link works once and expires in ${linkValidity}.` : null}
      </LifecycleLede>
      <LifecycleCta href={signInUrl} label={`Sign in to ${brand.appName}`} />
      <LifecycleLede>
        Don&apos;t forward this email — anyone with the link can access your account.
      </LifecycleLede>
      <LifecycleFootnote>
        Didn&apos;t request this? Ignore the link. Your password stays the same.
      </LifecycleFootnote>
    </LifecycleLayout>
  );
}

export default MagicLinkLogin;
