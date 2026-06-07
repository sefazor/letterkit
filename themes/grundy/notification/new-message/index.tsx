import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialGrundyTokens } from '../../tokens.config';
import { grundyBrand } from '../../brand.config';
import { EmailCallout } from '../../_components/callout';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailLayout } from '../../_components/layout';

export interface NewMessageProps {
  brand?: EmailBrandProps;
  tokens?: PartialGrundyTokens;
  recipientEmail?: string;
  recipientName: string;
  senderName: string;
  messageExcerpt: string;
  inboxUrl: string;
}

/**
 * New direct message notification template for the Grundy theme.
 */
export function NewMessage({
  brand = grundyBrand,
  tokens,
  recipientEmail,
  recipientName,
  senderName,
  messageExcerpt,
  inboxUrl,
}: NewMessageProps) {
  const appName = brand.appName;

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={`New message from ${senderName}`}
      headerTagline="Activity"
    >
      <EmailEyebrow>Direct message</EmailEyebrow>
      <EmailHeading subtitle={`via ${appName}`}>
        You received a message
      </EmailHeading>
      <EmailBodyText>
        Hi {recipientName}, {senderName} sent you a direct message.
      </EmailBodyText>
      <EmailCallout title={senderName}>
        &ldquo;{messageExcerpt}&rdquo;
      </EmailCallout>
      <EmailCtaSection
        href={inboxUrl}
        label="Open inbox"
        caption="Reply without leaving your workflow."
      />
    </EmailLayout>
  );
}

export default NewMessage;
