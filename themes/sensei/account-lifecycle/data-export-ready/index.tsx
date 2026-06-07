import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { senseiBrand } from '../../brand.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard } from '../../_components/lifecycle/data-card';
import { formatLifecycleDate } from '../../_components/lifecycle/format-date';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';

export interface DataExportReadyProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail: string;
  downloadUrl: string;
  expiresIn: string;
  generatedAt: Date | string;
}

export function DataExportReady({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  downloadUrl,
  expiresIn,
  generatedAt,
}: DataExportReadyProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Your data export is ready to download"
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Data export ready</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — your archive is generated and waiting. Download it securely before the link
        expires.
      </LifecycleLede>
      <LifecycleDataCard
        rows={[
          { label: 'Status', badge: 'Ready', badgeVariant: 'success' },
          { label: 'Generated', value: formatLifecycleDate(generatedAt) },
          { label: 'Download window', value: expiresIn },
          { label: 'Format', value: 'ZIP archive' },
        ]}
      />
      <LifecycleCta href={downloadUrl} label="Download export" />
    </LifecycleLayout>
  );
}

export default DataExportReady;
