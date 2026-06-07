import { EmailBodyText } from '../../_components/body';
import type { EmailBrandProps } from '../../_components/email-brand';
import type { PartialBeaconTokens } from '../../tokens.config';
import { beaconBrand } from '../../brand.config';
import { EmailCtaSection } from '../../_components/cta-section';
import { EmailEyebrow } from '../../_components/eyebrow';
import { EmailHeading } from '../../_components/heading';
import { EmailInfoCard } from '../../_components/info-card';
import { EmailLayout } from '../../_components/layout';

export interface InvitationAcceptedProps {
  brand?: EmailBrandProps;
  tokens?: PartialBeaconTokens;
  recipientEmail?: string;
  adminName: string;
  memberName: string;
  memberEmail: string;
  workspaceName: string;
  role: string;
  teamUrl: string;
}

/**
 * Invitation accepted admin notification template for the Beacon theme.
 */
export function InvitationAccepted({
  brand = beaconBrand,
  tokens,
  recipientEmail,
  adminName,
  memberName,
  memberEmail,
  workspaceName,
  role,
  teamUrl,
}: InvitationAcceptedProps) {
  const appName = brand.appName;

  return (
    <EmailLayout
      brand={brand}
      tokens={tokens}
      recipientEmail={recipientEmail}
      preview={`${memberName} joined ${workspaceName}`}
    >
      <EmailEyebrow>New member</EmailEyebrow>
      <EmailHeading subtitle={`${workspaceName} on ${appName}`}>
        Invitation accepted
      </EmailHeading>
      <EmailBodyText>
        Hi {adminName}, {memberName} accepted your invitation and joined the workspace. They now have access to shared projects and files.
      </EmailBodyText>
      <EmailInfoCard
        rows={[
          { label: 'Member', value: memberName },
          { label: 'Email', value: memberEmail },
          { label: 'Role', value: role },
          { label: 'Workspace', value: workspaceName },
        ]}
      />
      <EmailCtaSection
        href={teamUrl}
        label="Review team members"
        caption="Adjust roles or permissions anytime from team settings."
      />
    </EmailLayout>
  );
}

export default InvitationAccepted;
