import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialGrundyTokens } from '../../tokens.config';
import { grundyBrand } from '../../brand.config';
import { EmailCallout } from '../../_components/callout';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailLayout } from '../../_components/layout';

export interface CommentReplyProps {
  brand?: EmailBrandProps;
  tokens?: PartialGrundyTokens;
  recipientEmail?: string;
  recipientName: string;
  authorName: string;
  contextTitle: string;
  replyExcerpt: string;
  replyUrl: string;
}

/**
 * Comment reply notification template for the Grundy theme.
 */
export function CommentReply({
  brand = grundyBrand,
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
      preview={`${authorName} replied to your comment`}
      headerTagline="Activity"
    >
      <EmailEyebrow>New reply</EmailEyebrow>
      <EmailHeading subtitle={contextTitle}>
        {authorName} replied to you
      </EmailHeading>
      <EmailBodyText>
        Hi {recipientName}, {authorName} responded to your comment. Jump back in to keep the
        conversation going.
      </EmailBodyText>
      <EmailCallout title={authorName}>
        &ldquo;{replyExcerpt}&rdquo;
      </EmailCallout>
      <EmailCtaSection
        href={replyUrl}
        label="View reply"
        caption="Reply directly from the thread."
      />
    </EmailLayout>
  );
}

export default CommentReply;
