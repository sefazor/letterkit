import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';
import { LifecycleStrong } from '../../_components/lifecycle/strong';
import { senseiBrand } from '../../brand.config';

export interface CustomReminderProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail?: string;
  reminderText?: string;
  actionUrl?: string;
}

export function CustomReminder({
  brand = senseiBrand,
  tokens,
  userName,
  recipientEmail,
  reminderText,
  actionUrl,
}: CustomReminderProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview={reminderText ?? 'You have a scheduled reminder.'}
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Custom reminder</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} —{' '}
        {reminderText ? (
          <LifecycleStrong>{reminderText}</LifecycleStrong>
        ) : (
          'this is your scheduled reminder.'
        )}
      </LifecycleLede>
      <LifecycleCta href={actionUrl} label="Open reminder context" />
    </LifecycleLayout>
  );
}

export default CustomReminder;
