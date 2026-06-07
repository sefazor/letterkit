import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleQuote } from '../../_components/lifecycle/quote';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { LifecycleStrong } from '../../_components/lifecycle/strong';
import { foundryBrand } from '../../brand.config';

export interface DirectMessageProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  senderName?: string;
  quote?: string;
  actionUrl?: string;
}

export function DirectMessage({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  senderName,
  quote,
  actionUrl,
}: DirectMessageProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview={senderName ? `${senderName} sent you a direct message.` : 'You received a direct message.'}
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>You received a direct message</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — you have a new direct message
        {senderName ? (
          <>
            {' '}
            from <LifecycleStrong>{senderName}</LifecycleStrong>
          </>
        ) : null}
        .
      </LifecycleLede>
      <LifecycleQuote>{quote}</LifecycleQuote>
      <LifecycleCta href={actionUrl} label="Open inbox" />
    </LifecycleLayout>
  );
}

export default DirectMessage;
