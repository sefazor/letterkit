import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleFootnote } from '../../_components/lifecycle/footnote';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface BetaAccessInvitationProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  betaFeature?: string;
  actionUrl?: string;
}

export function BetaAccessInvitation({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  betaFeature,
  actionUrl,
}: BetaAccessInvitationProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview={betaFeature ? `Early access: ${betaFeature}.` : 'You are invited to beta access.'}
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>You are invited to beta</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — your workspace is selected for beta access
        {betaFeature ? ` to ${betaFeature}` : ''}. Share feedback directly with the product team.
      </LifecycleLede>
      <LifecycleCta href={actionUrl} label="Enable beta feature" />
      <LifecycleFootnote>Beta features may change before general release.</LifecycleFootnote>
    </LifecycleLayout>
  );
}

export default BetaAccessInvitation;
