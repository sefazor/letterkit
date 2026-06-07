import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleQuote } from '../../_components/lifecycle/quote';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { senseiBrand } from '../../brand.config';

export interface CommentReplyProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  quote?: string;
  actionUrl?: string;
}

export function CommentReply({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  quote,
  actionUrl,
}: CommentReplyProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="A teammate replied in a thread you follow."
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>New reply to your comment</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — there is a fresh reply on a comment you are following.
      </LifecycleLede>
      <LifecycleQuote>{quote}</LifecycleQuote>
      <LifecycleCta href={actionUrl} label="View reply" />
    </LifecycleLayout>
  );
}

export default CommentReply;
