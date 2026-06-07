import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { LifecycleTotals } from '../../_components/lifecycle/totals';
import { foundryBrand } from '../../brand.config';

export interface OverageChargesProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  includedUsage?: string;
  overageUsage?: string;
  totalOverage?: string;
  actionUrl?: string;
}

export function OverageCharges({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  includedUsage,
  overageUsage,
  totalOverage,
  actionUrl,
}: OverageChargesProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Additional usage was billed at your overage rate."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Overage charges applied</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — your account exceeded included capacity. Overage fees were added to your
        invoice.
      </LifecycleLede>
      <LifecycleTotals
        rows={[
          { label: 'Included usage', value: includedUsage ?? '' },
          { label: 'Overage usage', value: overageUsage ?? '' },
          { label: 'Total overage', value: totalOverage ?? '', emphasis: true },
        ]}
      />
      <LifecycleCta href={actionUrl} label="Review overage details" />
    </LifecycleLayout>
  );
}

export default OverageCharges;
