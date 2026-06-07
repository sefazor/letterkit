import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleFootnote } from '../../_components/lifecycle/footnote';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { LifecycleStrong } from '../../_components/lifecycle/strong';
import { senseiBrand } from '../../brand.config';

export interface ServiceDeprecationProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  serviceName?: string;
  deprecationDate?: string;
  actionUrl?: string;
}

export function ServiceDeprecation({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  serviceName,
  deprecationDate,
  actionUrl,
}: ServiceDeprecationProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview={serviceName ? `${serviceName} will be retired.` : 'A service will be retired.'}
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Service deprecation notice</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} —{' '}
        {serviceName ? (
          <LifecycleStrong>{serviceName}</LifecycleStrong>
        ) : (
          'A legacy service'
        )}{' '}
        will be deprecated. Please migrate to the recommended replacement endpoints.
      </LifecycleLede>
      <LifecycleDataCard rows={[{ label: 'Retirement date', value: deprecationDate ?? '' }]} />
      <LifecycleCta href={actionUrl} label="See migration guide" />
      <LifecycleFootnote>Migrate before deadline to prevent delivery interruptions.</LifecycleFootnote>
    </LifecycleLayout>
  );
}

export default ServiceDeprecation;
