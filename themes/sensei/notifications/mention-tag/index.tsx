import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleQuote } from '../../_components/lifecycle/quote';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { LifecycleStrong } from '../../_components/lifecycle/strong';
import { senseiBrand } from '../../brand.config';

export interface MentionTagProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  actorName?: string;
  channel?: string;
  quote?: string;
  actionUrl?: string;
}

export function MentionTag({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  actorName,
  channel,
  quote,
  actionUrl,
}: MentionTagProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview={
        actorName && channel
          ? `${actorName} mentioned you in ${channel}.`
          : 'You were mentioned in a thread.'
      }
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>You were mentioned</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — you were tagged
        {actorName && channel ? (
          <>
            {' '}
            by <LifecycleStrong>{actorName}</LifecycleStrong> in{' '}
            <LifecycleStrong>{channel}</LifecycleStrong>
          </>
        ) : null}
        .
      </LifecycleLede>
      <LifecycleQuote>{quote}</LifecycleQuote>
      <LifecycleCta href={actionUrl} label="Open thread" />
    </LifecycleLayout>
  );
}

export default MentionTag;
