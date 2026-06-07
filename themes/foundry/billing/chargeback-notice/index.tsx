import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleFootnote } from '../../_components/lifecycle/footnote';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { foundryBrand } from '../../brand.config';

export interface ChargebackNoticeProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  actionUrl?: string;
}

export function ChargebackNotice({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  actionUrl,
}: ChargebackNoticeProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="A payment dispute was opened for a recent charge."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Chargeback received</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — we received a chargeback notice from your card issuer. Our billing team is
        reviewing the case.
      </LifecycleLede>
      <LifecycleCta href={actionUrl} label="Contact billing support" />
      <LifecycleFootnote>Please reply within 5 days with any supporting details.</LifecycleFootnote>
    </LifecycleLayout>
  );
}

export default ChargebackNotice;
