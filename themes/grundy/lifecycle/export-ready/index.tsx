import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialGrundyTokens } from '../../tokens.config';
import { grundyBrand } from '../../brand.config';
import { EmailCallout } from '../../_components/callout';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailInfoCard } from '../../_components/info-card';
import { EmailLayout } from '../../_components/layout';
import { EmailLinkFallback } from '../../_components/link-fallback';

export interface ExportReadyProps {
  brand?: EmailBrandProps;
  tokens?: PartialGrundyTokens;
  recipientEmail?: string;
  userName: string;
  downloadUrl: string;
  expiresIn: string;
  generatedAt: string;
  fileFormat?: string;
}

/**
 * Data export ready lifecycle template for the Grundy theme.
 */
export function ExportReady({
  brand = grundyBrand,
  tokens,
  recipientEmail,
  userName,
  downloadUrl,
  expiresIn,
  generatedAt,
  fileFormat = 'ZIP',
}: ExportReadyProps) {
  const appName = brand.appName;

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={`Your ${appName} data export is ready`}
      headerTagline="Account"
    >
      <EmailEyebrow>Export ready</EmailEyebrow>
      <EmailHeading subtitle={`Generated ${generatedAt}`}>
        Your data export is ready
      </EmailHeading>
      <EmailBodyText>
        Hi {userName}, your requested data export from {appName} is ready to download. The file
        includes all workspace data associated with your account.
      </EmailBodyText>
      <EmailInfoCard
        rows={[
          { label: 'Status', value: 'Ready' },
          { label: 'Generated', value: generatedAt },
          { label: 'Format', value: fileFormat },
          { label: 'Download window', value: expiresIn },
        ]}
      />
      <EmailCtaSection
        href={downloadUrl}
        label="Download export"
        caption={`Link expires in ${expiresIn}. Download before then.`}
      />
      <EmailCallout title="Keep it secure">
        This export contains personal data. Store it safely and don&apos;t share the download link.
      </EmailCallout>
      <EmailLinkFallback url={downloadUrl} label="Download link" />
    </EmailLayout>
  );
}

export default ExportReady;
