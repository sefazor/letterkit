import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { LifecycleTotals } from '../../_components/lifecycle/totals';
import { foundryBrand } from '../../brand.config';

export interface AffiliatePayoutProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  eligibleCommissions?: string;
  payoutFee?: string;
  netPayout?: string;
  actionUrl?: string;
}

export function AffiliatePayout({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  eligibleCommissions,
  payoutFee,
  netPayout,
  actionUrl,
}: AffiliatePayoutProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Your monthly affiliate payout is on the way."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Affiliate payout processed</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — affiliate payout is approved and queued to your payout method.
      </LifecycleLede>
      <LifecycleTotals
        rows={[
          { label: 'Eligible commissions', value: eligibleCommissions ?? '' },
          { label: 'Payout fee', value: payoutFee ?? '' },
          { label: 'Net payout', value: netPayout ?? '', emphasis: true },
        ]}
      />
      <LifecycleCta href={actionUrl} label="View payout statement" />
    </LifecycleLayout>
  );
}

export default AffiliatePayout;
