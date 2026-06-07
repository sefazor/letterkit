import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialGrundyTokens } from '../../tokens.config';
import { grundyBrand } from '../../brand.config';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailLayout } from '../../_components/layout';
import { EmailLineItems } from '../../_components/line-items';

export interface ProfileCompletedProps {
  brand?: EmailBrandProps;
  tokens?: PartialGrundyTokens;
  recipientEmail?: string;
  userName: string;
  completedFields: string[];
  dashboardUrl: string;
}

/**
 * Profile completed lifecycle template for the Grundy theme.
 */
export function ProfileCompleted({
  brand = grundyBrand,
  tokens,
  recipientEmail,
  userName,
  completedFields,
  dashboardUrl,
}: ProfileCompletedProps) {
  const appName = brand.appName;

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={`Your ${appName} profile is complete`}
      headerTagline="Account"
    >
      <EmailEyebrow>Profile complete</EmailEyebrow>
      <EmailHeading subtitle="You're all set up">
        Profile completed
      </EmailHeading>
      <EmailBodyText>
        Hi {userName}, your {appName} profile is now complete. A full profile helps teammates find you
        and unlocks personalized recommendations.
      </EmailBodyText>
      <EmailLineItems
        title="Completed fields"
        items={completedFields.map((field) => ({
          name: field,
          amount: '✓',
        }))}
      />
      <EmailCtaSection
        href={dashboardUrl}
        label="Go to dashboard"
        caption="Explore features tailored to your role and preferences."
      />
    </EmailLayout>
  );
}

export default ProfileCompleted;
