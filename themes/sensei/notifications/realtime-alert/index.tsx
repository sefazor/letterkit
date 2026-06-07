import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface RealtimeAlertProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  alertName?: string;
  metricLabel?: string;
  metricValue?: string;
  actionUrl?: string;
}

export function RealtimeAlert({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  alertName,
  metricLabel,
  metricValue,
  actionUrl,
}: RealtimeAlertProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="A real-time alert was triggered."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Real-time alert triggered</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — a configured real-time alert was triggered and sent to subscribers.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Alert', value: alertName ?? '' },
          {
            label: metricLabel ?? 'Metric',
            badge: metricValue ?? '',
            badgeVariant: 'danger',
          },
        ]}
      />
      <LifecycleCta href={actionUrl} label="Inspect alert details" />
    </LifecycleLayout>
  );
}

export default RealtimeAlert;
