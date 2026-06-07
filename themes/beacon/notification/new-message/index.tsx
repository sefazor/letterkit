import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialBeaconTokens } from '../../tokens.config';
import { beaconBrand } from '../../brand.config';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailLayout } from '../../_components/layout';
import { EmailSnippetPanel } from '../../_components/snippet-panel';

export interface NewMessageProps {
  brand?: EmailBrandProps;
  tokens?: PartialBeaconTokens;
  recipientEmail?: string;
  recipientName: string;
  senderName: string;
  messageExcerpt: string;
  inboxUrl: string;
}

/**
 * New direct message notification template for the Beacon theme.
 */
export function NewMessage({
  brand = beaconBrand,
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
      preview={`Message from ${senderName}`}
    >
      <EmailEyebrow>Inbox</EmailEyebrow>
      <EmailHeading subtitle={`${appName} direct message`}>Message from {senderName}</EmailHeading>
      <EmailBodyText>
        Hi {recipientName}, you have an unread message waiting in your inbox.
      </EmailBodyText>
      <EmailSnippetPanel author={senderName} stampLabel="Channel" stampValue="Direct">
        {messageExcerpt}
      </EmailSnippetPanel>
      <EmailCtaSection
        href={inboxUrl}
        label="Reply in inbox"
        caption="Messages stay synced across your devices."
      />
    </EmailLayout>
  );
}

export default NewMessage;
