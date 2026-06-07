import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface FileUploadedProcessedProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  rowsProcessed?: string;
  errors?: string;
  actionUrl?: string;
}

export function FileUploadedProcessed({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  rowsProcessed,
  errors,
  actionUrl,
}: FileUploadedProcessedProps) {
  const errorCount = errors ? Number.parseInt(errors, 10) : 0;

  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Uploaded file import is complete."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>File processed successfully</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — your upload was parsed and records are now available in your workspace.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Rows processed', value: rowsProcessed ?? '' },
          {
            label: 'Errors',
            badge: errors ?? '',
            badgeVariant: errorCount > 0 ? 'warning' : 'success',
          },
        ]}
      />
      <LifecycleCta href={actionUrl} label="View imported records" />
    </LifecycleLayout>
  );
}

export default FileUploadedProcessed;
