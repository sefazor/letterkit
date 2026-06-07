import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialBeaconTokens } from '../../tokens.config';
import { beaconBrand } from '../../brand.config';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailLayout } from '../../_components/layout';
import { EmailSnippetPanel } from '../../_components/snippet-panel';

export interface CommentReplyProps {
  brand?: EmailBrandProps;
  tokens?: PartialBeaconTokens;
  recipientEmail?: string;
  recipientName: string;
  authorName: string;
  contextTitle: string;
  replyExcerpt: string;
  replyUrl: string;
}

/**
 * Comment reply notification template for the Beacon theme.
 */
export function CommentReply({
  brand = beaconBrand,
  tokens,
  recipientEmail,
  recipientName,
  authorName,
  contextTitle,
  replyExcerpt,
  replyUrl,
}: CommentReplyProps) {
  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={`${authorName} replied on ${contextTitle}`}
    >
      <EmailEyebrow>Thread activity</EmailEyebrow>
      <EmailHeading subtitle={contextTitle}>New reply on your thread</EmailHeading>
      <EmailBodyText>
        Hi {recipientName}, {authorName} left a reply that may need your input.
      </EmailBodyText>
      <EmailSnippetPanel author={authorName} stampLabel="Thread" stampValue={contextTitle}>
        {replyExcerpt}
      </EmailSnippetPanel>
      <EmailCtaSection
        href={replyUrl}
        label="Open thread"
        caption="Respond without leaving the conversation."
      />
    </EmailLayout>
  );
}

export default CommentReply;
