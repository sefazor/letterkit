import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { senseiBrand } from '../../brand.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';

export interface DataExportFailedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail: string;
  retryUrl: string;
  failureReason?: string;
}

export function DataExportFailed({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  retryUrl,
  failureReason = 'Internal timeout',
}: DataExportFailedProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="We couldn't complete your data export"
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Data export failed</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — your export job didn&apos;t finish this time. No data was lost — your
        workspace is unaffected. Try again from account settings.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Status', badge: 'Failed', badgeVariant: 'danger' },
          { label: 'Reason', value: failureReason },
          { label: 'Data lost', value: 'None' },
        ]}
      />
      <LifecycleCta href={retryUrl} label="Retry export" />
    </LifecycleLayout>
  );
}

export default DataExportFailed;
