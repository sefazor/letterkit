import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialBeaconTokens } from '../../tokens.config';
import { beaconBrand } from '../../brand.config';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailLayout } from '../../_components/layout';
import { EmailSnippetPanel } from '../../_components/snippet-panel';

export interface MentionAlertProps {
  brand?: EmailBrandProps;
  tokens?: PartialBeaconTokens;
  recipientEmail?: string;
  recipientName: string;
  authorName: string;
  contextTitle: string;
  mentionExcerpt: string;
  actionUrl: string;
  timestamp?: string;
}

/**
 * Mention alert template for the Beacon theme.
 */
export function MentionAlert({
  brand = beaconBrand,
  tokens,
  recipientEmail,
  recipientName,
  authorName,
  contextTitle,
  mentionExcerpt,
  actionUrl,
  timestamp,
}: MentionAlertProps) {
  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={`${authorName} mentioned you in ${contextTitle}`}
    >
      <EmailEyebrow>Mention</EmailEyebrow>
      <EmailHeading subtitle={`${authorName} tagged you`}>{contextTitle}</EmailHeading>
      <EmailBodyText>
        Hi {recipientName}, someone referenced you in a thread that may need a response.
      </EmailBodyText>
      <EmailSnippetPanel
        author={authorName}
        stampLabel="Thread"
        stampValue={contextTitle}
        footnote={timestamp}
      >
        {mentionExcerpt}
      </EmailSnippetPanel>
      <EmailCtaSection
        href={actionUrl}
        label="View mention"
        caption="Jump straight to the line where you were tagged."
      />
    </EmailLayout>
  );
}

export default MentionAlert;
