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

export interface MentionAlertProps {
  brand?: EmailBrandProps;
  tokens?: PartialGrundyTokens;
  recipientEmail?: string;
  recipientName: string;
  authorName: string;
  contextTitle: string;
  mentionExcerpt: string;
  actionUrl: string;
  timestamp?: string;
}

/**
 * Mention alert template for the Grundy theme.
 */
export function MentionAlert({
  brand = grundyBrand,
  tokens,
  recipientEmail,
  recipientName,
  authorName,
  contextTitle,
  mentionExcerpt,
  actionUrl,
  timestamp,
}: MentionAlertProps) {
  const appName = brand.appName;

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
     
      recipientEmail={recipientEmail}
      preview={`${authorName} mentioned you in ${contextTitle}`}
      headerTagline="Activity"
    >
      <EmailEyebrow>New mention</EmailEyebrow>
      <EmailHeading subtitle={contextTitle}>
        {authorName} mentioned you
      </EmailHeading>
      <EmailBodyText>
        Hi {recipientName}, {authorName} tagged you in a conversation that may need your attention.
      </EmailBodyText>
      <EmailCallout title={authorName}>
        &ldquo;{mentionExcerpt}&rdquo;
      </EmailCallout>
      {timestamp ? (
        <EmailInfoCard rows={[{ label: 'When', value: timestamp }]} />
      ) : null}
      <EmailCtaSection
       
        href={actionUrl}
        label="View conversation"
        caption="Reply directly from the thread."
      />
    </EmailLayout>
  );
}

export default MentionAlert;
