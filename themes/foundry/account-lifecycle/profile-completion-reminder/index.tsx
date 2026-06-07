import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialLifecycleTokens } from '../../tokens.config';
import { foundryBrand } from '../../brand.config';
import { LifecycleCta } from '../../_components/lifecycle/cta';
import { LifecycleDataCard, type LifecycleDataRow } from '../../_components/lifecycle/data-card';
import { LifecycleLayout } from '../../_components/lifecycle/layout';
import { LifecycleLede } from '../../_components/lifecycle/lede';
import { LifecycleTitle } from '../../_components/lifecycle/title';

const DEFAULT_FIELDS: LifecycleDataRow[] = [
  { label: 'Role', value: 'Not set' },
  { label: 'Team size', value: 'Not set' },
];

export interface ProfileCompletionReminderProps {
  brand?: EmailBrandProps;
  tokens?: PartialLifecycleTokens;
  userName: string;
  recipientEmail: string;
  profileUrl: string;
  missingFields?: LifecycleDataRow[];
}

export function ProfileCompletionReminder({
  brand = foundryBrand,
  tokens,
  userName,
  recipientEmail,
  profileUrl,
  missingFields = DEFAULT_FIELDS,
}: ProfileCompletionReminderProps) {
  return (
    <LifecycleLayout
      brand={brand}
      tokens={tokens}
      preview="Two quick fields left on your profile"
      recipientEmail={recipientEmail}
    >
      <LifecycleTitle>Complete your profile</LifecycleTitle>
      <LifecycleLede>
        Hi {userName} — add your role and team size so we can tailor recommendations for your
        workspace. Takes under a minute.
      </LifecycleLede>
      <LifecycleDataCard rows={missingFields} />
      <LifecycleCta href={profileUrl} label="Complete profile" />
    </LifecycleLayout>
  );
}

export default ProfileCompletionReminder;
